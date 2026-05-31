/**
 * AI Game Companion — UI Orchestrator
 * Pure frontend interaction layer. No game logic, no LLM.
 * Matches Pixso reference design.
 */

// ====== UI State ======
let activeTab = '首页';
const GAME_DETAIL_PLACEHOLDER = {
  genre: '（游戏类型占位）',
  audience: '（适宜人群占位）',
  description: '（游戏背景介绍占位，可在此填写世界观、剧情梗概等内容。）',
};

let gameLibrary = [
  { id: 'ori',           title: '奥日',               coverImg: 'image/b63ab57ba457a26a735a16a3bce3e3e646c6ff80.png', playIcon: 'image/Frame_38_48.png', ...GAME_DETAIL_PLACEHOLDER },
  { id: 'raft',          title: '木筏',               coverImg: 'image/cdff539179355961e0ece21f9b1945cdebd29ec9.png', playIcon: 'image/Frame_69_79.png', ...GAME_DETAIL_PLACEHOLDER },
  { id: 'split-fiction', title: '双影奇境',           coverImg: 'image/81988ef7482731b302b5ed3e726e9a5fd2f9bf22.png', playIcon: 'image/Frame_69_214.png', ...GAME_DETAIL_PLACEHOLDER },
  { id: 'isaac',         title: '以撒的结合：重生',   coverImg: 'image/77798c7721c5d450a7939c98f648b5425fb0c2b3.png', playIcon: 'image/Frame_69_93.png', ...GAME_DETAIL_PLACEHOLDER },
  { id: 'peak',          title: 'PEAK',               coverImg: 'image/589e8864195a32d230998b9504b0b23b21a91bf2.png', playIcon: 'image/Frame_69_130.png', ...GAME_DETAIL_PLACEHOLDER },
  { id: 'hollow-knight', title: '空洞骑士：丝之歌',   coverImg: 'image/59bf66d278807805bff42b28e480ddf7e58fb673.png', playIcon: 'image/Frame_69_178.png', ...GAME_DETAIL_PLACEHOLDER },
  { id: 'lost-castle-2', title: '失落城堡2',          coverImg: 'image/dc71d8a36ea2b6691b4d8803bd6cafc73127cac5.png', playIcon: 'image/Frame_69_246.png', ...GAME_DETAIL_PLACEHOLDER },
  { id: 'super-metroid', title: '超级银河战士',       coverImg: 'image/e8d3b04df38bbb2ac5d645f152e3a070d6c0cd08.png', playIcon: 'image/Frame_69_203.png', ...GAME_DETAIL_PLACEHOLDER },
  { id: 'dark-souls',    title: '黑暗之魂\n重制版',   coverImg: 'image/f7251ea0a4ee3d107dfe9dbcb011247c116f396c.png', playIcon: 'image/Frame_69_102.png', ...GAME_DETAIL_PLACEHOLDER },
  { id: 'zelda-mm',      title: '塞尔达传说：\n梅祖拉的假面', coverImg: 'image/330f6f93456ea49896c15a9733e3e9b3652045cb.png', playIcon: 'image/Frame_69_189.png', ...GAME_DETAIL_PLACEHOLDER },
];

let selectedGameDetail = null;

// ====== Shop Data ======
let activeShopCat = '推荐';
let selectedShopItem = null;

// ====== Chat State ======
let chatHistory = [];

