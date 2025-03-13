import { defineAsyncComponent } from 'vue';
import { withInstall } from '../utils/with-install';

const _BubbleText = defineAsyncComponent(() => import('./Text.vue'));

export const BubbleText = withInstall('BubbleText', _BubbleText);
