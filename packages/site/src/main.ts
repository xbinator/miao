import { createApp } from 'vue';
import { MiaoUI } from '@miao/engine';
import router from './router';
import App from './App.vue';
import Demo from './components/Demo.vue';

import './assets/styles/index.less';

const app = createApp(App);

app.use(router);

app.use(MiaoUI);

app.component('Demo', Demo);

app.mount('#app');