const shopItems = [
  { id: 's1',  cat: '推荐', name: '夏日限定皮肤',   desc: '清凉夏日主题伙伴外观',       price: 128, thumb: 'image/item1.png' },
  { id: 's2',  cat: '推荐', name: '樱花装扮',       desc: '浪漫樱花季限定装扮',         price: 98,  thumb: 'image/item1.png' },
  { id: 's3',  cat: '推荐', name: '经验加成卡',     desc: '游戏经验获取+50%，持续1小时', price: 30,  thumb: 'image/item1.png' },
  { id: 's4',  cat: '装扮', name: '暗夜骑士套装',   desc: '酷炫暗黑风格角色外观',       price: 168, thumb: 'image/item1.png' },
  { id: 's5',  cat: '装扮', name: '学院风制服',     desc: '青春校园风格角色装扮',       price: 88,  thumb: 'image/item1.png' },
  { id: 's6',  cat: '装扮', name: '赛博朋克皮肤',   desc: '未来科技感霓虹外观',         price: 198, thumb: 'image/item1.png' },
  { id: 's7',  cat: '道具', name: '双倍金币卡',     desc: '游戏中金币获取翻倍',         price: 50,  thumb: 'image/item1.png' },
  { id: 's8',  cat: '道具', name: '体力恢复剂',     desc: '立即恢复全部体力值',         price: 20,  thumb: 'image/item1.png' },
  { id: 's9',  cat: '道具', name: '稀有掉落增幅器', desc: '稀有道具掉落率+30%',          price: 60,  thumb: 'image/item1.png' },
  { id: 's10', cat: '语音', name: '傲娇语音包',     desc: '傲娇风格伙伴语音替换',       price: 68,  thumb: 'image/item1.png' },
  { id: 's11', cat: '语音', name: '温柔语音包',     desc: '温柔大姐姐风格语音替换',     price: 68,  thumb: 'image/item1.png' },
  { id: 's12', cat: '语音', name: '热血语音包',     desc: '热血少年风格语音替换',       price: 68,  thumb: 'image/item1.png' },
  { id: 's13', cat: '特效', name: '星光入场特效',   desc: '伙伴登场时星光闪烁效果',     price: 88,  thumb: 'image/item1.png' },
  { id: 's14', cat: '特效', name: '火焰拖尾特效',   desc: '移动时留下火焰轨迹',         price: 108, thumb: 'image/item1.png' },
  { id: 's15', cat: '特效', name: '彩虹粒子特效',   desc: '周身环绕彩虹色粒子',         price: 78,  thumb: 'image/item1.png' },
];

let screenPermissions = [
  {
    id: 'perm-1',
    app: 'bilibili',
    windowName: 'bilibili（应用窗口）',
    enabled: true,
    iconImg: 'image/c9a9268d8db658a39fb4b051f8a6a2bd05b500c9.png',
    deleteIcon: 'image/Frame_55_421.png',
  },
  {
    id: 'perm-2',
    app: 'bilibili',
    windowName: 'bilibili（应用窗口）',
    enabled: false,
    iconImg: 'image/c9a9268d8db658a39fb4b051f8a6a2bd05b500c9.png',
    deleteIcon: 'image/Frame_55_379.png',
  },
];

let modalState = null;
let pendingDeleteId = null;

// ====== Settings State ======
const SETTINGS_STORAGE_KEY = 'companion-ui-settings';
const FREQUENCY_LABELS = { 1: '较低', 2: '中等', 3: '较高' };

let activeSettingsSubtab = '个人资料';

let userProfile = {
  userId: '114514',
  nickname: '机宝',
  gender: '男',
  birthday: '2013-03-09',
  avatar: 'image/a2b7cecbe8f8698b401d12c33eb41788ae4faa21.png',
};

let generalSettings = {
  autoLaunch: false,
  dialogueEnabled: true,
  dialogueFrequency: 3,
  autoInterrupt: false,
  screenRecognitionEnabled: true,
};

let voiceSettings = {
  language: '中文',
  volume: 100,
};

function loadSettingsFromStorage() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.userProfile) userProfile = { ...userProfile, ...data.userProfile };
    if (data.generalSettings) generalSettings = { ...generalSettings, ...data.generalSettings };
    if (data.voiceSettings) voiceSettings = { ...voiceSettings, ...data.voiceSettings };
    if (data.activeSettingsSubtab) activeSettingsSubtab = data.activeSettingsSubtab;
  } catch (_) { /* ignore corrupt storage */ }
}

function saveSettingsToStorage() {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
      userProfile,
      generalSettings,
      voiceSettings,
      activeSettingsSubtab,
    }));
  } catch (_) { /* ignore quota errors */ }
}

function applyProfileToUI() {
  const avatarEl = document.getElementById('settings-avatar');
  const userIdEl = document.getElementById('settings-user-id');
  const nicknameEl = document.getElementById('settings-nickname');
  const birthdayEl = document.getElementById('settings-birthday');
  const companionNameEl = document.getElementById('companion-name');

  if (avatarEl) avatarEl.src = userProfile.avatar;
  if (userIdEl) userIdEl.textContent = userProfile.userId;
  if (nicknameEl) nicknameEl.value = userProfile.nickname;
  if (birthdayEl) birthdayEl.value = userProfile.birthday;
  if (companionNameEl) companionNameEl.textContent = userProfile.nickname;

  document.querySelectorAll('#settings-gender-group input[name="gender"]').forEach(input => {
    input.checked = input.value === userProfile.gender;
  });
}

