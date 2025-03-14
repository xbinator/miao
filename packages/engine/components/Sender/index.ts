import { defineAsyncComponent } from 'vue';
import { withInstall } from '../utils/with-install';

const _Sender = defineAsyncComponent(() => import('./Sender.vue'));

export const Sender = withInstall('Sender', _Sender);
