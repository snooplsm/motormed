(async function () {
  const app = document.getElementById('app');
  if (!app) return;

  function esc(text) {
    return String(text ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function modelFromPath() {
    const parts = (window.location.pathname || '/').split('/').filter(Boolean);
    if (parts.length >= 2 && parts[0] === 'fardriver') {
      return decodeURIComponent(parts[1] || '').trim();
    }
    return '';
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
              <a href="/kelly/" role="menuitem">Kelly</a>
              <a href="/bac/" role="menuitem">BAC</a>
              <a href="/fardriver/" class="active" role="menuitem">FarDriver</a>
            </div>
          </div>
        </nav>
      </div>
    `;
  }

  function displayName(name) {
    return String(name || '')
      .replace(/\.json$/i, '')
      .replaceAll('_', ' ')
      .trim();
  }

  function valueText(value, fallback = 'Unknown') {
    if (value === null || value === undefined || value === '') return fallback;
    if (Array.isArray(value)) return value.join(', ');
    return String(value);
  }

  function classifySettings(settings) {
    const list = Array.isArray(settings) ? settings : [];
    return list.map((entry, index) => ({
      id: entry.key || `setting_${index}`,
      group: String(entry.group || 'General').trim(),
      label: String(entry.label || entry.name || entry.key || `Setting ${index + 1}`).trim(),
      type: String(entry.type || entry.format || 'unknown').trim(),
      description: String(entry.description || '').trim(),
      byteOffset: entry.byteOffset ?? entry.address ?? null,
      byteLength: entry.byteLength ?? null,
      registerAddress: entry.registerAddress ?? null,
      packetByteOffset: entry.packetByteOffset ?? null,
      bitRange: entry.bitRange ?? '',
      scale: entry.scale ?? null,
      decode: entry.decode ?? '',
      derived: entry.derived ?? '',
      options: Array.isArray(entry.options) ? entry.options.map((o) => String(o)) : [],
      unit: entry.unit ?? '',
      offsetStatus: entry.offsetStatus || (entry.byteOffset === null || entry.byteOffset === undefined ? 'unknown' : 'known'),
    }));
  }

  function sidebarItems(files, selected) {
    return files.map((file) => {
      const key = String(file || '').replace(/\.json$/i, '');
      const active = key === selected ? ' active' : '';
      return `
        <a class="cfg-item${active}" href="/fardriver/${encodeURIComponent(key)}/">
          <div class="cfg-item-title">${esc(displayName(key))}</div>
          <div class="cfg-item-sub">${esc(file)}</div>
        </a>
      `;
    }).join('');
  }

  function groupHtml(groupName, settings) {
    const rows = settings.map((setting) => `
      <tr>
        <td class="c-label">
          <div>${esc(setting.label)}</div>
          ${setting.description ? `<div class="cfg-muted">${esc(setting.description)}</div>` : ''}
        </td>
        <td class="c-type">${esc(setting.type)}</td>
        <td class="c-offset">
          ${setting.byteOffset === null || setting.byteOffset === undefined
            ? `<span class="cfg-chip warn">Unknown</span>`
            : `<span class="cfg-code">${esc(setting.byteOffset)}</span>`}
          ${setting.byteLength ? `<div class="cfg-muted">${esc(setting.byteLength)} byte${setting.byteLength === 1 ? '' : 's'}</div>` : ''}
          ${setting.registerAddress !== null && setting.registerAddress !== undefined
            ? `<div class="cfg-muted">Reg ${esc(setting.registerAddress)}${setting.packetByteOffset !== null && setting.packetByteOffset !== undefined ? ` · Byte ${esc(setting.packetByteOffset)}` : ''}</div>`
            : ''}
          ${setting.bitRange ? `<div class="cfg-muted">Bits ${esc(setting.bitRange)}</div>` : ''}
          ${setting.scale !== null && setting.scale !== undefined ? `<div class="cfg-muted">Scale ${esc(setting.scale)}</div>` : ''}
          ${setting.decode ? `<div class="cfg-muted">${esc(setting.decode)}</div>` : ''}
          ${setting.derived ? `<div class="cfg-muted">Derived ${esc(setting.derived)}</div>` : ''}
        </td>
        <td class="c-options">
          ${setting.options.length
            ? `<div>${esc(setting.options.join(' | '))}</div>`
            : '<span class="cfg-muted">—</span>'}
        </td>
      </tr>
    `).join('');

    return `
      <section class="cfg-group">
        <div class="cfg-group-head">
          <h2 class="cfg-group-title">${esc(groupName)}</h2>
          <div class="cfg-group-count">${settings.length} setting${settings.length === 1 ? '' : 's'}</div>
        </div>
        <div class="cfg-table-wrap">
          <table class="cfg-table">
            <thead>
              <tr>
                <th class="c-label">Setting</th>
                <th class="c-type">Type</th>
                <th class="c-offset">Offset</th>
                <th class="c-options">Options</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
    `;
  }

  function layout(files, selectedKey, doc, groupedEntries) {
    const settings = groupedEntries.flatMap(([, items]) => items);
    const unknownCount = settings.filter((s) => s.offsetStatus !== 'known').length;
    const confirmedCount = settings.filter((s) => String(s.offsetStatus).startsWith('apk-confirmed')).length;
    const chips = `
      <span class="cfg-chip">Schema: ${esc(displayName(selectedKey))}</span>
      <span class="cfg-chip">Groups: ${groupedEntries.length}</span>
      <span class="cfg-chip">Settings: ${settings.length}</span>
      <span class="cfg-chip">Primary Bytes: ${esc(valueText(doc.flashLayout && doc.flashLayout.byteLength, 'Unknown'))}</span>
      ${confirmedCount ? `<span class="cfg-chip">APK Confirmed: ${confirmedCount}</span>` : ''}
      ${unknownCount ? `<span class="cfg-chip warn">Unmapped Offsets: ${unknownCount}</span>` : ''}
    `;

    const groupsHtml = groupedEntries.map(([groupName, items]) => groupHtml(groupName, items)).join('');
    const links = files.map((file) => {
      const key = String(file || '').replace(/\.json$/i, '');
      const active = key === selectedKey ? ' active' : '';
      return `
        <a class="cfg-item${active}" href="/fardriver/${encodeURIComponent(key)}/">
          <div class="cfg-item-title">${esc(displayName(key))}</div>
          <div class="cfg-item-sub">${esc(file)}</div>
        </a>
      `;
    }).join('');

    return `
      ${nav()}
      <main class="cfg-wrap">
        <header class="cfg-header">
          <h1 class="cfg-title">FarDriver Controller Docs</h1>
          <p class="cfg-sub">Structured FarDriver documentation in the same spirit as our Kelly and BAC pages. These schemas are manual-backed and ready for offset validation as we capture real config dumps.</p>
        </header>
        <section class="cfg-panel" style="margin-bottom: 14px;">
          <h3 style="margin:4px 0 10px;">Schemas (${files.length})</h3>
          <div class="cfg-model-row">${links}</div>
        </section>
        <section class="cfg-layout">
          <article class="cfg-panel">
            <h2 class="cfg-main-title">${esc(valueText(doc.name, displayName(selectedKey)))}</h2>
            <div class="cfg-meta">${chips}</div>
            <p class="cfg-blurb">${esc(valueText(doc.description, ''))}</p>
            <input id="cfgSearch" class="cfg-search" placeholder="Search group, label, type, description, options..." />
            <div id="cfgGroups" class="cfg-groups">${groupsHtml}</div>
          </article>
        </section>
      </main>
    `;
  }

  app.innerHTML = nav() + '<main class="cfg-wrap"><div class="cfg-panel cfg-empty">Loading FarDriver docs…</div></main>';

  try {
    const initialModel = (document.body.dataset.model || modelFromPath() || '').trim();
    const listResp = await fetch('/fardriver/index.json', { cache: 'no-store' });
    const files = await listResp.json();
    const listed = Array.isArray(files) ? files.filter((file) => /\.json$/i.test(String(file))) : [];
    const selected = listed
      .map((f) => String(f).replace(/\.json$/i, ''))
      .find((name) => name === initialModel) || String(listed[0] || '').replace(/\.json$/i, '');

    if (!selected) {
      app.innerHTML = nav() + '<main class="cfg-wrap"><div class="cfg-panel cfg-empty">No FarDriver docs were found.</div></main>';
      return;
    }

    const docResp = await fetch(`/fardriver/${encodeURIComponent(selected)}.json`, { cache: 'no-store' });
    const doc = await docResp.json();
    const settings = classifySettings(doc.settings);
    const grouped = Array.from(
      settings.reduce((map, setting) => {
        const list = map.get(setting.group) || [];
        list.push(setting);
        map.set(setting.group, list);
        return map;
      }, new Map()).entries()
    );

    app.innerHTML = layout(listed, selected, doc, grouped);

    const groupsEl = document.getElementById('cfgGroups');
    const search = document.getElementById('cfgSearch');
    if (!groupsEl || !search) return;

    function renderFiltered(query) {
      const q = String(query || '').trim().toLowerCase();
      const filteredGroups = grouped
        .map(([groupName, items]) => {
          const filteredItems = q
            ? items.filter((setting) => [
                groupName,
                setting.label,
                setting.type,
                setting.description,
                setting.options.join(' '),
                setting.byteOffset,
                setting.byteLength,
                setting.registerAddress,
                setting.packetByteOffset,
                setting.bitRange,
                setting.decode,
                setting.derived,
              ].join(' ').toLowerCase().includes(q))
            : items;
          return [groupName, filteredItems];
        })
        .filter(([, items]) => items.length);

      groupsEl.innerHTML = filteredGroups.length
        ? filteredGroups.map(([groupName, items]) => groupHtml(groupName, items)).join('')
        : '<div class="cfg-panel cfg-empty">No FarDriver settings matched your search.</div>';
    }

    search.addEventListener('input', (event) => {
      renderFiltered(event.target.value || '');
    });
  } catch (error) {
    app.innerHTML = nav() + `<main class="cfg-wrap"><div class="cfg-panel cfg-empty">Failed to load FarDriver docs: ${esc(error && error.message ? error.message : error)}</div></main>`;
  }
})();
