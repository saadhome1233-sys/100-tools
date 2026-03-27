export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="conv-input" accept="image/*" style="display: none">
        <button id="conv-upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="file-type" style="margin-right: 0.5rem"></i> Select Image to Convert
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Upload an image and choose the format to convert to.</p>
    </div>

    <div id="conv-details" style="display: none; text-align: center">
        <h4 id="conv-filename" style="margin-bottom: 1rem">Selected:</h4>
        <div style="margin-bottom: 2rem; display: flex; gap: 1rem; justify-content: center">
            <button class="btn conv-btn" data-type="image/jpeg">To JPG</button>
            <button class="btn conv-btn" data-type="image/png">To PNG</button>
            <button class="btn conv-btn" data-type="image/webp">To WEBP</button>
        </div>
        <p style="font-size: 0.8rem; color: var(--muted-light)">Click a format to download converted image.</p>
    </div>
  `;

  const uploadBtn = document.getElementById('conv-upload-btn');
  const fileInput = document.getElementById('conv-input');
  const detailsDiv = document.getElementById('conv-details');
  const convBtns = document.querySelectorAll('.conv-btn');

  let selectedFile = null;

  uploadBtn.onclick = () => fileInput.click();

  fileInput.onchange = (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      detailsDiv.style.display = 'block';
      document.getElementById('conv-filename').textContent = `File: ${selectedFile.name}`;
    }
  };

  convBtns.forEach(btn => {
    btn.onclick = async () => {
      if (!selectedFile) return;
      const type = btn.getAttribute('data-type');
      const ext = type.split('/')[1];

      const img = new Image();
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `converted_${selectedFile.name.split('.')[0]}.${ext}`;
            link.click();
          }, type, 0.9);
        };
      };
      reader.readAsDataURL(selectedFile);
    };
  });

  if (window.lucide) window.lucide.createIcons();
}
