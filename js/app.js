/**
 * Sổ Xố Online – Miền Bắc / Miền Trung / Miền Nam
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeInterface();
});

function initializeInterface() {
  // Initialize day tabs
  const dayTabs = document.querySelectorAll('.day-tab');
  dayTabs.forEach((tab, index) => {
    tab.addEventListener('click', function() {
      dayTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Set today's date info
  updateDateInfo();

  // Set date inputs
  const today_formatted = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('.date-range input[type="date"]');
  if (dateInputs.length > 0) {
    dateInputs[0].value = today_formatted;
    dateInputs[1].value = today_formatted;
  }

  // Handle search button
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      alert('Chức năng tìm kiếm đang được phát triển');
    });
  }

  // Handle login button
  const loginBtn = document.querySelector('.login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Trang đăng nhập');
    });
  }
}

function updateDateInfo() {
  const today = new Date();
  const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const dayName = days[today.getDay()];
  const dateStr = `${dayName} ngày ${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  
  const dateInfo = document.querySelector('.date-info');
  if (dateInfo) {
    dateInfo.textContent = `Hôm nay: ${dateStr}`;
  }
}

const MT_SCHEDULE = {
  0: ['Khánh Hoà', 'Đà Nẵng'],        // Sunday
  1: ['Thừa Thiên Huế', 'Phú Yên'],   // Monday
  2: ['Đắk Lắk', 'Quảng Nam'],        // Tuesday
  3: ['Đà Nẵng', 'Khánh Hoà'],        // Wednesday
  4: ['Bình Định', 'Quảng Trị', 'Quảng Bình'], // Thursday
  5: ['Gia Lai', 'Ninh Thuận'],        // Friday
  6: ['Đà Nẵng', 'Quảng Ngãi', 'Đắk Nông'], // Saturday
};

const MN_SCHEDULE = {
  0: ['Tiền Giang', 'Kiên Giang', 'Đà Lạt'],           // Sunday
  1: ['TP.HCM', 'Đồng Tháp', 'Cần Thơ'],               // Monday
  2: ['Bến Tre', 'Vũng Tàu', 'Bạc Liêu'],              // Tuesday
  3: ['TP.HCM', 'Đồng Nai', 'An Giang', 'Bình Thuận'], // Wednesday
  4: ['Cần Thơ', 'Sóc Trăng', 'Tây Ninh'],             // Thursday
  5: ['TP.HCM', 'Vĩnh Long', 'Bình Dương', 'Trà Vinh'],// Friday
  6: ['TP.HCM', 'Long An', 'Bình Phước', 'Hậu Giang'], // Saturday
};

/* ─────────────────────────────────────────────
   Demo-data generator (deterministic per date)
   Produces realistic-looking 6-digit seeds →
   truncated to correct length per prize tier.
───────────────────────────────────────────── */

function hashDate(dateStr, salt = 0) {
  // Simple deterministic hash so the same date always gives the same numbers
  let h = salt * 31337;
  for (let i = 0; i < dateStr.length; i++) {
    h = Math.imul(h ^ dateStr.charCodeAt(i), 0x9e3779b9) >>> 0;
  }
  return h;
}

function rng(seed) {
  // xorshift32
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return (s >>> 0) / 0xffffffff;
  };
}

function randNum(rand, digits) {
  const max = Math.pow(10, digits);
  const n = Math.floor(rand() * max);
  return String(n).padStart(digits, '0');
}

function makeArray(rand, count, digits) {
  return Array.from({ length: count }, () => randNum(rand, digits));
}

/* ─────────────────────────────────────────────
   Generate demo data
───────────────────────────────────────────── */

function demoMB(dateStr) {
  const rand = rng(hashDate(dateStr, 1));
  return {
    region: 'mb',
    date: dateStr,
    provinces: ['Hà Nội'],
    prizes: [
      { label: 'Giải đặc biệt', numbers: makeArray(rand, 1, 6), cls: 'special' },
      { label: 'Giải nhất',     numbers: makeArray(rand, 1, 5), cls: 'first'   },
      { label: 'Giải nhì',      numbers: makeArray(rand, 2, 5), cls: 'second'  },
      { label: 'Giải ba',       numbers: makeArray(rand, 6, 5), cls: 'third'   },
      { label: 'Giải tư',       numbers: makeArray(rand, 4, 4), cls: 'fourth'  },
      { label: 'Giải năm',      numbers: makeArray(rand, 6, 4), cls: 'fifth'   },
      { label: 'Giải sáu',      numbers: makeArray(rand, 3, 3), cls: 'sixth'   },
      { label: 'Giải bảy',      numbers: makeArray(rand, 4, 2), cls: 'seventh' },
    ],
  };
}

