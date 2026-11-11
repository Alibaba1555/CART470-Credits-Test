'use strict';
// Change the names here. Supporting credits are fictional placeholders.
const creditGroups = [
  { title: 'A shared beginning.', subtitle: 'In collaboration with', people: [{role:'Project collaborator',name:'Liz Miller'}], note:'Stories, islands, and the connections between them.' },
  { title: 'The map makers.', subtitle: 'Design & development', people: [
    {role:'Project team',name:'Arielle Wong'}, {role:'Project team',name:'Sherwin Duran'},
    {role:'Project team',name:'Junming He'}, {role:'Project team',name:'Jimmy Le'},
    {role:'Project team',name:'Tianshun Wu'}] },
  { title: 'Listening to the islands.', subtitle: 'Stories & sound', people: [
    {role:'Field recordings',name:'Justin Case'}, {role:'Archival research',name:'Paige Turner'},
    {role:'Water flow supervisor',name:'River Banks'}] },
  { title: 'A little help ashore.', subtitle: 'Special thanks', people: [
    {role:'Sales associate',name:'John Porc'}, {role:'Boat maintenance',name:'Rowan Oar'},
    {role:'Seagull relations',name:'Steven Gull'}, {role:'Emotional support',name:'Sir Quacks-a-Lot'}], gull:true }
];
// Put the actual map URL here when integrating. Empty = replay this prototype.
const MAP_URL = '';
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
root.classList.add('js');
root.classList.toggle('reduced', reduce.matches);
const container = document.querySelector('#credits');
creditGroups.forEach((group,index) => {
  const section = document.createElement('section');
  section.className = `credit-section ${index % 2 === 0 ? 'right' : 'left'}`;
  const content = document.createElement('div');
  content.className='credit-content reveal';
  const label=document.createElement('span'); label.className='section-index'; label.textContent=`0${index+1} / ${group.subtitle}`;
  const title=document.createElement('h2'); title.textContent=group.title;
  content.append(label,title);
  group.people.forEach(person=>{
    const entry=document.createElement('p'); entry.className='person';
    const role=document.createElement('span'); role.className='role'; role.textContent=person.role;
    const name=document.createElement('span'); name.className='name'; name.textContent=person.name;
    entry.append(role,name); content.append(entry);
  });
  if(group.note){const note=document.createElement('p');note.className='caption';note.textContent=group.note;content.append(note);}
  if(group.gull){
    const gull=document.createElement('button');gull.className='gull';gull.setAttribute('aria-label','Say hello to Steven Gull');
    gull.innerHTML='<svg viewBox="0 0 100 70" aria-hidden="true"><path d="m38 49-2 15m13-15 1 14" stroke="#ae744b" stroke-width="2"/><path d="M15 30Q40 53 63 34Q57 13 72 15Q89 14 82 30Q86 48 62 52Q33 60 15 30Z" fill="#fcfbf3" stroke="#697771" stroke-width="1.5"/><path d="M28 38Q40 40 60 36Q52 54 28 38Z" fill="#bcc7c0"/><path d="m82 23 14 5-14 3" fill="#bd894d"/><circle cx="76" cy="22" r="1.8" fill="#293e3c"/></svg>';
    let timer;
    gull.addEventListener('click',()=>{gull.classList.remove('flying');void gull.offsetWidth;gull.classList.add('flying');const toast=document.querySelector('#gull-note');toast.textContent='Steven Gull would like a credit. And your fries.';toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),4000);});
    content.append(gull);
  }
  section.append(content);container.append(section);
});
// Names reveal once. They stay readable when scrolling back up.
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
const route=document.querySelector('#route');
const river=document.querySelector('#river');
const boat=document.querySelector('#boat');
const length=route.getTotalLength();
let scheduled=false;
// Find the point at the viewport's vertical center, then place the paper boat
// on that same point of the river. It works even when the page height changes.
function update(){
 scheduled=false;
 const rect=river.getBoundingClientRect();
 const targetY=Math.max(0,Math.min(4000,(innerHeight*.6-rect.top)/rect.height*4000));
 let low=0,high=length;
 for(let i=0;i<18;i++){const mid=(low+high)/2;if(route.getPointAtLength(mid).y<targetY)low=mid;else high=mid;}
 const point=route.getPointAtLength((low+high)/2);
 const next=route.getPointAtLength(Math.min(length,(low+high)/2+4));
 const angle=Math.atan2((next.y-point.y)*rect.height/4000,(next.x-point.x)*rect.width/1000)*180/Math.PI+90;
 boat.style.transform=`translate(${point.x/1000*rect.width-24}px,${point.y/4000*rect.height-24}px) rotate(${angle}deg)`;
 const max=document.documentElement.scrollHeight-innerHeight;
 document.querySelector('#progress').style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`;
}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);update();
const motion=document.querySelector('#motion');
let paused=reduce.matches;
function applyMotion(){root.classList.toggle('paused',paused);motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Resume water':'Pause water';motion.disabled=reduce.matches;if(reduce.matches)motion.textContent='Reduced motion';}
motion.addEventListener('click',()=>{paused=!paused;applyMotion();});
reduce.addEventListener('change',()=>{root.classList.toggle('reduced',reduce.matches);paused=reduce.matches;applyMotion();});applyMotion();
if(MAP_URL){const link=document.querySelector('#return-link');link.href=MAP_URL;link.textContent='Return to the map ↗';}
