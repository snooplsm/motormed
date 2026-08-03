(async function () {
  const app = document.getElementById('app');
  if (!app) return;
  const SPECIAL_LABELS = {
    monitor: 'Telemetry',
    error: 'Error',
    identify: 'Identify',
  };
  const SPECIAL_ORDER = ['monitor', 'error', 'identify'];
  const IDENTIFY_DESC_TRANSLATIONS = {
    '交换电机相序,保证电机相序与旋变方向一致,0禁止,1使能,其他为辨识错误状态':
      'Swap motor phase sequence to match resolver direction. 0 = disabled, 1 = enabled, other values indicate identification error state.',
    '旋转变压器初始角度,Range 0~65535':
      'Resolver initial angle. Range: 0-65535.',
    '电机电角度0°Hall值,即正转导通相为BC时的Hall值':
      'Motor electrical angle 0° Hall value (forward conduction phase BC).',
    '电机电角度60°Hall值,即正转导通相为BA时的Hall值':
      'Motor electrical angle 60° Hall value (forward conduction phase BA).',
    '电机电角度120°Hall值,即正转导通相为CA时的Hall值':
      'Motor electrical angle 120° Hall value (forward conduction phase CA).',
    '电机电角度180°Hall值,即正转导通相为CB时的Hall值':
      'Motor electrical angle 180° Hall value (forward conduction phase CB).',
    '电机电角度240°Hall值,即正转导通相为AB时的Hall值':
      'Motor electrical angle 240° Hall value (forward conduction phase AB).',
    '电机电角度300°Hall值,即正转导通相为AC时的Hall值':
      'Motor electrical angle 300° Hall value (forward conduction phase AC).',
    '前进状态HallA上升沿到来时的Hall值':
      'Hall value when Hall A rising edge occurs in forward direction.',
    '前进状态HallA下降沿到来时的Hall值':
      'Hall value when Hall A falling edge occurs in forward direction.',
    '后退状态HallA上升沿到来时的Hall值':
      'Hall value when Hall A rising edge occurs in reverse direction.',
    '后退状态HallA下降沿到来时的Hall值':
      'Hall value when Hall A falling edge occurs in reverse direction.',
  };

  function modelFromPath() {
    const parts = (window.location.pathname || '/')
      .split('/')
      .filter(Boolean);
    // Supports /kelly/{model} and /k/{model}
    if (parts.length >= 2 && (parts[0] === 'kelly' || parts[0] === 'k')) {
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
            <a href="/kelly/" class="site-nav-dropdown-toggle active">Controllers</a>
            <div class="site-nav-dropdown-menu" role="menu" aria-label="Controllers">
              <a href="/kelly/" class="active" role="menuitem">Kelly</a>
              <a href="/bac/" role="menuitem">BAC</a>
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
        <td>${esc(s.bitLength)}</td>
        <td>${esc(s.format)}</td>
        <td>${esc(s.min)}</td>
        <td>${esc(s.max)}</td>
        <td>${Number(s.editable) === 1 ? 'Yes' : 'No'}</td>
        <td>${Number(s.important) === 1 ? 'Yes' : 'No'}</td>
        <td class="kelly-muted">${esc(s.description)}</td>
      </tr>
    `).join('');
  }

  function normalizeSettings(modelName, rawSettings) {
    const modelKey = String(modelName || '').trim().toLowerCase();
    const list = Array.isArray(rawSettings) ? rawSettings : [];
    if (modelKey === 'error') {
      return list.map((entry) => {
        const code = Number(entry.code);
        const bit = Number.isFinite(code) ? code : -1;
        return {
          name: entry.message ?? `Error ${bit}`,
          address: bit,
          byteLength: 1,
          bitLength: bit,
          format: 'bit',
          min: 0,
          max: 1,
          editable: 0,
          important: 1,
          description: `Error flag bit ${bit}`,
        };
      });
    }

    return list.map((entry) => {
      const descriptionRaw = String(entry.description ?? '');
      const translatedDescription =
        modelKey === 'identify' && IDENTIFY_DESC_TRANSLATIONS[descriptionRaw]
          ? IDENTIFY_DESC_TRANSLATIONS[descriptionRaw]
          : descriptionRaw;
      return {
        address: entry.address ?? '',
        byteLength: entry.byteLength ?? '',
        bitLength: entry.bitLength ?? '',
        format: entry.format ?? '',
        name: String(entry.name ?? '').replace(/\s+/g, ' ').trim(),
        min: entry.min ?? '',
        max: entry.max ?? '',
        editable: entry.editable ?? 0,
        important: entry.important ?? 0,
        description: translatedDescription,
      };
    });
  }

  function layout(models, selected, chips, rowsHtml) {
    const links = models.map((name) => `
      <a class="kelly-item ${name === selected ? 'active' : ''}" href="/kelly/${encodeURIComponent(name)}/">${esc(displayName(name))}</a>
    `).join('');

    return `
      ${nav()}
      <main class="kelly-wrap">
        <header class="kelly-header">
          <h1 class="kelly-title">Kelly Controller Configs</h1>
          <p class="kelly-sub">Readable view of all Kelly controller profile..</p>
        </header>
        <section class="kelly-panel" style="margin-bottom: 14px;">
          <h3 style="margin:4px 0 10px;">Models (${models.length})</h3>
          <div class="kelly-model-row">${links}</div>
        </section>
        <section class="kelly-layout">
          <article class="kelly-panel">
            <div class="kelly-meta">${chips}</div>
            <input id="kellySearch" class="kelly-search" placeholder="Search setting name, address, format, description..." />
            <div class="kelly-table-wrap">
              <table class="kelly-table">
                <thead>
                  <tr>
                    <th class="c-name">Name</th>
                    <th class="c-address">Address</th>
                    <th class="c-bytes">Bytes</th>
                    <th class="c-bit">Bit</th>
                    <th class="c-format">Format</th>
                    <th class="c-min">Min</th>
                    <th class="c-max">Max</th>
                    <th class="c-editable">Editable</th>
                    <th class="c-important">Important</th>
                    <th class="c-desc">Description</th>
                  </tr>
                </thead>
                <tbody id="kellyRows">${rowsHtml}</tbody>
              </table>
            </div>
          </article>
        </section>
      </main>
    `;
  }

  app.innerHTML = nav() + '<main class="kelly-wrap"><div class="kelly-panel kelly-empty">Loading Kelly configs…</div></main>';

  try {
    const listResp = await fetch('/kelly/index.json', { cache: 'no-store' });
    const listed = await listResp.json();
    const parsed = Array.isArray(listed)
      ? listed
          .map((entry) => String(entry || '').trim())
          .filter(Boolean)
          .map((entry) => entry.replace(/\.json$/i, ''))
      : [];
    const unique = Array.from(new Set(parsed));
    const specials = SPECIAL_ORDER
      .map((special) => unique.find((name) => name.toLowerCase() === special))
      .filter(Boolean);
    const models = [
      ...unique
        .filter((name) => !SPECIAL_ORDER.includes(name.toLowerCase()))
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true })),
      ...specials,
    ];
    const selected = models.includes(initialModel) ? initialModel : (models[0] || '');
    if (!selected) {
      app.innerHTML = nav() + '<main class="kelly-wrap"><div class="kelly-panel kelly-empty">No Kelly model files were found.</div></main>';
      return;
    }

    const configResp = await fetch(`/kelly/${encodeURIComponent(selected)}.json`, { cache: 'no-store' });
    const rawSettings = await configResp.json();
    const settings = normalizeSettings(selected, rawSettings);
    const editable = settings.filter((s) => Number(s.editable) === 1).length;
    const chips = `
      <span class="kelly-chip">Model: ${esc(displayName(selected))}</span>
      <span class="kelly-chip">Settings: ${settings.length}</span>
      <span class="kelly-chip">Editable: ${editable}</span>
    `;
    app.innerHTML = layout(models, selected, chips, tableRows(settings));

    const rowsEl = document.getElementById('kellyRows');
    const search = document.getElementById('kellySearch');
    if (!rowsEl || !search) return;

    search.addEventListener('input', (event) => {
      const q = String(event.target.value || '').trim().toLowerCase();
      const filtered = q
        ? settings.filter((s) => [
            s.name, s.address, s.byteLength, s.bitLength, s.format, s.min, s.max, s.description
          ].join(' ').toLowerCase().includes(q))
        : settings;
      rowsEl.innerHTML = tableRows(filtered);
    });
  } catch (error) {
    app.innerHTML = nav() + `<main class="kelly-wrap"><div class="kelly-panel kelly-empty">Failed to load Kelly configs: ${esc(error && error.message ? error.message : error)}</div></main>`;
  }

  function displayName(name) {
    const key = String(name || '').trim().toLowerCase();
    return SPECIAL_LABELS[key] || name;
  }
})();
