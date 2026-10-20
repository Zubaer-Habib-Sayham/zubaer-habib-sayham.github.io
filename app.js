const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const storage = { get(key, fallback = null) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } }, set(key, value) { try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ } } };
const root = document.documentElement;
const github = 'https://github.com/Zubaer-Habib-Sayham/';

const projects = [
  { id:'folionest', title:'FolioNest', category:'web', subtitle:'A portfolio builder that puts the work in your hands.', tags:['React','Express','PostgreSQL','Playwright'], source:'FolioNest', live:'https://folionest.onrender.com', kind:'PRODUCT DESIGN × FULL STACK',
    introduction:'A deployed portfolio builder with 11 responsive designs, local drafts, document exports, and optional cloud publishing.',
    problem:'Creating a personal portfolio should be approachable, with useful results before a visitor needs to create an account.',
    built:['Built guided editing forms, live design previews, local autosave, validated JSON backups and restoration.','Created PDF, PNG and independent website ZIP exports; exported sites include the assets they need to work offline.','Added optional authentication, cloud drafts and public portfolio snapshots with request validation and account ownership checks.'],
    decision:'The editor and exports share a content model and renderer. Public pages use publication snapshots, so a private edit does not silently change a published portfolio.',
    verification:'Vitest/Supertest API tests and Playwright browser tests cover persistence, restoring backups, exported files, keyboard flows and offline website output.',
    boundary:'The hosted application uses free services that may take time to wake up. Its visual résumé export is rasterized, so a separate text-based CV is preferable for automated résumé parsing.',
    architecture:['React editor','Express API','PostgreSQL','Public snapshot'], cover:'folio' },
  { id:'dhaka', title:'Dhaka Tesla Pool', category:'web', subtitle:'Shared seats. Carefully coordinated systems.', tags:['React','Node.js','PostgreSQL','Integration tests'], source:'dhaka-tesla-pool', live:'https://dhaka-tesla-pool-d563.onrender.com', video:'https://youtu.be/SBBn9QTW6iY', kind:'STATE & CONCURRENCY × FULL STACK',
    introduction:'A ride-pooling MVP connecting passenger and driver workflows across the complete ride lifecycle.',
    problem:'Shared trips involve competing requests, changing seat availability, cancellations and fares that need to stay consistent.',
    built:['Developed passenger and driver accounts, ride requests, fare estimates, availability and history.','Connected acceptance, arrival, start, completion and cancellation to visible status updates for both roles.','Created an interactive browser-session demo and deployed the frontend and API with hosted PostgreSQL.'],
    decision:'Database locks serialize competing seat claims and ride changes. Validated transitions prevent invalid jumps between lifecycle states and keep ownership and fare rules consistent.',
    verification:'Automated integration tests cover role and ride ownership, concurrent claims for the last seat, repeated actions, cancellations and pool completion.',
    boundary:'This is a prototype. Payments are simulated, updates use polling, and trip animation represents lifecycle stages rather than live GPS.',
    architecture:['React dashboards','Express API','Locked transaction','PostgreSQL'], cover:'ride' },
  { id:'medicura', title:'MediCura', category:'web', subtitle:'Connecting the moving parts of healthcare.', tags:['React','Express','MySQL','SQL reporting'], source:'MediCura', kind:'WORKFLOWS × RELATIONAL DATA',
    introduction:'A university healthcare web application connecting appointments, prescriptions, records and medicine orders.',
    problem:'Patients, doctors and administrators need different views of the same underlying service, with relevant records and clear workflows.',
    built:['Developed patient, doctor and administrator views for role-specific healthcare tasks.','Implemented appointment booking, digital prescriptions and patient record access, alongside medicine browsing, carts and orders.','Built SQL sales reports for paid-order revenue, order totals, status distributions and daily sales.'],
    decision:'The workflow is organized around user roles, while consistent paid-order filters keep revenue totals and daily reporting aligned.',
    verification:'The repository and supplied project documentation show the application modules and SQL reporting implementation. Source is available for inspection.',
    boundary:'An academic project, presented as a software implementation rather than a production clinical service. No public hosted demo is currently linked.',
    architecture:['Role-based views','Express routes','SQL aggregation','MySQL'], cover:'medicura' },
  { id:'inkwell', title:'Inkwell', category:'web', subtitle:'A quiet place for words to find their shape.', tags:['Node.js','Express','EJS','JavaScript'], source:'Inkwell', live:'https://inkwell-6flo.onrender.com', kind:'SERVER RENDERING × PUBLISHING',
    introduction:'A personal publishing application focused on web fundamentals and a considered reading experience.',
    problem:'An article application needs straightforward authoring and discovery, with an interface that keeps attention on the writing.',
    built:['Implemented article creation, reading, editing, deletion with confirmation, and search.','Built responsive pages, dark mode, reading-time estimates and a custom 404 page.','Used reusable EJS partials to keep shared page elements consistent.'],
    decision:'Server-rendered EJS views and Express routing keep the request-to-page flow explicit, making HTTP, forms and CRUD behavior easy to follow.',
    verification:'The public source exposes the routes, templates, styles and article data organization. A live demo is also linked.',
    boundary:'A learning-focused publishing application, not a claim of a production editorial platform. The free live host may have a cold start.',
    architecture:['HTML forms','Express routes','EJS templates','Article data'], cover:'inkwell' },
  { id:'bookhive', title:'BookHive', category:'web', subtitle:'Giving good books another chapter.', tags:['PHP','MySQL','HTML','CSS'], source:'BookHive', kind:'COMMUNITY × WEB FUNDAMENTALS',
    introduction:'A community book-sharing project built with PHP and MySQL.',
    problem:'Readers need a way to discover books and coordinate sharing with other members of a community.',
    built:['Implemented book discovery with search and multi-field filtering.','Built book-sharing flows including timed exchanges and credit-based borrowing.','Included ratings and reviews to support community discovery.'],
    decision:'Relational records connect the book catalog, members and sharing activity, grounding the application in database-backed web fundamentals.',
    verification:'The public repository documents the sharing features and includes the PHP/MySQL implementation.',
    boundary:'A university learning project. A public hosted demo has not been verified.',
    architecture:['HTML & CSS','PHP application','Sharing records','MySQL'], cover:'book' },
  { id:'rover', title:'Reading the terrain', category:'ml', subtitle:'Teaching a rover to see the ground ahead.', tags:['Python','PyTorch','Attention U-Net','ResNet-50'], source:'Terrain-segmentation-for-autonomous-rover-navigation-using-Attention-U-Net-', kind:'COMPUTER VISION × RESEARCH',
    introduction:'Terrain segmentation on rover imagery using an Attention U-Net with a pretrained ResNet-50 encoder.',
    problem:'For navigation research, a rover image needs to become a spatial description of soil, bedrock, sand and large rocks.',
    built:['Prepared 35,283 image-mask records, reconciled annotations, resized data and applied augmentation.','Separated training, validation and test data, then implemented GPU training and checkpoint saving.','Evaluated a saved model on 3,545 test records, recording 87.65% pixel accuracy and 71.97% mean intersection over union.'],
    decision:'A pretrained encoder supplies visual features while attention helps the segmentation network focus on relevant spatial information.',
    verification:'Evaluation includes class-level precision, recall and Dice scores, a confusion matrix and visual comparisons with reference masks. The notebook is public.',
    boundary:'A research evaluation on a held-out dataset, not a deployed rover navigation system. Metrics are reported from the project’s recorded evaluation.',
    architecture:['AI4Mars imagery','ResNet-50 encoder','Attention U-Net','Pixel classes'], cover:'rover' }
];

