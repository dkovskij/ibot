import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '@/main';
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    phones: [],
  },
  mutations: {
    SET_PHONES: (state, phones) => {
      state.phones = phones;
    },
    TOOGLE_LOADING: (state, loading) => {
      state.loading = loading;
    },
    DELETE_PHONE: (state, id) => {
      for (let i = 0; i < state.phones.length; i++) {
        if (state.phones[i].id === id) {
          state.phones.splice(i, 1);
        }
      }
    },
  },
  actions: {
    GET_PHONES: ({ commit, state }) => {
      state.loading = true;

      return new Promise((resolve, reject) => {
        db.collection('phones')
          .get()
          .then((r) => {
            const phones = r.docs.map((doc) => doc.data())
            commit('SET_PHONES', phones);
            resolve('ok');
            state.loading = false;
          }).catch((err) => {
            reject(err);
            state.loading = false;
          });
      });
    },
    CHANGE_PHONE: ({ state }, payload) => {
      if (payload.id) {
        for (let i = 0; i < state.phones.length; i++) {
          if (+state.phones[i].id === +payload.id) {
            state.phones[i].phone = payload.phone;
            const tt = Object.assign({}, state.phones[i]);
            db.collection('phones').doc('' + tt.id).set(tt);
          }
        }
      } else {
        const count = state.phones.length + 1
        const date = Date.now();
        const phoneObj = {
          id: count,
          created_at: date,
          phone: payload.phone
        };
        db.collection('phones').doc('' + count).set(phoneObj);
        router.push('/list/page/1');
      }
    },
    DELETE_PHONE: ({commit}, phone) => {
      commit('DELETE_PHONE', phone.id)
      db.collection('phones').doc('' + phone.id).delete();
    }
  },
  modules: {
  },
});
