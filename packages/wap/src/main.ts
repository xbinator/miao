import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import './assets/styles/index.less';

const app = createApp(App);

// 设置路由
setupRouter(app);

// 配置 store
setupStore(app);

app.mount('#app');
