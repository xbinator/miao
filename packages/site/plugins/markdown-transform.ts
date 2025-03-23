/* eslint-disable consistent-return */
import fs from 'fs';
import type { Plugin } from 'vite';
import MarkdownIt from 'markdown-it';
import Shiki from '@shikijs/markdown-it';
import { camelCase } from 'lodash-es';

const md = new MarkdownIt();

md.use(await Shiki({ theme: 'github-light' }));

export default function MarkdownTransform(): Plugin {
  return {
    name: 'markdown-transform',
    enforce: 'pre',
    transform(code, id) {
      if (!/views\/components\/[\w]+\/index.md/.test(id)) return;

      let _path = '';

      const _code = code.replace(/:::demo\s+([\s\S]+?)\n\s*([\w\d-_/]+)\s+:::/g, (container, title, name) => {
        const sourceFile = id.replace(/(index\.md)$/, `demo/${name}.vue`);

        if (!fs.existsSync(sourceFile)) return container;

        let _name = camelCase(name);

        _name = _name[0].toLocaleUpperCase() + _name.slice(1);

        _path += `import ${_name} from './demo/${name}.vue';\n`;

        const source = fs.readFileSync(sourceFile, 'utf-8');

        return `<Demo source="${encodeURIComponent(md.render(`\`\`\` vue\n${source}\`\`\``))}" title="${title}" ><${_name} /></Demo>`;
      });

      return `${_code}<script setup>${_path}</script>`;
    }
  };
}
