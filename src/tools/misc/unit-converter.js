export function render(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Category</label>
                <select id="unit-cat" class="search-input" style="padding: 0.5rem">
                    <option value="length">Length</option>
                    <option value="weight">Weight</option>
                    <option value="temp">Temperature</option>
                </select>
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">From</label>
                <input type="number" id="unit-val" value="1" class="search-input">
                <select id="unit-from" class="search-input" style="padding: 0.5rem; margin-top: 0.5rem"></select>
            </div>
            <button id="calc-unit-btn" class="btn btn-primary" style="padding: 1rem">Convert</button>
        </div>
        
        <div id="unit-result-card" style="background: var(--bg-light); padding: 2.5rem; border-radius: var(--radius-lg); text-align: center" class="glass">
            <h4 style="color: var(--muted-light); margin-bottom: 0.5rem">Equals</h4>
            <div id="unit-value" style="font-size: 2rem; font-weight: 900; color: var(--primary)">0.00</div>
            <select id="unit-to" class="search-input" style="padding: 0.5rem; margin-top: 1rem; text-align: center"></select>
        </div>
    </div>
  `;

  const units = {
    length: { mm: 1, cm: 10, m: 1000, km: 1000000, in: 25.4, ft: 304.8, yd: 914.4, mi: 1609344 },
    weight: { mg: 1, g: 1000, kg: 1000000, lb: 453592.37, oz: 28349.52 },
    temp: { c: 'Celsius', f: 'Fahrenheit', k: 'Kelvin' }
  };

  const catSelect = document.getElementById('unit-cat');
  const fromSelect = document.getElementById('unit-from');
  const toSelect = document.getElementById('unit-to');
  const valInput = document.getElementById('unit-val');
  const resVal = document.getElementById('unit-value');

  catSelect.onchange = updateUnits;
  updateUnits();

  document.getElementById('calc-unit-btn').onclick = convert;

  function updateUnits() {
    const cat = catSelect.value;
    const options = Object.keys(units[cat]);
    fromSelect.innerHTML = options.map(o => `<option value="${o}">${o.toUpperCase()}</option>`).join('');
    toSelect.innerHTML = options.map(o => `<option value="${o}">${o === options[1] ? 'selected' : ''}">${o.toUpperCase()}</option>`).join('');
    if (options[1]) toSelect.value = options[1];
    convert();
  }

  function convert() {
    const cat = catSelect.value;
    const from = fromSelect.value;
    const to = toSelect.value;
    const val = parseFloat(valInput.value);
    
    if (isNaN(val)) return;

    if (cat === 'temp') {
      let c;
      if (from === 'c') c = val;
      else if (from === 'f') c = (val - 32) * 5/9;
      else if (from === 'k') c = val - 273.15;
      
      let res;
      if (to === 'c') res = c;
      else if (to === 'f') res = c * 9/5 + 32;
      else if (to === 'k') res = c + 273.15;
      resVal.textContent = res.toFixed(2);
    } else {
      const base = val * units[cat][from];
      const res = base / units[cat][to];
      resVal.textContent = res.toFixed(4);
    }
  }
}