const covers = {
  folio:'<span class="folio-orbit"></span><div class="folio-paper back"></div><div class="folio-paper"><div class="mini-nav"><span>FOLIONEST</span><span>YOUR NEXT CHAPTER ↗</span></div><div class="mini-title">Your work.<br>Your world.</div><div class="folio-mini-grid"><i></i><i></i><i></i></div></div>',
  ride:'<div class="ride-grid"></div><svg class="ride-path" viewBox="0 0 400 220"><path d="M25 170C25 50 190 190 190 90S345 20 370 90"/><circle cx="25" cy="170" r="10"/><circle cx="370" cy="90" r="10"/></svg><div class="ride-ticket"><span class="mini-label">DHAKA TESLA POOL</span><span class="ride-pill">SHARED RIDE</span><strong>Better, together.</strong><div class="mini-route">Request → Match → Ride</div></div>',
  medicura:'<div class="medicura-ring"></div><span class="medicura-symbol">✚</span><div class="medicura-ui"><strong>MediCura</strong><small>A clearer view of care.</small><div class="chart"><i style="height:32%"></i><i style="height:55%"></i><i style="height:43%"></i><i style="height:76%"></i><i style="height:62%"></i><i style="height:95%"></i></div></div>',
  inkwell:'<span class="inkwell-swoop">a</span><div class="inkwell-page"><div class="mini-label">THE INKWELL JOURNAL</div><h4>A space<br>for a story.</h4><div class="fake-lines"></div></div>',
  book:'<div class="book"><span>Another<br>chapter.</span><i>✦</i></div><div class="book second"><span>Pass<br>it on.</span><i>❧</i></div>',
  rover:'<svg class="terrain-svg" viewBox="0 0 600 340" preserveAspectRatio="none"><path fill="#a88e6c" d="M0 220L100 130L180 200L280 65L400 160L510 70L600 200V340H0Z"/><path fill="#766d55" d="M0 270L100 190L190 260L340 140L410 200L500 130L600 230V340H0Z"/><path fill="#b39772" d="M0 310L120 240L270 300L400 210L510 270L600 200V340H0Z"/><path fill="#8c947a" opacity=".7" d="M0 310L120 240L200 275L180 340H0ZM340 140L410 200L365 235L300 195ZM500 130L600 230L600 200L510 70Z"/><g fill="none" stroke="#e9d6ad" opacity=".25"><path d="M0 240L100 150L180 220L280 85L400 180L510 90L600 220M0 260L100 170L180 240L280 105L400 200L510 110L600 240M0 280L100 190L180 260L280 125L400 220L510 130L600 260"/></g></svg><div class="terrain-overlay"></div><span class="terrain-stat">71.97%<small>MEAN INTERSECTION OVER UNION</small></span><div class="terrain-label"><span>SOIL</span><span>BEDROCK</span><span>SAND</span><span>ROCKS</span></div>'
};

