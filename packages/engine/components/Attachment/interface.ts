export interface AttachmentToolProps {
  // 按钮文本
  text?: string;
  // 按钮图标
  icon?: string;
  // 按钮类型
  type?: 'primary' | 'default';
  //
  trueValue?: string | number | null | undefined | boolean;
  //
  falseValue?: string | number | null | undefined | boolean;
}
