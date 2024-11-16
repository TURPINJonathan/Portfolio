import '#assets/main.scss';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '../font-awesome';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { getRandomTheme } from '#utils/themeUtils';

const app = createApp(App);
app.component('FIcon', FontAwesomeIcon);

app.use(createPinia());
app.use(router);

const appElement = document.getElementById('app');
if (appElement) {
  appElement.className = '';
  appElement.classList.add(getRandomTheme());
}

app.mount('#app');
