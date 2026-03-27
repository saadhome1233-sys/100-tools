import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  const input = createInputArea('dup-input', 'Enter a list (one per line):', 'item1\nitem2\nitem1\nitem3', 10);
  container.appendChild(input);

  const actions = [
    { label: 'Remove Duplicates', icon: 'list-x', onClick: () => process() },
    { label: 'Sort A-Z', icon: 'sort-asc', onClick: () => sort('asc') },
    { label: 'Sort Z-A', icon: 'sort-desc', onClick: () => sort('desc') },
    { label: 'Copy result', icon: 'copy', type: 'secondary', onClick: () => copyToClipboard(document.getElementById('dup-input').value) }
  ];

  container.appendChild(createActionButtons(actions));
  if (window.lucide) window.lucide.createIcons();

  function process() {
    const textarea = document.getElementById('dup-input');
    const lines = textarea.value.split('\n');
    const unique = [...new Set(lines.map(l => l.trim()).filter(Boolean))];
    textarea.value = unique.join('\n');
  }

  function sort(dir) {
    const textarea = document.getElementById('dup-input');
    const lines = textarea.value.split('\n').filter(Boolean);
    lines.sort((a,b) => dir === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
    textarea.value = lines.join('\n');
  }
}