function demoProvince(dateStr, provinceName, salt) {
  const rand = rng(hashDate(dateStr + provinceName, salt));
  return {
    name: provinceName,
    prizes: [
      { label: 'Giải tám',     numbers: makeArray(rand, 1, 2), cls: 'eighth'  },
      { label: 'Giải bảy',     numbers: makeArray(rand, 1, 3), cls: 'seventh' },
      { label: 'Giải sáu',     numbers: makeArray(rand, 3, 3), cls: 'sixth'   },
      { label: 'Giải năm',     numbers: makeArray(rand, 1, 4), cls: 'fifth'   },
      { label: 'Giải tư',      numbers: makeArray(rand, 7, 5), cls: 'fourth'  },
      { label: 'Giải ba',      numbers: makeArray(rand, 2, 5), cls: 'third'   },
      { label: 'Giải nhì',     numbers: makeArray(rand, 1, 5), cls: 'second'  },
      { label: 'Giải nhất',    numbers: makeArray(rand, 1, 5), cls: 'first'   },
      { label: 'Giải đặc biệt',numbers: makeArray(rand, 1, 6), cls: 'special' },
    ],
  };
}

function demoMT(dateStr) {
  const dow = new Date(dateStr).getDay();
  const provinces = MT_SCHEDULE[dow] || ['Khánh Hoà'];
  return {
    region: 'mt',
    date: dateStr,
    provinces: provinces.map((p, i) => demoProvince(dateStr, p, 200 + i)),
  };
}

function demoMN(dateStr) {
  const dow = new Date(dateStr).getDay();
  const provinces = MN_SCHEDULE[dow] || ['TP.HCM'];
  return {
    region: 'mn',
    date: dateStr,
    provinces: provinces.map((p, i) => demoProvince(dateStr, p, 400 + i)),
  };
}

/* ─────────────────────────────────────────────
   API fetching (xsapi.vn)
   We attempt a real fetch; on any failure we
   fall back to the demo generator.
───────────────────────────────────────────── */

const API_BASE = 'https://xsapi.vn';

