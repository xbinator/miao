import type { SkillProps } from '../Skill/interface';
import type { SenderActionOptions } from '../Sender/interface';

export interface LayoutProps {
  // 占位符
  placeholder?: string;
  // 发送消息
  loading?: boolean;
  // 数据加载完成
  finished?: boolean;
  // 输入内容
  value?: string;
  // 技能
  skills?: SkillProps[];
  // 使用深度思考
  useDeepThink?: boolean;
  // 使用联网搜索
  useNetSearch?: boolean;
  // 使用语音搜索
  allowSpeech?: boolean;
}

export type LayoutActionOptions = SenderActionOptions;
