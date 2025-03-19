import { ref, Ref, onMounted } from 'vue';

type ScrollElement = HTMLElement | Window;

const overflowScrollReg = /scroll|auto|overlay/i;

function isElement(node: Element) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
}

export function getScrollParent(el: HTMLElement, root: ScrollElement | undefined = window) {
  let node = el;

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode as HTMLElement;
  }

  return root;
}

export function getScrollTop(el: ScrollElement): number {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;

  return Math.max(Math.ceil(Math.abs(top)), 0);
}

export function useScrollParent(el: Ref<HTMLElement | undefined>, root: ScrollElement | undefined = window) {
  const scrollParent = ref<HTMLElement | Window>();

  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root);
    }
  });

  return scrollParent;
}
