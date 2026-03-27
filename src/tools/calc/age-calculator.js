export function render(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Date of Birth</label>
                <input type="date" id="age-dob" class="search-input">
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Age at Date (Optional)</label>
                <input type="date" id="age-now" class="search-input">
            </div>
            <button id="calc-age-btn" class="btn btn-primary" style="padding: 1rem">Calculate Age</button>
        </div>
        
        <div id="age-result-card" style="background: var(--bg-light); padding: 2.5rem; border-radius: var(--radius-lg); text-align: center; display: none" class="glass">
            <h4 style="color: var(--muted-light); margin-bottom: 0.5rem">You are</h4>
            <div id="age-value" style="font-size: 2.5rem; font-weight: 900; color: var(--primary)">--</div>
            <p id="age-details" style="margin-top: 1rem; color: var(--muted-light)"></p>
        </div>
    </div>
  `;

  // Set default "Age at Date" to today
  document.getElementById('age-now').valueAsDate = new Date();

  const btn = document.getElementById('calc-age-btn');
  btn.onclick = calculate;

  function calculate() {
    const dob = new Date(document.getElementById('age-dob').value);
    const now = new Date(document.getElementById('age-now').value);
    
    if (isNaN(dob.getTime())) return;
    
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const resultCard = document.getElementById('age-result-card');
    const val = document.getElementById('age-value');
    const details = document.getElementById('age-details');
    
    resultCard.style.display = 'block';
    val.textContent = `${years} Years`;
    details.innerHTML = `${months} months, ${days} days old`;
  }
}
