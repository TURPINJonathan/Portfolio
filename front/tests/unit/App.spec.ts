import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '#/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES, ROUTES_NAMES } from '#constants/routes';
import HomeView from '#views/portfolio/HomeView.vue';
import BackOfficeView from '#views/admin/HomeView.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '../../font-awesome';

const routes = [
  {
    path: ROUTES.HOME,
    name: ROUTES_NAMES.HOME,
    component: HomeView
  },
  {
    path: /login,
    name: /login,
    component: BackOfficeView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

describe('App.vue', () => {
  beforeEach(async () => {
    router.push(/login);
    await router.isReady();
  });

  it('displays route name in h1', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          'FIcon': FontAwesomeIcon
        }
      }
    });

    const h1 = wrapper.find('#main-title');
    expect(h1.exists()).toBe(true);
    expect(h1.text()).toBe(/login);
  });

  it('renders FIcon component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          'FIcon': FontAwesomeIcon
        }
      }
    });

    const fIcon = wrapper.findComponent(FontAwesomeIcon);
    expect(fIcon.exists()).toBe(true);
  });
});