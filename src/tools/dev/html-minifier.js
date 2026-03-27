import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  const input = createInputArea('minify-input', 'Enter Code (HTML/CSS/JS):', '<html>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>', 10);
  container.appendChild(input);

  const actions = [
    { label: 'Minify HTML', icon: 'file-code', onClick: () => process('html') },
    { label: 'Minify CSS', icon: 'file-type', onClick: () => process('css') },
    { label: 'Minify JS', icon: 'file-json', onClick: () => process('js') },
    { label: 'Copy', icon: 'copy', type: 'secondary', onClick: () => copyToClipboard(document.getElementById('minify-input').value) }
  ];

  container.appendChild(createActionButtons(actions));
  if (window.lucide) window.lucide.createIcons();

  function process(type) {
    const textarea = document.getElementById('minify-input');
    let code = textarea.value;
    
    if (type === 'html') {
      code = code.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
    } else if (type === 'css') {
      code = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{:;}])\s*/g, '$1').trim();
    } else if (type === 'js') {
      code = code.replace(/\/\/.*/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
    }
    
    textarea.value = code;
  }
}
