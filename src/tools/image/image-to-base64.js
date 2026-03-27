import { createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="b64-upload" accept="image/*" style="display: none">
        <button id="b64-upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="upload" style="margin-right: 0.5rem"></i> Choose Image
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Upload an image to convert to Base64</p>
    </div>

    <div id="b64-result" style="display: none">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Base64 Data String:</label>
        <textarea id="b64-text" rows="10" class="search-input" style="width: 100%; border-radius: var(--radius-md); font-family: monospace; font-size: 0.8rem"></textarea>
    </div>
  `;

  const uploadBtn = document.getElementById('b64-upload-btn');
  const fileInput = document.getElementById('b64-upload');
  const resultDiv = document.getElementById('b64-result');
  const textArea = document.getElementById('b64-text');

  uploadBtn.onclick = () => fileInput.click();

  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      textArea.value = event.target.result;
      resultDiv.style.display = 'block';
    };
    reader.readAsDataURL(file);
  };

  const actions = [
    { label: 'Copy to Clipboard', icon: 'copy', onClick: () => copyToClipboard(textArea.value) },
    { label: 'Clear', icon: 'trash', type: 'secondary', onClick: () => { textArea.value = ''; resultDiv.style.display = 'none'; } }
  ];
  
  const actionsContainer = document.createElement('div');
  actionsContainer.style = 'margin-top: 1.5rem';
  actionsContainer.appendChild(createActionButtons(actions));
  container.appendChild(actionsContainer);

  if (window.lucide) window.lucide.createIcons();
}