function renderProjects(filter = 'all') {
  const visible = projects.filter(p => filter === 'all' || p.category === filter);
  $('#projects-grid').innerHTML = visible.map((p, i) => `<article class="project-card" id="project-${p.id}" style="animation-delay:${Math.min(i * .06,.24)}s"><button class="project-cover cover-${p.cover}" data-project="${p.id}" aria-label="Read ${p.title} case study"><span class="cover-meta">${p.kind}</span><div class="cover-art" aria-hidden="true">${covers[p.cover]}</div><span class="project-open" aria-hidden="true">↗</span></button><div class="project-info"><div class="project-title-row"><h3>${p.title}</h3><span class="project-number">0${projects.indexOf(p) + 1}</span></div><p>${p.subtitle}</p><div class="project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="project-links"><button class="case-link" data-project="${p.id}">Behind the build ↗</button>${p.live?`<a href="${p.live}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>`:''}<a href="${github+p.source}" target="_blank" rel="noopener noreferrer">Source ↗</a></div></div></article>`).join('');
  $('#project-status').textContent = `${visible.length} projects shown`;
}
renderProjects();
$$('.filter').forEach(button => button.addEventListener('click', () => {
  $$('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  renderProjects(button.dataset.filter);
}));

const dialog = $('#project-dialog');
let lastProjectTrigger;
function openProject(id, trigger) {
  const p = projects.find(project=>project.id===id);
  if (!p) return;
  lastProjectTrigger = trigger;
  $('#dialog-content').innerHTML = `<div class="dialog-hero"><p class="eyebrow">FIELD NOTES / ${p.kind}</p><h2 id="dialog-title">${p.title}</h2><p>${p.introduction}</p><div class="project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div></div><div class="dialog-body"><section><h3>The starting point</h3><p>${p.problem}</p></section><section><h3>What I built</h3><ul>${p.built.map(t=>`<li>${t}</li>`).join('')}</ul></section><section><h3>A decision that mattered</h3><p>${p.decision}</p><div class="architecture-strip" aria-label="Application architecture">${p.architecture.map((t,i)=>`${i?'<span class="arrow" aria-hidden="true">→</span>':''}<span>${t}</span>`).join('')}</div></section><section><h3>How to inspect the work</h3><p>${p.verification}</p></section><div class="dialog-links">${p.live?`<a class="button button-gold" href="${p.live}" target="_blank" rel="noopener noreferrer">Open live demo ↗</a>`:''}<a class="button button-outline" href="${github+p.source}" target="_blank" rel="noopener noreferrer">Explore source code ↗</a>${p.video?`<a class="button button-outline" href="${p.video}" target="_blank" rel="noopener noreferrer">Watch walkthrough ↗</a>`:''}</div><p class="dialog-footnote">${p.boundary}</p></div>`;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  dialog.scrollTop = 0;
  $('#dialog-close').focus();
}
document.addEventListener('click', event=>{
  const trigger=event.target.closest('[data-project]');
  if(trigger) openProject(trigger.dataset.project,trigger);
});
$('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close();}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';lastProjectTrigger?.focus();});

const skills = {
  interfaces:{title:'The part people<br>feel first.',text:'Responsive layouts, guided forms, clear states and reusable components. I build with React, HTML and CSS, and pay attention to how an interface works across screens and input methods.',tags:['React','JavaScript','HTML & CSS','Responsive design'],projects:['folionest','inkwell','medicura']},
  apis:{title:'Behind every interaction,<br>a dependable system.',text:'Express routes, request validation, authentication and ownership checks connect user actions to the right data. I like making state changes explicit and thinking through competing requests.',tags:['Node.js','Express','REST APIs','Validation'],projects:['dhaka','folionest','medicura']},
  data:{title:'Structure that makes<br>the story possible.',text:'Relational data models and SQL turn application records into useful workflows and reports. My computer vision work adds another perspective: preparing data carefully, then evaluating what the model learned.',tags:['PostgreSQL','MySQL','SQL','Python & PyTorch'],projects:['medicura','bookhive','rover']},
  testing:{title:'Confidence is built<br>one check at a time.',text:'I test the flows that matter: saving and restoring work, downloading usable files, enforcing ownership and handling two requests for the final seat. API and browser tests look at different parts of the same system.',tags:['Vitest','Supertest','Playwright','Integration tests'],projects:['folionest','dhaka']},
  deployment:{title:'An idea should make it<br>out of the notebook.',text:'I use Git and GitHub to track work and deploy web applications so others can try them. My projects connect hosted frontends, APIs and SQL databases; this portfolio is served as a static site for a fast first visit.',tags:['Git & GitHub','Render','Hosted PostgreSQL','Static hosting'],projects:['folionest','dhaka','inkwell']}
};
const visited = new Set();
$$('.star-node').forEach(button=>button.addEventListener('click',()=>{
  const key=button.dataset.skill,s=skills[key]; visited.add(key);
  $$('.star-node').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  button.classList.add('visited');
  $('#stars-explored').textContent=`${visited.size} / 5 stars explored`;
  $('#skill-story').innerHTML=`<span class="story-index">✦ ${key==='apis'?'APIS & SYSTEMS':key.toUpperCase()}</span><h3>${s.title}</h3><p>${s.text}</p><div class="skill-tags">${s.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="evidence-links">${s.projects.map(id=>`<button data-project="${id}">${projects.find(p=>p.id===id).title} ↗</button>`).join('')}</div>`;
  if(visited.size===5){$('#constellation-completion').hidden=false;sayOwl('Five stars, one connected craft. Nicely explored.');}
}));

let audio;
function updateTheme() {
  const day=root.dataset.theme==='day';
  $('#theme-toggle').setAttribute('aria-pressed',String(day));
  $('#theme-toggle').setAttribute('aria-label',`Switch to ${day?'night':'day'}`);
  $('#theme-label').textContent=day?'Day':'Night';
  $('.theme-orbit').textContent=day?'☀':'☾';
  $('meta[name="theme-color"]').content=day?'#f6f3ea':'#101c1d';
  audio?.setTheme(day);
}
updateTheme();
$('#theme-toggle').addEventListener('click',async()=>{
  const next=root.dataset.theme==='day'?'night':'day';
  const button=$('#theme-toggle');
  if(next==='day'&&!$('.scene-day').classList.contains('ready')){
    button.disabled=true;
    const image=new Image();
    image.src=window.matchMedia('(max-width:760px)').matches?'assets/observatory-day-small.webp':'assets/observatory-day.webp';
    try{await image.decode();}catch{ /* The color transition still works if artwork is unavailable. */ }
    $('.scene-day').classList.add('ready');
    button.disabled=false;
  }
  root.dataset.theme=next;
  storage.set('observatory-theme',root.dataset.theme); updateTheme();
  sayOwl(root.dataset.theme==='day'?'A new light. The same curious mind.':'Welcome to the night shift.');
});
$('#menu-toggle').addEventListener('click',()=>{
  const open=$('nav').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));$('#menu-toggle').setAttribute('aria-label',open?'Close navigation':'Open navigation');
});
$$('nav a').forEach(a=>a.addEventListener('click',()=>{$('nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','Open navigation');}));

