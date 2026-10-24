import React,{useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,useNavigate,useLocation} from 'react-router-dom';
import {AnimatePresence,motion} from 'framer-motion';
import {ArrowUpRight,ChevronRight,Globe,Menu,MessageCircle,Search,X,Sparkles,SlidersHorizontal,Instagram} from 'lucide-react';
import {products} from './data';
import './styles.css';

const WA='212627025271';
const wa=(message='Hello, I’m interested in AURA WALL artwork.')=>`https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
const cover={
  Anime:'/assets/anime-category-cover.jpg',
  Gaming:'/assets/gaming-category-cover.jpg',
  'Movies & Series':'/assets/movies-&-series-category-cover.jpg',
  'Personalized Art':'/assets/personalized-art-category-cover.jpg'
};
const cats=['Anime','Gaming','Movies & Series','Personalized Art'];

const copy={
 en:{home:'Home',anime:'Anime',gaming:'Gaming','Movies & Series':'Movies & Series','Personalized Art':'Personalized Art',search:'Search artwork…',explore:'Explore artworks',create:'Create your art',order:'Order on WhatsApp',view:'View artwork',featured:'Featured artworks',collections:'Explore the collections',story:'Art that changes the atmosphere of a room.',story2:'Premium plexiglass pieces, made for the worlds you never want to leave.',custom:'Your idea. Your world. Your Aura.',custom2:'Turn a photo, character, memory or wild idea into a piece that feels completely yours.',process:'From idea to wall.',no:'No artworks found. Try another character, anime, movie or game.',back:'Back to collection',related:'You may also like',about:'A premium wall-art studio from Morocco.',rights:'© 2026 AURA WALL. All rights reserved.'},
 ar:{home:'الرئيسية',anime:'أنمي',gaming:'ألعاب','Movies & Series':'أفلام ومسلسلات','Personalized Art':'فن مخصص',search:'ابحث عن عمل فني…',explore:'استكشف الأعمال',create:'اصنع فنك',order:'اطلب عبر واتساب',view:'عرض العمل',featured:'أعمال مختارة',collections:'استكشف المجموعات',story:'فن يغيّر أجواء المكان.',story2:'أعمال فنية فاخرة من البليكسيغلاس، لعوالم لا تريد مغادرتها.',custom:'فكرتك. عالمك. هالتك.',custom2:'حوّل صورة أو شخصية أو ذكرى أو فكرة إلى عمل فني يحمل طابعك الخاص.',process:'من الفكرة إلى الحائط.',no:'لم نجد أعمالاً فنية. جرّب اسماً آخر أو أنمي أو فيلماً أو لعبة.',back:'العودة إلى المجموعة',related:'قد يعجبك أيضاً',about:'استوديو فن جداري فاخر من المغرب.',rights:'© 2026 AURA WALL. جميع الحقوق محفوظة.'}
};

function App(){
 const nav=useNavigate(), loc=useLocation();
 const [lang,setLang]=useState('en'),[menu,setMenu]=useState(false),[searchOpen,setSearchOpen]=useState(false),[q,setQ]=useState('');
 const t=copy[lang]; const rtl=lang==='ar';
 const [path,setPath]=useState(()=>window.location.pathname);
 React.useEffect(()=>setPath(loc.pathname),[loc.pathname]);
 React.useEffect(()=>{document.documentElement.dir=rtl?'rtl':'ltr';document.documentElement.lang=lang},[rtl,lang]);
 const go=(p)=>{nav(p);setMenu(false);window.scrollTo({top:0,behavior:'smooth'})};
 const isHome=path==='/';
 const searchRoute=path.startsWith('/search');
 const category=path.startsWith('/category/')?decodeURIComponent(path.split('/')[2]):null;
 const product=path.startsWith('/artwork/')?products.find(p=>p.slug===path.split('/')[2]):null;
 return <div className="app">
   <Header {...{t,rtl,lang,setLang,menu,setMenu,searchOpen,setSearchOpen,q,setQ,go}}/>
   <AnimatePresence mode="wait">
    {isHome?<Home {...{t,go,rtl}}/>:searchRoute?<SearchPage {...{t,go,q,setQ}}/>:product?<ProductPage {...{t,go,product,rtl}}/>:category?<Collection {...{t,go,category,q,setQ,rtl}}/>:<Home {...{t,go,rtl}}/>}
   </AnimatePresence>
   <Footer {...{t,go,rtl}}/>
   <a className="floating-wa" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={21}/></a>
 </div>
}

function Header({t,rtl,lang,setLang,menu,setMenu,searchOpen,setSearchOpen,q,setQ,go}){
 const navItems=[['/',t.home],['/category/Anime',t.anime],['/category/Gaming',t.gaming],['/category/Movies%20%26%20Series',t['Movies & Series']],['/category/Personalized%20Art',t['Personalized Art']]];
 return <header className="header">
  <div className="nav-shell">
   <button className="brand" onClick={()=>go('/')}><img src="/assets/AURAWALL logo.png" alt="AURA WALL"/></button>
   <nav className="desktop-nav">{navItems.map(([p,l])=><button key={p} className="nav-link" onClick={()=>go(p)}>{l}</button>)}</nav>
   <div className="nav-actions">
    <button className="icon-btn" onClick={()=>setSearchOpen(v=>!v)} aria-label="Search"><Search size={19}/></button>
    <button className="lang-btn" onClick={()=>setLang(lang==='en'?'ar':'en')}><Globe size={16}/>{lang==='en'?'AR':'EN'}</button>
    <a className="wa-mini" href={wa()} target="_blank" rel="noreferrer"><MessageCircle size={16}/><span>WhatsApp</span></a>
    <button className="menu-btn" onClick={()=>setMenu(v=>!v)} aria-label="Menu">{menu?<X/>:<Menu/>}</button>
   </div>
  </div>
  <AnimatePresence>{searchOpen&&<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="search-panel">
   <div className="search-inner"><Search size={20}/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&q.trim()){setSearchOpen(false);go('/search?q='+encodeURIComponent(q.trim()))}}} placeholder={t.search}/>{q&&<button onClick={()=>setQ('')}><X size={18}/></button>}</div>
  </motion.div>}</AnimatePresence>
  <AnimatePresence>{menu&&<motion.div className="mobile-menu" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}>
    {navItems.map(([p,l])=><button key={p} onClick={()=>go(p)}>{l}<ChevronRight size={18}/></button>)}
    <a href={wa()} target="_blank" rel="noreferrer"><MessageCircle size={18}/>WhatsApp</a>
  </motion.div>}</AnimatePresence>
 </header>
}

function Home({t,go,rtl}){
 return <motion.main key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
  <section className="hero">
   <div className="hero-media"><img src="/assets/hero image cover.png" alt="AURA WALL premium plexiglass artwork"/></div>
   <div className="hero-overlay"/>
   <div className="hero-content">
    <span className="eyebrow"><Sparkles size={14}/> AURA WALL · MOROCCO</span>
    <h1>Give Your<br/><em>Walls an Aura.</em></h1>
    <p>{t.story2}</p>
    <div className="hero-buttons"><button className="btn btn-light" onClick={()=>go('/category/Anime')}>{t.explore}<ArrowUpRight size={17}/></button><button className="btn btn-glass" onClick={()=>go('/category/Personalized%20Art')}>{t.create}</button></div>
   </div>
   <div className="hero-note">PLEXIGLASS · 30 × 40 CM · 3 MM</div>
  </section>
  <section className="intro section">
   <div><span className="eyebrow dark">THE AURA</span><h2>{t.story}</h2></div><p>{t.story2}</p>
  </section>
  <CategorySection t={t} go={go}/>
  <Featured t={t} go={go}/>
  <Custom t={t} go={go}/>
  <section className="statement"><div className="statement-inner"><Sparkles/><h2>Make space<br/><span>for what you love.</span></h2><button className="text-link" onClick={()=>go('/category/Personalized%20Art')}>{t.create}<ArrowUpRight size={18}/></button></div></section>
 </motion.main>
}

function CategorySection({t,go}){
 return <section className="section category-section"><div className="section-head"><div><span className="eyebrow dark">COLLECTIONS</span><h2>{t.collections}</h2></div><span className="index">01 — 04</span></div>
 <div className="category-grid">{cats.map((c,i)=><motion.button whileHover={{y:-5}} className="category-card" key={c} onClick={()=>go('/category/'+encodeURIComponent(c))}>
   <img src={cover[c]} alt={c}/><div className="category-shade"/><div className="category-copy"><span>0{i+1}</span><h3>{t[c]}</h3><ArrowUpRight size={21}/></div>
 </motion.button>)}</div></section>
}

function Featured({t,go}){
 const list=products.filter(p=>p.category!=='Personalized Art').slice(0,8);
 return <section className="section featured"><div className="section-head"><div><span className="eyebrow dark">CURATED</span><h2>{t.featured}</h2></div><button className="text-link" onClick={()=>go('/category/Anime')}>{t.explore}<ArrowUpRight size={18}/></button></div>
 <div className="product-grid">{list.map(p=><ProductCard key={p.id} p={p} go={go} t={t}/>)}</div></section>
}

function ProductCard({p,go,t}){
 return <motion.article className="product-card" layout whileHover={{y:-4}} onClick={()=>go('/artwork/'+p.slug)}>
   <div className="product-image"><img src={p.image} alt={p.title} loading="lazy"/><span>{t.view}<ArrowUpRight size={15}/></span></div>
   <div className="product-meta"><div><h3>{p.title}</h3><p>{p.category} · {p.subcategory}</p></div><ArrowUpRight size={17}/></div>
 </motion.article>
}


function SearchPage({t,go,q,setQ}){
 const params=new URLSearchParams(window.location.search);
 const term=q||params.get('q')||'';
 const results=products.filter(p=>[p.title,p.category,p.subcategory,p.franchise,p.character,...p.tags].join(' ').toLowerCase().includes(term.toLowerCase()));
 return <motion.main className="collection-page" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
  <section className="collection-hero search-hero"><div><span className="eyebrow dark">AURA WALL / SEARCH</span><h1>{term?`“${term}”`:'Search'}</h1><p>{term?`${results.length} artwork${results.length===1?'':'s'} found across the AURA WALL collection.`:'Find a character, franchise, anime, game, movie or artwork.'}</p></div></section>
  <section className="section collection-content"><div className="collection-toolbar"><div className="inline-search" style={{flex:1,maxWidth:520}}><Search size={17}/><input autoFocus value={term} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&e.target.value.trim())go('/search?q='+encodeURIComponent(e.target.value.trim()))}} placeholder={t.search}/></div></div>
  {results.length?<div className="product-grid">{results.map(p=><ProductCard key={p.id} p={p} go={go} t={t}/>)}</div>:<div className="empty"><Search size={28}/><h3>{t.no}</h3><button className="btn btn-dark" onClick={()=>{setQ('');go('/')}}>Back home</button></div>}</section>
 </motion.main>
}

function Collection({t,go,category,q,setQ,rtl}){
 const [sub,setSub]=useState('All');
 const subs=category==='Anime'?['All','Naruto','One Piece','Dragon Ball Z','More Anime']:category==='Personalized Art'?['All','Custom']:['All'];
 const filtered=useMemo(()=>products.filter(p=>p.category===category).filter(p=>sub==='All'||p.subcategory===sub).filter(p=>!q||[p.title,p.category,p.subcategory,p.franchise,p.character,...p.tags].join(' ').toLowerCase().includes(q.toLowerCase())),[category,sub,q]);
 return <motion.main key={'cat'+category} className="collection-page" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
   <section className="collection-hero"><div><span className="eyebrow dark">AURA WALL / COLLECTION</span><h1>{t[category]||category}</h1><p>{category==='Personalized Art'?t.custom2:'A curated wall-art collection built around the characters, worlds and stories that stay with you.'}</p></div><img src={cover[category]} alt=""/></section>
   <section className="section collection-content">
    <div className="collection-toolbar">{subs.length>1&&<div className="chips">{subs.map(s=><button className={sub===s?'active':''} onClick={()=>setSub(s)} key={s}>{s}</button>)}</div>}<div className="inline-search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.search}/><SlidersHorizontal size={16}/></div></div>
    {filtered.length?<div className="product-grid">{filtered.map(p=><ProductCard key={p.id} p={p} go={go} t={t}/>)}</div>:<div className="empty"><Search size={28}/><h3>{t.no}</h3><button className="btn btn-dark" onClick={()=>setQ('')}>Clear search</button></div>}
   </section>
 </motion.main>
}

function ProductPage({t,go,product,rtl}){
 const related=products.filter(p=>p.id!==product.id&&(p.subcategory===product.subcategory||p.franchise===product.franchise)).slice(0,4);
 const message=`Hello, I'm interested in the artwork: ${product.title}.`;
 return <motion.main key={product.id} className="detail-page" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
   <div className="detail-back"><button onClick={()=>go('/category/'+encodeURIComponent(product.category))}>← {t.back}</button></div>
   <section className="detail">
    <div className="detail-image"><img src={product.image} alt={product.title}/></div>
    <div className="detail-copy"><span className="eyebrow dark">{product.category} · {product.subcategory}</span><h1>{product.title}</h1><p>{product.description}</p><div className="detail-tags">{product.tags.slice(0,4).map(x=><span key={x}>{x}</span>)}</div><a className="btn btn-dark large" href={wa(message)} target="_blank" rel="noreferrer"><MessageCircle size={18}/>{t.order}</a><p className="micro">No online pricing. Contact AURA WALL directly for availability, finish and ordering.</p></div>
   </section>
   {related.length>0&&<section className="section related"><div className="section-head"><h2>{t.related}</h2></div><div className="product-grid">{related.map(p=><ProductCard key={p.id} p={p} go={go} t={t}/>)}</div></section>}
 </motion.main>
}

