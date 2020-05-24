import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestorePlugin } from 'vuefire';

Vue.config.productionTip = false;

Vue.use(firestorePlugin)
firebase.initializeApp({
  projectId: 'kt-proj',
  databaseURL: 'https://kt-proj.firebaseio.com',
});

export const db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
