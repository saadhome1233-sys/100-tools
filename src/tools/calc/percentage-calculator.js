export function render(container) {
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 2rem">
        <div class="tool-body glass" style="padding: 2.5rem; border-radius: var(--radius-lg)">
            <h4 style="margin-bottom: 1.5rem">What is <input type="number" id="p1" value="20" class="search-input" style="width: 80px; display: inline-block; padding: 0.5rem"> % of <input type="number" id="p2" value="200" class="search-input" style="width: 120px; display: inline-block; padding: 0.5rem"> ?</h4>
            <div style="display: flex; gap: 1rem; align-items: center">
                <button id="calc-p1" class="btn btn-primary">Calculate</button>
                <div id="res-p1" style="font-size: 1.5rem; font-weight: 800; color: var(--primary)">40.00</div>
            </div>
        </div>
        
        <div class="tool-body glass" style="padding: 2.5rem; border-radius: var(--radius-lg)">
            <h4 style="margin-bottom: 1.5rem"><input type="number" id="v1" value="50" class="search-input" style="width: 80px; display: inline-block; padding: 0.5rem"> is what % of <input type="number" id="v2" value="200" class="search-input" style="width: 120px; display: inline-block; padding: 0.5rem"> ?</h4>
            <div style="display: flex; gap: 1rem; align-items: center">
                <button id="calc-v1" class="btn btn-primary">Calculate</button>
                <div id="res-v1" style="font-size: 1.5rem; font-weight: 800; color: var(--primary)">25.00 %</div>
            </div>
        </div>
        
        <div class="tool-body glass" style="padding: 2.5rem; border-radius: var(--radius-lg)">
            <h4 style="margin-bottom: 1.5rem">Percentage Change (from <input type="number" id="c1" value="100" class="search-input" style="width: 80px; display: inline-block; padding: 0.5rem"> to <input type="number" id="c2" value="150" class="search-input" style="width: 120px; display: inline-block; padding: 0.5rem"> )</h4>
            <div style="display: flex; gap: 1rem; align-items: center">
                <button id="calc-c1" class="btn btn-primary">Calculate Change</button>
                <div id="res-c1" style="font-size: 1.5rem; font-weight: 800; color: var(--primary)">+ 50.00 %</div>
            </div>
        </div>
    </div>
  `;

  document.getElementById('calc-p1').onclick = () => {
    const val = (parseFloat(document.getElementById('p1').value) / 100) * parseFloat(document.getElementById('p2').value);
    document.getElementById('res-p1').textContent = val.toFixed(2);
  };
  
  document.getElementById('calc-v1').onclick = () => {
    const val = (parseFloat(document.getElementById('v1').value) / parseFloat(document.getElementById('v2').value)) * 100;
    document.getElementById('res-v1').textContent = val.toFixed(2) + ' %';
  };
  
  document.getElementById('calc-c1').onclick = () => {
    const from = parseFloat(document.getElementById('c1').value);
    const to = parseFloat(document.getElementById('c2').value);
    const val = ((to - from) / from) * 100;
    document.getElementById('res-c1').textContent = (val >= 0 ? '+ ' : '') + val.toFixed(2) + ' %';
  };
}