function applyGeneralSettingsToUI() {
  const autoLaunch = document.getElementById('setting-auto-launch');
  const dialogueEnabled = document.getElementById('setting-dialogue-enabled');
  const dialogueFrequency = document.getElementById('setting-dialogue-frequency');
  const autoInterrupt = document.getElementById('setting-auto-interrupt');
  const screenEnabled = document.getElementById('setting-screen-enabled');

  if (autoLaunch) autoLaunch.checked = generalSettings.autoLaunch;
  if (dialogueEnabled) dialogueEnabled.checked = generalSettings.dialogueEnabled;
  if (dialogueFrequency) dialogueFrequency.value = String(generalSettings.dialogueFrequency);
  if (autoInterrupt) autoInterrupt.checked = generalSettings.autoInterrupt;
  if (screenEnabled) screenEnabled.checked = generalSettings.screenRecognitionEnabled;

  updateDialogueFrequencyUI();
}

function applyVoiceSettingsToUI() {
  const languageEl = document.getElementById('setting-voice-language');
  const volumeEl = document.getElementById('setting-voice-volume');
  const volumeText = document.getElementById('setting-volume-text');

  if (languageEl) languageEl.value = voiceSettings.language;
  if (volumeEl) volumeEl.value = String(voiceSettings.volume);
  if (volumeText) volumeText.textContent = String(voiceSettings.volume);
}

function updateDialogueFrequencyUI() {
  const enabled = document.getElementById('setting-dialogue-enabled');
  const wrap = document.getElementById('settings-frequency-wrap');
  const slider = document.getElementById('setting-dialogue-frequency');
  const text = document.getElementById('setting-frequency-text');

  const isOn = enabled?.checked ?? generalSettings.dialogueEnabled;
  if (wrap) wrap.classList.toggle('is-active', isOn);
  if (slider && text) {
    const val = Number(slider.value) || generalSettings.dialogueFrequency;
    text.textContent = FREQUENCY_LABELS[val] || '较高';
  }
}

function setSettingsSubtab(subtabName) {
  activeSettingsSubtab = subtabName;

  document.querySelectorAll('.settings-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.settings === subtabName);
  });

  document.querySelectorAll('.settings-panel').forEach(panel => {
    panel.classList.toggle('hidden', panel.id !== `settings-panel-${subtabName}`);
  });

  saveSettingsToStorage();
  Bus.emit('settings:subtab-change', subtabName);
}

function saveUserProfile() {
  const nicknameEl = document.getElementById('settings-nickname');
  const birthdayEl = document.getElementById('settings-birthday');
  const genderInput = document.querySelector('#settings-gender-group input[name="gender"]:checked');

  userProfile = {
    ...userProfile,
    nickname: nicknameEl?.value?.trim() || userProfile.nickname,
    birthday: birthdayEl?.value || userProfile.birthday,
    gender: genderInput?.value || userProfile.gender,
  };

  applyProfileToUI();
  saveSettingsToStorage();
  showToast('success', '个人资料已保存');
  Bus.emit('settings:profile-save', { ...userProfile });
}

function bindPermissionListEvents(container) {
  if (!container) return;

  container.querySelectorAll('[data-toggle]').forEach(input => {
    input.addEventListener('change', (e) => {
      e.stopPropagation();
      togglePermission(e.target.dataset.toggle, e.target.checked);
    });
  });

  container.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      pendingDeleteId = btn.dataset.delete;
      openModal('confirm-delete');
    });
  });
}

function buildPermissionListHTML() {
  return screenPermissions
    .map((perm) => `
      <li class="permission-item" data-perm-id="${perm.id}">
        <div class="permission-item-icon">
          <img src="${perm.iconImg}" alt="${perm.app}">
        </div>
        <span class="permission-item-text">${escapeHtml(perm.windowName)}</span>
        <button class="permission-btn-delete" data-delete="${perm.id}" title="删除">
          <img src="${perm.deleteIcon}" alt="删除">
        </button>
        <label class="permission-toggle">
          <input type="checkbox" ${perm.enabled ? 'checked' : ''} data-toggle="${perm.id}">
          <span class="toggle-track">
            <span class="toggle-knob"></span>
          </span>
        </label>
      </li>
    `).join('');
}

// ====== Event Bus ======
const Bus = {
  _listeners: {},
  on(event, fn) {
    (this._listeners[event] ||= []).push(fn);
    return () => this.off(event, fn);
  },
  off(event, fn) {
    const list = this._listeners[event];
    if (list) { const i = list.indexOf(fn); if (i >= 0) list.splice(i, 1); }
  },
  emit(event, payload) {
    (this._listeners[event] || []).forEach(fn => fn(payload));
  },
};

// ====== Toast ======
function showToast(type, message, duration = 2200) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toast.style.setProperty('--toast-duration', `${duration}ms`);
  container.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, duration + 300);
}

