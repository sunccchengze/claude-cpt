import { useEffect } from 'react';

const KEYWORDS = [
  'Claude Fable 5',
  'GPT-5.6 Sol',
  'Transformer Layer',
  'Multi-Head Attention',
  'Next Token Prediction',
  'Positional Encoding',
  'Self-Attention',
  'Feed-Forward Network',
  'Instruction Tuning',
  'Reinforcement Learning',
  'Chain-of-Thought',
  'Pre-training',
  'Tokenization',
  'Embedding',
  'Softmax',
  'Benchmark',
  'Emergence',
  'Hallucination',
  'Transformer',
  'Agentic',
  'Vector',
  'Token',
  'RLHF',
  '自注意力',
  '位置编码',
  '前馈网络',
  '输出预测',
  '分词',
  '嵌入',
  '向量',
  '词元',
  '预训练',
  '指令微调',
  '强化学习',
  '思维链推理',
  '智能体',
  '基准测试',
  '涌现',
  '幻觉',
  'Transformer层',
  '类似智能',
  '参数',
  '训练',
  '推理',
  '概率分布',
  '下一个词',
  '语义',
  '上下文',
  'token',
  'QKV',
].sort((a, b) => b.length - a.length);

const escapedKeywords = KEYWORDS.map((keyword) =>
  keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
);

const keywordRegex = new RegExp(`(${escapedKeywords.join('|')})`, 'g');

function shouldSkipNode(parent: Node | null): boolean {
  if (!(parent instanceof HTMLElement)) return true;

  return Boolean(
    parent.closest(
      '.keyword-accent, .term-highlight, button, a, code, pre, svg, canvas, input, textarea, select, [data-no-highlight="true"]',
    ),
  );
}

function highlightTextNode(textNode: Text) {
  const text = textNode.nodeValue;
  if (!text || !keywordRegex.test(text)) return;
  keywordRegex.lastIndex = 0;

  const fragment = document.createDocumentFragment();
  const parts = text.split(keywordRegex);

  parts.forEach((part) => {
    if (!part) return;

    if (KEYWORDS.includes(part)) {
      const span = document.createElement('span');
      span.className = 'keyword-accent';
      span.textContent = part;
      fragment.appendChild(span);
    } else {
      fragment.appendChild(document.createTextNode(part));
    }
  });

  textNode.parentNode?.replaceChild(fragment, textNode);
}

function processRoot(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  let currentNode = walker.nextNode();
  while (currentNode) {
    if (!shouldSkipNode(currentNode.parentNode)) {
      textNodes.push(currentNode as Text);
    }
    currentNode = walker.nextNode();
  }

  textNodes.forEach(highlightTextNode);
}

export function AutoKeywordHighlighter() {
  useEffect(() => {
    const root = document.querySelector('main');
    if (!(root instanceof HTMLElement)) return;

    let frame = 0;
    let observer: MutationObserver | null = null;

    const run = () => {
      processRoot(root);
    };

    const observe = () => {
      observer = new MutationObserver(() => {
        if (frame) cancelAnimationFrame(frame);
        if (observer) observer.disconnect();
        frame = requestAnimationFrame(() => {
          run();
          observe();
        });
      });

      observer.observe(root, {
        childList: true,
        subtree: true,
      });
    };

    run();
    observe();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return null;
}
