import { createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Enter URL or Text</label>
                <input type="text" id="qr-input" value="https://suite.tools" class="search-input">
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">QR Code Color</label>
                <input type="color" id="qr-color" value="#6366f1" style="width: 100%; height: 40px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 0.2rem">
            </div>
            <button id="gen-qr-btn" class="btn btn-primary" style="padding: 1rem">Generate QR Code</button>
        </div>
        
        <div style="background: var(--bg-light); padding: 2.5rem; border-radius: var(--radius-lg); text-align: center" class="glass">
            <div id="qr-output" style="display: inline-block; padding: 1rem; background: white; border-radius: var(--radius-sm)"></div>
            <div style="margin-top: 1.5rem">
                <button id="dl-qr" class="btn btn-primary" style="background: transparent; border: 1px solid var(--border-light); color: var(--text-light)">
                    <i data-lucide="download" style="width: 18px"></i> Download PNG
                </button>
            </div>
        </div>
    </div>
  `;

  // Inject qrcodejs
  if (!window.QRCode) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => generate();
    document.head.appendChild(script);
  } else {
    generate();
  }

  const btn = document.getElementById('gen-qr-btn');
  btn.onclick = generate;

  document.getElementById('dl-qr').onclick = () => {
    const img = document.querySelector('#qr-output img');
    if (img) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = img.src;
      link.click();
    }
  };

  function generate() {
    const text = document.getElementById('qr-input').value;
    const color = document.getElementById('qr-color').value;
    const output = document.getElementById('qr-output');
    output.innerHTML = '';
    
    if (window.QRCode) {
      new QRCode(output, {
        text: text || "https://suite.tools",
        width: 256,
        height: 256,
        colorDark : color,
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    }
  }

  if (window.lucide) window.lucide.createIcons();
}
