export function render(container) {
  container.innerHTML = `
    <div style="max-width: 400px; margin: 0 auto; background: var(--card-light); padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-xl)" class="glass">
        <input type="text" id="calc-display" value="0" readonly style="width: 100%; height: 80px; font-size: 2.5rem; text-align: right; padding: 1rem; border: none; background: transparent; color: var(--text-light); border-bottom: 2px solid var(--border-light); margin-bottom: 1.5rem">
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem">
            <button class="btn calc-btn" data-val="C" style="background: var(--secondary); color: white">C</button>
            <button class="btn calc-btn" data-val="DEL" style="background: var(--bg-light); color: var(--text-light)">DEL</button>
            <button class="btn calc-btn" data-val="/" style="background: var(--bg-light); color: var(--text-light)">/</button>
            <button class="btn calc-btn" data-val="*" style="background: var(--bg-light); color: var(--text-light)">*</button>
            
            <button class="btn calc-btn" data-val="7">7</button>
            <button class="btn calc-btn" data-val="8">8</button>
            <button class="btn calc-btn" data-val="9">9</button>
            <button class="btn calc-btn" data-val="-" style="background: var(--bg-light); color: var(--text-light)">-</button>
            
            <button class="btn calc-btn" data-val="4">4</button>
            <button class="btn calc-btn" data-val="5">5</button>
            <button class="btn calc-btn" data-val="6">6</button>
            <button class="btn calc-btn" data-val="+" style="background: var(--bg-light); color: var(--text-light)">+</button>
            
            <button class="btn calc-btn" data-val="1">1</button>
            <button class="btn calc-btn" data-val="2">2</button>
            <button class="btn calc-btn" data-val="3">3</button>
            <button class="btn calc-btn" data-val="=" style="grid-row: span 2; background: var(--primary); color: white">=</button>
            
            <button class="btn calc-btn" data-val="0" style="grid-column: span 2">0</button>
            <button class="btn calc-btn" data-val=".">.</button>
        </div>
    </div>
  `;

  const display = document.getElementById('calc-display');
  const buttons = document.querySelectorAll('.calc-btn');

  let currentExpr = '';

  buttons.forEach(btn => {
    btn.onclick = () => {
      const val = btn.getAttribute('data-val');
      if (val === 'C') {
        currentExpr = '';
        display.value = '0';
      } else if (val === 'DEL') {
        currentExpr = currentExpr.slice(0, -1);
        display.value = currentExpr || '0';
      } else if (val === '=') {
        try {
          // Basic Eval (safe enough for pure numbers)
          const res = eval(currentExpr.replace(/[^-()\d/*+.]/g, ''));
          display.value = Number.isFinite(res) ? res : 'Error';
          currentExpr = String(res);
        } catch {
          display.value = 'Error';
          currentExpr = '';
        }
      } else {
        if (display.value === 'Error') currentExpr = '';
        currentExpr += val;
        display.value = currentExpr;
      }
    };
  });
}
