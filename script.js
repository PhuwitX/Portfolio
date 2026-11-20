/* สร้างทั้งหน้าจาก site.json — แก้เนื้อหาที่ site.json ไม่ต้องแตะไฟล์นี้ */
(function(){
window.__portfolioReady=true;
var $=function(id){return document.getElementById(id)};
function esc(s){var e=document.createElement('div');e.textContent=s==null?'':s;return e.innerHTML}
function ext(u){return /^https?:/.test(u)?' target="_blank" rel="noopener noreferrer"':''}
function fmt(d){return new Date(d).toLocaleDateString('th-TH',{year:'numeric',month:'short',day:'numeric'})}
function head(s,cls){return '<div class="eyebrow">'+esc(s.eyebrow)+'</div><h2>'+esc(s.title)+'</h2>'}

function hero(p){
  $('brand').textContent=p.brand;
  $('hero').innerHTML='<div class="txt"><div class="eyebrow">'+esc(p.eyebrow)+'</div>'
   +'<h1>'+p.headline.map(esc).join('<br>')+'</h1><p>'+esc(p.subtitle)+'</p>'
   +'<div class="btns">'+p.buttons.map(function(b){return '<a class="btn '+esc(b.style)+'" href="'+esc(b.href)+'">'+esc(b.label)+'</a>'}).join('')+'</div></div>'
   +'<div class="photo zoomable" role="button" tabindex="0" data-img="'+esc(p.photo)+'" data-t="'+esc(p.photoAlt)+'" aria-label="ขยายรูป '+esc(p.photoAlt)+'"><img src="'+esc(p.photo)+'" alt="'+esc(p.photoAlt)+'"></div>';
}
function about(a,s){
  var chips=function(l){return '<div class="chips">'+l.map(function(x){return '<span>'+esc(x)+'</span>'}).join('')+'</div>'};
  return '<section id="about"><div class="wrap two"><div>'+head(a)+'<p style="margin:0">'+esc(a.text)+'</p></div>'
   +'<div>'+head(s)+s.groups.map(function(g,i){
     return (g.label?'<div class="eyebrow" style="margin-top:24px">'+esc(g.label)+'</div><div style="height:10px"></div>':'')+chips(g.items)}).join('')+'</div></div></section>';
}
function projects(s){
  return '<section id="projects"><div class="wrap">'+head(s)+'<div class="grid">'+s.items.map(function(p){
    return '<article class="card"><button class="shot zoomable" type="button" data-img="'+esc(p.image)+'" data-t="'+esc(p.imageAlt)+'" aria-label="ขยายภาพ '+esc(p.title)+'"><img src="'+esc(p.image)+'" alt="'+esc(p.imageAlt)+'" loading="lazy"><span class="zoom">ขยาย</span></button><div class="body">'
     +'<h3>'+esc(p.title)+'</h3><p>'+esc(p.description)+'</p><div class="tech"><b>Tech:</b> '+esc(p.tech)+'</div>'
     +'<div class="links">'+p.links.map(function(l){return '<a href="'+esc(l.url)+'"'+ext(l.url)+'>'+esc(l.label)+' →</a>'}).join('')+'</div></div></article>';
  }).join('')+'</div></div></section>';
}
function education(s){
  return '<section id="education"><div class="wrap">'+head(s)+'<div class="grid">'+s.items.map(function(e){
    return '<div class="edu"><div class="yr">'+esc(e.years)+'</div><div class="t">'+esc(e.title)+'</div><div>'+esc(e.school)+'</div><div style="font-weight:600">GPAX: '+esc(e.gpax)+'</div></div>';
  }).join('')+'</div></div></section>';
}
function certSection(s){
  return '<section id="certificates"><div class="wrap">'+head(s)+'<div class="filters" id="certFilters" role="group" aria-label="กรองใบรับรอง"></div><div class="grid" id="certGrid"></div></div></section>';
}
function contact(c){
  $('contact').innerHTML='<div class="wrap"><div class="l">'+'<div class="eyebrow">'+esc(c.eyebrow)+'</div><h2>'+esc(c.title)+'</h2><p>'+esc(c.text)+'</p></div>'
   +'<div class="r">'+c.links.map(function(l){return '<a href="'+esc(l.href)+'"'+(l.external?' target="_blank" rel="noopener noreferrer"':'')+'>'+esc(l.label)+'</a>'}).join('')+'</div></div>';
}

/* certificates: filter + lightbox */
function certs(items){
  var grid=$('certGrid'),filters=$('certFilters'),active='ทั้งหมด';
  items=items.slice().sort(function(a,b){return new Date(b.date)-new Date(a.date)});
  function rf(){
    var cats=['ทั้งหมด'].concat(items.map(function(i){return i.category}).filter(function(v,i,a){return a.indexOf(v)===i}));
    filters.innerHTML=cats.map(function(c){return '<button type="button" class="chip'+(c===active?' on':'')+'" data-c="'+esc(c)+'" aria-pressed="'+(c===active)+'">'+esc(c)+'</button>'}).join('');
  }
  function rg(){
    grid.innerHTML=items.filter(function(i){return active==='ทั้งหมด'||i.category===active}).map(function(i){
      return '<article class="card cert"><button class="shot zoomable" type="button" data-img="'+esc(i.image)+'" data-pdf="'+esc(i.pdf)+'" data-t="'+esc(i.title)+'" aria-label="ขยายภาพ '+esc(i.title)+'">'
       +'<img src="'+esc(i.image)+'" alt="Certificate: '+esc(i.title)+'" loading="lazy"><span class="zoom">ขยาย</span></button>'
       +'<div class="body"><span class="tag">'+esc(i.category)+'</span><h3>'+esc(i.title)+'</h3>'
       +'<div class="meta"><b>'+esc(i.issuer)+'</b> · '+esc(i.via)+'</div><div class="meta">'+fmt(i.date)+(i.hours?' · '+i.hours+' ชม.':'')+'</div>'
       +'<p>'+esc(i.description)+'</p><div class="skl">'+i.skills.map(function(s){return '<span>'+esc(s)+'</span>'}).join('')+'</div>'
       +'<div class="links"><a href="'+esc(i.pdf)+'" target="_blank" rel="noopener noreferrer">ดู Certificate →</a></div></div></article>';
    }).join('');
  }
  filters.addEventListener('click',function(e){var b=e.target.closest('.chip');if(!b)return;active=b.dataset.c;rf();rg()});
  rf();rg();
}

/* lightbox ใช้ร่วมกันทั้งหน้า: คลิกองค์ประกอบที่มี data-img */
function lightbox(){
  var lb=$('lightbox'),img=lb.querySelector('img'),link=lb.querySelector('a'),last=null;
  function open(el){
    last=el;img.src=el.dataset.img;img.alt=el.dataset.t||'';
    if(el.dataset.pdf){link.href=el.dataset.pdf;link.hidden=false}else{link.hidden=true}
    lb.hidden=false;lb.querySelector('.close').focus();
  }
  function close(){lb.hidden=true;img.src='';if(last)last.focus()}
  document.addEventListener('click',function(e){
    var el=e.target.closest('[data-img]');if(el&&!lb.contains(el)){open(el);return}
    if(e.target===lb||e.target.classList.contains('close'))close();
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&!lb.hidden){close();return}
    if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[role=button][data-img]')){e.preventDefault();open(e.target)}
  });
}

/* อนิเมชันตอนเลื่อนหน้า: ค่อยๆ โผล่ขึ้นมา */
function reveal(){
  var sel='main .wrap>.eyebrow,main .wrap>h2,main .two>div,main .grid>*,.contact .wrap>div';
  var els=[].slice.call(document.querySelectorAll(sel));
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(el){
    var i=[].indexOf.call(el.parentNode.children,el);
    el.style.setProperty('--d',Math.min(i,5)*90+'ms');
    el.classList.add('reveal');io.observe(el);
  });
}

fetch('site.json?v=4',{cache:'no-cache'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){
  document.title=d.meta.title;
  var m=document.querySelector('meta[name=description]');if(m)m.content=d.meta.description;
  $('nav').innerHTML=d.nav.map(function(n){return '<a href="'+esc(n.href)+'">'+esc(n.label)+'</a>'}).join('');
  hero(d.profile);
  $('main').innerHTML=about(d.about,d.skills)+projects(d.projects)+education(d.education)+certSection(d.certificates);
  certs(d.certificates.items);
  lightbox();
  contact(d.contact);
  $('footer').textContent=d.footer;
  reveal();
  if(location.hash){var t=document.querySelector(location.hash);if(t)t.scrollIntoView()}
}).catch(function(err){
  console.error('Portfolio load error:',err);
  $('main').innerHTML='<div class="wrap" style="padding-top:56px"><p><b>โหลดข้อมูลไม่สำเร็จ</b></p><ul><li>หากดับเบิลคลิกเปิดไฟล์ตรงๆ ให้รันผ่าน local server (python -m http.server) หรือ GitHub Pages</li><li>ตรวจว่ามีไฟล์ <code>site.json</code> อยู่โฟลเดอร์เดียวกับ index.html</li></ul></div>';
});
})();
