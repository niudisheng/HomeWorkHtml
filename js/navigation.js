/**
 * 主导航：首页 / 伙伴 / 游戏 / 设置
 * 修复 Pixso 导出后 GSAP 时间线误隐藏 Tab 按钮、页面无法切换的问题
 */
(function () {
  const PAGE = {
    home: '3_65',
    partner: '3_51',
    game: '17_31',
    settings: '17_62',
  };

  /** 工坊/模型页（从伙伴页「模型」进入，非主导航「游戏」） */
  const WORKSHOP_PAGE = '6_42';

  const MAIN_PAGES = Object.values(PAGE);

  /** 初始隐藏的非主页面板（与原导出脚本保持一致） */
  const INIT_HIDDEN = [
    '3_65', '6_42', '17_31', '17_62', '17_94', '21_46', '38_55', '42_47',
    '45_121', '45_58', '45_91', '45_101', '45_111', '45_131', '45_141',
    '45_151', '45_162', '46_206', '46_238', '46_273', '46_299', '46_325',
    '46_351', '46_377', '50_257', '50_272', '50_312', '72_275',
  ];

  /** 切换主 Tab 时需要一并隐藏的浮层/变体页 */
  const OVERLAY_PAGES = [
    '17_94', '46_206', '46_238', '46_273', '46_299', '46_325',
    '46_351', '46_377', '50_312', '50_257', '50_272', '72_275', '21_46',
    '38_55', '42_47', '45_121', '45_58', '45_91', '45_101', '45_111',
    '45_131', '45_141', '45_151', '45_162', WORKSHOP_PAGE,
  ];

  /**
   * 各页面顶部导航栏四个 Tab 按钮（按：首页、伙伴、游戏、设置 顺序）
   * 百分比布局页面与固定像素布局页面均按设计稿位置对应
   */
  const NAV_GROUPS = [
    ['79_258', '79_260', '79_261', '79_259'],
    ['3_83', '3_84', '3_85', '3_86'],
    ['6_47', '6_48', '6_49', '6_50'],
    ['17_64', '17_66', '17_67', '17_65'],
    ['79_218', '79_220', '79_221', '79_219'],
    ['79_52', '79_54', '79_55', '79_53'],
    ['79_40', '79_42', '79_43', '79_41'],
    ['79_32', '79_34', '79_35', '79_33'],
    ['79_165', '79_167', '79_168', '79_166'],
    ['79_250', '79_252', '79_253', '79_251'],
    ['79_11', '79_13', '79_14', '79_12'],
    ['17_34', '17_36', '17_37', '17_43'],
  ];

  /** 导航文字标签，扩大可点击区域 */
  const NAV_LABELS = [
    ['79_262', '79_263', '79_264', '79_265'],
    ['3_87', '3_88', '3_89', '3_90'],
    ['6_51', '6_52', '6_53', '6_54'],
    ['17_68', '17_69', '17_70', '17_71'],
    ['79_222', '79_223', '79_224', '79_225'],
    ['79_56', '79_57', '79_58', '79_59'],
    ['79_44', '79_45', '79_46', '79_47'],
    ['79_36', '79_37', '79_38', '79_39'],
    ['79_169', '79_170', '79_171', '79_172'],
    ['79_254', '79_255', '79_256', '79_257'],
    ['79_15', '79_16', '79_17', '79_18'],
    ['17_38', '17_39', '17_40', '17_41'],
  ];

  const TAB_TARGETS = [PAGE.home, PAGE.partner, PAGE.game, PAGE.settings];

  function $(id) {
    return document.getElementById(id);
  }

  function hideEl(el) {
    if (el) el.style.display = 'none';
  }

  function showEl(el, asOverlay) {
    if (!el) return;
    el.style.display = 'block';
    el.style.position = 'absolute';
    el.style.top = '0';
    el.style.left = '0';
    el.style.opacity = '1';
    if (asOverlay) {
      el.style.zIndex = '1000';
    }
  }

  function hideOverlays() {
    OVERLAY_PAGES.forEach(function (id) {
      hideEl($(id));
    });
  }

  function showMainPage(pageId) {
    if (MAIN_PAGES.indexOf(pageId) === -1) return;

    hideEl($(WORKSHOP_PAGE));

    MAIN_PAGES.forEach(function (id) {
      var el = $(id);
      if (!el) return;
      if (id === pageId) {
        showEl(el);
      } else {
        hideEl(el);
      }
    });

    hideOverlays();
  }

  function showWorkshopPage() {
    MAIN_PAGES.forEach(function (id) {
      hideEl($(id));
    });
    hideOverlays();
    showEl($(WORKSHOP_PAGE));
  }

  function bindClick(id, pageId) {
    var el = $(id);
    if (!el) return;

    el.style.cursor = 'pointer';
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      showMainPage(pageId);
    });
  }

  function bindWorkshopClick(id) {
    var el = $(id);
    if (!el) return;

    el.style.cursor = 'pointer';
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      showWorkshopPage();
    });
  }

  function bindNavGroup(ids, targets) {
    ids.forEach(function (id, index) {
      bindClick(id, targets[index]);
    });
  }

  function initNavBindings() {
    NAV_GROUPS.forEach(function (group) {
      bindNavGroup(group, TAB_TARGETS);
    });
    NAV_LABELS.forEach(function (group) {
      bindNavGroup(group, TAB_TARGETS);
    });
  }

  function initHiddenPages() {
    INIT_HIDDEN.forEach(function (id) {
      hideEl($(id));
    });
  }

  function initSecondaryActions() {
    /* 伙伴页「工坊 / 模型」：工坊回首页，模型进工坊页 */
    bindClick('6_27', PAGE.home);
    bindWorkshopClick('6_29');
    bindClick('46_218', PAGE.home);
    bindWorkshopClick('46_219');
    bindClick('46_250', PAGE.home);
    bindWorkshopClick('46_251');

    /* 伙伴页：屏幕权限弹窗 */
    var openPerm = $('50_238');
    if (openPerm) {
      openPerm.style.cursor = 'pointer';
      openPerm.addEventListener('click', function (e) {
        e.stopPropagation();
        showEl($('50_312'), true);
      });
    }

    /* 关闭权限弹窗 */
    bindOverlayClose('50_312', ['50_328', '79_1', '79_2']);

    /* 关闭 17_94 浮层 */
    bindOverlayClose('17_94', ['17_97', '17_99']);
  }

  function bindOverlayClose(overlayId, closeTriggerIds) {
    closeTriggerIds.forEach(function (triggerId) {
      var trigger = $(triggerId);
      if (!trigger) return;
      trigger.style.cursor = 'pointer';
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        hideEl($(overlayId));
      });
    });
  }

  function init() {
    initHiddenPages();
    showMainPage(PAGE.partner);
    initNavBindings();
    initSecondaryActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.AppNav = {
    showMainPage: showMainPage,
    showWorkshopPage: showWorkshopPage,
    PAGE: PAGE,
  };
})();
