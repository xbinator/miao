import { defineAsyncComponent } from 'vue';
import { withInstall } from '../utils/with-install';

const _SkillButton = defineAsyncComponent(() => import('./Button.vue'));

export const SkillButton = withInstall('SkillButton', _SkillButton);
