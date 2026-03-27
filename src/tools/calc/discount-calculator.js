export function render(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Original Price</label>
                <input type="number" id="disc-price" value="1000" class="search-input">
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Discount (%)</label>
                <input type="number" id="disc-percent" value="20" class="search-input">
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Sales Tax (%) (Optional)</label>
                <input type="number" id="disc-tax" value="5" class="search-input">
            </div>
            <button id="disc-calc-btn" class="btn btn-primary" style="padding: 1rem">Calculate Discount</button>
        </div>
        
        <div id="disc-result" style="background: var(--bg-light); padding: 2.5rem; border-radius: var(--radius-lg); text-align: center" class="glass">
            <h4 style="color: var(--muted-light); margin-bottom: 0.5rem">Final Price</h4>
            <div id="disc-final" style="font-size: 2.5rem; font-weight: 900; color: var(--primary)">840.00</div>
            <div style="margin-top: 2rem; display: grid; gap: 1rem; font-size: 0.9rem">
                <div>You Save: <span id="disc-save" style="color: #10b981; font-weight: 700">200.00</span></div>
                <div>Tax Amount: <span id="disc-tax-amt" style="font-weight: 700">40.00</span></div>
            </div>
        </div>
    </div>
  `;

  const btn = document.getElementById('disc-calc-btn');
  btn.onclick = calculate;

  function calculate() {
    const price = parseFloat(document.getElementById('disc-price').value);
    const disc = parseFloat(document.getElementById('disc-percent').value);
    const tax = parseFloat(document.getElementById('disc-tax').value) || 0;

    const save = price * (disc / 100);
    const afterDisc = price - save;
    const taxAmt = afterDisc * (tax / 100);
    const final = afterDisc + taxAmt;

    document.getElementById('disc-final').textContent = final.toFixed(2);
    document.getElementById('disc-save').textContent = save.toFixed(2);
    document.getElementById('disc-tax-amt').textContent = taxAmt.toFixed(2);
  }
}
