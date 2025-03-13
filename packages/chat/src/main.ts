import { createApp } from 'vue';
import { BubbleText } from '@miao/engine';
import App from './App.vue';
import './assets/styles/index.less';

const app = createApp(App);

app.use(BubbleText);

app.mount('#app');
