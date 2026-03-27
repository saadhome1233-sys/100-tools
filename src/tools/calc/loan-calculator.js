export function render(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Loan Amount</label>
                <input type="number" id="loan-amt" value="500000" class="search-input">
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Interest Rate (%)</label>
                <input type="number" id="loan-rate" value="8.5" class="search-input">
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Tenure (Years)</label>
                <input type="number" id="loan-years" value="10" class="search-input">
            </div>
            <button id="loan-calc-btn" class="btn btn-primary" style="padding: 1rem">Calculate EMI</button>
        </div>
        
        <div id="loan-result" style="background: var(--bg-light); padding: 2.5rem; border-radius: var(--radius-lg); text-align: center" class="glass">
            <h4 style="color: var(--muted-light); margin-bottom: 0.5rem">Monthly EMI</h4>
            <div id="loan-emi" style="font-size: 2.5rem; font-weight: 900; color: var(--primary)">6,203.20</div>
            <div style="margin-top: 2rem; display: grid; gap: 1rem; font-size: 0.9rem">
                <div>Total Interest: <span id="loan-total-int" style="font-weight: 700">2,44,384</span></div>
                <div>Total Payment: <span id="loan-total-pay" style="font-weight: 700">7,44,384</span></div>
            </div>
        </div>
    </div>
  `;

  const btn = document.getElementById('loan-calc-btn');
  btn.onclick = calculate;

  function calculate() {
    const p = parseFloat(document.getElementById('loan-amt').value);
    const r = parseFloat(document.getElementById('loan-rate').value) / (12 * 100);
    const n = parseFloat(document.getElementById('loan-years').value) * 12;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    document.getElementById('loan-emi').textContent = emi.toLocaleString(undefined, { maximumFractionDigits: 2 });
    document.getElementById('loan-total-int').textContent = totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 });
    document.getElementById('loan-total-pay').textContent = totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
}
