import { createApp } from 'vue';
import VConsole from 'vconsole';
import App from './App.vue';
import './assets/styles/index.less';

const vConsole = new VConsole();

const app = createApp(App);

app.mount('#app');
