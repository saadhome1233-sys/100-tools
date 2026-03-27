export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="comp-input" accept="image/*" style="display: none">
        <button id="comp-upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="shrink" style="margin-right: 0.5rem"></i> Select Image
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Upload an image to reduce its file size.</p>
    </div>

    <div id="comp-details" style="display: none; text-align: center">
        <h4 id="comp-filename" style="margin-bottom: 1rem">Selected:</h4>
        <div style="margin-bottom: 2rem">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Compression Level: <span id="comp-val">0.7</span></label>
            <input type="range" id="comp-range" min="0.1" max="0.9" step="0.1" value="0.7" style="width: 100%">
        </div>
        <button id="comp-btn" class="btn btn-primary" style="width: 100%; padding: 1rem">
            Compress and Download
        </button>
    </div>
  `;

  // Inject browser-image-compression
  if (!window.imageCompression) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js';
    document.head.appendChild(script);
  }

  const uploadBtn = document.getElementById('comp-upload-btn');
  const fileInput = document.getElementById('comp-input');
  const detailsDiv = document.getElementById('comp-details');
  const compBtn = document.getElementById('comp-btn');
  const compRange = document.getElementById('comp-range');
  const compVal = document.getElementById('comp-val');

  let selectedFile = null;

  uploadBtn.onclick = () => fileInput.click();

  compRange.oninput = (e) => {
    compVal.textContent = e.target.value;
  };

  fileInput.onchange = (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      detailsDiv.style.display = 'block';
      document.getElementById('comp-filename').textContent = `File: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(0)} KB)`;
    }
  };

  compBtn.onclick = async () => {
    if (!selectedFile) return;

    compBtn.disabled = true;
    compBtn.textContent = 'Compressing...';

    const quality = parseFloat(compRange.value);

    try {
      const options = {
        maxSizeMB: selectedFile.size / 1024 / 1024 * (quality + 0.1),
        maxWidthOrHeight: 2048,
        useWebWorker: true,
        initialQuality: quality
      };

      const compressedFile = await window.imageCompression(selectedFile, options);
      const url = URL.createObjectURL(compressedFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = `compressed_${selectedFile.name}`;
      link.click();
    } catch (err) {
      alert('Error compressing image: ' + err.message);
    } finally {
      compBtn.disabled = false;
      compBtn.textContent = 'Compress and Download';
    }
  };

  if (window.lucide) window.lucide.createIcons();
}
