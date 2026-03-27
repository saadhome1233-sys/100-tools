export function render(container) {
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 2rem">
        <div class="glass" style="padding: 2.5rem; border-radius: var(--radius-lg)">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: start">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">From Time Zone</label>
                    <input type="datetime-local" id="tz-from-val" class="search-input">
                    <select id="tz-from-zone" class="search-input" style="margin-top: 0.5rem"></select>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">To Time Zone</label>
                    <div id="tz-to-val" style="font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-top: 1rem">--</div>
                    <select id="tz-to-zone" class="search-input" style="margin-top: 0.5rem"></select>
                </div>
            </div>
            <button id="tz-conv-btn" class="btn btn-primary" style="width: 100%; margin-top: 2rem; padding: 1rem">
                Convert Time Zone
            </button>
        </div>
        
        <div class="glass" style="padding: 2.5rem; border-radius: var(--radius-lg)">
            <h4>Current World Times:</h4>
            <div id="world-times" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1.5rem"></div>
        </div>
    </div>
  `;

  // Inject Luxon
  if (!window.luxon) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/luxon/3.3.0/luxon.min.js';
    script.onload = () => init();
    document.head.appendChild(script);
  } else {
    init();
  }

  function init() {
    const { DateTime } = window.luxon;
    const fromVal = document.getElementById('tz-from-val');
    const fromZone = document.getElementById('tz-from-zone');
    const toZone = document.getElementById('tz-to-zone');
    const toVal = document.getElementById('tz-to-val');
    const convBtn = document.getElementById('tz-conv-btn');
    const worldGrid = document.getElementById('world-times');

    // Simple common timezones list
    const zones = ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Dubai", "Asia/Kolkata", "Australia/Sydney"];
    
    fromZone.innerHTML = zones.map(z => `<option value="${z}">${z}</option>`).join('');
    toZone.innerHTML = zones.map(z => `<option value="${z}" ${z === 'Asia/Tokyo' ? 'selected' : ''}>${z}</option>`).join('');
    
    // Set default from time to now
    fromVal.value = DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm");

    convBtn.onclick = () => {
      const dt = DateTime.fromISO(fromVal.value, { zone: fromZone.value });
      const converted = dt.setZone(toZone.value);
      toVal.textContent = converted.toLocaleString(DateTime.DATETIME_SHORT);
    };

    const updateWorld = () => {
        worldGrid.innerHTML = zones.map(z => `
            <div style="background: var(--bg-light); padding: 1rem; border-radius: var(--radius-sm)">
                <div style="font-size: 0.8rem; color: var(--muted-light)">${z}</div>
                <div style="font-weight: 700">${DateTime.now().setZone(z).toLocaleString(DateTime.TIME_SIMPLE)}</div>
            </div>
        `).join('');
    };

    updateWorld();
    setInterval(updateWorld, 60000);
  }
}
