export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="pdf-merge-input" accept="application/pdf" multiple style="display: none">
        <button id="pdf-merge-upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="plus" style="margin-right: 0.5rem"></i> Select PDF Files
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Choose multiple PDF files to merge into one.</p>
    </div>

    <div id="pdf-list-container" style="display: none; margin-bottom: 2rem">
        <h4 style="margin-bottom: 1rem">Files to Merge:</h4>
        <div id="pdf-file-list" style="display: grid; gap: 0.5rem"></div>
        <button id="pdf-merge-btn" class="btn btn-primary" style="width: 100%; margin-top: 2rem; padding: 1rem">
            Merge PDFs
        </button>
    </div>
  `;

  // Inject pdf-lib
  if (!window.PDFLib) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
    document.head.appendChild(script);
  }

  const uploadBtn = document.getElementById('pdf-merge-upload-btn');
  const fileInput = document.getElementById('pdf-merge-input');
  const listContainer = document.getElementById('pdf-list-container');
  const fileList = document.getElementById('pdf-file-list');
  const mergeBtn = document.getElementById('pdf-merge-btn');

  let selectedFiles = [];

  uploadBtn.onclick = () => fileInput.click();

  fileInput.onchange = (e) => {
    const files = Array.from(e.target.files);
    selectedFiles = [...selectedFiles, ...files];
    updateFileList();
  };

  function updateFileList() {
    if (selectedFiles.length === 0) {
      listContainer.style.display = 'none';
      return;
    }
    listContainer.style.display = 'block';
    fileList.innerHTML = selectedFiles.map((f, i) => `
        <div class="glass" style="padding: 1rem; display: flex; justify-content: space-between; align-items: center; border-radius: var(--radius-sm)">
            <span style="font-size: 0.9rem">${f.name}</span>
            <button onclick="window.suite.removePdf(${i})" style="background: none; border: none; color: var(--secondary); cursor: pointer">
                <i data-lucide="trash-2" style="width: 18px"></i>
            </button>
        </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  window.suite.removePdf = (index) => {
    selectedFiles.splice(index, 1);
    updateFileList();
  };

  mergeBtn.onclick = async () => {
    if (selectedFiles.length < 2) {
      alert('Please select at least 2 PDF files to merge.');
      return;
    }

    mergeBtn.disabled = true;
    mergeBtn.textContent = 'Merging...';

    try {
      const { PDFDocument } = window.PDFLib;
      const mergedPdf = await PDFDocument.create();

      for (const file of selectedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      link.click();
    } catch (err) {
      alert('Error merging PDFs: ' + err.message);
    } finally {
      mergeBtn.disabled = false;
      mergeBtn.textContent = 'Merge PDFs';
    }
  };

  if (window.lucide) window.lucide.createIcons();
}
