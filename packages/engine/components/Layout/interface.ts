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
  deepThink?: boolean;
  // 使用联网搜索
  netSearch?: boolean;
  // 使用语音搜索
  allowSpeech?: boolean;
  // 使用下拉搜索
  allowRefresh?: boolean;
}

export type LayoutActionOptions = SenderActionOptions;
