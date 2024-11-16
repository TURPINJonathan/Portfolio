import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { ROUTES, ROUTES_NAMES } from '#constants/routes';
import { getRandomTheme } from '#utils/themeUtils';
import AdminChildView from '#views/admin/ExampleView.vue';
import BackOfficeView from '#views/admin/HomeView.vue';
import HomeView from '#views/portfolio/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTES.HOME,
    name: ROUTES_NAMES.HOME,
    component: HomeView,
  },
  {
    path: ROUTES.CONTACT,
    name: ROUTES_NAMES.CONTACT,
    component: HomeView,
  },
  {
    path: ROUTES.ADMIN,
    name: ROUTES_NAMES.ADMIN,
    component: BackOfficeView,
    children: [
      {
        path: ROUTES.ADMIN_CHILD,
        name: ROUTES_NAMES.ADMIN_CHILD,
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
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.className = '';
    appElement.classList.add(getRandomTheme());
  }
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