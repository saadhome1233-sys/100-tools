import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  const input = createInputArea('hash-input', 'Enter text to hash:', 'Hello World', 8);
  container.appendChild(input);

  const actions = [
    { label: 'Generate SHA-256', icon: 'zap', onClick: () => generateHash('SHA-256') },
    { label: 'Generate SHA-1', icon: 'shield', onClick: () => generateHash('SHA-1') },
    { label: 'Copy result', icon: 'copy', type: 'secondary', onClick: () => copyToClipboard(document.getElementById('hash-output').value) }
  ];

  container.appendChild(createActionButtons(actions));

  const output = createInputArea('hash-output', 'Hash Output:', '', 6);
  container.appendChild(output);

  if (window.lucide) window.lucide.createIcons();

  async function generateHash(algo) {
    const text = document.getElementById('hash-input').value;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algo, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('hash-output').value = hashHex;
  }
}
