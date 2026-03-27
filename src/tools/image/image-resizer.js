import { createActionButtons, downloadFile } from '../../utils/tool-utils.js';

export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="image-upload" accept="image/*" style="display: none">
        <button id="upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="upload" style="margin-right: 0.5rem"></i> Choose Image
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Upload PNG, JPG, or WEBP</p>
    </div>

    <div id="image-options" style="display: none; grid-template-columns: 1fr 1fr; gap: 2rem">
        <div id="preview-container" style="background: var(--bg-light); border-radius: var(--radius-md); padding: 1rem; text-align: center">
            <img id="image-preview" style="max-width: 100%; max-height: 300px; border-radius: var(--radius-sm)">
        </div>
        <div>
            <div style="margin-bottom: 1rem">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">New Dimensions (px)</label>
                <div style="display: flex; gap: 0.5rem; align-items: center">
                    <input type="number" id="resizer-width" placeholder="Width" class="search-input" style="padding: 0.5rem">
                    <span>×</span>
                    <input type="number" id="resizer-height" placeholder="Height" class="search-input" style="padding: 0.5rem">
                </div>
            </div>
            <div style="margin-bottom: 1.5rem">
                <label><input type="checkbox" id="aspect-ratio" checked> Maintain Aspect Ratio</label>
            </div>
            <button id="resize-now" class="btn btn-primary" style="width: 100%; padding: 1rem">
                <i data-lucide="maximize" style="width: 18px"></i> Resize & Download
            </button>
        </div>
    </div>
    <canvas id="resizer-canvas" style="display: none"></canvas>
  `;

  const uploadBtn = document.getElementById('upload-btn');
  const fileInput = document.getElementById('image-upload');
  const previewImg = document.getElementById('image-preview');
  const optionsDiv = document.getElementById('image-options');
  const widthInput = document.getElementById('resizer-width');
  const heightInput = document.getElementById('resizer-height');
  const canvas = document.getElementById('resizer-canvas');
  const ctx = canvas.getContext('2d');

  let originalWidth = 0;
  let originalHeight = 0;

  uploadBtn.onclick = () => fileInput.click();

  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        originalWidth = img.width;
        originalHeight = img.height;
        widthInput.value = originalWidth;
        heightInput.value = originalHeight;
        previewImg.src = event.target.result;
        optionsDiv.style.display = 'grid';
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  widthInput.oninput = () => {
    if (document.getElementById('aspect-ratio').checked && originalWidth) {
      heightInput.value = Math.round((originalHeight / originalWidth) * widthInput.value);
    }
  };

  heightInput.oninput = () => {
    if (document.getElementById('aspect-ratio').checked && originalHeight) {
      widthInput.value = Math.round((originalWidth / originalHeight) * heightInput.value);
    }
  };

  document.getElementById('resize-now').onclick = () => {
    const img = new Image();
    img.onload = () => {
      canvas.width = widthInput.value;
      canvas.height = heightInput.value;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const resizedDataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'resized-image.png';
      link.href = resizedDataUrl;
      link.click();
    };
    img.src = previewImg.src;
  };

  if (window.lucide) window.lucide.createIcons();
}
