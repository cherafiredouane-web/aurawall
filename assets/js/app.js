(() => {
  'use strict';

  const PRODUCTS = Array.isArray(window.AURA_PRODUCTS) ? window.AURA_PRODUCTS : [];
  const ROOT_URL = window.AURA_BASE_URL || new URL('./', window.location.href).href;
  const WHATSAPP_NUMBER = '212627025271';
  const app = document.getElementById('app');
  let language = 'en';
  try { language = localStorage.getItem('aura-wall-language') === 'ar' ? 'ar' : 'en'; } catch (_) { language = 'en'; }
  let mobileMenuOpen = false;
  let searchOpen = false;
  let visibleCount = 12;
  let activeFilter = 'all';

  const COPY = {
    en: {
      announcement: 'A Moroccan art studio for the worlds you love', home: 'Home', anime: 'Anime', gaming: 'Gaming', movies: 'Movies & Series', personalized: 'Personalized Art', search: 'Search artworks', contact: 'WhatsApp us', switchLang: 'عربي',
      heroKicker: 'Premium plexiglass wall art', heroLine1: 'Give your walls', heroLine2: 'an Aura.', heroDescription: 'Premium plexiglass wall art inspired by the worlds, characters and stories you love.', explore: 'Explore artworks', create: 'Create your art', heroProof: 'Designed for your space · Made in Morocco', tickerOne: 'Your worlds, on your walls', tickerTwo: 'A different kind of art', tickerThree: 'Made to be yours', tickerFour: 'An aura of your own',
      categoryKicker: 'Choose your universe', categoryTitle: 'Your favourites, made tangible.', categoryDescription: 'From anime legends to cinematic icons, find the artwork that feels like you.', animeSub: 'Iconic characters. Unforgettable worlds.', gamingSub: 'For the worlds you play in.', moviesSub: 'Stories that stay with you.', personalizedSub: 'Your idea. Your rules. Your Aura.',
      featuredKicker: 'The gallery', featuredTitle: 'Art worth a second look.', featuredDescription: 'A hand-picked glimpse into the worlds waiting to live on your wall.', viewAll: 'View all artworks', showMore: 'Show more artworks', viewArtwork: 'View artwork', featuredBadge: 'Selected artworks',
      collectionKicker: 'Curated for your universe', collectionTitle: 'Find your next favourite.', collectionDescription: 'Explore distinct worlds, each with its own energy and visual language.', shonen: 'Shonen legends', shonenCopy: 'Iconic anime, electric colour and larger-than-life characters.', nightCity: 'After dark', nightCityCopy: 'Neon cities, bold heroes and gaming worlds.', cinemaAfterDark: 'Cinema after dark', cinemaCopy: 'The characters and stories that leave a mark.', exploreCollection: 'Explore collection',
      customKicker: 'Made around you', customTitle: 'Create something that is yours.', customDescription: 'Your memories, your favourite character or an idea only you can imagine. Tell us what you have in mind, and let’s turn it into a piece of wall art.', customCTA: 'Create my artwork', customView: 'See how it works', customLabelOne: 'Your photo, reimagined', customLabelTwo: 'A story only you can tell',
      statement: 'Not just art for your wall. A little piece of the world you love.', statementAccent: 'The world you love.', statementNote: 'Premium plexiglass wall art, made to make your space feel more like you.',
      footerBlurb: 'A premium wall-art studio for anime, gaming, cinema and personal stories. Made for your space, in Morocco.', footerExplore: 'Explore', footerSupport: 'Let’s talk', footerContact: 'Order through WhatsApp', copyright: 'AURA WALL. All rights reserved.', footerMade: 'Designed with intention. Made for your space.',
      collectionAnimeTitle: 'Anime, made tangible.', collectionAnimeDesc: 'From shinobi legends to pirate kings and Saiyan power, discover artwork inspired by the anime worlds you love.', collectionGamingTitle: 'Enter your next world.', collectionGamingDesc: 'Iconic games, powerful characters and neon-soaked worlds, reimagined as premium wall art.', collectionMoviesTitle: 'Stories that stay on your wall.', collectionMoviesDesc: 'Cinematic portraits and cult-favourite worlds for the spaces where you make your own story.', collectionAll: 'All artworks', allAnime: 'All anime', naruto: 'Naruto', onePiece: 'One Piece', dragonBall: 'Dragon Ball Z', moreAnime: 'More anime',
      resultCount: 'artworks in this collection', noResultsTitle: 'No artworks found.', noResultsText: 'Try another character, anime, movie or game.', searchResultsFor: 'Search results for', searchPageTitle: 'Search the gallery', searchPageDescription: 'Find an artwork by character, franchise, game, series or keyword.', searchEmptyHint: 'Try a character, anime, movie, series or game name.',
      detailOrder: 'Ask about this artwork', detailBack: 'Back to collection', relatedTitle: 'More from this universe', detailTagline: 'A signature piece for your space', assurance: 'Want to make it yours? Message us to ask about this artwork and finish options.',
      customIntroKicker: 'Your idea, made real', customIntroTitle: 'Your memories. Your characters. Your world. Your Aura.', customIntroCopy: 'Tell us what you want to create. We will take the conversation from reference to artwork, one clear step at a time.',
      step1: 'Choose your idea', step1copy: 'A photo, character, couple, game or a concept of your own.', step2: 'Send your reference', step2copy: 'Share your image or describe the direction you have in mind.', step3: 'We create the artwork', step3copy: 'We shape the concept around your idea and style.', step4: 'Approve the design', step4copy: 'Review the artwork with us before production.', step5: 'Bring it to your wall', step5copy: 'Turn the approved design into a premium plexiglass piece.',
      requestTitle: 'Let’s design your piece.', requestDescription: 'Share a few details and WhatsApp will open with your request ready to send.', formType: 'What would you like to create?', formTypePlaceholder: 'Choose an artwork type', formPhoto: 'Personal photo', formCouple: 'Couple artwork', formFamily: 'Family portrait', formGaming: 'Gaming artwork', formAnime: 'Anime-inspired artwork', formCharacter: 'Character artwork', formPoster: 'Custom poster', formOther: 'A custom concept', formName: 'Your name (optional)', formNamePlaceholder: 'How should we address you?', formDetails: 'Tell us about your idea', formDetailsPlaceholder: 'Style, character, colours, dimensions or anything we should know…', formSubmit: 'Continue on WhatsApp', formHint: 'You can attach reference images directly in the WhatsApp chat after it opens.',
      contactCTA: 'Have an idea in mind?', contactCopy: 'Let’s make it a part of your space.', contactButton: 'Talk to the studio', searchType: 'Type a character, franchise or title…', searchClose: 'Close search', searchStart: 'Start typing to search the full gallery.', searchTip: 'Search by character, anime, game, movie, series or artwork title.', mobileMenu: 'Open menu', loading: 'Explore the gallery', category: 'Category', franchise: 'Universe',
    },
    ar: {
      announcement: 'استوديو مغربي لفنّ يعكس العوالم التي تحبها', home: 'الرئيسية', anime: 'أنمي', gaming: 'ألعاب', movies: 'أفلام ومسلسلات', personalized: 'فن مخصص', search: 'ابحث عن الأعمال', contact: 'تواصل عبر واتساب', switchLang: 'EN',
      heroKicker: 'لوحات فاخرة من البليكسيغلاس', heroLine1: 'امنح جدرانك', heroLine2: 'هالة خاصة.', heroDescription: 'لوحات بليكسيغلاس فاخرة مستوحاة من العوالم والشخصيات والقصص التي تحبها.', explore: 'اكتشف الأعمال', create: 'صمّم عملك', heroProof: 'مصممة لمساحتك · من المغرب', tickerOne: 'عوالمك على جدرانك', tickerTwo: 'فنّ مختلف', tickerThree: 'مصمم ليشبهك', tickerFour: 'هالتك الخاصة',
      categoryKicker: 'اختر عالمك', categoryTitle: 'ما تحبّه، يصبح جزءًا من مساحتك.', categoryDescription: 'من أساطير الأنمي إلى أيقونات السينما، اكتشف العمل الذي يشبه ذوقك.', animeSub: 'شخصيات أيقونية وعوالم لا تُنسى.', gamingSub: 'للعوالم التي تعيشها أثناء اللعب.', moviesSub: 'قصص تبقى معك.', personalizedSub: 'فكرتك. أسلوبك. هالتك.',
      featuredKicker: 'المعرض', featuredTitle: 'أعمال تستحق نظرة ثانية.', featuredDescription: 'مجموعة مختارة من العوالم التي يمكن أن تعيش على جدرانك.', viewAll: 'عرض كل الأعمال', showMore: 'عرض المزيد', viewArtwork: 'شاهد العمل', featuredBadge: 'أعمال مختارة',
      collectionKicker: 'مجموعات مختارة لك', collectionTitle: 'اكتشف عالمك القادم.', collectionDescription: 'عوالم مختلفة، لكل واحد منها طاقته وأسلوبه البصري الخاص.', shonen: 'أساطير الشونين', shonenCopy: 'أنمي أيقوني، ألوان نابضة وشخصيات استثنائية.', nightCity: 'بعد حلول الظلام', nightCityCopy: 'مدن نيون وأبطال جريئون وعوالم ألعاب.', cinemaAfterDark: 'السينما بعد الظلام', cinemaCopy: 'شخصيات وقصص تترك أثرًا.', exploreCollection: 'اكتشف المجموعة',
      customKicker: 'مصمم حولك', customTitle: 'اصنع شيئًا يشبهك.', customDescription: 'ذكرياتك، شخصيتك المفضلة أو فكرة لا تشبه إلا خيالك. أخبرنا بما تفكر فيه، ولنحوّله إلى عمل فني لجدرانك.', customCTA: 'صمّم عملي الفني', customView: 'اكتشف الطريقة', customLabelOne: 'صورتك برؤية جديدة', customLabelTwo: 'حكاية لا يرويها غيرك',
      statement: 'ليس مجرد فنّ لجدارك، بل قطعة صغيرة من العالم الذي تحبّه.', statementAccent: 'العالم الذي تحبّه.', statementNote: 'لوحات بليكسيغلاس فاخرة تجعل مساحتك أقرب إلى شخصيتك.',
      footerBlurb: 'استوديو للوحات جدارية فاخرة مستوحاة من الأنمي والألعاب والسينما والقصص الشخصية. من المغرب، لمساحتك.', footerExplore: 'اكتشف', footerSupport: 'لنتحدث', footerContact: 'اطلب عبر واتساب', copyright: 'AURA WALL. جميع الحقوق محفوظة.', footerMade: 'تصميم مقصود، ومساحة تشبهك.',
      collectionAnimeTitle: 'الأنمي، يصبح جزءًا من مساحتك.', collectionAnimeDesc: 'من أساطير الشينوبي إلى ملوك القراصنة وقوة السايان، اكتشف أعمالًا مستوحاة من عوالم الأنمي التي تحبها.', collectionGamingTitle: 'ادخل عالمك القادم.', collectionGamingDesc: 'ألعاب أيقونية وشخصيات قوية وعوالم نيون تتحول إلى لوحات جدارية فاخرة.', collectionMoviesTitle: 'قصص تبقى على جدارك.', collectionMoviesDesc: 'بورتريهات سينمائية وعوالم محبوبة لمساحة تروي قصتك الخاصة.', collectionAll: 'كل الأعمال', allAnime: 'كل الأنمي', naruto: 'ناروتو', onePiece: 'ون بيس', dragonBall: 'دراغون بول زد', moreAnime: 'أنميات أخرى',
      resultCount: 'عمل فني في هذه المجموعة', noResultsTitle: 'لم نعثر على أعمال.', noResultsText: 'جرّب اسم شخصية أو أنمي أو فيلم أو لعبة أخرى.', searchResultsFor: 'نتائج البحث عن', searchPageTitle: 'ابحث في المعرض', searchPageDescription: 'اعثر على عمل حسب الشخصية أو السلسلة أو اللعبة أو الكلمات المفتاحية.', searchEmptyHint: 'جرّب اسم شخصية أو أنمي أو فيلم أو مسلسل أو لعبة.',
      detailOrder: 'استفسر عن هذا العمل', detailBack: 'العودة إلى المجموعة', relatedTitle: 'المزيد من هذا العالم', detailTagline: 'قطعة مميزة لمساحتك', assurance: 'هل ترغب في اقتنائه؟ راسلنا للاستفسار عن هذا العمل وخيارات التشطيب.',
      customIntroKicker: 'فكرتك، تتحول إلى واقع', customIntroTitle: 'ذكرياتك. شخصياتك. عالمك. هالتك.', customIntroCopy: 'أخبرنا بما تريد ابتكاره. سنرافقك من الفكرة والمرجع إلى العمل الفني، خطوة بخطوة.',
      step1: 'اختر فكرتك', step1copy: 'صورة، شخصية، ثنائي، لعبة أو فكرة من خيالك.', step2: 'أرسل المرجع', step2copy: 'شارك صورتك أو صف الاتجاه الذي تتخيله.', step3: 'نصمم العمل', step3copy: 'نحوّل فكرتك إلى تصميم يناسب أسلوبك.', step4: 'وافق على التصميم', step4copy: 'راجع العمل معنا قبل الإنتاج.', step5: 'اجعله جزءًا من جدارك', step5copy: 'حوّل التصميم النهائي إلى لوحة بليكسيغلاس فاخرة.',
      requestTitle: 'لنصمم قطعتك الخاصة.', requestDescription: 'أضف بعض التفاصيل وسنفتح واتساب مع رسالة جاهزة للإرسال.', formType: 'ما الذي ترغب في تصميمه؟', formTypePlaceholder: 'اختر نوع العمل', formPhoto: 'صورة شخصية', formCouple: 'لوحة للثنائي', formFamily: 'بورتريه عائلي', formGaming: 'لوحة ألعاب', formAnime: 'عمل مستوحى من الأنمي', formCharacter: 'لوحة شخصية', formPoster: 'ملصق مخصص', formOther: 'فكرة خاصة', formName: 'اسمك (اختياري)', formNamePlaceholder: 'بماذا نناديك؟', formDetails: 'حدّثنا عن فكرتك', formDetailsPlaceholder: 'الأسلوب، الشخصية، الألوان، الأبعاد أو أي تفاصيل أخرى…', formSubmit: 'تابع عبر واتساب', formHint: 'يمكنك إرفاق الصور المرجعية مباشرة في محادثة واتساب بعد فتحها.',
      contactCTA: 'لديك فكرة في بالك؟', contactCopy: 'لنجعلها جزءًا من مساحتك.', contactButton: 'تواصل مع الاستوديو', searchType: 'اكتب اسم شخصية أو سلسلة أو عمل…', searchClose: 'إغلاق البحث', searchStart: 'ابدأ الكتابة للبحث في المعرض كاملًا.', searchTip: 'ابحث باسم شخصية أو أنمي أو لعبة أو فيلم أو مسلسل.', mobileMenu: 'فتح القائمة', loading: 'اكتشف المعرض', category: 'الفئة', franchise: 'العالم',
    }
  };
  const t = (key) => (COPY[language] && COPY[language][key]) || COPY.en[key] || key;
  const localCategory = (id) => {
    if (language === 'ar') return ({anime:'أنمي',gaming:'ألعاب','movies-series':'أفلام ومسلسلات'})[id] || id;
    return ({anime:'Anime',gaming:'Gaming','movies-series':'Movies & Series'})[id] || id;
  };
  const localSubcategory = (value) => {
    if (language !== 'ar') return value;
    const n = String(value || '').toLowerCase();
    if (n === 'naruto') return 'ناروتو';
    if (n === 'one piece') return 'ون بيس';
    if (n === 'dragon ball z') return 'دراغون بول زد';
    if (n === 'more anime') return 'أنميات أخرى';
    return value;
  };
  const urlFor = (path = '') => new URL(String(path).replace(/^\//, ''), ROOT_URL).href;
  const imageFor = (path) => urlFor(path || 'assets/brand/hero-image-cover.png');
  const waUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const escapeHtml = (v) => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const plain = (v) => String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9\u0600-\u06ff]+/g,' ').trim();
  const route = () => {
    const rootPath = new URL(ROOT_URL).pathname.endsWith('/') ? new URL(ROOT_URL).pathname : new URL(ROOT_URL).pathname + '/';
    let p = window.location.pathname;
    let relative = p.startsWith(rootPath) ? p.slice(rootPath.length) : p.replace(/^\/+/, '');
    relative = relative.replace(/(^|\/)index\.html$/, '$1').replace(/^\/+|\/+$/g, '');
    return relative.split('/').filter(Boolean);
  };
  const getProductAtRoute = (segments) => {
    const match = segments.join('/');
    return PRODUCTS.find(p => p.route === match) || null;
  };
  const searchProducts = (query, source = PRODUCTS, limit = Infinity) => {
    const q = plain(query);
    if (!q) return source.slice(0, Math.min(limit, 6));
    const terms = q.split(/\s+/).filter(Boolean);
    return source.map(p => {
      const hay = plain([p.title,p.categoryLabel,p.category,p.subcategory,p.franchise,p.character,...(p.tags || [])].join(' '));
      let score = hay.includes(q) ? 10 : 0;
      for (const term of terms) if (hay.includes(term)) score += 1;
      if (plain(p.title).startsWith(q)) score += 4;
      return {p,score};
    }).filter(x => x.score >= Math.max(1, terms.length)).sort((a,b)=>b.score-a.score || a.p.title.localeCompare(b.p.title)).slice(0,limit).map(x=>x.p);
  };
  const productCard = (p) => `
    <article class="product-card reveal">
      <a class="product-link" href="${urlFor(p.route + '/') }" aria-label="${escapeHtml(t('viewArtwork'))}: ${escapeHtml(p.title)}">
        <div class="product-image-wrap">
          <img class="product-image" src="${imageFor(p.image)}" alt="${escapeHtml(p.title)} — premium plexiglass wall-art design" loading="lazy" decoding="async">
          <span class="product-view" aria-hidden="true">↗</span>
        </div>
        <div class="product-info">
          <div class="product-meta">${escapeHtml(localCategory(p.category))} · ${escapeHtml(localSubcategory(p.subcategory))}</div>
          <h3 class="product-title" dir="auto">${escapeHtml(p.title)}</h3>
          <div class="product-note">${escapeHtml(t('viewArtwork'))} <span aria-hidden="true">↗</span></div>
        </div>
      </a>
    </article>`;
  const productGrid = (items, max = 12) => {
    if (!items.length) return `<div class="product-empty"><h3>${escapeHtml(t('noResultsTitle'))}</h3><p>${escapeHtml(t('noResultsText'))}</p></div>`;
    return `<div class="product-grid">${items.slice(0,max).map(productCard).join('')}</div>`;
  };
  const homeFeatured = () => {
    const targetTitles = [
      'Naruto Uzumaki — Rasengan Burst','Monkey D. Luffy — Gear 5 Awakening','Goku — Ultra Instinct',
      'Satoru Gojo — Limitless Blue','Cyberpunk 2077 — Night City','The Witcher 3 — Geralt of Rivia',
      'Batman — The Dark Knight','Peaky Blinders — Tommy Shelby'
    ];
    const chosen = targetTitles.map(title=>PRODUCTS.find(p=>p.title===title)).filter(Boolean);
    for (const p of PRODUCTS) if (chosen.length < 8 && !chosen.includes(p)) chosen.push(p);
    return chosen.slice(0,8);
  };
  const header = (active = '') => `
    <div class="announcement"><span class="spark">✦</span>${escapeHtml(t('announcement'))}<span class="spark">✦</span></div>
    <header class="site-header">
      <div class="header-inner">
        <a class="brand-link" href="${urlFor('')}" aria-label="AURA WALL home"><img src="${imageFor('assets/brand/aurawall-logo.png')}" alt="AURA WALL" width="2170" height="725"></a>
        <nav class="main-nav" aria-label="Main navigation">
          <a class="${active==='home'?'active':''}" href="${urlFor('')}">${escapeHtml(t('home'))}</a>
          <a class="${active==='anime'?'active':''}" href="${urlFor('anime/')}">${escapeHtml(t('anime'))}</a>
          <a class="${active==='gaming'?'active':''}" href="${urlFor('gaming/')}">${escapeHtml(t('gaming'))}</a>
          <a class="${active==='movies-series'?'active':''}" href="${urlFor('movies-series/')}">${escapeHtml(t('movies'))}</a>
          <a class="${active==='personalized-art'?'active':''}" href="${urlFor('personalized-art/')}">${escapeHtml(t('personalized'))}</a>
        </nav>
        <div class="header-actions">
          <button class="icon-button" type="button" data-action="open-search" aria-label="${escapeHtml(t('search'))}" title="${escapeHtml(t('search'))}">⌕</button>
          <button class="language-button" type="button" data-action="toggle-language" aria-label="Switch language">${escapeHtml(t('switchLang'))}</button>
          <a class="button button-primary button-small header-contact" href="${waUrl('Hello AURA WALL, I would like to know more about your wall-art collection.')}" target="_blank" rel="noopener noreferrer">${escapeHtml(t('contact'))} <span class="arrow">↗</span></a>
          <button class="mobile-menu-button" type="button" data-action="toggle-menu" aria-label="${escapeHtml(t('mobileMenu'))}" aria-expanded="${mobileMenuOpen?'true':'false'}">${mobileMenuOpen?'×':'☰'}</button>
        </div>
      </div>
      <nav class="mobile-nav ${mobileMenuOpen?'open':''}" aria-label="Mobile navigation">
        <a href="${urlFor('')}">${escapeHtml(t('home'))}</a><a href="${urlFor('anime/')}">${escapeHtml(t('anime'))}</a><a href="${urlFor('gaming/')}">${escapeHtml(t('gaming'))}</a><a href="${urlFor('movies-series/')}">${escapeHtml(t('movies'))}</a><a href="${urlFor('personalized-art/')}">${escapeHtml(t('personalized'))}</a>
      </nav>
    </header>`;
  const footer = () => `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div><a href="${urlFor('')}" aria-label="AURA WALL home"><img class="footer-brand" src="${imageFor('assets/brand/aurawall-logo.png')}" alt="AURA WALL" loading="lazy"></a><p class="footer-blurb">${escapeHtml(t('footerBlurb'))}</p></div>
          <div><h2 class="footer-heading">${escapeHtml(t('footerExplore'))}</h2><nav class="footer-links"><a href="${urlFor('anime/')}">${escapeHtml(t('anime'))}</a><a href="${urlFor('gaming/')}">${escapeHtml(t('gaming'))}</a><a href="${urlFor('movies-series/')}">${escapeHtml(t('movies'))}</a><a href="${urlFor('personalized-art/')}">${escapeHtml(t('personalized'))}</a></nav></div>
          <div><h2 class="footer-heading">${escapeHtml(t('footerSupport'))}</h2><nav class="footer-links"><a href="${urlFor('personalized-art/')}">${escapeHtml(t('customCTA'))}</a><a href="${waUrl('Hello AURA WALL, I have a question about your wall art collection.')}" target="_blank" rel="noopener noreferrer">${escapeHtml(t('footerContact'))} ↗</a><a href="${urlFor('search/')}">${escapeHtml(t('search'))}</a></nav></div>
        </div>
        <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${escapeHtml(t('copyright'))}</span><span>${escapeHtml(t('footerMade'))} · <a href="${urlFor('')}">AURA WALL</a></span></div>
      </div>
    </footer>`;
  const searchOverlay = () => `
    <div class="search-overlay ${searchOpen?'open':''}" id="search-overlay" aria-hidden="${searchOpen?'false':'true'}">
      <div class="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <div class="search-panel-head"><h2 class="search-panel-title" id="search-title">${escapeHtml(t('search'))}</h2><button class="search-close" data-action="close-search" type="button" aria-label="${escapeHtml(t('searchClose'))}">×</button></div>
        <form id="search-form" role="search"><div class="search-input-wrap"><span class="search-magnify" aria-hidden="true">⌕</span><input class="search-input" id="search-input" name="q" type="search" placeholder="${escapeHtml(t('searchType'))}" autocomplete="off" aria-label="${escapeHtml(t('search'))}"></div></form>
        <div class="search-results" id="search-results"><div class="search-empty">${escapeHtml(t('searchStart'))}</div></div>
        <div class="search-hint">${escapeHtml(t('searchTip'))}</div>
      </div>
    </div><div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  const whatsappFloat = () => `<a class="floating-whatsapp" href="${waUrl('Hello AURA WALL, I would like to know more about your artworks.')}" target="_blank" rel="noopener noreferrer" aria-label="Contact AURA WALL on WhatsApp" title="WhatsApp"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.1 11.7a8.1 8.1 0 0 1-12 7.1L3 20l1.3-4.8a8.1 8.1 0 1 1 15.8-3.5Z"/><path d="M8.8 8.2c.2-.5.4-.5.7-.5h.4c.1 0 .3 0 .4.4l.6 1.4c.1.2.1.4 0 .5l-.4.5c-.2.2-.2.3-.1.5.4.7 1 1.3 1.7 1.7.2.1.4.1.5-.1l.5-.6c.1-.2.3-.2.5-.1l1.3.6c.3.1.4.2.4.3 0 .2-.1.8-.5 1.1-.4.4-.9.6-1.5.5-.7-.1-1.7-.5-2.7-1.4-1.3-1.1-2.2-2.4-2.4-3.1-.2-.7 0-1.3.3-1.7Z"/></svg></a>`;

  const homePage = () => {
    const cats = [
      {num:'01',name:t('anime'),sub:t('animeSub'),href:'anime/',img:'assets/categories/anime.jpg',alt:'Anime artwork category cover'},
      {num:'02',name:t('gaming'),sub:t('gamingSub'),href:'gaming/',img:'assets/categories/gaming.jpg',alt:'Gaming artwork category cover'},
      {num:'03',name:t('movies'),sub:t('moviesSub'),href:'movies-series/',img:'assets/categories/movies-series.jpg',alt:'Movies and series artwork category cover'},
      {num:'04',name:t('personalized'),sub:t('personalizedSub'),href:'personalized-art/',img:'assets/categories/personalized-art.jpg',alt:'Personalized wall art category cover'}
    ];
    const featured = homeFeatured();
    const signature = [
      {title:t('shonen'),copy:t('shonenCopy'),p:PRODUCTS.find(p=>p.subcategory==='One Piece') || PRODUCTS[0],href:'anime/'},
      {title:t('nightCity'),copy:t('nightCityCopy'),p:PRODUCTS.find(p=>p.title==='Cyberpunk 2077 — Night City') || PRODUCTS[90],href:'gaming/'},
      {title:t('cinemaAfterDark'),copy:t('cinemaCopy'),p:PRODUCTS.find(p=>p.title==='Batman — The Dark Knight') || PRODUCTS[120],href:'movies-series/'}
    ];
    return `<main id="main">
      <section class="hero" aria-labelledby="hero-title"><div class="container hero-grid">
        <div class="hero-copy"><div class="kicker">${escapeHtml(t('heroKicker'))}</div><h1 class="hero-title" id="hero-title">${escapeHtml(t('heroLine1'))}<br><span class="gradient-text">${escapeHtml(t('heroLine2'))}</span></h1><p class="hero-description">${escapeHtml(t('heroDescription'))}</p><div class="hero-buttons"><a class="button button-primary" href="#categories">${escapeHtml(t('explore'))}<span class="arrow">↘</span></a><a class="button button-secondary" href="${urlFor('personalized-art/')}">${escapeHtml(t('create'))}<span class="arrow">↗</span></a></div><div class="hero-proof"><span class="proof-dot"></span>${escapeHtml(t('heroProof'))}</div></div>
        <div class="hero-visual"><div class="hero-glow"></div><img class="hero-image" src="${imageFor('assets/brand/hero-image-cover.png')}" alt="AURA WALL’s original iridescent glass A emblem" width="1363" height="1154" fetchpriority="high"><div class="hero-caption"><span class="caption-light"></span>AURA WALL · ART OBJECTS</div></div>
      </div></section>
      <div class="ticker" aria-hidden="true"><div class="ticker-inner"><span><b>✦</b>${escapeHtml(t('tickerOne'))}</span><span><b>✦</b>${escapeHtml(t('tickerTwo'))}</span><span><b>✦</b>${escapeHtml(t('tickerThree'))}</span><span><b>✦</b>${escapeHtml(t('tickerFour'))}</span></div></div>
      <section class="section" id="categories"><div class="container"><div class="section-head"><div><div class="kicker">${escapeHtml(t('categoryKicker'))}</div><h2 class="section-title">${escapeHtml(t('categoryTitle'))}</h2><p class="section-description">${escapeHtml(t('categoryDescription'))}</p></div></div>
        <div class="category-grid">${cats.map(c=>`<a class="category-card reveal" href="${urlFor(c.href)}" aria-label="Explore ${escapeHtml(c.name)}"><img class="cover-image" src="${imageFor(c.img)}" alt="${escapeHtml(c.alt)}" loading="lazy" decoding="async"><span class="category-number">${c.num} / 04</span><div class="category-content"><div><h3 class="category-name">${escapeHtml(c.name)}</h3><span class="category-sub">${escapeHtml(c.sub)}</span></div><span class="category-arrow" aria-hidden="true">↗</span></div></a>`).join('')}</div>
      </div></section>
      <section class="section-compact" id="featured"><div class="container"><div class="section-head"><div><div class="kicker">${escapeHtml(t('featuredKicker'))}</div><h2 class="section-title">${escapeHtml(t('featuredTitle'))}</h2><p class="section-description">${escapeHtml(t('featuredDescription'))}</p></div><a class="text-link" href="${urlFor('anime/')}">${escapeHtml(t('viewAll'))} <span aria-hidden="true">↗</span></a></div><div class="product-grid">${featured.map(productCard).join('')}</div></div></section>
      <section class="section"><div class="container"><div class="section-head"><div><div class="kicker">${escapeHtml(t('collectionKicker'))}</div><h2 class="section-title">${escapeHtml(t('collectionTitle'))}</h2><p class="section-description">${escapeHtml(t('collectionDescription'))}</p></div></div><div class="signature-grid">${signature.map((s,i)=>`<a class="signature-card reveal" href="${urlFor(s.href)}"><div class="signature-img-wrap"><img src="${imageFor(s.p.image)}" alt="${escapeHtml(s.p.title)}" loading="lazy"><span class="signature-index">0${i+1}</span></div><div class="signature-copy"><div><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.copy)}</p></div><span class="category-arrow" aria-hidden="true">↗</span></div></a>`).join('')}</div></div></section>
      ${homeCustomPromo()}
      <section class="brand-statement"><div class="container statement-inner"><h2 class="statement-title">${escapeHtml(t('statement')).replace(escapeHtml(t('statementAccent')),`<span>${escapeHtml(t('statementAccent'))}</span>`)}</h2><p class="statement-note">${escapeHtml(t('statementNote'))}</p></div></section>
      <section class="section-compact"><div class="container contact-band"><div><div class="kicker">${escapeHtml(t('contactCTA'))}</div><h2 class="section-title">${escapeHtml(t('contactCopy'))}</h2></div><a class="button button-primary" href="${waUrl('Hello AURA WALL, I have an idea for a wall-art piece.')}" target="_blank" rel="noopener noreferrer">${escapeHtml(t('contactButton'))} <span class="arrow">↗</span></a></div></section>
    </main>`;
  };
  const homeCustomPromo = () => `<section class="section-compact"><div class="container custom-promo"><div class="custom-promo-copy"><div class="kicker">${escapeHtml(t('customKicker'))}</div><h2 class="section-title">${escapeHtml(t('customTitle'))}</h2><p class="section-description">${escapeHtml(t('customDescription'))}</p><a class="button button-primary" href="${urlFor('personalized-art/')}">${escapeHtml(t('customCTA'))} <span class="arrow">↗</span></a></div><div class="custom-promo-images"><div class="custom-promo-image image-one"><img src="${imageFor('assets/custom/personalized-example-01.png')}" alt="Personalized plexiglass wall art example" loading="lazy"></div><div class="custom-promo-image image-two"><img src="${imageFor('assets/custom/personalized-example-02.png')}" alt="A second personalized wall art example" loading="lazy"><span class="custom-promo-label">${escapeHtml(t('customLabelTwo'))}</span></div></div></div></section>`;

  const collectionInfo = (category) => ({
    anime: {name:t('anime'),title:t('collectionAnimeTitle'),description:t('collectionAnimeDesc'),cover:'assets/categories/anime.jpg'},
    gaming: {name:t('gaming'),title:t('collectionGamingTitle'),description:t('collectionGamingDesc'),cover:'assets/categories/gaming.jpg'},
    'movies-series': {name:t('movies'),title:t('collectionMoviesTitle'),description:t('collectionMoviesDesc'),cover:'assets/categories/movies-series.jpg'}
  })[category] || {name:t('anime'),title:t('collectionAnimeTitle'),description:t('collectionAnimeDesc'),cover:'assets/categories/anime.jpg'};
  const getAnimeSubInfo = () => [
    {key:'naruto', label:t('naruto'), slug:'naruto'}, {key:'one-piece', label:t('onePiece'), slug:'one-piece'},
    {key:'dragon-ball-z', label:t('dragonBall'), slug:'dragon-ball-z'}, {key:'more-anime', label:t('moreAnime'), slug:'more-anime'}
  ];
  const getFilteredCollection = (category, subcategorySlug = '') => PRODUCTS.filter(p => p.category === category && (!subcategorySlug || p.subcategorySlug === subcategorySlug));
  const filterMatches = (p, filter) => {
    if (filter === 'all') return true;
    const q = plain(filter);
    return plain([p.title,p.franchise,p.character,...(p.tags || [])].join(' ')).includes(q);
  };
  const collectionPage = (category, subcategorySlug = '') => {
    const info = collectionInfo(category);
    const animeSubInfo = getAnimeSubInfo();
    const subcategory = animeSubInfo.find(s=>s.slug===subcategorySlug);
    const items = getFilteredCollection(category, subcategorySlug);
    const title = subcategory ? `${subcategory.label} — ${language==='ar'?'أعمال جدارية':'Wall Art'}` : info.title;
    const desc = subcategory ? `${language==='ar'?'اكتشف أعمالاً فنية مستوحاة من':'Discover artwork inspired by'} ${subcategory.label}.` : info.description;
    let displayItems = items;
    if (activeFilter !== 'all') displayItems = items.filter(p=>filterMatches(p,activeFilter));
    const filters = category === 'anime' ? `<div class="filter-row" aria-label="Anime subcategories"><a class="filter-chip ${!subcategorySlug?'active':''}" href="${urlFor('anime/')}">${escapeHtml(t('allAnime'))}</a>${animeSubInfo.map(s=>`<a class="filter-chip ${subcategorySlug===s.slug?'active':''}" href="${urlFor('anime/'+s.slug+'/')}">${escapeHtml(s.label)}</a>`).join('')}</div>` : `<div class="filter-row">${[t('collectionAll'),...(category==='gaming'?['Cyberpunk 2077','Grand Theft Auto','Valorant','The Witcher']:['Game of Thrones','Peaky Blinders','Breaking Bad','Batman','John Wick','Joker'])].map((f,i)=>`<button type="button" data-filter="${i===0?'all':escapeHtml(f)}" class="filter-chip ${activeFilter===(i===0?'all':f)?'active':''}">${escapeHtml(f)}</button>`).join('')}</div>`;
    return `<main id="main">
      <section class="collection-hero"><div class="container"><div class="collection-topline"><div class="breadcrumbs"><a href="${urlFor('')}">${escapeHtml(t('home'))}</a><span>／</span><a href="${urlFor(category+'/')}">${escapeHtml(info.name)}</a>${subcategory?`<span>／</span><strong>${escapeHtml(subcategory.label)}</strong>`:''}</div><span>${String(items.length).padStart(2,'0')} ${escapeHtml(t('resultCount'))}</span></div><div class="kicker">${escapeHtml(t('collectionKicker'))}</div><h1 class="collection-title">${escapeHtml(title)}</h1><p class="collection-intro">${escapeHtml(desc)}</p><div class="collection-controls">${filters}<span class="result-count">${displayItems.length} / ${items.length} ${escapeHtml(t('resultCount'))}</span></div></div></section>
      <section class="section-compact"><div class="container"><div id="collection-grid">${productGrid(displayItems,visibleCount)}</div>${displayItems.length>visibleCount?`<div class="show-more-wrap"><button class="button button-secondary" type="button" data-action="show-more">${escapeHtml(t('showMore'))} <span class="arrow">＋</span></button></div>`:''}</div></section>
      <section class="brand-statement"><div class="container statement-inner"><h2 class="statement-title">${escapeHtml(t('statement'))}</h2><p class="statement-note">${escapeHtml(t('statementNote'))}</p></div></section>
    </main>`;
  };

  const productPage = (p) => {
    const backRoute = p.category === 'anime' ? `anime/${p.subcategorySlug}/` : `${p.category}/`;
    const related = PRODUCTS.filter(q=>q.id!==p.id && (q.category===p.category && (q.franchise===p.franchise || q.subcategory===p.subcategory))).slice(0,4);
    const message = `Hello AURA WALL, I'd like to ask about the artwork: ${p.title}. Could you share the available plexiglass sizes and finish options?`;
    return `<main id="main"><section class="detail"><div class="container"><a class="detail-back" href="${urlFor(backRoute)}"><span aria-hidden="true">←</span> ${escapeHtml(t('detailBack'))}</a><div class="detail-grid"><div class="detail-image-wrap"><img class="detail-image" src="${imageFor(p.image)}" alt="${escapeHtml(p.title)} — premium plexiglass wall art" width="700" height="920" fetchpriority="high"></div><div class="detail-copy"><div class="detail-category">${escapeHtml(localCategory(p.category))} · ${escapeHtml(localSubcategory(p.subcategory))}</div><h1 class="detail-title" dir="auto">${escapeHtml(p.title)}</h1><p class="detail-description">${escapeHtml(p.description)}</p><div class="detail-meta-row"><div class="detail-meta-label">${escapeHtml(t('category'))}</div><div class="detail-meta-value">${escapeHtml(localCategory(p.category))}</div></div><div class="detail-tags">${(p.tags||[]).slice(0,5).map(tag=>`<span class="detail-tag">${escapeHtml(tag)}</span>`).join('')}</div><a class="button button-primary" href="${waUrl(message)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t('detailOrder'))}<span class="arrow">↗</span></a><div class="detail-assurance"><span class="assurance-icon">✦</span><span>${escapeHtml(t('assurance'))}</span></div></div></div></div></section>${related.length?`<section class="section related-section"><div class="container"><div class="section-head"><div><div class="kicker">${escapeHtml(t('collectionKicker'))}</div><h2 class="section-title">${escapeHtml(t('relatedTitle'))}</h2></div><a class="text-link" href="${urlFor(backRoute)}">${escapeHtml(t('viewAll'))} ↗</a></div><div class="product-grid">${related.map(productCard).join('')}</div></div></section>`:''}</main>`;
  };

  const customPage = () => {
    const steps = [
      {n:'01', title:t('step1'), copy:t('step1copy')},{n:'02',title:t('step2'),copy:t('step2copy')},{n:'03',title:t('step3'),copy:t('step3copy')},{n:'04',title:t('step4'),copy:t('step4copy')},{n:'05',title:t('step5'),copy:t('step5copy')}
    ];
    return `<main id="main"><section class="custom-hero"><div class="container custom-grid"><div><div class="kicker">${escapeHtml(t('customIntroKicker'))}</div><h1 class="custom-title">${escapeHtml(t('customIntroTitle'))}</h1><p class="custom-lede">${escapeHtml(t('customIntroCopy'))}</p><a class="button button-primary" href="#custom-request" data-action="jump-to-request">${escapeHtml(t('customCTA'))}<span class="arrow">↘</span></a></div><div class="custom-showcase"><div class="custom-example-grid"><div class="custom-example"><img src="${imageFor('assets/custom/personalized-example-01.png')}" alt="Example of personalized portrait wall art" width="480" height="620" loading="eager"><div class="custom-example-caption">${escapeHtml(t('customLabelOne'))}</div></div><div class="custom-example"><img src="${imageFor('assets/custom/personalized-example-02.png')}" alt="Example of custom wall art in a room" width="480" height="620" loading="lazy"><div class="custom-example-caption">${escapeHtml(t('customLabelTwo'))}</div></div></div></div></div></section>
      <section class="section"><div class="container"><div class="kicker">${escapeHtml(t('customKicker'))}</div><h2 class="section-title">${escapeHtml(t('customView'))}</h2><p class="section-description">${escapeHtml(t('customDescription'))}</p><div class="process-grid">${steps.map(s=>`<div class="process-step reveal"><div class="step-number">${s.n} / 05</div><h3 class="step-title">${escapeHtml(s.title)}</h3><p class="step-copy">${escapeHtml(s.copy)}</p></div>`).join('')}</div>
      <form class="custom-form" id="custom-request"><div class="kicker">${escapeHtml(t('customIntroKicker'))}</div><h2 class="section-title" style="font-size:clamp(27px,4vw,40px)">${escapeHtml(t('requestTitle'))}</h2><p class="section-description">${escapeHtml(t('requestDescription'))}</p><div class="form-grid" style="margin-top:25px"><div class="form-field"><label for="custom-type">${escapeHtml(t('formType'))}</label><select id="custom-type" name="type" required><option value="" selected disabled>${escapeHtml(t('formTypePlaceholder'))}</option><option>${escapeHtml(t('formPhoto'))}</option><option>${escapeHtml(t('formCouple'))}</option><option>${escapeHtml(t('formFamily'))}</option><option>${escapeHtml(t('formGaming'))}</option><option>${escapeHtml(t('formAnime'))}</option><option>${escapeHtml(t('formCharacter'))}</option><option>${escapeHtml(t('formPoster'))}</option><option>${escapeHtml(t('formOther'))}</option></select></div><div class="form-field"><label for="custom-name">${escapeHtml(t('formName'))}</label><input id="custom-name" name="name" type="text" maxlength="70" placeholder="${escapeHtml(t('formNamePlaceholder'))}"></div><div class="form-field full"><label for="custom-details">${escapeHtml(t('formDetails'))}</label><textarea id="custom-details" name="details" maxlength="1200" placeholder="${escapeHtml(t('formDetailsPlaceholder'))}" required></textarea><span class="form-hint">${escapeHtml(t('formHint'))}</span></div></div><div class="form-actions"><button class="button button-primary" type="submit">${escapeHtml(t('formSubmit'))}<span class="arrow">↗</span></button></div></form></div></section></main>`;
  };

  const searchPage = () => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const results = searchProducts(q, PRODUCTS);
    return `<main id="main"><section class="collection-hero"><div class="container"><div class="breadcrumbs"><a href="${urlFor('')}">${escapeHtml(t('home'))}</a><span>／</span><strong>${escapeHtml(t('search'))}</strong></div><div class="kicker" style="margin-top:28px">${escapeHtml(t('search'))}</div><h1 class="collection-title" style="font-size:clamp(37px,5vw,64px)">${q?`${escapeHtml(t('searchResultsFor'))} “${escapeHtml(q)}”`:escapeHtml(t('searchPageTitle'))}</h1><p class="collection-intro">${escapeHtml(t('searchPageDescription'))}</p><form id="search-page-form" class="search-page-form" role="search"><div class="search-input-wrap"><span class="search-magnify" aria-hidden="true">⌕</span><input class="search-input" name="q" value="${escapeHtml(q)}" type="search" placeholder="${escapeHtml(t('searchType'))}" aria-label="${escapeHtml(t('search'))}"></div></form><div class="result-count" style="margin-top:20px">${results.length} ${escapeHtml(t('resultCount'))}</div></div></section><section class="section-compact"><div class="container">${q?productGrid(results,results.length):`<div class="product-empty"><h3>${escapeHtml(t('searchPageTitle'))}</h3><p>${escapeHtml(t('searchEmptyHint'))}</p></div>`}</div></section></main>`;
  };

  const fallbackPage = (segments) => `<main id="main" class="route-fallback"><div class="kicker">AURA WALL</div><h1>${escapeHtml(t('loading'))}</h1><p>${escapeHtml(t('collectionDescription'))}</p></main>`;
  const routeActive = (segments) => segments[0] || 'home';
  function renderApp() {
    if (!app) return;
    const seg = route();
    const p = getProductAtRoute(seg);
    let body = '';
    let active = routeActive(seg);
    if (p) { body = productPage(p); active = p.category; }
    else if (seg.length === 0) { body = homePage(); active = 'home'; }
    else if (seg[0] === 'search') { body = searchPage(); active = 'search'; }
    else if (seg[0] === 'personalized-art') { body = customPage(); active = 'personalized-art'; }
    else if (seg[0] === 'anime') { body = collectionPage('anime',seg[1]||''); active = 'anime'; }
    else if (seg[0] === 'gaming') { body = collectionPage('gaming'); active = 'gaming'; }
    else if (seg[0] === 'movies-series') { body = collectionPage('movies-series'); active = 'movies-series'; }
    else { body = fallbackPage(seg); }
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    const activeLabel = active === 'anime' || active === 'gaming' || active === 'movies-series' || active === 'personalized-art' ? active : (active==='home'?'home':'');
    app.innerHTML = `<div class="site-shell">${header(activeLabel)}${body}${footer()}${whatsappFloat()}${searchOverlay()}</div>`;
    observeReveal();
    if (searchOpen) {
      const field = document.getElementById('search-input');
      renderOverlayResults(field ? field.value : '');
      if (field) { field.focus(); field.select(); }
    }
  }
  function observeReveal() {
    const nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(n=>n.classList.add('is-visible')); return;
    }
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }), {threshold:.08});
    nodes.forEach(n=>observer.observe(n));
  }
  function renderOverlayResults(query) {
    const root = document.getElementById('search-results');
    if (!root) return;
    const q = String(query || '').trim();
    if (!q) {
      const picks = homeFeatured().slice(0,4);
      root.innerHTML = `<div class="search-empty">${escapeHtml(t('searchStart'))}</div>${picks.map(searchResultRow).join('')}`;
      return;
    }
    const found = searchProducts(q, PRODUCTS, 7);
    if (!found.length) { root.innerHTML = `<div class="search-empty"><strong>${escapeHtml(t('noResultsTitle'))}</strong><br>${escapeHtml(t('noResultsText'))}</div>`; return; }
    root.innerHTML = found.map(searchResultRow).join('') + `<a class="text-link" style="margin:7px 0 0 8px;width:fit-content" href="${urlFor('search/?q='+encodeURIComponent(q))}">${escapeHtml(t('viewAll'))} ↗</a>`;
  }
  const searchResultRow = (p) => `<a class="search-result" href="${urlFor(p.route+'/')}"><img src="${imageFor(p.image)}" alt="" loading="lazy"><div><div class="search-result-title" dir="auto">${escapeHtml(p.title)}</div><div class="search-result-meta">${escapeHtml(localCategory(p.category))} · ${escapeHtml(localSubcategory(p.subcategory))}</div></div></a>`;
  function showToast(message) {
    const el = document.getElementById('toast'); if (!el) return;
    el.textContent = message; el.classList.add('show');
    window.setTimeout(()=>el.classList.remove('show'),2300);
  }
  function goSearch(query) { window.location.href = urlFor('search/?q='+encodeURIComponent(query.trim())); }

  document.addEventListener('click', (event) => {
    const filterEl = event.target.closest('[data-filter]');
    if (filterEl) {
      event.preventDefault(); activeFilter = filterEl.getAttribute('data-filter') || 'all'; visibleCount = 12; renderApp(); return;
    }
    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) {
      if (event.target.id === 'search-overlay') { searchOpen = false; renderApp(); }
      return;
    }
    const action = actionEl.getAttribute('data-action');
    if (action === 'open-search') { event.preventDefault(); searchOpen = true; renderApp(); }
    else if (action === 'close-search') { event.preventDefault(); searchOpen = false; renderApp(); }
    else if (action === 'toggle-language') {
      event.preventDefault(); language = language === 'en' ? 'ar' : 'en';
      try { localStorage.setItem('aura-wall-language',language); } catch (_) {}
      renderApp();
    } else if (action === 'toggle-menu') { event.preventDefault(); mobileMenuOpen = !mobileMenuOpen; renderApp(); }
    else if (action === 'show-more') { event.preventDefault(); visibleCount += 12; renderApp(); }
    else if (action === 'jump-to-request') { event.preventDefault(); const f=document.getElementById('custom-request'); if(f) f.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); }
  });
  document.addEventListener('input', (event) => {
    if (event.target && event.target.id === 'search-input') renderOverlayResults(event.target.value);
  });
  document.addEventListener('submit', (event) => {
    if (event.target.id === 'search-form') {
      event.preventDefault(); const field = document.getElementById('search-input'); if (field && field.value.trim()) goSearch(field.value);
    } else if (event.target.id === 'search-page-form') {
      event.preventDefault(); const field = event.target.querySelector('input[name="q"]'); if (field && field.value.trim()) goSearch(field.value);
    } else if (event.target.id === 'custom-request') {
      event.preventDefault(); const form = event.target;
      const type = form.elements.type.value;
      const name = form.elements.name.value.trim();
      const details = form.elements.details.value.trim();
      const message = `Hello AURA WALL! I'd like to request a personalized artwork.\nType: ${type}\n${name ? `Name: ${name}\n` : ''}Idea and details: ${details}\n\nI'll send any reference images in this chat.`;
      const destination = waUrl(message);
      const newTab = window.open(destination,'_blank','noopener,noreferrer');
      if (!newTab) window.location.href = destination;
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && searchOpen) { searchOpen = false; renderApp(); }
    if (event.key === '/' && !searchOpen && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) { event.preventDefault(); searchOpen = true; renderApp(); }
  });

  renderApp();
})();
