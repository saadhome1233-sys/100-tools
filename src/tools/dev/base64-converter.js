import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  const input = createInputArea('b64-input', 'Input Text:', 'Hello, World!', 6);
  container.appendChild(input);

  const actions = [
    { label: 'Encode', icon: 'lock', onClick: () => process('encode') },
    { label: 'Decode', icon: 'unlock', onClick: () => process('decode') },
    { label: 'Copy result', icon: 'copy', type: 'secondary', onClick: () => copyToClipboard(document.getElementById('b64-output').value) }
  ];

  container.appendChild(createActionButtons(actions));
  
  const output = createInputArea('b64-output', 'Result:', '', 6);
  container.appendChild(output);
  
  if (window.lucide) window.lucide.createIcons();

  function process(type) {
    const textarea = document.getElementById('b64-input');
    const resultArea = document.getElementById('b64-output');
    try {
      if (type === 'encode') {
        resultArea.value = btoa(unescape(encodeURIComponent(textarea.value)));
      } else {
        resultArea.value = decodeURIComponent(escape(atob(textarea.value)));
      }
    } catch (err) {
      resultArea.value = 'Error: ' + err.message;
    }
  }
}
