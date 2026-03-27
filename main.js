import { tools, categories } from './src/data/tools.js';

const state = {
  recentlyUsed: JSON.parse(localStorage.getItem('recently-used') || '[]'),
  currentCategory: 'all',
  searchQuery: '',
};

// --- DOM ELEMENTS ---
const app = document.getElementById('app');
const routerContainer = document.getElementById('router-container');

function init() {
  // Apply initial theme
  document.body.classList.remove('dark');
  
  // Create Header UI
  renderHeader();
  
  // Create Footer UI
  renderFooter();
  
  // Handle Routing
  window.addEventListener('popstate', handleRouting);
  handleRouting();

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --- ROUTING LOGIC ---
function handleRouting() {
  const path = window.location.pathname;
  const toolId = path.startsWith('/tools/') ? path.split('/tools/')[1] : null;

  if (toolId) {
    renderToolPage(toolId);
  } else {
    renderHomePage();
  }
}

function navigateTo(url) {
  window.history.pushState(null, '', url);
  handleRouting();
}

// --- UI RENDERING (COMPONENTS) ---

function renderHeader() {
  let header = document.querySelector('header');
  if (!header) {
    header = document.createElement('header');
    header.className = 'glass';
    app.prepend(header);
  }
  
  header.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.8rem; cursor: pointer" id="logo-btn">
        <img src="/logo.png" alt="ToolHub Logo" style="height: 40px; border-radius: 4px">
        <div style="font-weight: 800; font-size: 1.5rem" class="gradient-text">
            <span style="font-family: 'Outfit', sans-serif">Tool</span>Hub
        </div>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center">
        <button class="btn btn-primary" onclick="window.suite.navigateTo('/')">Home</button>
    </div>
  `;

  // Logo Click
  document.getElementById('logo-btn').onclick = () => navigateTo('/');
}

function renderFooter() {
  let footer = document.querySelector('footer');
  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'glass';
    footer.style = 'margin-top: 4rem; padding: 4rem 2rem; border-top: 1px solid var(--border-light);';
    app.appendChild(footer);
  }

  footer.innerHTML = `
    <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem">
        <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem">
                <img src="/logo.png" alt="ToolHub Logo" style="height: 30px">
                <div style="font-weight: 800; font-size: 1.5rem" class="gradient-text">ToolHub</div>
            </div>
            <p style="color: var(--muted-light); font-size: 0.9rem">The ultimate all-in-one suite for modern builders. Fast, secure, and open-source.</p>
        </div>
        <div>
            <h4 style="margin-bottom: 1.5rem">Popular Tools</h4>
            <ul style="list-style: none; display: grid; gap: 0.5rem; font-size: 0.9rem; color: var(--muted-light)">
                <li><a href="#" onclick="window.suite.navigateToTool('word-counter')" style="color: inherit; text-decoration: none">Word Counter</a></li>
                <li><a href="#" onclick="window.suite.navigateToTool('json-formatter')" style="color: inherit; text-decoration: none">JSON Formatter</a></li>
                <li><a href="#" onclick="window.suite.navigateToTool('password-generator')" style="color: inherit; text-decoration: none">Password Generator</a></li>
            </ul>
        </div>
        <div>
            <h4 style="margin-bottom: 1.5rem">Support</h4>
            <ul style="list-style: none; display: grid; gap: 0.5rem; font-size: 0.9rem; color: var(--muted-light)">
                <li>API Documentation</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
            </ul>
        </div>
    </div>
    <div style="text-align: center; margin-top: 4rem; font-size: 0.8rem; color: var(--muted-light)">
        © 2026 ToolHub. Built for efficiency.
    </div>
  `;
}

function renderHomePage() {
  routerContainer.innerHTML = `
    <section class="hero" style="text-align: center; margin-bottom: 4rem">
        <h1 style="font-size: 3rem; margin-bottom: 1rem; font-family: 'Outfit', sans-serif">Everything You Need, <span class="gradient-text">In One Place.</span></h1>
        <p style="color: var(--muted-light); font-size: 1.2rem; max-width: 600px; margin: 0 auto">Access 100+ free online tools for developers, designers, and creators. No downloads, no sign-ups.</p>
    </section>

    <div class="search-container">
        <input type="text" id="search-input" placeholder="Search 100+ tools (e.g., word counter, JSON)..." class="search-input" autofocus>
        <i data-lucide="search" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); color: var(--muted-light)"></i>
    </div>

    <!-- Recently Used -->
    ${state.recentlyUsed.length > 0 ? `
    <div style="margin-bottom: 3rem">
        <h3 style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem">
            <i data-lucide="history" style="width: 24px; color: var(--primary)"></i> Recently Used
        </h3>
        <div class="tool-grid" id="recently-used-grid"></div>
    </div>
    ` : ''}

    <div style="margin-bottom: 3rem">
        <h3 style="margin-bottom: 1.5rem">Browse Categories</h3>
        <div style="display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 1rem" id="category-chips"></div>
    </div>

    <div class="tool-grid" id="main-tool-grid"></div>
  `;

  // Render Category Chips
  const categoryContainer = document.getElementById('category-chips');
  const allChip = document.createElement('div');
  allChip.className = `btn ${state.currentCategory === 'all' ? 'btn-primary' : ''}`;
  allChip.style = state.currentCategory !== 'all' ? 'border: 1px solid var(--border-light); color: var(--text-light)' : '';
  allChip.textContent = 'All Tools';
  allChip.onclick = () => updateCategory('all');
  categoryContainer.appendChild(allChip);

  categories.forEach(cat => {
    const chip = document.createElement('div');
    chip.className = `btn ${state.currentCategory === cat.id ? 'btn-primary' : ''}`;
    chip.style = state.currentCategory !== cat.id ? 'border: 1px solid var(--border-light); color: var(--text-light)' : '';
    chip.innerHTML = `<i data-lucide="${cat.icon}" style="width: 16px"></i> ${cat.name}`;
    chip.onclick = () => updateCategory(cat.id);
    categoryContainer.appendChild(chip);
  });

  // Initial Grid Render
  renderToolGrid();
  if (state.recentlyUsed.length > 0) renderRecentlyUsed();

  // Search Logic
  const searchInput = document.getElementById('search-input');
  searchInput.oninput = (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    renderToolGrid();
  };

  if (window.lucide) window.lucide.createIcons();
}

function updateCategory(catId) {
  state.currentCategory = catId;
  renderHomePage();
}

function renderToolGrid() {
  const grid = document.getElementById('main-tool-grid');
  if (!grid) return;

  const filtered = tools.filter(tool => {
    const matchCat = state.currentCategory === 'all' || tool.category === state.currentCategory;
    const matchSearch = tool.name.toLowerCase().includes(state.searchQuery) || 
                        tool.keywords.some(k => k.includes(state.searchQuery));
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map(tool => `
    <div class="card" onclick="window.suite.navigateToTool('${tool.id}')">
        <div class="card-icon"><i data-lucide="${tool.icon}"></i></div>
        <h3 style="margin-bottom: 0.5rem">${tool.name}</h3>
        <p style="font-size: 0.9rem; color: var(--muted-light)">${tool.description}</p>
        <div style="position: absolute; bottom: 15px; right: 15px; opacity: 0.3">
            <i data-lucide="arrow-right"></i>
        </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function renderRecentlyUsed() {
  const grid = document.getElementById('recently-used-grid');
  if (!grid) return;

  const recentTools = state.recentlyUsed
    .map(id => tools.find(t => t.id === id))
    .filter(Boolean);

  grid.innerHTML = recentTools.map(tool => `
    <div class="card" onclick="window.suite.navigateToTool('${tool.id}')" style="background: linear-gradient(to bottom right, var(--card-light), rgba(213, 62, 15, 0.05))">
        <div class="card-icon" style="background: var(--primary); color: white"><i data-lucide="${tool.icon}"></i></div>
        <h3>${tool.name}</h3>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

async function renderToolPage(toolId) {
  const tool = tools.find(t => t.id === toolId);
  if (!tool) {
    routerContainer.innerHTML = '<h1>Tool Not Found</h1>';
    return;
  }

  // Add to Recently Used
  addToRecentlyUsed(toolId);

  routerContainer.innerHTML = `
    <div class="tool-view">
        <div class="tool-header">
            <button onclick="window.suite.navigateTo('/')" class="btn" style="margin-bottom: 2rem; border: 1px solid var(--border-light); color: var(--text-light)">
                <i data-lucide="arrow-left" style="width: 18px"></i> Back to Home
            </button>
            <div data-lucide="${tool.icon}" style="width: 64px; height: 64px; margin: 0 auto 1.5rem; color: var(--primary)"></div>
            <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem">${tool.name}</h1>
            <p style="color: var(--muted-light); font-size: 1.1rem">${tool.description}</p>
        </div>
        <div class="tool-body" id="tool-content">
            <div class="loading-spinner" style="text-align: center; padding: 3rem">
                <i data-lucide="loader-2" class="spin" style="width: 48px; color: var(--primary)"></i>
            </div>
        </div>
        
        <div style="margin-top: 4rem; padding: 2rem; border-top: 1px solid var(--border-light)">
            <h3>About ${tool.name}</h3>
            <p style="margin-top: 1rem; color: var(--muted-light)">This tool works entirely in your browser. No data is sent to our servers, ensuring your privacy and security.</p>
        </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  // Load Tool Implementation
  loadToolImplementation(toolId);
}

function addToRecentlyUsed(id) {
  let recent = [...state.recentlyUsed];
  recent = recent.filter(tid => tid !== id);
  recent.unshift(id);
  state.recentlyUsed = recent.slice(0, 4);
  localStorage.setItem('recently-used', JSON.stringify(state.recentlyUsed));
}

async function loadToolImplementation(toolId) {
  try {
    // Dynamically import the tool module
    // We'll organize these in src/tools/[category]/[id].js
    const toolMeta = tools.find(t => t.id === toolId);
    const module = await import(`./src/tools/${toolMeta.category}/${toolId}.js`);
    const container = document.getElementById('tool-content');
    if (container && module.render) {
      container.innerHTML = ''; // Clear loading spinner
      module.render(container);
    }
  } catch (err) {
    console.error('Failed to load tool:', err);
    document.getElementById('tool-content').innerHTML = `
        <div style="text-align: center; color: var(--secondary)">
            <p>Coming Soon! We are currently building this tool.</p>
        </div>
    `;
  }
}

// Global suite object for events
window.suite = {
  navigateTo: (url) => navigateTo(url),
  navigateToTool: (id) => navigateTo(`/tools/${id}`)
};

init();
