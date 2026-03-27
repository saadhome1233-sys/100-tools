import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  const input = createInputArea('case-input', 'Enter your text:', 'Hello World', 10);
  container.appendChild(input);

  const actions = [
    { label: 'UPPERCASE', icon: 'chevron-up', onClick: () => convert('up') },
    { label: 'lowercase', icon: 'chevron-down', onClick: () => convert('low') },
    { label: 'Title Case', icon: 'heading', onClick: () => convert('title') },
    { label: 'Sentence case', icon: 'align-left', onClick: () => convert('sentence') },
    { label: 'Copy', icon: 'copy', type: 'secondary', onClick: () => copyToClipboard(document.getElementById('case-input').value) }
  ];

  container.appendChild(createActionButtons(actions));
  if (window.lucide) window.lucide.createIcons();

  function convert(type) {
    const textarea = document.getElementById('case-input');
    let text = textarea.value;

    if (type === 'up') {
      textarea.value = text.toUpperCase();
    } else if (type === 'low') {
      textarea.value = text.toLowerCase();
    } else if (type === 'title') {
      textarea.value = text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    } else if (type === 'sentence') {
      textarea.value = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
    }
  }
}
