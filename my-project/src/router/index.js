import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {label: '首頁', icon: 'home-o'},
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    meta: {label: '關於', icon: 'friends-o'},
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/test',
    name: 'test',
    meta: {label: '設定',icon: 'setting-o'},
    component: () => import('../views/SettingView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
