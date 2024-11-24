import { createRouter, createWebHistory } from 'vue-router';
import type {
  RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router';

import { ROUTES, ROUTES_NAMES } from '#constants/routes';
import { getRandomTheme } from '#utils/themeUtils';
import AdminDashboard from '#views/admin/DashboardView.vue';
import BackOfficeView from '#views/admin/LoginView.vue';
import HomeView from '#views/portfolio/HomeView.vue';
import { useNotify } from '#/composables/useNotify';

const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTES.HOME,
    name: ROUTES_NAMES.HOME,
    component: HomeView
  },
  {
    path: ROUTES.CONTACT,
    name: ROUTES_NAMES.CONTACT,
    component: HomeView
  },
  {
    path: ROUTES.ADMIN_LOGIN,
    name: ROUTES_NAMES.ADMIN_LOGIN,
    component: BackOfficeView,
  },
  {
    path: ROUTES.ADMIN_DASHBOARD,
    name: ROUTES_NAMES.ADMIN_DASHBOARD,
    component: AdminDashboard,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard global
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.className = '';
      appElement.classList.add(getRandomTheme());
    }

    const token: string | null = localStorage.getItem('token');

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (token) {
        const tokenExpiration: string | null = localStorage.getItem('tokenExpiration');
        if (
          tokenExpiration &&
          new Date(parseInt(tokenExpiration)) > new Date()
        ) {
          next();
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');

          next({ name: ROUTES_NAMES.HOME });
        }
      } else {
        await useNotify('error', 'Cet espace est réservé aux administrateurs');
        next({ name: ROUTES_NAMES.HOME });
      }
    } else {
      next();
    }
  }
);

export default router;