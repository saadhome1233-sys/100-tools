export function render(container) {
  container.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto; background: var(--card-light); padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-xl)" class="glass">
        <input type="text" id="sci-display" value="0" readonly style="width: 100%; height: 60px; font-size: 1.8rem; text-align: right; padding: 0.8rem; border: none; background: transparent; color: var(--text-light); border-bottom: 2px solid var(--border-light); margin-bottom: 1.5rem">
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem">
            <button class="btn sci-btn" data-val="sin(">sin</button>
            <button class="btn sci-btn" data-val="cos(">cos</button>
            <button class="btn sci-btn" data-val="tan(">tan</button>
            <button class="btn sci-btn" data-val="(">(</button>
            <button class="btn sci-btn" data-val=")">)</button>
            <button class="btn sci-btn" data-val="log(">log</button>
            <button class="btn sci-btn" data-val="ln(">ln</button>
            <button class="btn sci-btn" data-val="^">^</button>
            <button class="btn sci-btn" data-val="sqrt(">√</button>
            <button class="btn sci-btn" data-val="pi">π</button>
            <button class="btn sci-btn" data-val="C" style="background: var(--secondary); color: white">C</button>
            <button class="btn sci-btn" data-val="DEL" style="background: var(--bg-light); color: var(--text-light)">DEL</button>
            <button class="btn sci-btn" data-val="/">/</button>
            <button class="btn sci-btn" data-val="*">*</button>
            <button class="btn sci-btn" data-val="-">-</button>
            <button class="btn sci-btn" data-val="7">7</button>
            <button class="btn sci-btn" data-val="8">8</button>
            <button class="btn sci-btn" data-val="9">9</button>
            <button class="btn sci-btn" data-val="+">+</button>
            <button class="btn sci-btn" data-val="4">4</button>
            <button class="btn sci-btn" data-val="5">5</button>
            <button class="btn sci-btn" data-val="6">6</button>
            <button class="btn sci-btn" data-val="=" style="grid-row: span 3; background: var(--primary); color: white">=</button>
            <button class="btn sci-btn" data-val="1">1</button>
            <button class="btn sci-btn" data-val="2">2</button>
            <button class="btn sci-btn" data-val="3">3</button>
            <button class="btn sci-btn" data-val="0" style="grid-column: span 2">0</button>
            <button class="btn sci-btn" data-val=".">.</button>
        </div>
    </div>
  `;

  // Inject mathjs
  if (!window.math) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.7.0/math.js';
    document.head.appendChild(script);
  }

  const display = document.getElementById('sci-display');
  const buttons = document.querySelectorAll('.sci-btn');

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
          if (window.math) {
            const res = math.evaluate(currentExpr);
            display.value = res;
            currentExpr = String(res);
          }
        } catch {
          display.value = 'Error';
          currentExpr = '';
        }
      } else {
        currentExpr += val;
        display.value = currentExpr;
      }
    };
  });
}
