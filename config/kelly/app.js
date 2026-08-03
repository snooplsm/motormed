(async function () {
  const app = document.getElementById('app');
  if (!app) return;

  // Same demo flash payload used by desktop demo mode (demoRawFlash in desktop renderer).
  const DEMO_FLASH_HEX = '4b4c533732333053627a6262123456780111000101ae0000480038005a020d017c0203020332376401fb01fa01fcec145000231e00000000556e5a64323223001ed81e0050326446465a00000000000000000000004d000000000000005f1e0114501e14001450000203e83a986464411e231e0000000000000117027400021005dc001e7fff05dc001e7fff000000000000019000c800c800640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005dc001e05dc001e000000000000000000000000000000000000190f000001001e1e140000000005010501190014003200320bb8005003e80033005000ea0dac00ba14b420020040020000000000000000000000000000a800000054000057de001226ec00000fb1000013880000000000140078002802aa6e640000000000000000000001fc019a03cc0032001fc1020301050406030405020000000000000000000000000000000000000000000000000000000000000014e615e0167616da1725177017bb17ed181f1851186a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000050100000000000000000001adb1';

  const CATEGORY_MAP = {
    'Info (Read-only)': [
      'Module Name', 'User Name', 'Serial Number', 'Software Version',
      'SW Level', 'Controller Type', 'Controller Volt', 'TPS Forw MAP',
      'TPS Rev MAP', 'Exchange Phase AB', 'Resolver Start Angle',
      '0°   Hall', '60°  Hall', '120° Hall', '180° Hall', '240° Hall',
      '300° Hall', 'Forw A Rise Hall', 'Forw A Fall Hall',
      'Rev  A Rise Hall', 'Rev  A Fall Hall',
    ],
    'Braking': [
      'TPS Type', 'Motor Temp Sersor', 'Speed Sensor Type', 'Brake H-Pedel',
      'NTL H-Pedel', 'Foot Switch', 'Cruise', 'Change Dir', 'Startup H-Pedel',
      'Joystick', 'Three Gears Switch', 'Boost', 'Brake Type', 'Brake Dead Low',
      'Anti Slip Func', 'Brake SW Level',
      'Brake Dead High', 'RLS_TPS Brk Per%', 'NTL Brk Per%', 'BRK_AD Brk %#',
      'BRK_SW Brk Per%', 'Change Dir Brk%', 'Brake Time', 'Brake Release Time',
    ],
    'Throttle / Pedal': [
      'TPS Low', 'TPS High', 'TPS Dead Low', 'TPS Dead High',
      'Accel Time', 'Accel Release Time',
    ],
    'Voltage & Current': [
      'Low Volt', 'Over Volt', 'Current Percent', 'Bat Current Limit',
    ],
    'Speed & Frequency': [
      'Max Speed', 'Max Forw Speed%', 'Max Rev Speed%',
      'MidSpeed Forw Speed', 'MidSpeed Rev Speed',
      'LowSpeed Forw Speed', 'LowSpeed Rev Speed',
      'Three Speed', 'PWM frequency', 'Max Output Fre',
    ],
    'Motor': [
      'Motor Identify En', 'Motor Poles', 'Resolver Poles',
      'Motor Normal Curr',
    ],
    'Temperature': [
      'High Temp Cut℃', 'High Temp Resume', 'High Temp Str℃', 'High Temp Week%',
    ],
    'PID / Control Loops': [
      'Torque Speed Kp', 'Torque Speed Ki', 'Speed Err Limit',
      'IVT BRK Max', 'IVT BRK Min', 'Compensation Per%',
    ],
    'Hall / Resolver Signals': [
      'Line Hall Zero', 'Line Hall amplitude', 'Line Hall High Err', 'Line Hall Low Err',
    ],
  };

  const SUMMARY_FIELDS = new Set(['Module Name', 'User Name', 'Serial Number', 'Software Version']);
  const changes = {};
  let settingsByName = new Map();
  let currentSettings = [];
  let currentCategories = [];

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
          <a href="/kelly/">Kelly</a>
          <a href="/bac/">BAC</a>
        </nav>
      </div>
    `;
  }

  function normalizeHex(input) {
    if (!input) return '';
    let out = String(input).trim();
    if (out.startsWith('0x') || out.startsWith('0X')) out = out.slice(2);
    out = out.replace(/[^0-9a-fA-F]/g, '');
    if (out.length % 2 !== 0) out = out.slice(0, out.length - 1);
    return out.toLowerCase();
  }

  function hexToBytes(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      const value = Number.parseInt(hex.slice(i, i + 2), 16);
      if (!Number.isFinite(value)) break;
      bytes.push(value & 0xff);
    }
    return bytes;
  }

  function detectSchema(raw) {
    const sw = ((raw[16] & 0xff) << 8) | (raw[17] & 0xff);
    const moduleName = raw.slice(0, 8).map((b) => String.fromCharCode(b)).join('').replace(/\0/g, '');
    const name = moduleName.substring(1, 4);
    const newName = moduleName.substring(1, 3);
    const blsNames = new Set(['BLS', 'BSS']);
    const aciNames = new Set(['ACS', 'ACI']);
    const isKBLS = blsNames.has(name) || newName === 'LS';
    const isKACI = aciNames.has(name) || newName === 'PS' || newName === 'AC';
    if (!isKBLS && !isKACI) return 'KBLS0109';
    if (isKBLS) {
      if (sw >= 265) return 'KBLS0109';
      if (sw >= 262) return 'KBLS0106';
      if (sw === 261) return 'KBLS0105';
      if (sw === 260) return 'KBLS0104';
      if (sw >= 258) return 'KBLS0102';
      return 'KBLS0101';
    }
    if (sw >= 259) return 'KACI0103';
    if (sw === 258) return 'KACI0102';
    return 'KACI0101';
  }

  function hexIntFromSetting(raw, setting) {
    let value = 0;
    for (let i = setting.address; i < setting.address + setting.byteLength; i++) value = (value << 8) + (raw[i] & 0xff);
    return value >>> 0;
  }

  function readSetting(raw, setting) {
    const address = Number(setting.address) || 0;
    const byteLength = Number(setting.byteLength) || 0;
    const bitLength = Number(setting.bitLength) || 0;
    const format = String(setting.format || '');

    if (format === 'a') {
      const len = byteLength <= 1 ? 1 : bitLength + 1;
      return raw.slice(address, address + len).map((b) => String.fromCharCode(b)).join('').replace(/\0/g, '').trim();
    }
    if (format === 'h') {
      const len = byteLength <= 1 ? 1 : bitLength + 1;
      let out = '';
      for (let i = address; i < address + len; i++) out += (raw[i] & 0xff).toString(16).padStart(2, '0');
      return out;
    }
    if (byteLength === 0) return (raw[address] >> bitLength) & 1;
    if (byteLength === 1) return raw[address] & 0xff;
    if (byteLength === 2) {
      let value = 0;
      for (let i = address; i <= address + bitLength; i++) value = (value << 8) + (raw[i] & 0xff);
      return value;
    }
    return raw[address] & 0xff;
  }

  function formatValue(value, setting) {
    const opts = parseOptions(setting);
    if (opts) {
      const hit = opts.find((o) => o.value === value);
      if (hit) return hit.label;
    }
    if (setting.format === 'a') return value;
    if (setting.name === 'Software Version') return String(value);
    if (setting.format === 'h') return value;
    if (isBooleanLikeSetting(setting, opts)) return value === 1 ? 'Enabled' : 'Disabled';
    return String(value);
  }

  function parseFlash(raw, schema) {
    return schema.map((setting) => {
      const value = setting.name === 'Software Version' ? hexIntFromSetting(raw, setting) : readSetting(raw, setting);
      return { ...setting, value, displayValue: formatValue(value, setting) };
    });
  }

  function buildCategories(settings) {
    const byName = Object.fromEntries(settings.map((s) => [s.name, s]));
    const placed = new Set();
    const out = [];
    for (const [name, settingNames] of Object.entries(CATEGORY_MAP)) {
      const entries = settingNames.map((n) => byName[n]).filter(Boolean);
      if (!entries.length) continue;
      entries.forEach((s) => placed.add(s.name));
      out.push({ name, settings: entries });
    }
    const other = settings.filter((s) => !placed.has(s.name));
    if (other.length) out.push({ name: 'Other', settings: other });
    return out;
  }

  function parseOptions(setting) {
    const opts = [];
    for (const part of String(setting.description || '').split(/[,;]/)) {
      const match = part.trim().match(/^(\d+)\s*[:：]\s*(.+)$/);
      if (match) {
        opts.push({
          value: Number.parseInt(match[1], 10),
          label: match[2].trim().slice(0, 24),
        });
      }
    }
    return opts.length >= 2 ? opts : null;
  }

  function isBooleanLikeSetting(setting, opts) {
    const min = Number(setting.min);
    const max = Number(setting.max);
    if (min === 0 && max === 1) return true;
    if (!opts || opts.length !== 2) return false;
    const byVal = [...opts].sort((a, b) => a.value - b.value);
    return byVal[0].value === 0 && byVal[1].value === 1;
  }

  function isSettingEditable(setting) {
    return Number(setting.editable) === 1;
  }

  function getPillMetrics(label) {
    const len = String(label || '').trim().length;
    const weight = Math.max(1, Math.min(2.6, 0.9 + (len / 10)));
    const fontSize = Math.max(10, Math.min(14, 15 - (len * 0.22)));
    return { weight, fontSize };
  }

  function currentValue(setting) {
    const change = changes[setting.name];
    return change ? change.newValue : setting.value;
  }

  function updateChange(setting, newValue) {
    const original = setting.value;
    if (newValue === original) delete changes[setting.name];
    else changes[setting.name] = { setting, originalValue: original, newValue };
  }

  function renderHelp(message) {
    app.innerHTML = `
      ${nav()}
      <main class="kelly-config-wrap">
        <header class="kelly-config-header">
          <h1 class="kelly-config-title">Kelly Flash Config Viewer</h1>
          <p class="kelly-config-sub">Desktop-style flash read view with fake edit controls.</p>
        </header>
        <section class="kelly-panel">
          <div class="kelly-config-empty">${esc(message)}</div>
          <p class="kelly-config-help">Expected URL: <code>/config/kelly?flash=&lt;hex-bytes&gt;</code></p>
          <p class="kelly-config-help">No flash param uses built-in demo flash.</p>
        </section>
      </main>
    `;
  }

  function updateActionUi() {
    const count = Object.keys(changes).length;
    const clearBtn = document.getElementById('kelly-clear-btn');
    const reviewBtn = document.getElementById('kelly-review-btn');
    if (clearBtn) clearBtn.disabled = count === 0;
    if (reviewBtn) reviewBtn.disabled = count === 0;
  }

  function openReviewModal() {
    const modal = document.getElementById('kelly-review-modal');
    const list = document.getElementById('kelly-review-list');
    if (!modal || !list) return;
    const entries = Object.values(changes);
    list.innerHTML = entries.length
      ? entries.map((change) => `
        <div class="review-item">
          <span class="review-name">${esc(change.setting.name)}</span>
          <span class="review-change">
            <span class="review-old">${esc(formatValue(change.originalValue, change.setting))}</span>
            <span class="review-arrow">→</span>
            <span class="review-new">${esc(formatValue(change.newValue, change.setting))}</span>
          </span>
        </div>
      `).join('')
      : '<div class="review-empty">No pending changes.</div>';
    modal.classList.remove('hidden');
  }

  function closeReviewModal() {
    document.getElementById('kelly-review-modal')?.classList.add('hidden');
  }

  function renderCards() {
    const search = String(document.getElementById('kelly-search')?.value || '').trim().toLowerCase();
    const content = document.getElementById('kelly-settings-content');
    if (!content) return;

    let visible = 0;
    content.innerHTML = '';
    currentCategories.forEach((category) => {
      const filtered = category.settings.filter((setting) => {
        if (SUMMARY_FIELDS.has(setting.name)) return false;
        if (!search) return true;
        return [
          setting.name,
          setting.description,
          setting.address,
          setting.format,
          formatValue(currentValue(setting), setting),
        ].join(' ').toLowerCase().includes(search);
      });
      if (!filtered.length) return;
      visible += filtered.length;

      const section = document.createElement('section');
      section.className = 'cat-section';
      section.innerHTML = `<div class="cat-title">${esc(category.name)}</div><div class="settings-grid"></div>`;
      const grid = section.querySelector('.settings-grid');
      content.appendChild(section);

      filtered.forEach((setting) => {
        const editable = isSettingEditable(setting);
        const opts = parseOptions(setting);
        const current = currentValue(setting);
        const changed = !!changes[setting.name];
        const card = document.createElement('article');
        card.className = `card${changed ? ' changed' : ''}`;
        card.dataset.setting = setting.name;
        card.innerHTML = `
          <div class="card-head">
            <span class="card-label" title="${esc(setting.description || setting.name)}">${esc(setting.name)}</span>
          </div>
          <div class="card-body"></div>
        `;
        const body = card.querySelector('.card-body');
        if (opts) {
          body.innerHTML = `
            <div class="pill-row">
              ${opts.map((o) => `
                <button type="button" class="pill ${current === o.value ? 'active' : ''}" data-action="set" data-value="${o.value}" title="${esc(o.label)}" style="flex:${getPillMetrics(o.label).weight} 1 0%;font-size:${getPillMetrics(o.label).fontSize}px" ${editable ? '' : 'disabled'}>${esc(o.label)}</button>
              `).join('')}
            </div>
          `;
        } else if (isBooleanLikeSetting(setting, opts)) {
          body.innerHTML = `
            <button type="button" class="switch-row ${current === 1 ? 'on' : ''}" data-action="toggle" ${editable ? '' : 'disabled'} aria-label="${esc(setting.name)}">
              <span class="switch-track"><span class="switch-thumb"></span></span>
            </button>
          `;
        } else {
          if (editable && Number.isFinite(Number(setting.min)) && Number.isFinite(Number(setting.max))) {
            const min = Number(setting.min);
            const max = Number(setting.max);
            body.innerHTML = `
              <div class="slider-wrap">
                <div class="slider-top">
                  <span class="slider-val" title="${esc(String(current))}">${esc(String(current))}</span>
                  <button type="button" class="num-btn" data-action="dec">-</button>
                  <button type="button" class="num-btn" data-action="inc">+</button>
                </div>
                <input type="range" class="styled-slider" min="${min}" max="${max}" value="${current}" data-action="slide"/>
              </div>
            `;
          } else {
            body.innerHTML = `<div class="card-value" title="${esc(formatValue(current, setting))}">${esc(formatValue(current, setting))}</div>`;
          }
        }

        card.addEventListener('click', (event) => {
          const target = event.target;
          if (!(target instanceof HTMLElement) || !target.dataset.action || !editable) return;
          const action = target.dataset.action;
          let next = currentValue(setting);
          if (action === 'toggle') next = next === 1 ? 0 : 1;
          else if (action === 'set') next = Number.parseInt(target.dataset.value || '', 10);
          else if (action === 'dec') next = Math.max(Number(setting.min), Number(next) - 1);
          else if (action === 'inc') next = Math.min(Number(setting.max), Number(next) + 1);
          else if (action === 'slide' && target instanceof HTMLInputElement) next = Number.parseInt(target.value, 10);
          if (!Number.isFinite(next)) return;
          updateChange(setting, next);
          renderCards();
          updateActionUi();
        });

        const slider = card.querySelector('input.styled-slider');
        if (slider) {
          slider.addEventListener('input', (event) => {
            const t = event.target;
            if (!(t instanceof HTMLInputElement)) return;
            const valEl = card.querySelector('.slider-val');
            if (valEl) valEl.textContent = t.value;
          });
        }
        grid.appendChild(card);
      });
    });

    if (!visible && search) {
      content.innerHTML = `<section class="cat-section"><div class="cat-title">No settings match "${esc(search)}"</div></section>`;
    }
  }

  function renderPage(payload) {
    const { raw, schemaName, source, detectedSchemaName } = payload;
    currentSettings = payload.settings;
    settingsByName = new Map(currentSettings.map((s) => [s.name, s]));
    currentCategories = buildCategories(currentSettings);
    const find = (name) => settingsByName.get(name)?.displayValue ?? '—';

    app.innerHTML = `
      ${nav()}
      <main class="kelly-config-wrap kelly-settings-shell">
        <header class="kelly-config-header">
          <h1 class="kelly-config-title">Kelly Flash Config Viewer</h1>
          <p class="kelly-config-sub">Desktop-style flash read settings page (web-safe fake editing).</p>
        </header>

        <section class="flash-info">
          <div class="flash-info-row">
            <article class="flash-info-cell"><span class="flash-info-label">Module</span><span class="flash-info-value">${esc(find('Module Name'))}</span></article>
            <article class="flash-info-cell"><span class="flash-info-label">User Name</span><span class="flash-info-value">${esc(find('User Name'))}</span></article>
            <article class="flash-info-cell"><span class="flash-info-label">Serial No</span><span class="flash-info-value">${esc(find('Serial Number'))}</span></article>
            <article class="flash-info-cell"><span class="flash-info-label">SW Version</span><span class="flash-info-value">${esc(find('Software Version'))}</span></article>
          </div>
        </section>

        <section class="kelly-panel kelly-settings-toolbar">
          <div class="kelly-meta">
            <span class="kelly-chip">Schema: ${esc(schemaName)}</span>
            <span class="kelly-chip">Detected: ${esc(detectedSchemaName || 'n/a')} → Selected: ${esc(schemaName)}</span>
            <span class="kelly-chip">Bytes: ${raw.length}</span>
            <span class="kelly-chip">Settings: ${currentSettings.length}</span>
            <span class="kelly-chip">Source: ${esc(source)}</span>
          </div>
          <div class="kelly-actions-row">
            <input id="kelly-search" class="kelly-search" placeholder="Search fields" />
            <button id="kelly-clear-btn" class="btn-ghost" disabled>Clear Changes</button>
            <button id="kelly-review-btn" class="btn-primary" disabled>Review Changes</button>
          </div>
        </section>

        <div id="kelly-settings-content" class="settings-content"></div>
      </main>

      <div id="kelly-review-modal" class="modal hidden">
        <div class="modal-box">
          <h2>Review Changes</h2>
          <div id="kelly-review-list" class="review-list"></div>
          <div class="modal-footer">
            <button id="kelly-review-cancel" class="btn-ghost">Close</button>
            <button id="kelly-review-write" class="btn-danger" disabled>Write Disabled (Web)</button>
          </div>
        </div>
      </div>
    `;

    const searchEl = document.getElementById('kelly-search');
    searchEl?.addEventListener('input', renderCards);
    document.getElementById('kelly-clear-btn')?.addEventListener('click', () => {
      Object.keys(changes).forEach((key) => delete changes[key]);
      renderCards();
      updateActionUi();
    });
    document.getElementById('kelly-review-btn')?.addEventListener('click', openReviewModal);
    document.getElementById('kelly-review-cancel')?.addEventListener('click', closeReviewModal);
    document.getElementById('kelly-review-modal')?.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) closeReviewModal();
    });
    renderCards();
    updateActionUi();
  }

  app.innerHTML = `${nav()}<main class="kelly-config-wrap"><div class="kelly-panel kelly-empty">Decoding flash…</div></main>`;

  try {
    const url = new URL(window.location.href);
    const flashHexParam = normalizeHex(url.searchParams.get('flash') || '');
    const usingDemoFlash = !flashHexParam;
    const flashHex = flashHexParam || DEMO_FLASH_HEX;
    const raw = hexToBytes(flashHex);
    if (raw.length < 64) {
      renderHelp(`Flash payload is too short (${raw.length} bytes).`);
      return;
    }

    const detectedSchemaName = detectSchema(raw);
    let schemaName = detectedSchemaName;
    let schemaResponse = await fetch(`/kelly/${encodeURIComponent(schemaName)}.json`, { cache: 'no-store' });
    if (!schemaResponse.ok) {
      schemaName = 'KBLS0109';
      schemaResponse = await fetch(`/kelly/${encodeURIComponent(schemaName)}.json`, { cache: 'no-store' });
    }
    if (!schemaResponse.ok) {
      renderHelp(`Could not load schema "${detectedSchemaName}" (or fallback KBLS0109).`);
      return;
    }
    const schema = await schemaResponse.json();
    if (!Array.isArray(schema)) {
      renderHelp(`Schema "${schemaName}" is invalid.`);
      return;
    }
    const settings = parseFlash(raw, schema);

    renderPage({
      raw,
      schemaName,
      settings,
      detectedSchemaName,
      source: usingDemoFlash ? 'Demo Controller Flash' : 'URL flash param',
    });
  } catch (error) {
    renderHelp(error && error.message ? error.message : String(error));
  }
})();
