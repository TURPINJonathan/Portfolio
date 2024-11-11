import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import AdminChildView from '#views/admin/ExampleView.vue';
import BackOfficeView from '#views/admin/HomeView.vue';
import HomeView from '#views/portfolio/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/admin',
    name: 'Back Office',
    component: BackOfficeView,
    children: [
      {
        path: 'example',
        name: 'AdminChild',
        component: AdminChildView,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard global
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token: string | null = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      const tokenExpiration: string | null = localStorage.getItem('tokenExpiration');
      if (tokenExpiration && new Date(tokenExpiration) > new Date()) {
        next();
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        next('/');
      }
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;