export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="ss-to-pdf-input" accept="image/*" style="display: none">
        <button id="ss-to-pdf-upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="image-up" style="margin-right: 0.5rem"></i> Upload Screenshot
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Choose a screenshot image to convert into a PDF page.</p>
    </div>

    <div id="ss-to-pdf-details" style="display: none; text-align: center">
        <h4 id="ss-to-pdf-filename" style="margin-bottom: 1rem">Selected:</h4>
        <button id="ss-to-pdf-btn" class="btn btn-primary" style="width: 100%; padding: 1rem">
            Generate PDF from Screenshot
        </button>
    </div>
  `;

  // Inject jsPDF
  if (!window.jspdf) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    document.head.appendChild(script);
  }

  const uploadBtn = document.getElementById('ss-to-pdf-upload-btn');
  const fileInput = document.getElementById('ss-to-pdf-input');
  const detailsDiv = document.getElementById('ss-to-pdf-details');
  const convertBtn = document.getElementById('ss-to-pdf-btn');

  let selectedFile = null;

  uploadBtn.onclick = () => fileInput.click();

  fileInput.onchange = (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      detailsDiv.style.display = 'block';
      document.getElementById('ss-to-pdf-filename').textContent = `File: ${selectedFile.name}`;
    }
  };

  convertBtn.onclick = async () => {
    if (!selectedFile) return;

    convertBtn.disabled = true;
    convertBtn.textContent = 'Generating PDF...';

    try {
      const { jsPDF } = window.jspdf;
      
      const imgData = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(selectedFile);
      });

      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => {
        img.onload = () => resolve();
      });

      // Special handling for tall screenshots
      const pageWidth = img.width > img.height ? 297 : 210;
      const pageHeight = img.width > img.height ? 210 : 297;
      const doc = new jsPDF(img.width > img.height ? 'l' : 'p', 'mm', [pageWidth, pageHeight]);

      const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      const x = (pageWidth - w) / 2;
      const y = (pageHeight - h) / 2;

      doc.addImage(imgData, 'JPEG', x, y, w, h);
      doc.save('screenshot_to_pdf.pdf');
    } catch (err) {
      alert('Error creating PDF: ' + err.message);
    } finally {
      convertBtn.disabled = false;
      convertBtn.textContent = 'Generate PDF from Screenshot';
    }
  };

  if (window.lucide) window.lucide.createIcons();
}
