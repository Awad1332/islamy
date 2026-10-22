/* =====================================================
   عتيم | ATEEM — أكواد JavaScript لثيم رائد — v5
   يُلصق في خانة JavaScript المخصص في ثيم رائد (بدل القديم كله)

   أقسام مشمر معزولة (Shadow DOM) فالـCSS العادي مش بيوصلها،
   الملف ده بيطبّق عليها نفس الهوية:
   1) الخط: ثمانية Sans (Bold للعناوين)
   2) الألوان: خلفية بيج واحدة + أخضر عتيم الغامق
   3) شيل كل عناصر السدو (الشرايط، الزخارف، النقوش)
   4) الشاشة الافتتاحية: مرة واحدة في كل زيارة
   ===================================================== */
(function () {
  /* 0) الشاشة الافتتاحية: تظهر مرة واحدة بس في كل زيارة */
  function splashOnce() {
    var b = document.body;
    if (!b || !b.classList.contains('index')) return;
    try {
      if (sessionStorage.getItem('ateemSplash')) b.classList.add('ateem-no-splash');
      else sessionStorage.setItem('ateemSplash', '1');
    } catch (e) { /* لو التخزين مقفول، الشاشة بتظهر وتختفي لوحدها */ }
  }
  if (document.body) splashOnce();
  else document.addEventListener('DOMContentLoaded', splashOnce);

  /* ألوان الهوية */
  var G9 = '#1E3333', G7 = '#2F4A48', G5 = '#7E766A', G1 = 'transparent';
  var B50 = '#E6DCCD', B100 = 'transparent', B200 = '#DCD0BD', B300 = '#CDBFA8', CARD = 'transparent', LINE = '#D5C8B3';

  /* 1) الخطوط + 3) شيل السدو — لكل أقسام مشمر */
  var BASE_CSS =
    ':host, *{ font-family:"Thmanyah Sans", sans-serif !important; letter-spacing:0 !important; }' +
    'h1, h2, h3, h4{ font-family:"Thmanyah Sans", sans-serif !important; font-weight:700 !important; }' +
    /* خط قصير تحت عناوين الأقسام */
    '.title-main::after, .header .title::after{ content:""; display:block; width:96px; height:3px; margin:20px auto 0; background:' + '#1E3333' + '; border-radius:2px; }' +
    'p, span, a, button{ font-weight:400; }' +
    '.ateem-ornament, .ateem-ornament--dark, .ateem-band-green, .ateem-band-dark, .ateem-band-cream,' +
    '.sadu-column, .diamonds-footer{ display:none !important; }' +
    '.ateem-pattern-dark, .ateem-pattern-light{ background-image:none !important; }' +
    '.ateem-pattern-dark::before, .ateem-pattern-light::before{ display:none !important; }';

  /* 2) ألوان كل قسم */
  var SECTIONS = {
    /* في كل جلسة.. عتيم حاضر */
    'ateem-features-arch':
      ':host{ background-color:' + B100 + ' !important; }' +
      '.section-container{ padding-top:72px !important; padding-bottom:72px !important; }' +
      '.title-small{ color:' + G5 + ' !important; font-weight:500 !important; }' +
      '.title-main, .title-main .gold-text{ color:' + G9 + ' !important; margin-bottom:40px !important; }' +
      '.feature-card{ background:transparent !important; border:1px solid ' + LINE + ' !important; box-shadow:none !important; border-radius:10px !important; }' +
      '.feature-card:hover{ border-color:' + B300 + ' !important; box-shadow:0 12px 26px rgba(30,51,51,.06) !important; }' +
      '.icon-circle{ border:1px solid ' + LINE + ' !important; background:transparent !important; transition:transform .35s ease, background .3s ease; }' +
      '.icon-circle i{ color:' + G9 + ' !important; transition:color .3s ease; }' +
      '.feature-card:hover .icon-circle{ transform:translateY(-4px); background:' + G9 + ' !important; }' +
      '.feature-card:hover .icon-circle i{ color:#fff !important; }' +
      '.card-title{ color:' + G9 + ' !important; }' +
      '.card-desc{ color:' + G5 + ' !important; }',

    /* قصة عتيم */
    'ateem-heritage-section':
      ':host{ background-color:' + B100 + ' !important; }' +
      '*, *::before, *::after{ box-sizing:border-box !important; }' +
      '.section-wrapper{ grid-template-columns:1fr !important; }' +
      '.content-container{ width:100% !important; max-width:1080px !important; margin-inline:auto !important; }' +
      '.subtitle{ color:' + G5 + ' !important; font-weight:500 !important; letter-spacing:.08em !important; }' +
      '.title, .title span{ color:' + G9 + ' !important; }' + '.title{ font-size:clamp(26px, 2.8vw, 38px) !important; }' +
      '.description{ color:' + G5 + ' !important; }' +
      '.feature-box{ background:transparent !important; border:1px solid ' + LINE + ' !important; border-radius:10px !important; }' +
      '.feature-icon{ color:' + G9 + ' !important; }' +
      '.feature-text{ color:' + G9 + ' !important; font-weight:500 !important; }' +
      '.cta-button{ background:' + G9 + ' !important; color:' + B50 + ' !important; border-radius:6px !important; font-weight:500 !important; }' +
      '.cta-button:hover{ background:' + G7 + ' !important; filter:none !important; }' +
      '.image-frame{ display:none !important; }' + '.main-image{ border-radius:10px !important; }' +
      '.logo-card{ background:' + B50 + ' !important; box-shadow:0 6px 18px rgba(30,51,51,.08) !important; }',

    /* كيف تحضّر كوبك المثالي */
    'brewing-guide':
      '.section-container{ background-color:transparent !important; }' +
      '.subtitle{ color:' + G5 + ' !important; font-weight:500 !important; }' +
      '.title, .step-title{ color:' + G9 + ' !important; }' +
      '.step-desc{ color:' + G5 + ' !important; }' +
      '.steps-grid::before{ border-top:1px dashed ' + B300 + ' !important; }' +
      '.diamond-wrapper{ transform:none !important; border-radius:999px !important; background:transparent !important; border:1px solid ' + G9 + ' !important; box-shadow:none !important; }' +
      '.step-item:hover .diamond-wrapper{ transform:translateY(-4px) !important; background:' + G9 + ' !important; }' +
      '.step-number{ transform:none !important; color:' + G9 + ' !important; font-weight:500 !important; }' +
      '.step-item:hover .step-number{ color:#fff !important; }' +
      '.stats-bar{ background:' + G9 + ' !important; border:0 !important; box-shadow:none !important; border-radius:10px !important; }' +
      '.stat-item{ color:#E6DCCD !important; }' +
      '.stat-item:not(:last-child)::after{ background:rgba(230,220,205,.2) !important; }' +
      '.stat-icon{ color:#E6DCCD !important; }' +
      '.stat-value{ font-weight:500 !important; }' +
      '.stat-label{ color:#CFC7B8 !important; opacity:1 !important; }',

    /* شريط المميزات */
    'features-diamond':
      '.section-wrapper{ background-color:transparent !important; border-color:' + LINE + ' !important; padding-block:48px !important; }' +
      '.diamond-box{ transform:none !important; border-radius:0 !important; width:56px !important; height:56px !important; background:transparent !important; transition:transform .35s cubic-bezier(.2,.7,.2,1), background .3s ease; }' +
      '.icon-wrapper{ transform:none !important; }' +
      '.icon-wrapper i{ color:' + G9 + ' !important; font-size:34px !important; transition:color .3s ease; }' +
      '.feature-item:hover .diamond-box{ transform:translateY(-4px) !important; }' +
      '.feature-title{ color:' + G9 + ' !important; font-weight:700 !important; font-size:17px !important; }' +
      '.feature-desc{ color:' + G5 + ' !important; }'
  };

  function inject(root, id, css) {
    if (!root || root.querySelector('style[data-ateem="' + id + '"]')) return;
    var style = document.createElement('style');
    style.setAttribute('data-ateem', id);
    style.textContent = css;
    root.appendChild(style);
  }

  function applyAll() {
    document.querySelectorAll('[class*="s-block--bundle-"] > *').forEach(function (host) {
      inject(host.shadowRoot, 'v4-base', BASE_CSS);
    });
    Object.keys(SECTIONS).forEach(function (key) {
      document.querySelectorAll('.s-block--bundle-' + key + ' > *').forEach(function (host) {
        inject(host.shadowRoot, 'v4-section', SECTIONS[key]);
      });
    });
    // "في كل جلسة ... عتيم حاضر" → نقطتين بدل التلاتة
    document.querySelectorAll('.s-block--bundle-ateem-features-arch > *').forEach(function (host) {
      var h = host.shadowRoot && host.shadowRoot.querySelector('.title-main');
      if (!h || h.hasAttribute('data-ateem-fixed')) return;
      [].forEach.call(h.childNodes, function (n) {
        if (n.nodeType === 3 && n.textContent.indexOf('...') > -1) n.textContent = n.textContent.replace(/\s*\.\.\.\s*/, '.. ');
      });
      h.setAttribute('data-ateem-fixed', '');
    });
  }

  // الأقسام بتتحمّل متأخر، فنكرر المحاولة لمدة 15 ثانية
  function run() {
    applyAll();
    var tries = 0;
    var timer = setInterval(function () {
      applyAll();
      if (++tries > 30) clearInterval(timer);
    }, 500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