// ====== Modal ======
function openModal(name) {
  const overlay = document.getElementById('modal-overlay');
  const modals = overlay.querySelectorAll('.modal');
  modals.forEach(m => m.classList.add('hidden'));
  const target = document.getElementById(`modal-${name}`);
  if (target) target.classList.remove('hidden');
  overlay.classList.remove('hidden');
  modalState = name;
  Bus.emit('modal:open', name);
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('hidden');
  modalState = null;
  pendingDeleteId = null;
  selectedGameDetail = null;
  Bus.emit('modal:close');
}

function formatGameTitle(title) {
  return title.replace(/\n/g, ' ');
}

function populateGameDetailModal(game) {
  const titleEl = document.getElementById('game-detail-title');
  const posterEl = document.getElementById('game-detail-poster');
  const genreEl = document.getElementById('game-detail-genre');
  const audienceEl = document.getElementById('game-detail-audience');
  const descEl = document.getElementById('game-detail-desc');

  if (titleEl) titleEl.textContent = formatGameTitle(game.title);
  if (posterEl) {
    posterEl.src = game.coverImg;
    posterEl.alt = formatGameTitle(game.title);
  }
  if (genreEl) genreEl.textContent = game.genre || GAME_DETAIL_PLACEHOLDER.genre;
  if (audienceEl) audienceEl.textContent = game.audience || GAME_DETAIL_PLACEHOLDER.audience;
  if (descEl) descEl.textContent = game.description || GAME_DETAIL_PLACEHOLDER.description;
}

function openGameDetail(game) {
  selectedGameDetail = game;
  populateGameDetailModal(game);
  openModal('game-detail');
  Bus.emit('game:detail-open', game);
}

// ====== Tab Switching ======
function setActiveTab(tabName) {
  activeTab = tabName;

  // Update nav buttons
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Show/hide tab content sections
  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.toggle('hidden', section.id !== `tab-${tabName}`);
  });

  // Highlight linked panel (only on 首页)
  if (tabName === '首页') {
    document.querySelectorAll('.panel[data-linked]').forEach(panel => {
      if (panel.dataset.linked === tabName) {
        panel.classList.add('highlight');
        setTimeout(() => panel.classList.remove('highlight'), 1400);
      }
    });
  }

  Bus.emit('tab:change', tabName);
}

// ====== Companion Sub-tab Switching (伙伴 tab) ======
let activeSubtab = '模型';

function setActiveSubtab(subtabName) {
  activeSubtab = subtabName;

  document.querySelectorAll('.companion-subtab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.subtab === subtabName);
  });

  // Toggle sub-tab content panels
  document.querySelectorAll('.subtab-panel').forEach(panel => {
    panel.classList.toggle('hidden', panel.id !== `subtab-${subtabName}`);
  });

  // Hide hero image when 工坊 is active
  const hero = document.querySelector('.companion-hero');
  if (hero) {
    hero.style.display = subtabName === '工坊' ? 'none' : '';
  }

  Bus.emit('subtab:change', subtabName);
}

// ====== Permissions ======
function addPermission(app, windowName) {
  const perm = {
    id: `perm-${Date.now()}`,
    app,
    windowName: windowName || `${app}（应用窗口）`,
    enabled: false,
    iconImg: 'image/c9a9268d8db658a39fb4b051f8a6a2bd05b500c9.png',
    deleteIcon: 'image/Frame_55_379.png',
  };
  screenPermissions = [...screenPermissions, perm];
  renderPermissionList();
  showToast('success', `已添加 "${perm.windowName}" 权限`);
  Bus.emit('permission:add', perm);
}

function removePermission(id) {
  const perm = screenPermissions.find(p => p.id === id);
  screenPermissions = screenPermissions.filter(p => p.id !== id);
  renderPermissionList();
  if (perm) showToast('info', `已移除 "${perm.windowName}" 权限`);
  Bus.emit('permission:remove', id);
}

function togglePermission(id, enabled) {
  screenPermissions = screenPermissions.map(p =>
    p.id === id ? { ...p, enabled } : p
  );
  const perm = screenPermissions.find(p => p.id === id);
  if (perm) {
    showToast('info', `"${perm.windowName}" ${enabled ? '已启用' : '已禁用'}`);
  }
  Bus.emit('permission:toggle', { id, enabled });
}

// ====== Render Functions ======

