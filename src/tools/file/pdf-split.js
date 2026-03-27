export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="pdf-split-input" accept="application/pdf" style="display: none">
        <button id="pdf-split-upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="scissors" style="margin-right: 0.5rem"></i> Select PDF File
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Choose a PDF file to split into individual pages.</p>
    </div>

    <div id="pdf-split-details" style="display: none; text-align: center">
        <h4 id="pdf-split-filename" style="margin-bottom: 1rem">Selected:</h4>
        <p id="pdf-split-pages" style="color: var(--muted-light); margin-bottom: 2rem"></p>
        <button id="pdf-split-btn" class="btn btn-primary" style="width: 100%; padding: 1rem">
            Split PDF and Download (ZIP)
        </button>
    </div>
  `;

  // Inject pdf-lib and jszip
  if (!window.PDFLib) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
    document.head.appendChild(script);
  }
  if (!window.JSZip) {
    const scriptZip = document.createElement('script');
    scriptZip.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    document.head.appendChild(scriptZip);
  }

  const uploadBtn = document.getElementById('pdf-split-upload-btn');
  const fileInput = document.getElementById('pdf-split-input');
  const splitDetails = document.getElementById('pdf-split-details');
  const splitBtn = document.getElementById('pdf-split-btn');

  let selectedFile = null;

  uploadBtn.onclick = () => fileInput.click();

  fileInput.onchange = async (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      splitDetails.style.display = 'block';
      document.getElementById('pdf-split-filename').textContent = `File: ${selectedFile.name}`;
      
      const { PDFDocument } = window.PDFLib;
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      document.getElementById('pdf-split-pages').textContent = `Number of Pages: ${pdf.getPageCount()}`;
    }
  };

  splitBtn.onclick = async () => {
    if (!selectedFile) return;

    splitBtn.disabled = true;
    splitBtn.textContent = 'Splitting...';

    try {
      const { PDFDocument } = window.PDFLib;
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const zip = new JSZip();

      for (let i = 0; i < pdf.getPageCount(); i++) {
        const subPdf = await PDFDocument.create();
        const [copiedPage] = await subPdf.copyPages(pdf, [i]);
        subPdf.addPage(copiedPage);
        const subPdfBytes = await subPdf.save();
        zip.file(`page_${i + 1}.pdf`, subPdfBytes);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pages_${selectedFile.name.replace('.pdf', '')}.zip`;
      link.click();
    } catch (err) {
      alert('Error splitting PDF: ' + err.message);
    } finally {
      splitBtn.disabled = false;
      splitBtn.textContent = 'Split PDF and Download (ZIP)';
    }
  };

  if (window.lucide) window.lucide.createIcons();
}