function Custom({t,go}){
 return <section className="custom section"><div className="custom-visual"><img src={cover['Personalized Art']} alt="Personalized AURA WALL artwork"/><div className="glass-badge"><Sparkles size={18}/><span>Made around<br/><b>your idea.</b></span></div></div><div className="custom-copy"><span className="eyebrow dark">PERSONAL STUDIO</span><h2>{t.custom}</h2><p>{t.custom2}</p><div className="steps">{['Choose your idea','Send your reference','We create the artwork','Approve your design','Turn it into premium wall art'].map((s,i)=><div className="step" key={s}><b>0{i+1}</b><span>{s}</span></div>)}</div><button className="btn btn-dark" onClick={()=>window.open(wa('Hello, I want to create a personalized AURA WALL artwork.'),'_blank')}>{t.create}<ArrowUpRight size={17}/></button></div></section>
}

function Footer({t,go}){
 return <footer><div className="footer-top"><div><img className="footer-logo" src="/assets/AURAWALL logo.png" alt="AURA WALL"/><p>{t.about}</p></div><div className="footer-links"><div><b>Explore</b><button onClick={()=>go('/')}>{t.home}</button><button onClick={()=>go('/category/Anime')}>{t.anime}</button><button onClick={()=>go('/category/Gaming')}>{t.gaming}</button><button onClick={()=>go('/category/Movies%20%26%20Series')}>{t['Movies & Series']}</button></div><div><b>Connect</b><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a><a href="#" onClick={e=>e.preventDefault()}>Instagram</a><a href="#" onClick={e=>e.preventDefault()}>Morocco</a></div></div></div><div className="footer-bottom"><span>{t.rights}</span><span>PLEXIGLASS / ART / AURA</span></div></footer>
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
