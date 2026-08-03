(async function () {
  const app = document.getElementById('app');
  if (!app) return;

  function modelFromPath() {
    const parts = (window.location.pathname || '/').split('/').filter(Boolean);
    if (parts.length >= 2 && (parts[0] === 'bac' || parts[0] === 'b')) {
      return decodeURIComponent(parts[1] || '').trim();
    }
    return '';
  }

  const initialModel = (document.body.dataset.model || modelFromPath() || '').trim();

  function esc(text) {
    return String(text ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function nav() {
    return `
      <div class="site-nav-wrap">
        <nav class="site-nav" aria-label="Primary">
          <a href="/" class="site-nav-brand" aria-label="Motormed home">
            <img src="/logo.svg" alt="Motormed logo" />
            <span>Motormed</span>
          </a>
          <a href="/p/">Ride Replay</a>
          <a href="/r/">Lobby</a>
          <div class="site-nav-dropdown active">
            <a href="/kelly/" class="site-nav-dropdown-toggle">Controllers</a>
            <div class="site-nav-dropdown-menu" role="menu" aria-label="Controllers">
              <a href="/kelly/" role="menuitem">Kelly</a>
              <a href="/bac/" class="active" role="menuitem">BAC</a>
              <a href="/fardriver/" role="menuitem">FarDriver</a>
            </div>
          </div>
        </nav>
      </div>
    `;
  }

  function tableRows(settings) {
    return settings.map((s) => `
      <tr>
        <td>${esc(s.name)}</td>
        <td>${esc(s.address)}</td>
        <td>${esc(s.byteLength)}</td>
        <td>${esc(s.format)}</td>
      </tr>
    `).join('');
  }

  function normalizeSettings(rawSettings) {
    const list = Array.isArray(rawSettings) ? rawSettings : [];
    return list.map((entry) => ({
      address: entry.address ?? '',
      byteLength: entry.byteLength ?? '',
      format: entry.format ?? '',
      name: String(entry.name ?? '').replace(/\s+/g, ' ').trim(),
      min: entry.min ?? '',
      max: entry.max ?? '',
      description: entry.description ?? '',
    }));
  }

  function displayName(name) {
    const key = String(name || '').trim().toUpperCase();
    if (key === 'BAC_REGISTERS') return 'Registers';
    return name;
  }

  function layout(selected, chips, rowsHtml) {
    return `
      ${nav()}
      <main class="cfg-wrap">
        <header class="cfg-header">
          <h1 class="cfg-title">BAC Controller Configs</h1>
          <p class="cfg-sub">Readable view of BAC controller register data.</p>
        </header>
        <section class="cfg-layout">
          <article class="cfg-panel">
            <div class="cfg-meta">${chips}</div>
            <input id="cfgSearch" class="cfg-search" placeholder="Search name, address, format, description..." />
            <div class="cfg-table-wrap">
              <table class="cfg-table">
                <thead>
                  <tr>
                    <th class="c-name">Name</th>
                    <th class="c-address">Address</th>
                    <th class="c-bytes">Bytes</th>
                    <th class="c-format">Format</th>
                  </tr>
                </thead>
                <tbody id="cfgRows">${rowsHtml}</tbody>
              </table>
            </div>
          </article>
        </section>
      </main>
    `;
  }

  app.innerHTML = nav() + '<main class="cfg-wrap"><div class="cfg-panel cfg-empty">Loading BAC configs…</div></main>';

  try {
    const listResp = await fetch('/bac/index.json', { cache: 'no-store' });
    const listed = await listResp.json();
    const models = Array.isArray(listed)
      ? listed
          .map((entry) => String(entry || '').trim())
          .filter(Boolean)
          .map((entry) => entry.replace(/\.json$/i, ''))
      : [];

    const selected = models.includes(initialModel) ? initialModel : (models[0] || '');
    if (!selected) {
      app.innerHTML = nav() + '<main class="cfg-wrap"><div class="cfg-panel cfg-empty">No BAC model files were found.</div></main>';
      return;
    }

    const configResp = await fetch(`/bac/${encodeURIComponent(selected)}.json`, { cache: 'no-store' });
    const rawSettings = await configResp.json();
    const settings = normalizeSettings(rawSettings);
    const chips = `
      <span class="cfg-chip">Model: ${esc(displayName(selected))}</span>
      <span class="cfg-chip">Settings: ${settings.length}</span>
    `;
    app.innerHTML = layout(selected, chips, tableRows(settings));

    const rowsEl = document.getElementById('cfgRows');
    const search = document.getElementById('cfgSearch');
    if (!rowsEl || !search) return;

    search.addEventListener('input', (event) => {
      const q = String(event.target.value || '').trim().toLowerCase();
      const filtered = q
        ? settings.filter((s) => [
            s.name, s.address, s.byteLength, s.format, s.min, s.max, s.description,
          ].join(' ').toLowerCase().includes(q))
        : settings;
      rowsEl.innerHTML = tableRows(filtered);
    });
  } catch (error) {
    app.innerHTML = nav() + `<main class="cfg-wrap"><div class="cfg-panel cfg-empty">Failed to load BAC configs: ${esc(error && error.message ? error.message : error)}</div></main>`;
  }
})();
