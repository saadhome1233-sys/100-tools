import { createInputArea, createActionButtons, copyToClipboard } from '../../utils/tool-utils.js';

export function render(container) {
  const input = createInputArea('jwt-input', 'Enter JWT Token:', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', 6);
  container.appendChild(input);

  const actions = [
    { label: 'Decode JWT', icon: 'unlock', onClick: () => process() },
    { label: 'Clear', icon: 'trash', type: 'secondary', onClick: () => (document.getElementById('jwt-input').value = '') }
  ];

  container.appendChild(createActionButtons(actions));
  
  const headerOutput = createInputArea('jwt-header', 'Header:', '', 4);
  const payloadOutput = createInputArea('jwt-payload', 'Payload:', '', 10);
  container.appendChild(headerOutput);
  container.appendChild(payloadOutput);
  
  if (window.lucide) window.lucide.createIcons();

  function process() {
    const token = document.getElementById('jwt-input').value;
    const headerArea = document.getElementById('jwt-header');
    const payloadArea = document.getElementById('jwt-payload');
    try {
      const parts = token.split('.');
      if (parts.length < 2) throw new Error('Invalid JWT format');
      
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      headerArea.value = JSON.stringify(header, null, 2);
      payloadArea.value = JSON.stringify(payload, null, 2);
    } catch (err) {
      headerArea.value = 'Error: ' + err.message;
      payloadArea.value = 'Error: ' + err.message;
    }
  }
}