async function fetchWithTimeout(url, ms = 7000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

/**
 * Normalise raw xsapi.vn MB response → our internal format
 */
function normaliseMB(raw, dateStr) {
  try {
    const d = raw.data || raw;
    return {
      region: 'mb',
      date: dateStr,
      provinces: [d.tinh || 'Hà Nội'],
      prizes: [
        { label: 'Giải đặc biệt', numbers: [d.dacbiet],         cls: 'special'  },
        { label: 'Giải nhất',     numbers: [d.nhat],            cls: 'first'    },
        { label: 'Giải nhì',      numbers: d.nhi  || [],        cls: 'second'   },
        { label: 'Giải ba',       numbers: d.ba   || [],        cls: 'third'    },
        { label: 'Giải tư',       numbers: d.bon  || [],        cls: 'fourth'   },
        { label: 'Giải năm',      numbers: d.nam  || [],        cls: 'fifth'    },
        { label: 'Giải sáu',      numbers: d.sau  || [],        cls: 'sixth'    },
        { label: 'Giải bảy',      numbers: d.bay  || [],        cls: 'seventh'  },
      ],
    };
  } catch {
    return null;
  }
}

/**
 * Normalise raw xsapi.vn MT/MN response (array of provinces)
 */
function normaliseMulti(raw, region, dateStr) {
  try {
    const arr = Array.isArray(raw.data) ? raw.data : [raw.data || raw];
    return {
      region,
      date: dateStr,
      provinces: arr.map(d => ({
        name: d.tinh || '—',
        prizes: [
          { label: 'Giải tám',      numbers: [d.tam],           cls: 'eighth'   },
          { label: 'Giải bảy',      numbers: [d.bay],           cls: 'seventh'  },
          { label: 'Giải sáu',      numbers: d.sau   || [],     cls: 'sixth'    },
          { label: 'Giải năm',      numbers: [d.nam],           cls: 'fifth'    },
          { label: 'Giải tư',       numbers: d.bon   || [],     cls: 'fourth'   },
          { label: 'Giải ba',       numbers: d.ba    || [],     cls: 'third'    },
          { label: 'Giải nhì',      numbers: [d.nhi],           cls: 'second'   },
          { label: 'Giải nhất',     numbers: [d.nhat],          cls: 'first'    },
          { label: 'Giải đặc biệt', numbers: [d.dacbiet],       cls: 'special'  },
        ],
      })),
    };
  } catch {
    return null;
  }
}

async function fetchMB(dateStr) {
  try {
    const raw = await fetchWithTimeout(`${API_BASE}/api/xsmb?date=${dateStr}`);
    const norm = normaliseMB(raw, dateStr);
    if (norm) return norm;
  } catch { /* fall through */ }
  return demoMB(dateStr);
}

async function fetchMT(dateStr) {
  try {
    const raw = await fetchWithTimeout(`${API_BASE}/api/xsmt?date=${dateStr}`);
    const norm = normaliseMulti(raw, 'mt', dateStr);
    if (norm) return norm;
  } catch { /* fall through */ }
  return demoMT(dateStr);
}

async function fetchMN(dateStr) {
  try {
    const raw = await fetchWithTimeout(`${API_BASE}/api/xsmn?date=${dateStr}`);
    const norm = normaliseMulti(raw, 'mn', dateStr);
    if (norm) return norm;
  } catch { /* fall through */ }
  return demoMN(dateStr);
}

/* ─────────────────────────────────────────────
   Rendering
───────────────────────────────────────────── */

function renderPrizeNumbers(prize) {
  const nums = (prize.numbers || []).filter(Boolean);
  if (!nums.length) return '<span class="prize-num">—</span>';
  return nums.map(n =>
    `<span class="prize-num">${n}</span>`
  ).join('');
}

function renderMBTable(data) {
  const rows = data.prizes.map(p => `
    <tr class="${p.cls}">
      <th>${p.label}</th>
      <td><div class="prize-numbers">${renderPrizeNumbers(p)}</div></td>
    </tr>`).join('');

  return `
    <div class="lottery-table-wrap">
      <table class="lottery-table">
        <caption>${data.provinces[0] || 'Hà Nội'}</caption>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function renderProvinceTable(province) {
  const rows = province.prizes.map(p => `
    <tr class="${p.cls}">
      <th>${p.label}</th>
      <td><div class="prize-numbers">${renderPrizeNumbers(p)}</div></td>
    </tr>`).join('');

  return `
    <div class="lottery-table-wrap">
      <table class="lottery-table">
        <caption>${province.name}</caption>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function renderMulti(data) {
  const cards = data.provinces.map(p => renderProvinceTable(p)).join('');
  return `<div class="province-grid">${cards}</div>`;
}

/* ─────────────────────────────────────────────
   Application state & UI logic
───────────────────────────────────────────── */

let currentRegion = 'mb';
let currentDate   = todayStr();

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function formatDateVN(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

/* Cache per region+date so switching tabs is instant */
const cache = {};

async function loadResults(dateStr, region) {
  const key = `${region}_${dateStr}`;
  if (cache[key]) return cache[key];

  let data;
  if (region === 'mb')       data = await fetchMB(dateStr);
  else if (region === 'mt')  data = await fetchMT(dateStr);
  else if (region === 'mn')  data = await fetchMN(dateStr);
  else throw new Error(`Unknown region: ${region}`);

  cache[key] = data;
  return data;
}

async function refresh() {
  setLoading(true);
  hideError();

  try {
    const data = await loadResults(currentDate, currentRegion);
    renderResults(data);
  } catch (err) {
    showError('Có lỗi xảy ra: ' + err.message);
  } finally {
    setLoading(false);
  }
}

function renderResults(data) {
  const panelId = `result-${data.region}`;
  const panel   = document.getElementById(panelId);
  if (!panel) return;

  if (data.region === 'mb') {
    panel.innerHTML = renderMBTable(data);
  } else {
    panel.innerHTML = renderMulti(data);
  }
}

function setLoading(on) {
  document.getElementById('loading').hidden = !on;
}

function showError(msg) {
  const box = document.getElementById('error-box');
  document.getElementById('error-msg').textContent = msg;
  box.hidden = false;
}

function hideError() {
  document.getElementById('error-box').hidden = true;
}

function switchPanel(region) {
  ['mb', 'mt', 'mn'].forEach(r => {
    document.getElementById(`panel-${r}`).hidden = (r !== region);
  });
}

function updateDatePicker(dateStr) {
  document.getElementById('date-picker').value = dateStr;
}

function adjustDate(delta) {
  const d = new Date(currentDate);
  d.setDate(d.getDate() + delta);
  const newDate = d.toISOString().slice(0, 10);
  if (newDate <= todayStr()) {
    currentDate = newDate;
    updateDatePicker(currentDate);
    refresh();
  }
}

/* ─────────────────────────────────────────────
   Event wiring
───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRegion = btn.dataset.region;
      switchPanel(currentRegion);
      refresh();
    });
  });

  // Date navigation
  document.getElementById('btn-prev').addEventListener('click', () => adjustDate(-1));
  document.getElementById('btn-next').addEventListener('click', () => adjustDate(+1));
  document.getElementById('btn-today').addEventListener('click', () => {
    currentDate = todayStr();
    updateDatePicker(currentDate);
    refresh();
  });

  document.getElementById('date-picker').addEventListener('change', e => {
    const picked = e.target.value;
    if (picked && picked <= todayStr()) {
      currentDate = picked;
      refresh();
    }
  });

  // Retry button
  document.getElementById('btn-retry').addEventListener('click', refresh);

  // Initial render
  updateDatePicker(currentDate);
  refresh();
});
