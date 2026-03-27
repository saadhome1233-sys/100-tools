export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="reducer-input" accept="application/pdf,image/*" style="display: none">
        <button id="reducer-upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="shrink" style="margin-right: 0.5rem"></i> Select File (PDF/Image)
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Upload a PDF or an Image to reduce its file size.</p>
    </div>

    <div id="reducer-details" style="display: none; text-align: center">
        <h4 id="reducer-filename" style="margin-bottom: 1rem">Selected:</h4>
        <div style="margin-bottom: 2rem">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Compression Quality: <span id="quality-val">0.7</span></label>
            <input type="range" id="quality-range" min="0.1" max="0.9" step="0.1" value="0.7" style="width: 100%">
        </div>
        <button id="reducer-btn" class="btn btn-primary" style="width: 100%; padding: 1rem">
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

  const uploadBtn = document.getElementById('reducer-upload-btn');
  const fileInput = document.getElementById('reducer-input');
  const detailsDiv = document.getElementById('reducer-details');
  const reducerBtn = document.getElementById('reducer-btn');
  const qualityRange = document.getElementById('quality-range');
  const qualityVal = document.getElementById('quality-val');

  let selectedFile = null;

  uploadBtn.onclick = () => fileInput.click();

  qualityRange.oninput = (e) => {
    qualityVal.textContent = e.target.value;
  };

  fileInput.onchange = (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      detailsDiv.style.display = 'block';
      document.getElementById('reducer-filename').textContent = `File: ${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`;
    }
  };

  reducerBtn.onclick = async () => {
    if (!selectedFile) return;

    reducerBtn.disabled = true;
    reducerBtn.textContent = 'Compressing...';

    const quality = parseFloat(qualityRange.value);

    try {
      if (selectedFile.type === 'application/pdf') {
        alert('PDF compression is coming soon in the next update. Using basic Image compression for now.');
        return;
      }
      
      const options = {
        maxSizeMB: selectedFile.size / 1024 / 1024 * quality,
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
      alert('Error compressing file: ' + err.message);
    } finally {
      reducerBtn.disabled = false;
      reducerBtn.textContent = 'Compress and Download';
    }
  };

  if (window.lucide) window.lucide.createIcons();
}