// 首页 tab: horizontal scroll of recent games
function renderRecentGames() {
  const container = document.getElementById('games-scroll');
  if (!container) return;

  const recent = gameLibrary.slice(0, 5);

  container.innerHTML = recent
    .map((game) => `
      <div class="game-card" data-game-id="${game.id}" title="${escapeHtml(game.title.replace(/\n/g, ' '))}">
        <div class="game-card-inner" style="background-image:url('${game.coverImg}')">
          <div class="game-card-stroke"></div>
          <div class="game-card-overlay">
            <div class="game-card-name">${escapeHtml(game.title.replace(/\n/g, ' '))}</div>
          </div>
        </div>
      </div>
    `).join('');

  container.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
      const game = gameLibrary.find(g => g.id === card.dataset.gameId);
      if (game) {
        Bus.emit('game:select', game);
        showToast('info', `选中 "${game.title.replace(/\n/g, ' ')}"`);
      }
    });
  });
}

// 游戏 tab: full grid of all game cards
function renderGameGrid() {
  const container = document.getElementById('game-grid');
  if (!container) return;

  container.innerHTML = gameLibrary
    .map((game) => {
      const lines = game.title.split('\n');
      const titleHtml = lines.map(l => `<span>${escapeHtml(l)}</span>`).join('<br>');
      return `
      <div class="game-card" data-game-id="${game.id}" title="${escapeHtml(game.title.replace(/\n/g, ' '))}">
        <div class="game-card-cover" style="background-image:url('${game.coverImg}')">
          <div class="game-card-stroke"></div>
          <div class="game-card-title">${titleHtml}</div>
        </div>
        <div class="game-card-launch" data-launch="${game.id}">
          <span>启动</span>
          <img src="${game.playIcon}" alt="">
        </div>
      </div>
    `}).join('');

  // Bind card clicks → game detail modal
  container.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.game-card-launch')) return;
      const game = gameLibrary.find(g => g.id === card.dataset.gameId);
      if (game) {
        Bus.emit('game:select', game);
        openGameDetail(game);
      }
    });
  });

  // Bind launch button clicks
  container.querySelectorAll('.game-card-launch').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const game = gameLibrary.find(g => g.id === btn.dataset.launch);
      if (game) {
        Bus.emit('game:launch', game);
        showToast('success', `正在启动 "${game.title.replace(/\n/g, ' ')}"`);
      }
    });
  });
}

function renderPermissionList() {
  const homeList = document.getElementById('permission-list');
  const settingsList = document.getElementById('settings-permission-list');
  const html = buildPermissionListHTML();

  if (homeList) {
    homeList.innerHTML = html;
    bindPermissionListEvents(homeList);
  }

  if (settingsList) {
    settingsList.innerHTML = html;
    bindPermissionListEvents(settingsList);
  }
}

// ====== Shop ======
function renderShopGrid() {
  const container = document.getElementById('shop-grid');
  if (!container) return;

  const items = activeShopCat === '推荐'
    ? shopItems.filter(item => item.cat === '推荐')
    : shopItems.filter(item => item.cat === activeShopCat);

  container.innerHTML = items
    .map(item => `
      <div class="shop-item" data-shop-id="${item.id}">
        <img class="shop-item-thumb" src="${item.thumb}" alt="${item.name}">
        <div class="shop-item-body">
          <div class="shop-item-name">${escapeHtml(item.name)}</div>
          <div class="shop-item-desc">${escapeHtml(item.desc)}</div>
          <div class="shop-item-footer">
            <span class="shop-item-price">💰 ${item.price}</span>
            <button class="shop-item-btn" data-buy="${item.id}">购买</button>
          </div>
        </div>
      </div>
    `).join('');

  // Bind buy button clicks → open detail modal
  container.querySelectorAll('[data-buy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = shopItems.find(s => s.id === btn.dataset.buy);
      if (item) {
        openShopDetail(item);
      }
    });
  });

  // Bind card clicks
  container.querySelectorAll('.shop-item').forEach(card => {
    card.addEventListener('click', () => {
      const item = shopItems.find(s => s.id === card.dataset.shopId);
      if (item) {
        showToast('info', `查看商品：「${item.name}」`);
        Bus.emit('shop:detail', item);
      }
    });
  });
}

function setShopCategory(catName) {
  activeShopCat = catName;

  document.querySelectorAll('.shop-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.shopCat === catName);
  });

  renderShopGrid();
  Bus.emit('shop:cat-change', catName);
}

function openShopDetail(item) {
  selectedShopItem = item;

  document.getElementById('shop-detail-title').textContent = item.name;
  document.getElementById('shop-detail-thumb').src = item.thumb;
  document.getElementById('shop-detail-thumb').alt = item.name;
  document.getElementById('shop-detail-desc').textContent = item.desc;
  document.getElementById('shop-detail-price').textContent = `💰 ${item.price}`;

  openModal('shop-detail');
  Bus.emit('shop:detail-open', item);
}

