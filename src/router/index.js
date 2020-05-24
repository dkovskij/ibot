import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      breadCrumbs: [
        {
          href: '/',
          text: 'Главная',
        }
      ]
    }
  },
  {
    path: '/list/page/:num',
    name: 'PhonesList',
    component: () => import(/* webpackChunkName: "list" */ '../views/PhonesList.vue'),
    meta: {
      breadCrumbs: [
        {
          href: '/',
          text: 'Главная',
        },
        {
          href: '/list/page/',
          text: 'Стоп-лист',
        },
      ]
    }
  },
  {
    path: '/edit/:id',
    name: 'EditPage',
    component: () => import(/* webpackChunkName: "editPage" */ '../views/EditPage.vue'),
    meta: {
      breadCrumbs: [
        {
          href: '/',
          text: 'Главная',
        },
        {
          href: '/edit/',
          text: 'Редактирование записи',
        },
      ]
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
