export function render(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Weight (kg)</label>
                <input type="number" id="bmi-weight" value="70" class="search-input">
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Height (cm)</label>
                <input type="number" id="bmi-height" value="175" class="search-input">
            </div>
            <button id="calc-bmi-btn" class="btn btn-primary" style="padding: 1rem">Calculate BMI</button>
        </div>
        
        <div id="bmi-result-card" style="background: var(--bg-light); padding: 2.5rem; border-radius: var(--radius-lg); text-align: center; display: none" class="glass">
            <h4 style="color: var(--muted-light); margin-bottom: 0.5rem">Your BMI is</h4>
            <div id="bmi-value" style="font-size: 3rem; font-weight: 900; color: var(--primary)">22.9</div>
            <div id="bmi-status" style="font-weight: 700; margin-top: 1rem; padding: 0.5rem 1rem; border-radius: 99px; display: inline-block">Normal Weight</div>
            
            <p style="margin-top: 2rem; font-size: 0.85rem; color: var(--muted-light)">Healthy range: 18.5 - 24.9</p>
        </div>
    </div>
  `;

  const btn = document.getElementById('calc-bmi-btn');
  btn.onclick = calculate;

  function calculate() {
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    const height = parseFloat(document.getElementById('bmi-height').value) / 100;
    
    if (!weight || !height) return;
    
    const bmi = (weight / (height * height)).toFixed(1);
    const resultCard = document.getElementById('bmi-result-card');
    const val = document.getElementById('bmi-value');
    const status = document.getElementById('bmi-status');
    
    resultCard.style.display = 'block';
    val.textContent = bmi;
    
    if (bmi < 18.5) {
      status.textContent = 'Underweight';
      status.style = 'background: #fef3c7; color: #92400e';
    } else if (bmi < 25) {
      status.textContent = 'Normal Weight';
      status.style = 'background: #dcfce7; color: #166534';
    } else if (bmi < 30) {
      status.textContent = 'Overweight';
      status.style = 'background: #ffedd5; color: #9a3412';
    } else {
      status.textContent = 'Obese';
      status.style = 'background: #fee2e2; color: #991b1b';
    }
  }
}
