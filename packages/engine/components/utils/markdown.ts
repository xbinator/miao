import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import markdownItHighlight from 'markdown-it-highlightjs';

import 'highlight.js/styles/base16/default-light.css';

const md = MarkdownIt({ html: false, breaks: true });

md.use(markdownItHighlight, { hljs });

// // 自定义渲染器来包裹代码块
// const defaultFenceRenderer = md.renderer.rules.fence;

// md.renderer.rules.fence = (tokens, idx, options, env, self) => {
//   const defaultOutput = defaultFenceRenderer?.(tokens, idx, options, env, self);

//   return `<div class="code-block">${defaultOutput}</div>`;
// };

export function Markdown(cotent: string) {
  return md.render(cotent);
}
