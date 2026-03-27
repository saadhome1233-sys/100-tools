import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  const input = createInputArea('json-input', 'Enter raw JSON:', '{ "key": "value" }', 10);
  container.appendChild(input);

  const actions = [
    { label: 'Format / Prettify', icon: 'check', onClick: () => processJson('pretty') },
    { label: 'Minify', icon: 'minimize', onClick: () => processJson('minify') },
    { label: 'Validate', icon: 'shield-check', onClick: () => processJson('validate') },
    { label: 'Copy to Clipboard', icon: 'clipboard', type: 'secondary', onClick: () => copyToClipboard(document.getElementById('json-input').value) }
  ];

  container.appendChild(createActionButtons(actions));

  const errorOutput = document.createElement('div');
  errorOutput.id = 'json-error';
  errorOutput.style = 'margin-top: 1.5rem; color: #ef4444; font-size: 0.9rem';
  container.appendChild(errorOutput);

  if (window.lucide) window.lucide.createIcons();

  function processJson(type) {
    const textarea = document.getElementById('json-input');
    const error = document.getElementById('json-error');
    error.textContent = '';
    
    try {
      if (type === 'pretty') {
        const obj = JSON.parse(textarea.value);
        textarea.value = JSON.stringify(obj, null, 2);
      } else if (type === 'minify') {
        const obj = JSON.parse(textarea.value);
        textarea.value = JSON.stringify(obj);
      } else if (type === 'validate') {
        JSON.parse(textarea.value);
        error.style.color = '#10b981';
        error.textContent = 'Valid JSON!';
        setTimeout(() => (error.textContent = ''), 3000);
      }
    } catch (err) {
      error.style.color = '#ef4444';
      error.textContent = 'Invalid JSON: ' + err.message;
    }
  }
}
