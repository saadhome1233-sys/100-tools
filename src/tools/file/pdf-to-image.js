export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="pdf-to-img-input" accept="application/pdf" style="display: none">
        <button id="pdf-to-img-upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="file-image" style="margin-right: 0.5rem"></i> Select PDF File
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Choose a PDF file to convert its pages into images.</p>
    </div>

    <div id="pdf-to-img-details" style="display: none; text-align: center">
        <h4 id="pdf-to-img-filename" style="margin-bottom: 1rem">Selected:</h4>
        <button id="pdf-to-img-btn" class="btn btn-primary" style="width: 100%; padding: 1rem">
            Convert Pages to Images (ZIP)
        </button>
    </div>
  `;

  // Inject pdf.js and jszip
  if (!window.pdfjsLib) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    document.head.appendChild(script);
  }
  if (!window.JSZip) {
    const scriptZip = document.createElement('script');
    scriptZip.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    document.head.appendChild(scriptZip);
  }

  const uploadBtn = document.getElementById('pdf-to-img-upload-btn');
  const fileInput = document.getElementById('pdf-to-img-input');
  const detailsDiv = document.getElementById('pdf-to-img-details');
  const convertBtn = document.getElementById('pdf-to-img-btn');

  let selectedFile = null;

  uploadBtn.onclick = () => fileInput.click();

  fileInput.onchange = (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      detailsDiv.style.display = 'block';
      document.getElementById('pdf-to-img-filename').textContent = `File: ${selectedFile.name}`;
    }
  };

  convertBtn.onclick = async () => {
    if (!selectedFile) return;

    convertBtn.disabled = true;
    convertBtn.textContent = 'Converting...';

    try {
      const pdfjsLib = window.pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      
      const zip = new JSZip();
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport: viewport }).promise;
        const imgData = canvas.toDataURL('image/png').split(',')[1];
        zip.file(`page_${i}.png`, imgData, { base64: true });
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pdf_images_${selectedFile.name.replace('.pdf', '')}.zip`;
      link.click();
    } catch (err) {
      alert('Error converting PDF to images: ' + err.message);
    } finally {
      convertBtn.disabled = false;
      convertBtn.textContent = 'Convert Pages to Images (ZIP)';
    }
  };

  if (window.lucide) window.lucide.createIcons();
}