function confirmPurchase() {
  if (!selectedShopItem) return;
  const item = selectedShopItem;
  showToast('success', `已购买「${item.name}」— 花费 ${item.price} 💰`);
  Bus.emit('shop:buy', item);
  closeModal();
  selectedShopItem = null;
}

// ====== Chat / Suggestion ======
function getNowString() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function renderChatHistory() {
  const container = document.getElementById('chat-history');
  if (!container) return;

  if (chatHistory.length === 0) {
    container.innerHTML = '<p class="chat-empty">暂无历史记录，输入内容开始对话吧~</p>';
    return;
  }

  container.innerHTML = chatHistory
    .slice()
    .reverse()
    .map(msg => `
      <div class="chat-msg">
        <div class="chat-msg-meta">
          <span>${escapeHtml(msg.sender)}</span>
          <span>${escapeHtml(msg.time)}</span>
        </div>
        <div class="chat-msg-text">${escapeHtml(msg.text)}</div>
      </div>
    `).join('');
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input?.value?.trim();
  if (!text) return;

  chatHistory.push({
    sender: '我',
    text: text,
    time: getNowString(),
  });

  // Auto reply after a short delay
  setTimeout(() => {
    const replies = [
      '好的，我记住了！',
      '听起来不错呢~',
      '嗯嗯，我理解你的意思~',
      '哈哈，说得对！',
      '让我想想...好像有点道理！',
      '你真有趣！要不要一起玩游戏？',
    ];
    chatHistory.push({
      sender: '杂鱼酱',
      text: replies[Math.floor(Math.random() * replies.length)],
      time: getNowString(),
    });
    renderChatHistory();
    Bus.emit('chat:reply');
  }, 600);

  input.value = '';
  renderChatHistory();
  Bus.emit('chat:send', text);
}

function openChatModal() {
  renderChatHistory();
  openModal('chat');
  document.getElementById('chat-input')?.focus();
  Bus.emit('chat:open');
}

