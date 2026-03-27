import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  const input = createInputArea('reverse-input', 'Enter text to reverse:', 'Hello World', 8);
  container.appendChild(input);

  const actions = [
    { label: 'Reverse Entire Text', icon: 'refresh-cw', onClick: () => process('all') },
    { label: 'Reverse Words only', icon: 'move-horizontal', onClick: () => process('words') },
    { label: 'Flip Vertical (Characters)', icon: 'arrow-down-up', onClick: () => process('flip') },
    { label: 'Copy', icon: 'copy', type: 'secondary', onClick: () => copyToClipboard(document.getElementById('reverse-input').value) }
  ];

  container.appendChild(createActionButtons(actions));
  if (window.lucide) window.lucide.createIcons();

  function process(type) {
    const textarea = document.getElementById('reverse-input');
    const text = textarea.value;
    if (type === 'all') {
      textarea.value = text.split('').reverse().join('');
    } else if (type === 'words') {
      textarea.value = text.split(' ').reverse().join(' ');
    } else if (type === 'flip') {
      textarea.value = text.split('\n').reverse().join('\n');
    }
  }
}
