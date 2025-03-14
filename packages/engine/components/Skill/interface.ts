import { VNode } from 'vue';

export interface SkillButtonProps {
  // 按钮文本
  text?: string;
  // 按钮图标
  icon?: string | VNode;
  // 按钮类型
  type?: 'primary' | 'default';
}
