(function(){
var grid=document.getElementById('certGrid'),filters=document.getElementById('certFilters');
var lb=document.getElementById('lightbox'),lbImg=lb.querySelector('img'),lbLink=lb.querySelector('a');
var items=[],active='ทั้งหมด';
function fmt(d){return new Date(d).toLocaleDateString('th-TH',{year:'numeric',month:'short',day:'numeric'})}
function esc(s){var e=document.createElement('div');e.textContent=s;return e.innerHTML}
function renderFilters(){
  var cats=['ทั้งหมด'].concat(items.map(function(i){return i.category}).filter(function(v,i,a){return a.indexOf(v)===i}));
  filters.innerHTML=cats.map(function(c){return '<button type="button" class="chip'+(c===active?' on':'')+'" data-c="'+esc(c)+'" aria-pressed="'+(c===active)+'">'+esc(c)+'</button>'}).join('');
}
function renderGrid(){
  var list=items.filter(function(i){return active==='ทั้งหมด'||i.category===active});
  grid.innerHTML=list.map(function(i){
    return '<article class="card cert">'
    +'<button class="shot" type="button" data-img="'+esc(i.image)+'" data-pdf="'+esc(i.pdf)+'" data-t="'+esc(i.title)+'" aria-label="ขยายภาพ '+esc(i.title)+'">'
    +'<img src="'+esc(i.image)+'" alt="Certificate: '+esc(i.title)+'" loading="lazy"><span class="zoom">ขยาย</span></button>'
    +'<div class="body"><span class="tag">'+esc(i.category)+'</span><h3>'+esc(i.title)+'</h3>'
    +'<div class="meta"><b>'+esc(i.issuer)+'</b> · '+esc(i.via)+'</div>'
    +'<div class="meta">'+fmt(i.date)+(i.hours?' · '+i.hours+' ชม.':'')+'</div>'
    +'<p>'+esc(i.description)+'</p>'
    +'<div class="skl">'+i.skills.map(function(s){return '<span>'+esc(s)+'</span>'}).join('')+'</div>'
    +'<div class="links"><a href="'+esc(i.pdf)+'" target="_blank" rel="noopener noreferrer">ดู Certificate →</a></div></div></article>';
  }).join('');
}
function closeLb(){lb.hidden=true;lbImg.src=''}
filters.addEventListener('click',function(e){var b=e.target.closest('.chip');if(!b)return;active=b.dataset.c;renderFilters();renderGrid()});
grid.addEventListener('click',function(e){var b=e.target.closest('.shot');if(!b)return;lbImg.src=b.dataset.img;lbImg.alt=b.dataset.t;lbLink.href=b.dataset.pdf;lb.hidden=false;lb.querySelector('.close').focus()});
lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('close'))closeLb()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)closeLb()});
fetch('certificates.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){
  items=d.sort(function(a,b){return new Date(b.date)-new Date(a.date)});renderFilters();renderGrid();
}).catch(function(){grid.innerHTML='<p class="muted">โหลดข้อมูลใบรับรองไม่สำเร็จ (หากเปิดไฟล์โดยตรง ให้รันผ่าน local server หรือ GitHub Pages)</p>'});
})();
