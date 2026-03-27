import { createInputArea, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 2rem">
        <div class="stat-card" style="text-align: center; padding: 1rem; background: rgba(99, 102, 241, 0.05); border-radius: var(--radius-md)">
            <h4 style="color: var(--muted-light); font-size: 0.8rem">Words</h4>
            <div id="word-count" style="font-size: 1.5rem; font-weight: 800">0</div>
        </div>
        <div class="stat-card" style="text-align: center; padding: 1rem; background: rgba(99, 102, 241, 0.05); border-radius: var(--radius-md)">
            <h4 style="color: var(--muted-light); font-size: 0.8rem">Characters</h4>
            <div id="char-count" style="font-size: 1.5rem; font-weight: 800">0</div>
        </div>
        <div class="stat-card" style="text-align: center; padding: 1rem; background: rgba(99, 102, 241, 0.05); border-radius: var(--radius-md)">
            <h4 style="color: var(--muted-light); font-size: 0.8rem">Sentences</h4>
            <div id="sentence-count" style="font-size: 1.5rem; font-weight: 800">0</div>
        </div>
        <div class="stat-card" style="text-align: center; padding: 1rem; background: rgba(99, 102, 241, 0.05); border-radius: var(--radius-md)">
            <h4 style="color: var(--muted-light); font-size: 0.8rem">Reading Time</h4>
            <div id="reading-time" style="font-size: 1.5rem; font-weight: 800">0m</div>
        </div>
    </div>
  `;

  const inputArea = createInputArea('text-input', 'Enter your text to analyze:', 'Start typing here...', 10);
  container.appendChild(inputArea);

  const textarea = document.getElementById('text-input');
  textarea.oninput = (e) => updateStats(e.target.value);

  function updateStats(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const readTime = Math.ceil(words / 200);

    document.getElementById('word-count').textContent = words;
    document.getElementById('char-count').textContent = chars;
    document.getElementById('sentence-count').textContent = sentences;
    document.getElementById('reading-time').textContent = `${readTime}m`;
  }
}
