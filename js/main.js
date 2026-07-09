// ---- DATA ----
  // 카테고리 표시 순서
  const CATS = ["ALL","메이플스토리&랜드","DONGHAK","BELOSREA","POKER FACE","O2 BLAST"];
  // views: 조회수 (숫자만 채워주면 카테고리별로 높은 순으로 자동 정렬됩니다. 0이면 입력 순서 유지)
  const VIDEOS = [
    {cat:"메이플스토리&랜드", id:"TC8pSM7A93A", views:17000},
    {cat:"메이플스토리&랜드", id:"5eeRgnahwY8", views:15000},
    {cat:"메이플스토리&랜드", id:"Jrnrbc12iUI", views:11000},
    {cat:"메이플스토리&랜드", id:"1yaCMYXKkt8", views:9500},
    {cat:"메이플스토리&랜드", id:"yKj93qMkA9Q", views:8700},
    {cat:"메이플스토리&랜드", id:"N4t-u13EMls", views:1900},
    {cat:"DONGHAK", id:"zKo46LYb7J8", views:32000},
    {cat:"DONGHAK", id:"4MydIVad-XQ", views:8900},
    {cat:"DONGHAK", id:"TTy53pMlAlo", views:7700},
    {cat:"DONGHAK", id:"we1kgvH7Cag", views:4400},
    {cat:"BELOSREA", id:"AYBZJNnfFBo", views:10000},
    {cat:"BELOSREA", id:"9XoPTgCx7dc", views:4000},
    {cat:"BELOSREA", id:"_4L5FOT4j4Q", views:3700},
    {cat:"BELOSREA", id:"O8X5A4gGOeE", views:3100},
    {cat:"POKER FACE", id:"c0Ae9LyM5GA", views:2600},
    {cat:"POKER FACE", id:"G-4zT0cBVyk", views:2200},
    {cat:"POKER FACE", id:"Cvt9-6HC6Qk", views:1800},
    {cat:"POKER FACE", id:"3OG_muLOLUY", views:1300},
    {cat:"POKER FACE", id:"znYFGdSfXy4", views:1100},
    {cat:"O2 BLAST", id:"spqnOP4mbJ4", views:4500},
    {cat:"O2 BLAST", id:"-HToJmu7J0w", views:3400},
    {cat:"O2 BLAST", id:"WLt-YHicJzU", views:3200},
    {cat:"O2 BLAST", id:"US9eDmHtxTI", views:2700},
    {cat:"O2 BLAST", id:"3zQOKucDGv8", views:2300}
  ];

  const filtersEl = document.getElementById('filters');
  const catWrap = document.getElementById('catWrap');
  let current = "ALL";

  CATS.forEach(c=>{
    const n = c==="ALL" ? VIDEOS.length : VIDEOS.filter(v=>v.cat===c).length;
    const b=document.createElement('button');
    b.className='chip'+(c==="ALL"?' active':'');
    b.innerHTML=`${c} <span class="n">${n}</span>`;
    b.onclick=()=>{current=c;document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');render();};
    filtersEl.appendChild(b);
  });

  function thumbUrl(id){return (window.__resources && window.__resources['t_'+id]) || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;}
  function fmtShort(n){
    if(!n) return "";
    if(n>=1000){
      let k=n/1000;
      k = k>=100 ? Math.round(k) : Math.round(k*10)/10;
      return k+"K";
    }
    return n.toLocaleString();
  }
  function fmtViews(n){
    if(!n) return "";
    return "조회수 약 "+fmtShort(n);
  }
  function makeThumb(v,idx){
    const t=document.createElement('div');
    t.className='thumb';
    t.setAttribute('tabindex','0');
    t.setAttribute('role','button');
    t.setAttribute('aria-label',v.cat+' 영상 재생');
    t.innerHTML=`
      <img src="${thumbUrl(v.id)}" loading="lazy" alt="${v.cat}"
           >
      <span class="rank${idx===0?' top':''}">#${idx+1}</span>
      <span class="views-badge"><svg viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>${fmtShort(v.views)}</span>
      <div class="play"><span><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></div>`;
    t.addEventListener('click',()=>openVideo(v.id));
    t.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openVideo(v.id);}});
    return t;
  }

  function render(){
    catWrap.innerHTML='';
    const cats = CATS.filter(c=>c!=="ALL" && (current==="ALL"||current===c));
    cats.forEach((cat,ci)=>{
      // 조회수 내림차순 (동률은 입력 순서 유지)
      const list=VIDEOS.filter(v=>v.cat===cat)
        .map((v,i)=>({...v,i}))
        .sort((a,b)=> (b.views-a.views) || (a.i-b.i));

      const idxNum = String(CATS.indexOf(cat)).padStart(2,'0');
      const block=document.createElement('div');
      block.className='cat-block reveal';
      block.innerHTML=`<div class="cat-head">
          <span class="cat-idx">${idxNum}</span>
          <span class="cat-name">${cat}</span>
          <span class="cat-count">${list.length} VIDEOS</span>
          <span class="cat-note">Sorted by views</span>
        </div>`;

      const grid=document.createElement('div');
      grid.className='grid';
      list.forEach((v,idx)=>{
        const card=document.createElement('article');
        card.className='card';
        card.style.setProperty('--delay', `${Math.min(idx * 45, 360)}ms`);
        card.appendChild(makeThumb(v,idx));
        const body=document.createElement('div');
        body.className='card-body';
        body.innerHTML=`<div class="card-cat">#${idx+1} · ${v.cat}</div>
          <div class="card-views">${fmtViews(v.views)}</div>`;
        card.appendChild(body);
        grid.appendChild(card);
      });
      block.appendChild(grid);
      catWrap.appendChild(block);
      requestAnimationFrame(()=>observeReveals(block));
    });
  }

  // ---- REVEAL ON SCROLL ----
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  function observeReveals(root){
    (root||document).querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el));
    if(root && root.classList && root.classList.contains('reveal') && !root.classList.contains('in')) io.observe(root);
  }
  render();
  observeReveals();

  // ---- NAV ----
  const hdr=document.getElementById('hdr');
  window.addEventListener('scroll',()=>{hdr.classList.toggle('scrolled',window.scrollY>20);});
  const menuBtn=document.getElementById('menuBtn');
  const navlinks=document.getElementById('navlinks');
  menuBtn.onclick=()=>navlinks.classList.toggle('open');
  navlinks.querySelectorAll('a').forEach(a=>a.onclick=()=>navlinks.classList.remove('open'));

  // ---- COPY DISCORD (helper) ----
  function copyDiscord(btn){
    navigator.clipboard.writeText('jimin719').then(()=>{
      const t=btn.textContent;btn.textContent='복사됨!';
      setTimeout(()=>btn.textContent=t,1500);
    });
  }
  const copyBtn=document.getElementById('copyDiscord');
  if(copyBtn) copyBtn.onclick=()=>copyDiscord(copyBtn);

  // ---- MODAL (video + contact popup) ----
  const modal=document.getElementById('modal');
  const modalBox=document.getElementById('modalBox');
  const modalContent=document.getElementById('modalContent');
  const modalClose=document.getElementById('modalClose');

  function openModal(html){
    modalContent.innerHTML=html;
    modal.classList.add('open');
    document.body.style.overflow='hidden';
    modalClose.focus();
  }
  function closeModal(){
    modal.classList.remove('open');
    modalContent.innerHTML=''; // stop video
    document.body.style.overflow='';
  }
  function openVideo(id){
    openModal(`<div class="video-wrap"><iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`);
  }
  function openContactModal(){
    openModal(`<div class="modal-contact">
        <div class="modal-kicker">Video Editor</div>
        <h3>Jimin</h3>
        <p class="modal-intro">게임 콘텐츠와 유튜브 영상을 중심으로 컷 편집, 자막, 타이포그래피, 썸네일 디자인까지 다루는 영상 편집자입니다.</p>
        <div class="modal-profile">
          <div><span>Focus</span><strong>Game Content · YouTube</strong></div>
          <div><span>Strength</span><strong>Rhythm Cut · Subtitle · Motion</strong></div>
          <div><span>Career</span><strong>O2 BLAST · POKER FACE · DONGHAK</strong></div>
        </div>
        <p class="modal-note">영상 편집 의뢰와 협업 문의는 아래 연락처로 편하게 남겨주세요.</p>
        <div class="row">
          <a href="https://discord.com/users/jimin719" target="_blank" rel="noopener" class="btn btn-primary">Discord · jimin719</a>
          <a href="mailto:jimin0377@naver.com" class="btn btn-ghost">Email 보내기</a>
          <button type="button" class="btn btn-ghost" id="copyDiscordModal">아이디 복사</button>
        </div>
        <div class="modal-contact-info">
          <p>DISCORD <strong>jimin719</strong></p>
          <p>EMAIL <strong>jimin0377@naver.com</strong></p>
        </div>
      </div>`);
    const cb=document.getElementById('copyDiscordModal');
    if(cb) cb.onclick=()=>copyDiscord(cb);
  }

  document.getElementById('openContact').onclick=openContactModal;
  modalClose.onclick=closeModal;
  modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.classList.contains('open')) closeModal(); });

// ---- SUBTLE MOTION ENHANCEMENTS ----
window.addEventListener('load', () => {
  requestAnimationFrame(() => document.body.classList.remove('is-loading'));
});

const canAnimatePointer = window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (canAnimatePointer) {
  window.addEventListener('pointermove', (event) => {
    document.body.style.setProperty('--mx', event.clientX + 'px');
    document.body.style.setProperty('--my', event.clientY + 'px');
  }, { passive: true });
}