const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const motionChoice=storage.get('observatory-motion');
const reduceMotion=motionChoice===null?prefersReduced.matches:motionChoice==='reduced';
$('#motion-toggle').checked=reduceMotion;
function setMotion(reduce){root.classList.toggle('reduce-motion',reduce);root.classList.toggle('js-motion',!reduce);}
setMotion(reduceMotion);
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
$$('.reveal').forEach(el=>observer.observe(el));
$('#motion-toggle').addEventListener('change',e=>{setMotion(e.target.checked);storage.set('observatory-motion',e.target.checked?'reduced':'full');});
prefersReduced.addEventListener('change',e=>{if(storage.get('observatory-motion')===null){$('#motion-toggle').checked=e.matches;setMotion(e.matches);}});

for(let i=0;i<18;i++){const particle=document.createElement('i');particle.className='firefly';particle.style.cssText=`left:${(i*37.71)%95}%;top:${35+(i*17.3)%60}%;animation-delay:${-(i*.72)}s;animation-duration:${7+i%5}s`;$('.fireflies').append(particle);}
let owlTimer,flightTimer,owlLandingTimer,lastY=window.scrollY,scrollQueued=false;
const owl=$('#owl-companion');
['home','work','constellation','about','contact'].forEach(id=>{
  const section=document.getElementById(id),branch=document.createElement('span');
  section.classList.add('has-owl-perch');branch.className='owl-landing-pad';branch.setAttribute('aria-hidden','true');
  branch.innerHTML='<svg viewBox="0 0 120 80"><path class="branch-main" d="M8 70c28-4 42-25 65-24 17 0 26-7 38-15M51 54L34 32m41 13 4-24m-38 21-15-1m63 1 5-14"/><path class="branch-leaf" d="M35 33c-16-3-14-15-14-15s15 0 14 15M78 27c-5-16 7-21 7-21s7 14-7 21M93 31c-1-13 11-16 11-16s2 13-11 16"/><circle class="perch-point" cx="68" cy="46" r=".5"/></svg>';
  section.append(branch);
});
const feetAnchor=document.createElementNS('http://www.w3.org/2000/svg','circle');feetAnchor.id='owl-feet-anchor';feetAnchor.setAttribute('cx','120');feetAnchor.setAttribute('cy','155');feetAnchor.setAttribute('r','.1');feetAnchor.setAttribute('opacity','0');$('.coded-owl').append(feetAnchor);
let owlFrame=0,owlY=Math.max(100,innerHeight-190),owlX=0,owlTargetY=owlY,owlTargetX=0;
function paintOwl(){owl.style.setProperty('--owl-y',`${owlY.toFixed(1)}px`);owl.style.setProperty('--owl-x',`${owlX.toFixed(1)}px`);}
function nearestPerch(){
  const points=$$('.perch-point').map(point=>({point,rect:point.getBoundingClientRect()})).filter(p=>p.rect.top>125&&p.rect.top<innerHeight-45);
  points.sort((a,b)=>Math.abs(a.rect.top-innerHeight*.65)-Math.abs(b.rect.top-innerHeight*.65));
  return points[0]||null;
}
function pointOwlAtPerch(){
  const landing=nearestPerch();
  if(!landing)return false;
  const feet=feetAnchor.getBoundingClientRect();
  owlTargetY=landing.rect.top-(feet.top-owlY);
  owlTargetX=landing.rect.left-(feet.left-owlX);
  return true;
}
function flyOwl(){
  owlY+=(owlTargetY-owlY)*.075;owlX+=(owlTargetX-owlX)*.075;paintOwl();
  if(Math.abs(owlTargetY-owlY)>.3||Math.abs(owlTargetX-owlX)>.3)owlFrame=requestAnimationFrame(flyOwl);
  else{owlY=owlTargetY;owlX=owlTargetX;paintOwl();owlFrame=0;}
}
function startOwlFlight(delta){
  if(!pointOwlAtPerch()){
    owlTargetY=Math.max(100,Math.min(innerHeight-145,innerHeight*.5+Math.sin(window.scrollY/520)*innerHeight*.14));
    owlTargetX=innerWidth<761?-5:-12-Math.min(Math.abs(delta),35);
  }
  owl.classList.add('flying');owl.style.setProperty('--owl-tilt',`${Math.max(-9,Math.min(9,delta*.15))}deg`);
  if(!owlFrame)owlFrame=requestAnimationFrame(flyOwl);
  clearTimeout(flightTimer);clearTimeout(owlLandingTimer);
  flightTimer=setTimeout(()=>{
    if(!pointOwlAtPerch()){owlTargetY=Math.max(100,innerHeight-170);owlTargetX=0;}
    owl.style.setProperty('--owl-tilt','0deg');if(!owlFrame)owlFrame=requestAnimationFrame(flyOwl);
    owlLandingTimer=setTimeout(()=>{
      cancelAnimationFrame(owlFrame);owlFrame=0;
      pointOwlAtPerch();owlY=owlTargetY;owlX=owlTargetX;paintOwl();owl.classList.remove('flying');
    },650);
  },650);
}
paintOwl();
window.addEventListener('load',()=>{if(pointOwlAtPerch()){owlY=owlTargetY;owlX=owlTargetX;paintOwl();}},{once:true});
window.addEventListener('resize',()=>{
  cancelAnimationFrame(owlFrame);owlFrame=0;clearTimeout(flightTimer);clearTimeout(owlLandingTimer);
  owl.classList.remove('flying');owl.style.setProperty('--owl-tilt','0deg');
  if(!pointOwlAtPerch()){owlTargetY=Math.max(100,innerHeight-170);owlTargetX=0;}
  owlY=owlTargetY;owlX=owlTargetX;paintOwl();
},{passive:true});
$('#motion-toggle').addEventListener('change',()=>{if(root.classList.contains('reduce-motion')){cancelAnimationFrame(owlFrame);owlFrame=0;clearTimeout(flightTimer);clearTimeout(owlLandingTimer);owl.classList.remove('flying');owlY=Math.max(100,innerHeight-170);owlX=0;paintOwl();}});
function sayOwl(message){if(owl.hidden)return;$('#owl-bubble').textContent=message;$('#owl-bubble').classList.add('visible');clearTimeout(owlTimer);owlTimer=setTimeout(()=>$('#owl-bubble').classList.remove('visible'),4500);}
const owlLines=['I’m Lumi. The stars connect skills to real projects.','Curiosity is a pretty good compass.','Every project has field notes. Take a closer look.','The sun-and-moon switch changes the whole world.','Your next teammate might be one conversation away.'];let owlLine=0;
$('#owl-button').addEventListener('click',()=>{sayOwl(owlLines[owlLine++%owlLines.length]);});
owl.hidden=storage.get('observatory-owl')==='hidden';$('#owl-toggle').checked=!owl.hidden;document.body.classList.toggle('owl-hidden',owl.hidden);
$('#owl-toggle').addEventListener('change',e=>{owl.hidden=!e.target.checked;document.body.classList.toggle('owl-hidden',owl.hidden);storage.set('observatory-owl',owl.hidden?'hidden':'visible');});
function onScroll(){
  if(scrollQueued)return;scrollQueued=true;
  requestAnimationFrame(()=>{
    const y=window.scrollY,delta=y-lastY;lastY=y;scrollQueued=false;
    const max=document.documentElement.scrollHeight-innerHeight;
    $('.scroll-progress').style.transform=`scaleX(${max>0?y/max:0})`;
    $('.site-header').classList.toggle('scrolled',y>110);
    if(!root.classList.contains('reduce-motion')&&!owl.hidden&&Math.abs(delta)>4)startOwlFlight(delta);
  });
}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){$$('nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${e.target.id}`));}});},{rootMargin:'-20% 0px -55% 0px',threshold:0});
['work','constellation','about'].forEach(id=>sectionObserver.observe(document.getElementById(id)));

const settings=$('#experience-settings');
$('#settings-toggle').addEventListener('click',()=>{settings.hidden=!settings.hidden;$('#settings-toggle').setAttribute('aria-expanded',String(!settings.hidden));});
document.addEventListener('click',e=>{if(!e.target.closest('.ambient-dock')){settings.hidden=true;$('#settings-toggle').setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){
  const settingsHadFocus=!settings.hidden&&settings.contains(document.activeElement);
  const navigationHadFocus=$('nav').classList.contains('open')&&$('nav').contains(document.activeElement);
  settings.hidden=true;$('#settings-toggle').setAttribute('aria-expanded','false');
  $('nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');
  $('#menu-toggle').setAttribute('aria-label','Open navigation');
  if(settingsHadFocus)$('#settings-toggle').focus();
  else if(navigationHadFocus)$('#menu-toggle').focus();
}});

// Local, gently synthesized forest ambience. No audio services, tracking or autoplay.
class NatureAudio {
  constructor(){
    const Audio=window.AudioContext||window.webkitAudioContext;
    if(!Audio)throw new Error('Audio is unavailable in this browser.');
    this.context=new Audio();this.master=this.context.createGain();this.master.gain.value=0;this.master.connect(this.context.destination);
    this.day=this.context.createGain();this.night=this.context.createGain();this.day.connect(this.master);this.night.connect(this.master);
    this.enabled=false;this.volume=Number($('#volume').value)/100;
    this.timers=[];
    this.addWind(this.day,420,.16);this.addWind(this.night,280,.12);this.addWind(this.day,1600,.012);
    this.day.gain.value=root.dataset.theme==='day'?1:0;this.night.gain.value=root.dataset.theme==='night'?1:0;
    this.scheduleBird();this.scheduleCricket();this.scheduleOwl();
  }
  addWind(bus,cutoff,gain){const c=this.context,length=c.sampleRate*5,buffer=c.createBuffer(1,length,c.sampleRate),data=buffer.getChannelData(0);let previous=0;for(let i=0;i<length;i++){previous=(previous+Math.random()*.04-.02)/1.02;data[i]=previous*4;}const source=c.createBufferSource();source.buffer=buffer;source.loop=true;const filter=c.createBiquadFilter();filter.type='lowpass';filter.frequency.value=cutoff;const level=c.createGain();level.gain.value=gain;source.connect(filter);filter.connect(level);level.connect(bus);source.start();const sway=c.createOscillator(),depth=c.createGain();sway.frequency.value=.065;depth.gain.value=gain*.2;sway.connect(depth);depth.connect(level.gain);sway.start();}
  tone(bus,frequency,duration,gain,start=0,endFrequency=frequency){if(!this.enabled||this.context.state!=='running')return;const c=this.context,t=c.currentTime+start,osc=c.createOscillator(),level=c.createGain();osc.type='sine';osc.frequency.setValueAtTime(frequency,t);osc.frequency.exponentialRampToValueAtTime(endFrequency,t+duration);level.gain.setValueAtTime(0,t);level.gain.linearRampToValueAtTime(gain,t+.025);level.gain.exponentialRampToValueAtTime(.0001,t+duration);osc.connect(level);level.connect(bus);osc.start(t);osc.stop(t+duration+.02);osc.onended=()=>{osc.disconnect();level.disconnect();};}
  later(callback,ms){const id=setTimeout(()=>{this.timers=this.timers.filter(t=>t!==id);callback.call(this);},ms);this.timers.push(id);}
  scheduleBird(){if(root.dataset.theme==='day'){const base=1800+Math.random()*1600;this.tone(this.day,base,.18,.024,0,base*1.3);this.tone(this.day,base*1.2,.24,.018,.21,base*.95);}this.later(this.scheduleBird,4500+Math.random()*7000);}
  scheduleCricket(){if(root.dataset.theme==='night')for(let i=0;i<3;i++)this.tone(this.night,3400+Math.random()*300,.065,.009,i*.13,3300);this.later(this.scheduleCricket,1200+Math.random()*2500);}
  scheduleOwl(){if(root.dataset.theme==='night'){this.tone(this.night,380,.55,.018,0,330);this.tone(this.night,350,.7,.012,.75,300);}this.later(this.scheduleOwl,45000+Math.random()*30000);}
  setTheme(day){const t=this.context.currentTime;for(const [bus,value]of[[this.day,day?1:0],[this.night,day?0:1]]){bus.gain.cancelScheduledValues(t);bus.gain.setValueAtTime(bus.gain.value,t);bus.gain.linearRampToValueAtTime(value,t+2.5);}}
  async toggle(){const enable=!this.enabled;await this.context.resume();this.enabled=enable;const t=this.context.currentTime;this.master.gain.cancelScheduledValues(t);this.master.gain.setValueAtTime(this.master.gain.value,t);this.master.gain.linearRampToValueAtTime(this.enabled?this.volume:0,t+1);return this.enabled;}
  setVolume(volume){this.volume=volume;const t=this.context.currentTime;this.master.gain.setTargetAtTime(this.enabled?volume:0,t,.2);}
}
const volume=Number(storage.get('observatory-volume','20'));$('#volume').value=Number.isFinite(volume)?Math.max(0,Math.min(60,volume)):20;$('#volume-value').value=`${$('#volume').value}%`;
$('#volume').addEventListener('input',e=>{$('#volume-value').value=`${e.target.value}%`;storage.set('observatory-volume',e.target.value);audio?.setVolume(Number(e.target.value)/100);});
$('#sound-toggle').addEventListener('click',async()=>{const button=$('#sound-toggle');button.disabled=true;try{audio??=new NatureAudio();const enabled=await audio.toggle();button.setAttribute('aria-pressed',String(enabled));button.setAttribute('aria-label',enabled?'Mute nature ambience':'Enable nature ambience');$('#sound-label').textContent=enabled?'Nature sounds on':'Nature sounds off';}catch{showToast('Nature sound isn’t available in this browser.');}finally{button.disabled=false;}});
document.addEventListener('visibilitychange',()=>{if(!audio)return;if(document.hidden)audio.context.suspend().catch(()=>{});else if(audio.enabled)audio.context.resume().catch(()=>{});});
window.addEventListener('pagehide',()=>{audio?.context.suspend().catch(()=>{});});

let toastTimeout;
function showToast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('zubaersayhamcse1@gmail.com');showToast('Email copied. Looking forward to hearing from you.');}catch{showToast('Email: zubaersayhamcse1@gmail.com');}});
const greetings=[['Hello','こんにちは'],['こんにちは','হ্যালো'],['হ্যালো','नमस्ते'],['नमस्ते','Hello']];let greetingIndex=0;
$('#greeting-toggle').addEventListener('click',()=>{greetingIndex=(greetingIndex+1)%greetings.length;$('#greeting-word').textContent=greetings[greetingIndex][0];$('#greeting-toggle').innerHTML=`${greetings[greetingIndex][1]} <span aria-hidden="true">↻</span>`;});
$('#year').textContent=new Date().getFullYear();
