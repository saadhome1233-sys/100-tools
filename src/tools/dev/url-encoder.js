import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  const input = createInputArea('url-input', 'Enter raw URL or text:', 'https://google.com/search?q=hello world!', 6);
  container.appendChild(input);

  const actions = [
    { label: 'Encode URL', icon: 'link', onClick: () => process('encode') },
    { label: 'Decode URL', icon: 'link-2', onClick: () => process('decode') },
    { label: 'Copy result', icon: 'copy', type: 'secondary', onClick: () => copyToClipboard(document.getElementById('url-output').value) }
  ];

  container.appendChild(createActionButtons(actions));
  
  const output = createInputArea('url-output', 'Result:', '', 6);
  container.appendChild(output);
  
  if (window.lucide) window.lucide.createIcons();

  function process(type) {
    const textarea = document.getElementById('url-input');
    const resultArea = document.getElementById('url-output');
    try {
      if (type === 'encode') {
        resultArea.value = encodeURIComponent(textarea.value);
      } else {
        resultArea.value = decodeURIComponent(textarea.value);
      }
    } catch (err) {
      resultArea.value = 'Error: ' + err.message;
    }
  }
}
