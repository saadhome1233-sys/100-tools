import { createActionButtons } from '../../utils/tool-utils.js';

export function render(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Enter Value</label>
                <input type="text" id="bc-input" value="123456789" class="search-input">
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Barcode Format</label>
                <select id="bc-format" class="search-input">
                    <option value="CODE128">CODE128</option>
                    <option value="EAN13">EAN13</option>
                    <option value="UPC">UPC</option>
                    <option value="CODE39">CODE39</option>
                </select>
            </div>
            <button id="bc-gen-btn" class="btn btn-primary" style="padding: 1rem">Generate Barcode</button>
        </div>
        
        <div style="background: white; padding: 2.5rem; border-radius: var(--radius-lg); text-align: center" class="glass">
            <svg id="bc-output"></svg>
            <div style="margin-top: 1.5rem">
                <button id="bc-dl" class="btn btn-primary" style="background: transparent; border: 1px solid var(--border-light); color: var(--text-light)">
                    <i data-lucide="download" style="width: 18px"></i> Download SVG
                </button>
            </div>
        </div>
    </div>
  `;

  // Inject JsBarcode
  if (!window.JsBarcode) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.5/JsBarcode.all.min.js';
    script.onload = () => generate();
    document.head.appendChild(script);
  } else {
    generate();
  }

  const btn = document.getElementById('bc-gen-btn');
  const input = document.getElementById('bc-input');
  const format = document.getElementById('bc-format');
  const downloadBtn = document.getElementById('bc-dl');

  btn.onclick = generate;
  
  downloadBtn.onclick = () => {
    const svg = document.getElementById('bc-output');
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `barcode_${input.value}.svg`;
    link.click();
  };

  function generate() {
    if (window.JsBarcode) {
      try {
        JsBarcode("#bc-output", input.value, {
            format: format.value,
            lineColor: "#000",
            width: 2,
            height: 100,
            displayValue: true
        });
      } catch (err) {
        alert('Invalid input for selected barcode format.');
      }
    }
  }

  if (window.lucide) window.lucide.createIcons();
}
