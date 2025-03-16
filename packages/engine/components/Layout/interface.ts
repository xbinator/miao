import { SkillProps } from '../Skill/interface';

export interface LayoutProps {
  // 占位符
  placeholder?: string;
  // 输入内容
  value?: string;
  // 技能
  items?: SkillProps[];
  // 使用深度思考
  useDeepThink?: boolean;
  // 使用联网搜索
  useNetSearch?: boolean;
}
