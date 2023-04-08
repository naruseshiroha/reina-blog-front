import { createApp } from 'vue';
import './style.css';
import '/@/assets/scss/my.scss'
import 'github-markdown-css'
// AOS
import App from './App.vue';
import './router/guard'
import router from './router';
import store from './store';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
store.use(piniaPluginPersistedstate)

createApp(App).use(router).use(store).mount('#app');
