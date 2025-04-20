import { createApp } from 'vue';
import { MiaoUI } from '@miao/engine';
import router from './router';
import App from './App.vue';

import './assets/styles/index.less';
import 'prismjs/themes/prism.min.css';

const app = createApp(App);

app.use(router);

app.use(MiaoUI);

app.mount('#app');
