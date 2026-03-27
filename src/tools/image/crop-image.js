export function render(container) {
  container.innerHTML = `
    <div style="text-align: center; border: 2px dashed var(--border-light); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 2rem">
        <input type="file" id="crop-input" accept="image/*" style="display: none">
        <button id="crop-upload-btn" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem">
            <i data-lucide="crop" style="margin-right: 0.5rem"></i> Select Image to Crop
        </button>
        <p style="margin-top: 1rem; color: var(--muted-light)">Upload an image and adjust the selection to crop it.</p>
    </div>

    <div id="crop-details" style="display: none; width: 100%; text-align: center">
        <div class="crop-container" style="max-height: 500px; margin-bottom: 2rem">
            <img id="crop-target-img" style="max-width: 100%">
        </div>
        <button id="crop-btn" class="btn btn-primary" style="width: 100%; padding: 1rem">
            Crop and Download
        </button>
    </div>
  `;

  // Inject cropperjs CSS and JS
  if (!window.Cropper) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css';
    document.head.appendChild(link);
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js';
    document.head.appendChild(script);
  }

  const uploadBtn = document.getElementById('crop-upload-btn');
  const fileInput = document.getElementById('crop-input');
  const detailsDiv = document.getElementById('crop-details');
  const cropBtn = document.getElementById('crop-btn');
  const targetImg = document.getElementById('crop-target-img');
  
  let cropper = null;

  uploadBtn.onclick = () => fileInput.click();

  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        targetImg.src = event.target.result;
        detailsDiv.style.display = 'block';
        if (cropper) cropper.destroy();
        cropper = new Cropper(targetImg, {
          aspectRatio: NaN,
          viewMode: 1
        });
      };
      reader.readAsDataURL(file);
    }
  };

  cropBtn.onclick = () => {
    if (!cropper) return;
    cropper.getCroppedCanvas().toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cropped_image.png';
      link.click();
    });
  };

  if (window.lucide) window.lucide.createIcons();
}
