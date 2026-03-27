export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    // Show a feedback notification
    const feedback = document.createElement('div');
    feedback.style = `
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
      background: var(--primary); color: white; padding: 0.5rem 1.5rem;
      border-radius: 999px; z-index: 1000; transition: opacity 0.3s;
    `;
    feedback.textContent = 'Copied to Clipboard!';
    document.body.appendChild(feedback);
    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => feedback.remove(), 300);
    }, 2000);
  });
};

export const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const createInputArea = (id, label, placeholder = '', rows = 6) => {
  const container = document.createElement('div');
  container.style = 'margin-bottom: 1.5rem';
  container.innerHTML = `
    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem">${label}</label>
    <textarea id="${id}" rows="${rows}" placeholder="${placeholder}" class="search-input" style="border-radius: var(--radius-md); font-family: monospace; font-size: 0.9rem; resize: vertical"></textarea>
  `;
  return container;
};

export const createActionButtons = (actions = []) => {
  const container = document.createElement('div');
  container.style = 'display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;';
  
  actions.forEach(action => {
    const btn = document.createElement('button');
    btn.className = `btn btn-primary ${action.type === 'secondary' ? 'btn-outline' : ''}`;
    if (action.type === 'secondary') {
      btn.style = 'background: transparent; border: 1px solid var(--border-light); color: var(--text-light)';
    }
    btn.innerHTML = `<i data-lucide="${action.icon}" style="width: 18px"></i> ${action.label}`;
    btn.onclick = action.onClick;
    container.appendChild(btn);
  });
  
  return container;
};
