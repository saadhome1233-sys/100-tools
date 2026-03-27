import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  container.innerHTML = `
    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 2rem">
        <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Paragraphs</label>
            <input type="number" id="lorem-count" value="3" class="search-input" style="padding: 0.5rem">
        </div>
        <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Type</label>
            <select id="lorem-type" class="search-input" style="padding: 0.5rem">
                <option value="words">Words</option>
                <option value="paragraphs" selected>Paragraphs</option>
            </select>
        </div>
        <button id="lorem-gen" class="btn btn-primary" style="align-self: flex-end; padding: 0.8rem 1.5rem">Generate</button>
    </div>
  `;

  const output = createInputArea('lorem-output', 'Generated Text:', '', 10);
  container.appendChild(output);
  
  const actions = [
    { label: 'Copy to Clipboard', icon: 'copy', onClick: () => copyToClipboard(document.getElementById('lorem-output').value) }
  ];
  container.appendChild(createActionButtons(actions));
  if (window.lucide) window.lucide.createIcons();

  document.getElementById('lorem-gen').onclick = generate;

  const baseText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  function generate() {
    const count = parseInt(document.getElementById('lorem-count').value);
    const type = document.getElementById('lorem-type').value;
    const outputArea = document.getElementById('lorem-output');
    
    let result = '';
    if (type === 'paragraphs') {
      result = Array(count).fill(baseText).join('\n\n');
    } else {
      result = baseText.split(' ').slice(0, count).join(' ');
    }
    outputArea.value = result;
  }

  generate(); // Initial load
}
