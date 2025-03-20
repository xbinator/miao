import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import markdownItHighlight from 'markdown-it-highlightjs';

import 'highlight.js/styles/base16/default-light.css';

const md = MarkdownIt({ html: true, breaks: true });

md.use(markdownItHighlight, { hljs });

export function Markdown(cotent: string) {
  return md.render(cotent);
}
