export function render(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Pick a color</label>
                <input type="color" id="cp-picker" value="#D53E0F" style="width: 100%; height: 100px; border-radius: var(--radius-lg); border: 2px solid var(--border-light); padding: 0.2rem">
            </div>
            <div style="display: grid; gap: 1rem">
                <div>
                    <label style="font-size: 0.8rem; color: var(--muted-light)">HEX</label>
                    <input type="text" id="cp-hex" value="#D53E0F" class="search-input">
                </div>
                <div>
                    <label style="font-size: 0.8rem; color: var(--muted-light)">RGB</label>
                    <input type="text" id="cp-rgb" value="rgb(213, 62, 15)" class="search-input">
                </div>
                <div>
                    <label style="font-size: 0.8rem; color: var(--muted-light)">HSL</label>
                    <input type="text" id="cp-hsl" value="hsl(14, 87%, 45%)" class="search-input">
                </div>
            </div>
        </div>
        
        <div id="cp-preview" style="background: #D53E0F; height: 350px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 2rem; letter-spacing: 2px" class="glass">
            #D53E0F
        </div>
    </div>
  `;

  const picker = document.getElementById('cp-picker');
  const hexInput = document.getElementById('cp-hex');
  const rgbInput = document.getElementById('cp-rgb');
  const hslInput = document.getElementById('cp-hsl');
  const preview = document.getElementById('cp-preview');

  const update = (hex) => {
    picker.value = hex;
    hexInput.value = hex.toUpperCase();
    preview.style.backgroundColor = hex;
    preview.textContent = hex.toUpperCase();
    
    // Calculate contrast color for text
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    preview.style.color = (yiq >= 128) ? 'black' : 'white';
    
    rgbInput.value = `rgb(${r}, ${g}, ${b})`;
    // HSL basic calc
    let rh = r / 255, gh = g / 255, bh = b / 255;
    let max = Math.max(rh, gh, bh), min = Math.min(rh, gh, bh);
    let h, s, l = (max + min) / 2;
    if (max == min) h = s = 0;
    else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rh: h = (gh - bh) / d + (gh < bh ? 6 : 0); break;
        case gh: h = (bh - rh) / d + 2; break;
        case bh: h = (rh - gh) / d + 4; break;
      }
      h /= 6;
    }
    hslInput.value = `hsl(${(h * 360).toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`;
  };

  picker.oninput = (e) => update(e.target.value);
  hexInput.oninput = (e) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) update(e.target.value);
  };
}
