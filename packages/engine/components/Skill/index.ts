import { defineAsyncComponent } from 'vue';
import { withInstall } from '../utils/with-install';

const _Skill = defineAsyncComponent(() => import('./Skill.vue'));

const _SkillList = defineAsyncComponent(() => import('./SkillList.vue'));

export const Skill = withInstall('Skill', _Skill);

export const SkillList = withInstall('SkillList', _SkillList);
