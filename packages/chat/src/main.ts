import { createApp } from 'vue';
import { MiaoUI } from '@miao/engine';
import App from './App.vue';
import './assets/styles/index.less';

const app = createApp(App);

app.use(MiaoUI);

app.mount('#app');
