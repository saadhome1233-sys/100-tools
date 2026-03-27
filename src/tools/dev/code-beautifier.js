import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  const input = createInputArea('beautify-input', 'Enter Minified Code:', '<div class="test"><h1>Hello</h1></div>', 10);
  container.appendChild(input);

  const actions = [
    { label: 'Beautify HTML', icon: 'file-code', onClick: () => process('html') },
    { label: 'Beautify CSS', icon: 'file-type', onClick: () => process('css') },
    { label: 'Beautify JS', icon: 'file-json', onClick: () => process('js') },
    { label: 'Copy', icon: 'copy', type: 'secondary', onClick: () => copyToClipboard(document.getElementById('beautify-input').value) }
  ];

  container.appendChild(createActionButtons(actions));
  
  if (!window.html_beautify) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify-html.min.js';
    document.head.appendChild(script);
    
    const scriptCss = document.createElement('script');
    scriptCss.src = 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify-css.min.js';
    document.head.appendChild(scriptCss);
    
    const scriptJs = document.createElement('script');
    scriptJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify.min.js';
    document.head.appendChild(scriptJs);
  }

  if (window.lucide) window.lucide.createIcons();

  function process(type) {
    const textarea = document.getElementById('beautify-input');
    const options = { indent_size: 2, space_in_empty_paren: true };
    
    if (type === 'html' && window.html_beautify) {
      textarea.value = html_beautify(textarea.value, options);
    } else if (type === 'css' && window.css_beautify) {
      textarea.value = css_beautify(textarea.value, options);
    } else if (type === 'js' && window.js_beautify) {
      textarea.value = js_beautify(textarea.value, options);
    }
  }
}
