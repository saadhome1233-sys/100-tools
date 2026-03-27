import { createInputArea } from '../../utils/tool-utils.js';

export function render(container) {
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem">
        <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Regex Pattern</label>
            <div style="display: flex; gap: 0.5rem; align-items: center">
                <span style="font-size: 1.2rem; color: var(--muted-light)">/</span>
                <input type="text" id="regex-pattern" value="[a-zA-Z]+" class="search-input" style="flex: 1">
                <span style="font-size: 1.2rem; color: var(--muted-light)">/</span>
                <input type="text" id="regex-flags" value="g" class="search-input" style="width: 60px">
            </div>
        </div>
        
        <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600">Test String</label>
            <textarea id="regex-text" rows="6" class="search-input" style="width: 100%">Hello World 123!</textarea>
        </div>
        
        <div id="regex-matches" style="padding: 1.5rem; background: var(--bg-light); border-radius: var(--radius-md)" class="glass">
            <h4 style="margin-bottom: 1rem">Matches:</h4>
            <div id="regex-results-list" style="display: flex; flex-wrap: wrap; gap: 0.5rem"></div>
        </div>
    </div>
  `;

  const pattern = document.getElementById('regex-pattern');
  const flags = document.getElementById('regex-flags');
  const text = document.getElementById('regex-text');
  const results = document.getElementById('regex-results-list');

  const test = () => {
    try {
      const re = new RegExp(pattern.value, flags.value);
      const str = text.value;
      const matches = str.match(re) || [];
      results.innerHTML = matches.map(m => `
        <span style="background: var(--primary); color: white; padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.9rem">${m}</span>
      `).join('') || '<span style="color: var(--muted-light)">No matches found</span>';
    } catch (err) {
      results.innerHTML = `<span style="color: var(--secondary)">Invalid Regex: ${err.message}</span>`;
    }
  };

  [pattern, flags, text].forEach(el => el.addEventListener('input', test));
  test();
}