// ====== Utilities ======
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatRelative(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins} 分钟前`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} 小时前`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} 天前`;
  return `${Math.floor(days / 7)} 周前`;
}

// ====== Suggestion Cycling ======
const suggestions = [
  '建议：嘿！今天想玩点什么？我推荐你试试《Slay the Spire》的静默猎人路线~',
  '建议：你上次《Ori》还没通关呢，要继续吗？我来帮你盯着收集品！',
  '建议：《Hades II》刚出了更新！要一起去看看吗？',
  '建议：打累了就歇会儿，要不要来一局《Stardew Valley》？',
  '建议：我注意到你 Elden Ring 的 build 可以优化，需要建议吗？',
  '建议：今天的每日挑战还没做哦！快去试试~',
];
let suggestionIdx = 0;

function cycleSuggestion() {
  suggestionIdx = (suggestionIdx + 1) % suggestions.length;
  const el = document.getElementById('companion-suggestion');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = suggestions[suggestionIdx];
      el.style.opacity = '1';
    }, 200);
  }
}

// ====== Login ======
function doLogin() {
  const loginScreen = document.getElementById('login-screen');
  if (loginScreen) {
    loginScreen.classList.add('hidden');
    showToast('success', '登录成功！欢迎回来~');
    Bus.emit('login:success');
  }
}

function initSettings() {
  applyProfileToUI();
  applyGeneralSettingsToUI();
  applyVoiceSettingsToUI();
  setSettingsSubtab(activeSettingsSubtab);

  document.querySelectorAll('.settings-nav-item').forEach(btn => {
    btn.addEventListener('click', () => setSettingsSubtab(btn.dataset.settings));
  });

  // Shop category navigation
  document.querySelectorAll('.shop-nav-item').forEach(btn => {
    btn.addEventListener('click', () => setShopCategory(btn.dataset.shopCat));
  });

  document.getElementById('settings-profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveUserProfile();
  });

  document.getElementById('btn-change-avatar')?.addEventListener('click', () => {
    showToast('info', '头像更换功能即将接入文件选择器');
    Bus.emit('settings:avatar-change');
  });

  document.getElementById('setting-auto-launch')?.addEventListener('change', (e) => {
    generalSettings.autoLaunch = e.target.checked;
    saveSettingsToStorage();
    Bus.emit('settings:general-change', { ...generalSettings });
    showToast('info', `开机自启动已${e.target.checked ? '开启' : '关闭'}`);
  });

  document.getElementById('setting-dialogue-enabled')?.addEventListener('change', (e) => {
    generalSettings.dialogueEnabled = e.target.checked;
    updateDialogueFrequencyUI();
    saveSettingsToStorage();
    Bus.emit('settings:general-change', { ...generalSettings });
  });

  document.getElementById('setting-dialogue-frequency')?.addEventListener('input', (e) => {
    generalSettings.dialogueFrequency = Number(e.target.value);
    updateDialogueFrequencyUI();
    saveSettingsToStorage();
    Bus.emit('settings:general-change', { ...generalSettings });
  });

  document.getElementById('setting-auto-interrupt')?.addEventListener('change', (e) => {
    generalSettings.autoInterrupt = e.target.checked;
    saveSettingsToStorage();
    Bus.emit('settings:general-change', { ...generalSettings });
    showToast('info', `自动打断已${e.target.checked ? '开启' : '关闭'}`);
  });

  document.getElementById('setting-screen-enabled')?.addEventListener('change', (e) => {
    generalSettings.screenRecognitionEnabled = e.target.checked;
    saveSettingsToStorage();
    Bus.emit('settings:general-change', { ...generalSettings });
    showToast('info', `画面识别已${e.target.checked ? '启用' : '禁用'}`);
  });

  document.getElementById('setting-voice-language')?.addEventListener('change', (e) => {
    voiceSettings.language = e.target.value;
    saveSettingsToStorage();
    Bus.emit('settings:voice-change', { ...voiceSettings });
  });

  document.getElementById('setting-voice-volume')?.addEventListener('input', (e) => {
    voiceSettings.volume = Number(e.target.value);
    const text = document.getElementById('setting-volume-text');
    if (text) text.textContent = String(voiceSettings.volume);
    saveSettingsToStorage();
    Bus.emit('settings:voice-change', { ...voiceSettings });
  });

  document.getElementById('btn-add-permission-settings')?.addEventListener('click', () => {
    openModal('add-permission');
  });

  const feedbackText = document.getElementById('settings-feedback-text');
  const feedbackCount = document.getElementById('settings-feedback-count');

  feedbackText?.addEventListener('input', () => {
    if (feedbackCount) {
      feedbackCount.textContent = `${feedbackText.value.length}/800`;
    }
  });

  document.getElementById('btn-feedback-image')?.addEventListener('click', () => {
    showToast('info', '图片上传功能即将开放');
    Bus.emit('settings:feedback-image');
  });

  document.getElementById('btn-submit-feedback')?.addEventListener('click', () => {
    const text = feedbackText?.value?.trim() || '';
    if (!text) {
      showToast('info', '请先填写反馈内容');
      return;
    }
    showToast('success', '反馈已提交，感谢你的建议！');
    if (feedbackText) feedbackText.value = '';
    if (feedbackCount) feedbackCount.textContent = '0/800';
    Bus.emit('settings:feedback-submit', { text });
  });
}

// ====== Init ======
function init() {
  loadSettingsFromStorage();
  renderRecentGames();
  renderGameGrid();
  renderShopGrid();
  renderPermissionList();
  initSettings();

  // --- Login screen ---
  const btnLogin = document.getElementById('btn-login');
  const btnRegister = document.getElementById('btn-register');
  const inputPassword = document.getElementById('input-password');

  btnLogin?.addEventListener('click', doLogin);
  btnRegister?.addEventListener('click', () => {
    showToast('info', '注册功能即将开放');
  });

  // Enter key in password field triggers login
  inputPassword?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doLogin();
  });

  // Also allow Enter in account field
  document.getElementById('input-account')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('input-password')?.focus();
    }
  });

  // Initial suggestion
  const sugEl = document.getElementById('companion-suggestion');
  if (sugEl) {
    sugEl.textContent = suggestions[0];
    sugEl.style.transition = 'opacity 250ms ease';
  }

  // Tab clicks
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
  });

  // Window controls
  document.querySelector('.ctrl-minimize')?.addEventListener('click', () => {
    Bus.emit('window:minimize');
    showToast('info', '窗口最小化');
  });
  document.querySelector('.ctrl-close')?.addEventListener('click', () => {
    Bus.emit('window:close');
    showToast('info', '窗口关闭');
  });
  document.querySelector('.ctrl-maximize')?.addEventListener('click', () => {
    Bus.emit('window:maximize');
    showToast('info', '窗口最大化');
  });

  // Add permission button
  document.getElementById('btn-add-permission')?.addEventListener('click', () => {
    openModal('add-permission');
  });

  // Modal: confirm delete
  document.getElementById('btn-confirm-delete')?.addEventListener('click', () => {
    if (pendingDeleteId) removePermission(pendingDeleteId);
    closeModal();
  });

  // Modal: game detail launch
  document.getElementById('btn-game-detail-launch')?.addEventListener('click', () => {
    if (selectedGameDetail) {
      Bus.emit('game:launch', selectedGameDetail);
      showToast('success', `正在启动 "${formatGameTitle(selectedGameDetail.title)}"`);
      closeModal();
    }
  });

  // Modal: confirm add
  document.getElementById('btn-confirm-add')?.addEventListener('click', () => {
    const app = document.getElementById('select-app')?.value || 'bilibili';
    const win = document.getElementById('input-window')?.value?.trim() || `${app}（应用窗口）`;
    addPermission(app, win);
    const inp = document.getElementById('input-window');
    if (inp) inp.value = '';
    closeModal();
  });

  // Modal: confirm purchase
  document.getElementById('btn-confirm-purchase')?.addEventListener('click', () => {
    confirmPurchase();
  });

  // Chat send button
  document.getElementById('btn-chat-send')?.addEventListener('click', () => {
    sendChatMessage();
  });

  // Chat input Enter key
  document.getElementById('chat-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

  // Modal close buttons
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Companion image click → cycle suggestion (首页 tab)
  document.querySelector('.companion-image')?.addEventListener('click', () => {
    cycleSuggestion();
    showToast('info', '杂鱼酱 有了新建议~');
    Bus.emit('companion:interact');
  });

  // Suggestion box click
  document.querySelector('.suggestion-box')?.addEventListener('click', () => {
    openChatModal();
    Bus.emit('companion:interact');
  });

  // 伙伴 tab: hero image click
  document.querySelector('.companion-hero')?.addEventListener('click', () => {
    showToast('info', '杂鱼酱 向你挥手~');
    Bus.emit('companion:hero-click');
  });

  // 伙伴 tab: sub-tab clicks
  document.querySelectorAll('.companion-subtab').forEach(btn => {
    btn.addEventListener('click', () => setActiveSubtab(btn.dataset.subtab));
  });

  // 伙伴 tab: model icon selector clicks — switch left display image
  const modelDisplayImg = document.getElementById('model-display-img');
  document.querySelectorAll('.model-icon-sel').forEach(icon => {
    icon.addEventListener('click', () => {
      document.querySelectorAll('.model-icon-sel').forEach(i => i.classList.remove('active'));
      icon.classList.add('active');
      const pImg = icon.dataset.pimg;
      if (modelDisplayImg && pImg) {
        modelDisplayImg.style.opacity = '0';
        setTimeout(() => {
          modelDisplayImg.src = pImg;
          modelDisplayImg.style.opacity = '1';
        }, 200);
      }
      const charId = icon.dataset.char;
      showToast('info', `已选择角色 ${charId}`);
      Bus.emit('model:char-select', charId);
    });
  });

  // 伙伴 tab: workshop upload click
  document.querySelector('.workshop-upload-area')?.addEventListener('click', () => {
    showToast('info', '打开模型文件选择器...');
    Bus.emit('workshop:upload-click');
  });

  // 游戏 tab: catalog image click
  document.querySelector('.game-catalog')?.addEventListener('click', () => {
    Bus.emit('game:catalog-click');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.ctrlKey || e.metaKey) {
      const map = { '1': '首页', '2': '伙伴', '3': '游戏', '4': '设置', '5': '商城' };
      if (map[e.key]) { e.preventDefault(); setActiveTab(map[e.key]); }
    }
  });

  // Auto-cycle suggestions
  setInterval(cycleSuggestion, 30000);

  // Initial tab
  setActiveTab('首页');

  console.log('[AI Game Companion] Ready — Pixso design matched.');
  Bus.emit('app:ready');
}

// ====== Public API ======
window.CompanionUI = {
  getState: () => ({
    activeTab,
    activeSubtab,
    activeSettingsSubtab,
    userProfile: { ...userProfile },
    generalSettings: { ...generalSettings },
    voiceSettings: { ...voiceSettings },
    gameLibrary: [...gameLibrary],
    shopItems: [...shopItems],
    screenPermissions: [...screenPermissions],
    modalState,
  }),
  on: Bus.on.bind(Bus),
  off: Bus.off.bind(Bus),
  setTab: setActiveTab,
  setSubtab: setActiveSubtab,
  setSettingsSubtab,
  setShopCategory,
  saveUserProfile,
  doLogin,
  showToast,
  openModal,
  closeModal,
  openGameDetail,
};

// Boot
document.addEventListener('DOMContentLoaded', init);
