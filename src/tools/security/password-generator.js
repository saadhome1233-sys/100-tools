import { createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  container.innerHTML = `
    <div style="background: var(--bg-light); padding: 2rem; border-radius: var(--radius-md); text-align: center; margin-bottom: 2rem" class="glass">
        <h2 id="generated-password" style="font-family: monospace; font-size: 1.8rem; word-break: break-all; margin-bottom: 1rem; color: var(--primary)">••••••••</h2>
        <div style="display: flex; gap: 0.5rem; justify-content: center">
            <button id="copy-btn" class="btn btn-primary" style="background: transparent; border: 1px solid var(--border-light); color: var(--text-light)">
                <i data-lucide="copy" style="width: 18px"></i>
            </button>
            <button id="regene-btn" class="btn btn-primary">Regenerate</button>
        </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem">
        <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Length (<span id="len-val">16</span>)</label>
            <input type="range" id="pass-len" min="4" max="50" value="16" style="width: 100%">
        </div>
        <div style="display: grid; gap: 0.5rem">
            <label><input type="checkbox" id="inc-up" checked> Uppercase (A-Z)</label>
            <label><input type="checkbox" id="inc-low" checked> Lowercase (a-z)</label>
            <label><input type="checkbox" id="inc-num" checked> Numbers (0-9)</label>
            <label><input type="checkbox" id="inc-sym" checked> Symbols (!@#$%^&*)</label>
        </div>
    </div>
  `;

  const lenInput = document.getElementById('pass-len');
  const lenVal = document.getElementById('len-val');
  lenInput.oninput = (e) => (lenVal.textContent = e.target.value);

  document.getElementById('regene-btn').onclick = generate;
  document.getElementById('copy-btn').onclick = () => copyToClipboard(document.getElementById('generated-password').textContent);

  if (window.lucide) window.lucide.createIcons();

  function generate() {
    const length = lenInput.value;
    const charset = {
      up: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      low: 'abcdefghijklmnopqrstuvwxyz',
      num: '0123456789',
      sym: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };
    
    let chars = '';
    if (document.getElementById('inc-up').checked) chars += charset.up;
    if (document.getElementById('inc-low').checked) chars += charset.low;
    if (document.getElementById('inc-num').checked) chars += charset.num;
    if (document.getElementById('inc-sym').checked) chars += charset.sym;
    
    if (!chars) return;
    
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('generated-password').textContent = password;
  }

  generate(); // Initial generation
}
