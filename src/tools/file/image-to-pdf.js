export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="img-to-pdf-input" accept="image/*" multiple style="display: none">
        <button id="img-to-pdf-upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="image-plus" style="margin-right: 0.5rem"></i> Select Images
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Choose images to convert into a single PDF document.</p>
    </div>

    <div id="img-to-pdf-details" style="display: none; text-align: center">
        <h4 id="img-to-pdf-count" style="margin-bottom: 1rem">Files:</h4>
        <button id="img-to-pdf-btn" class="btn btn-primary" style="width: 100%; padding: 1rem">
            Convert Images to PDF
        </button>
    </div>
  `;

  // Inject jsPDF
  if (!window.jspdf) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    document.head.appendChild(script);
  }

  const uploadBtn = document.getElementById('img-to-pdf-upload-btn');
  const fileInput = document.getElementById('img-to-pdf-input');
  const detailsDiv = document.getElementById('img-to-pdf-details');
  const convertBtn = document.getElementById('img-to-pdf-btn');

  let selectedFiles = [];

  uploadBtn.onclick = () => fileInput.click();

  fileInput.onchange = (e) => {
    selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      detailsDiv.style.display = 'block';
      document.getElementById('img-to-pdf-count').textContent = `Number of Images: ${selectedFiles.length}`;
    }
  };

  convertBtn.onclick = async () => {
    if (selectedFiles.length === 0) return;

    convertBtn.disabled = true;
    convertBtn.textContent = 'Generating PDF...';

    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      for (let i = 0; i < selectedFiles.length; i++) {
        if (i > 0) doc.addPage();
        
        const file = selectedFiles[i];
        const imgData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });

        const img = new Image();
        img.src = imgData;
        await new Promise((resolve) => {
          img.onload = () => resolve();
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (pageWidth - w) / 2;
        const y = (pageHeight - h) / 2;

        doc.addImage(imgData, 'JPEG', x, y, w, h);
      }

      doc.save('converted_images.pdf');
    } catch (err) {
      alert('Error converting images to PDF: ' + err.message);
    } finally {
      convertBtn.disabled = false;
      convertBtn.textContent = 'Convert Images to PDF';
    }
  };

  if (window.lucide) window.lucide.createIcons();
}
