import * as THREE from 'three';
import './style.css';

const stages=[
 {name:'הקריאה למסע', icon:'🧭', x:0,z:0, fact:'אברם היה בן 75 כאשר יצא מחרן. הוא יצא עם שרי אשתו ולוט בן אחיו. (בראשית י״ב, ד׳–ה׳)', q:[
  ['מהו הציווי שפותח את הפרשה?',['לך־לך מארצך וממולדתך ומבית אביך','עשה לך תיבה','שלח את עמי','קום לך אל נינוה'],0,'בראשית י״ב, א׳.'],
  ['בן כמה היה אברם כשיצא מחרן?',['65','75','85','99'],1,'בראשית י״ב, ד׳.'],
  ['מי יצאו עם אברם מחרן?',['שרי ולוט','יצחק ויעקב','משה ואהרן','עשו וישמעאל'],0,'בראשית י״ב, ה׳.']]},
 {name:'אברם ולוט',icon:'🤝',x:-12,z:-17,fact:'אברם אמר ללוט: ״אל נא תהי מריבה ביני ובינך״. הוא בחר להציע פתרון במקום להחריף את הריב. (בראשית י״ג, ח׳–ט׳)',q:[
  ['למה נפרדו אברם ולוט?',['מפני שירדו למצרים','בגלל ריב בין הרועים ומחסור במקום','כי לוט שכח את הדרך','בגלל מלחמת המלכים'],1,'בראשית י״ג, ו׳–ט׳.'],
  ['איזה אזור בחר לוט?',['כיכר הירדן','מדבר סיני','הר הכרמל','ארץ מצרים'],0,'בראשית י״ג, י׳–י״א.'],
  ['מה נוכל ללמוד מהצעת אברם ללוט?',['תמיד חייבים לנצח','לפעמים כדאי לוותר כדי לשמור על שלום','לא כדאי לדבר','אסור לבחור'],1,'אברם מציע להיפרד בשלום.']]},
 {name:'מצילים את לוט',icon:'🛡️',x:11,z:-34,fact:'לאחר שלוט נשבה, אברם יצא לחלץ אותו. הכתוב מספר שאברם הריק 318 מחניכיו ילידי ביתו. (בראשית י״ד, י״ד)',q:[
  ['כמה מלכים נלחמו מול חמשת המלכים?',['2','3','4','7'],2,'בראשית י״ד, ט׳.'],
  ['מה עשה אברם כששמע שלוט נשבה?',['התעלם','יצא לחלץ אותו','חזר לחרן','שלח מכתב'],1,'בראשית י״ד, י״ד–ט״ז.'],
  ['מי פגש את אברם לאחר שובו ונשא לחם ויין?',['מלכי־צדק מלך שלם','פרעה','לבן','נח'],0,'בראשית י״ד, י״ח.']]},
 {name:'לילה של כוכבים',icon:'⭐',x:-9,z:-51,fact:'ה׳ מבקש מאברם להביט לשמים ולספור את הכוכבים, כדי להמחיש לו את ההבטחה על ריבוי צאצאיו. (בראשית ט״ו, ה׳)',q:[
  ['מה נדרש אברם לנסות לספור?',['עצים','כוכבים','כבשים','אבנים'],1,'בראשית ט״ו, ה׳.'],
  ['מה הובטח לאברם בברית בין הבתרים?',['ספינה','ארץ לזרעו','כתר מזהב','מגדל'],1,'בראשית ט״ו, י״ח.'],
  ['השלימו: ״הבט נא השמימה וספור את ה...״',['העננים','הכוכבים','הימים','ההרים'],1,'בראשית ט״ו, ה׳.']]},
 {name:'ברית ושמות',icon:'📜',x:3,z:-68,fact:'בפרק י״ז ה׳ משנה את השמות אברם לאברהם ושרי לשרה. אברהם היה בן 99 כאשר נימול. (בראשית י״ז)',q:[
  ['מה השם החדש של אברם?',['ישראל','אברהם','יעקב','אהרן'],1,'בראשית י״ז, ה׳.'],
  ['מה השם החדש של שרי?',['רבקה','מרים','שרה','רחל'],2,'בראשית י״ז, ט״ו.'],
  ['בן כמה היה אברהם כאשר נימול?',['75','86','90','99'],3,'בראשית י״ז, כ״ד.']]}
];

// Enlarged classroom-readable quiz and active-team presentation.
const classroomStyles=document.createElement('style');
classroomStyles.textContent=`
  .panel .activeTurn{font-size:20px;font-weight:700;background:#fff0bf;border:2px solid #e5b84e;border-radius:14px;padding:14px 16px;color:#543811}
  .panel .activeTurn strong{color:#775019}
  .panel .teams{display:flex;gap:9px;flex-wrap:wrap;margin:12px 0 18px}
  .panel .team{font-size:16px;padding:8px 10px;border-radius:10px;white-space:normal}
  .panel .team.active{background:#f6c965;color:#35230d;outline:2px solid #bd8121;font-weight:900}
  .panel .options .answer{font-size:clamp(18px,1.5vw,24px);min-height:78px;line-height:1.4}
  .panel .fact{font-size:clamp(20px,2vw,27px);line-height:1.75}
  .panel h2{line-height:1.4}
  .rewardSpark{position:fixed;z-index:20;pointer-events:none;font-size:28px;animation:rewardRise 1.2s ease-out forwards;text-shadow:0 2px 8px #0004}
  @keyframes rewardRise{0%{opacity:1;transform:translate(0,0) scale(.5)}65%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(130deg) scale(1.2)}}
  @media(prefers-reduced-motion:reduce){.rewardSpark{display:none}}
`;
document.head.appendChild(classroomStyles);
const app=document.getElementById('app');
app.innerHTML=`<div id="world"></div><div class="topbar"><div class="brand">✦ לך־לך <small>הרפתקת אברהם במדבר</small></div><div class="hud"><span id="stage">תחנה 1 / 5</span><span id="score">⭐ 0</span><button id="help">❔ הוראות</button></div></div><div class="rail" id="rail"></div><div class="bottom"><div id="hint">התקרבו לתחנה הזוהרת ולחצו על ״פתח תחנה״</div><div class="actions"><button id="go">🚶 הולכים לתחנה</button><button id="enter" disabled>🔓 פתח תחנה</button></div></div><div class="controls"><button data-key="ArrowUp">▲</button><div><button data-key="ArrowRight">◀</button><button data-key="ArrowDown">▼</button><button data-key="ArrowLeft">▶</button></div></div><div id="overlay" class="overlay"><div class="panel" id="panel"></div></div><button id="sound" class="sound">🔈 צליל: כבוי</button>`;
const $=id=>document.getElementById(id); let current=0, points=0, teams=[], turn=0, question=0, correct=0, mode='intro', moving=false, soundOn=false, audio;
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;$('world').appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color(0x82afce);scene.fog=new THREE.FogExp2(0xbfc9bc,.008);
const camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,300);const hemi=new THREE.HemisphereLight(0xe5f3ff,0x967045,2.2);scene.add(hemi);const sun=new THREE.DirectionalLight(0xffedc2,3.1);sun.position.set(-30,55,-12);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-80;sun.shadow.camera.right=80;sun.shadow.camera.top=80;sun.shadow.camera.bottom=-80;scene.add(sun);
const mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.93,...extra});const sand=mat(0xd8b274),sand2=mat(0xe8c88f),rock=mat(0x8c6a47),brown=mat(0x77503a),linen=mat(0xece0bd),skin=mat(0xe1aa76),white=mat(0xf4eadb),glow=mat(0xffd96b,{emissive:0xba7418,emissiveIntensity:1.3});
function mesh(geo,m,x,y,z,cast=false){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=cast;o.receiveShadow=true;scene.add(o);return o}
mesh(new THREE.PlaneGeometry(600,600),sand,0,-.07,-40).rotation.x=-Math.PI/2;
// Procedural dunes: broad shallow mounds create depth without blocking the path.
const random=(s)=>{let x=Math.sin(s*127.1+78.233)*43758.5453;return x-Math.floor(x)};
for(let i=0;i<52;i++){let x=(random(i+2)-.5)*180,z=(random(i+96)-.5)*215-38;if(Math.abs(x)<18&&z<10&&z>-82)continue;let r=2+random(i+23)*9;let mound=mesh(new THREE.SphereGeometry(1,12,7),i%3?sand2:sand,x,-r*.39,z);mound.scale.set(r,r*.46,r*1.4)}
for(let i=0;i<90;i++){const x=(random(i+350)-.5)*160,z=(random(i+460)-.5)*200-40;if(Math.abs(x)<8&&z<10&&z>-78)continue;const stone=mesh(new THREE.DodecahedronGeometry(.3+random(i+130)*.8,0),rock,x,.13,z);stone.rotation.set(random(i),random(i+4),random(i+9))}
function cylinder(r1,r2,h,m,x,y,z){return mesh(new THREE.CylinderGeometry(r1,r2,h,10),m,x,y,z,true)}
// Redesigned stylized 3D Abraham: layered robe, face, hair, moving arms and feet.
const avatar=new THREE.Group();
const teal=mat(0x325b57),darkTeal=mat(0x203c3d),sandCloth=mat(0xc39a6a);
function part(group,geometry,material,x,y,z,cast=true){
  const object=new THREE.Mesh(geometry,material);object.position.set(x,y,z);
  object.castShadow=cast;object.receiveShadow=true;group.add(object);return object;
}
const robe=part(avatar,new THREE.CylinderGeometry(.53,.89,2.02,12),linen,0,1.35,0);
part(avatar,new THREE.CylinderGeometry(.55,.57,.20,12),teal,0,1.58,0);
part(avatar,new THREE.CylinderGeometry(.36,.53,.70,10),sandCloth,0,2.40,-.04);
const hood=part(avatar,new THREE.SphereGeometry(.53,16,12),white,0,3.09,-.06);
hood.scale.set(1, .89, .96);
const head=part(avatar,new THREE.SphereGeometry(.41,16,12),skin,0,2.92,.25);
const brow=part(avatar,new THREE.SphereGeometry(.43,16,10,0,Math.PI*2,0,Math.PI*.46),white,0,3.16,.25);
const beard=part(avatar,new THREE.ConeGeometry(.32,.72,12),white,0,2.53,.55);
beard.rotation.x=-.10;
part(avatar,new THREE.SphereGeometry(.11,8,6),skin,0,2.91,.65);
const eyeMat=mat(0x3a2c26);
part(avatar,new THREE.SphereGeometry(.042,8,6),eyeMat,-.18,3.00,.60);
part(avatar,new THREE.SphereGeometry(.042,8,6),eyeMat,.18,3.00,.60);
const eyebrow=mat(0xb7a387);
part(avatar,new THREE.BoxGeometry(.16,.045,.055),eyebrow,-.18,3.12,.59);
part(avatar,new THREE.BoxGeometry(.16,.045,.055),eyebrow,.18,3.12,.59);
// Cloak and shoulder bands
const cloak=part(avatar,new THREE.CylinderGeometry(.60,.92,1.85,11,1,true),teal,0,1.62,-.22);
cloak.scale.z=.73;
part(avatar,new THREE.BoxGeometry(.96,.16,.75),darkTeal,0,2.28,0);
const leftArm=new THREE.Group();leftArm.position.set(-.65,2.25,0);avatar.add(leftArm);
part(leftArm,new THREE.CylinderGeometry(.20,.29,.95,9),linen,-.15,-.43,0).rotation.z=-.24;
part(leftArm,new THREE.SphereGeometry(.14,9,7),skin,-.31,-.94,.03);
const rightArm=new THREE.Group();rightArm.position.set(.65,2.25,0);avatar.add(rightArm);
part(rightArm,new THREE.CylinderGeometry(.20,.28,.94,9),linen,.10,-.44,0).rotation.z=.15;
part(rightArm,new THREE.SphereGeometry(.14,9,7),skin,.24,-.91,.04);
const staff=part(rightArm,new THREE.CylinderGeometry(.057,.085,3.10,9),brown,.40,-1.00,.37);
staff.rotation.z=.09;
part(rightArm,new THREE.SphereGeometry(.11,8,8),sandCloth,.29,.47,.39);
const leftLeg=new THREE.Group();leftLeg.position.set(-.28,.70,0);avatar.add(leftLeg);
part(leftLeg,new THREE.CylinderGeometry(.16,.18,.57,8),brown,0,-.25,0);
part(leftLeg,new THREE.BoxGeometry(.36,.19,.64),brown,0,-.58,.19);
const rightLeg=new THREE.Group();rightLeg.position.set(.28,.70,0);avatar.add(rightLeg);
part(rightLeg,new THREE.CylinderGeometry(.16,.18,.57,8),brown,0,-.25,0);
part(rightLeg,new THREE.BoxGeometry(.36,.19,.64),brown,0,-.58,.19);
// A small traveling satchel
part(avatar,new THREE.BoxGeometry(.55,.66,.24),brown,-.60,1.15,-.26);
const satchelStrap=part(avatar,new THREE.BoxGeometry(.09,1.48,.09),sandCloth,-.20,1.78,.36);
satchelStrap.rotation.z=-.42;
scene.add(avatar);
// Sand path, with glowing waypoints as the adventure objectives.
const markers=[];for(let i=0;i<stages.length;i++){const st=stages[i];const group=new THREE.Group();group.position.set(st.x,0,st.z);const ring=new THREE.Mesh(new THREE.TorusGeometry(2.25,.13,8,42),glow);ring.rotation.x=-Math.PI/2;ring.position.y=.17;group.add(ring);const base=new THREE.Mesh(new THREE.CylinderGeometry(1.45,1.7,.52,12),rock);base.position.y=.26;group.add(base);const pillar=new THREE.Mesh(new THREE.CylinderGeometry(.6,.95,2.0,7),mat(0xb78b54));pillar.position.y=1.5;group.add(pillar);const crystal=new THREE.Mesh(new THREE.OctahedronGeometry(.68),glow);crystal.position.y=3;group.add(crystal);scene.add(group);markers.push({group,ring,crystal});}
// tents and palms near chosen stations
function tent(x,z){const cloth=mesh(new THREE.ConeGeometry(2.6,3,4),mat(0xc18f59),x,1.4,z,true);cloth.rotation.y=Math.PI/4;const entrance=mesh(new THREE.PlaneGeometry(1.25,1.75),brown,x,1.0,z+1.86);entrance.material.side=THREE.DoubleSide}
tent(-17,-5);tent(16,-47);tent(-13,-68);
function palm(x,z){cylinder(.22,.34,4,brown,x,2,z);const crown=mesh(new THREE.SphereGeometry(2,6,4),mat(0x6a8546),x,4.4,z,true);crown.scale.set(1,.5,1)}palm(18,-23);palm(-20,-41);

// Cinematic journey: a winding sandy trail connects each biblical episode.
const pathVertices=[],pathIndices=[];
const travelCurve=new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,.035,13),
  new THREE.Vector3(0,.035,0),
  new THREE.Vector3(-12,.035,-17),
  new THREE.Vector3(11,.035,-34),
  new THREE.Vector3(-9,.035,-51),
  new THREE.Vector3(3,.035,-68)
],false,'centripetal');
for(let i=0;i<=150;i++){
 const t=i/150,p=travelCurve.getPoint(t),tangent=travelCurve.getTangent(t);
 const nx=tangent.z,nz=-tangent.x,width=2.5+Math.sin(i*.22)*.18;
 pathVertices.push(p.x+nx*width,p.y,p.z+nz*width,p.x-nx*width,p.y,p.z-nz*width);
 if(i<150){const a=i*2;pathIndices.push(a,a+1,a+2,a+1,a+3,a+2)}
}
const pathGeo=new THREE.BufferGeometry();pathGeo.setAttribute('position',new THREE.Float32BufferAttribute(pathVertices,3));
pathGeo.setIndex(pathIndices);pathGeo.computeVertexNormals();
const trail=new THREE.Mesh(pathGeo,mat(0xefcf91,{side:THREE.DoubleSide}));trail.receiveShadow=true;scene.add(trail);

function littleRock(x,z,size=1){
 const o=mesh(new THREE.DodecahedronGeometry(size,0),mat(0x9c7c5d),x,size*.43,z,true);
 o.rotation.set(.2,.6,.15);o.scale.set(1.3,.72,.75);return o;
}
function camel(x,z,angle=0){
 const c=new THREE.Group();c.position.set(x,0,z);c.rotation.y=angle;scene.add(c);
 const fur=mat(0xb97c43),furDark=mat(0x8c562f),saddle=mat(0x704d54);
 const body=part(c,new THREE.SphereGeometry(1.22,12,10),fur,0,1.75,0);body.scale.set(1.35,.68,.67);
 for(const dx of [-.83,.82])for(const dz of [-.48,.48]){
  const leg=part(c,new THREE.CylinderGeometry(.19,.15,1.65,7),fur,dx,.82,dz);leg.rotation.z=dx>0?.045:-.045;
  part(c,new THREE.BoxGeometry(.45,.2,.55),furDark,dx,.12,dz+.08);
 }
 const neck=part(c,new THREE.CylinderGeometry(.27,.37,1.55,9),fur,1.07,2.43,.04);neck.rotation.z=-.44;
 part(c,new THREE.SphereGeometry(.39,10,8),fur,1.49,3.14,.06);
 part(c,new THREE.BoxGeometry(.55,.32,.38),fur,1.80,2.98,.07);
 for(const dz of [-.22,.22])part(c,new THREE.ConeGeometry(.12,.38,6),fur,1.31,3.57,dz);
 part(c,new THREE.SphereGeometry(.055,7,7),furDark,1.72,3.22,.37);
 const hump=part(c,new THREE.SphereGeometry(.66,10,8),fur,0,2.54,0);hump.scale.set(.9,1.2,.7);
 part(c,new THREE.BoxGeometry(1.08,.18,1.05),saddle,-.18,2.54,0);
 return c;
}
function sheep(x,z){
 const group=new THREE.Group();group.position.set(x,0,z);scene.add(group);
 const fleece=mat(0xf8f5e7),headMat=mat(0x6b5340);
 const torso=part(group,new THREE.SphereGeometry(.63,9,8),fleece,0,.90,0);torso.scale.set(1.3,.88,.85);
 part(group,new THREE.SphereGeometry(.30,9,7),headMat,.63,1.02,.03);
 for(const dx of [-.39,.42])for(const dz of [-.26,.26])part(group,new THREE.CylinderGeometry(.08,.1,.55,6),headMat,dx,.32,dz);
 return group;
}
// Palm trees have individual fronds, rather than a single round canopy.
function richPalm(x,z,height=5){
 const trunk=mesh(new THREE.CylinderGeometry(.19,.35,height,9),brown,x,height/2,z,true);
 trunk.rotation.z=.11;
 const leaves=mat(0x427a49,{side:THREE.DoubleSide});
 for(let i=0;i<9;i++){
   const a=i*Math.PI*2/9,frond=mesh(new THREE.ConeGeometry(.45,3.65,3),leaves,x+Math.cos(a)*1.22,height+.32,z+Math.sin(a)*1.22,true);
   frond.rotation.set(Math.sin(a)*.87,0,-Math.cos(a)*.87);
 }
}
// Pool of water and a few decorative stones mark the green oasis.
const pool=mesh(new THREE.CircleGeometry(5.4,44),mat(0x55c4c6,{metalness:.23,roughness:.25,side:THREE.DoubleSide}),18,.045,-39);
pool.rotation.x=-Math.PI/2;pool.scale.y=.70;
for(let i=0;i<18;i++){
  const a=i*Math.PI*2/18;
  littleRock(18+Math.cos(a)*5.8,-39+Math.sin(a)*4.0,.45+random(i+900)*.36);
}
richPalm(13,-43,5.8);richPalm(23,-36,5.1);richPalm(20,-45,4.6);
camel(-8,7,2.0);camel(10,1,-.8);camel(5,-43,2.7);
tent(5,12);tent(-8,-18);tent(10,-65);
for(let i=0;i<8;i++)sheep(-17+(i%4)*2.0,-24+Math.floor(i/4)*2.5);
for(let i=0;i<7;i++)sheep(8+(i%4)*1.8,3+Math.floor(i/4)*2.0);
for(let i=0;i<24;i++){
 const px=(random(i+4200)-.5)*55,pz=-random(i+4400)*90+6;
 if(Math.abs(px)<5)continue;
 const cactus=mat(0x6d8450);
 const shrub=mesh(new THREE.IcosahedronGeometry(.30+random(i+4600)*.35,0),cactus,px,.28,pz);
 shrub.scale.set(1.2,.75,1);
}
// Distant mountains frame the horizon.
for(let i=0;i<16;i++){
 const x=-110+i*15,z=-142-(i%4)*9;
 const mountain=mesh(new THREE.ConeGeometry(13+random(i+1200)*11,24+random(i+1240)*21,5),mat(0xb79a7d),x,11,z);
 mountain.rotation.y=random(i+1400)*Math.PI;
}
// Night sky arrives gradually at the "star promise" chapter.
const starPositions=[];
for(let i=0;i<310;i++){
  const x=(random(i+1800)-.5)*170;
  const y=24+random(i+2000)*52;
  const z=-90-random(i+2200)*90;
  starPositions.push(x,y,z);
}
const starGeo=new THREE.BufferGeometry();
starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPositions,3));
const nightStars=new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xffefca,size:.55,sizeAttenuation:true,transparent:true,opacity:0}));
nightStars.frustumCulled=false;scene.add(nightStars);
let nightLevel=0;
const daySky=new THREE.Color(0x82afce),nightSky=new THREE.Color(0x20315a);
const dayFog=new THREE.Color(0xbfc9bc),nightFog=new THREE.Color(0x435276);
const dustCloud=new THREE.Group();scene.add(dustCloud);
const dustSpecks=[];
for(let i=0;i<16;i++){
 const puff=part(dustCloud,new THREE.SphereGeometry(.09+random(i+77)*.05,6,5),mat(0xf4d59b,{transparent:true,opacity:.55}),0,0,0,false);
 dustSpecks.push(puff);
}
const coords=stages.map(s=>new THREE.Vector3(s.x,0,s.z));avatar.position.set(0,0,9);const pressed=new Set();let target=null;
function showModal(html){$('panel').innerHTML=html;$('overlay').classList.remove('hidden')}function hideModal(){$('overlay').classList.add('hidden')}
function celebrate(){
  // Temporary DOM effects; no image/audio dependencies.
  for(let i=0;i<14;i++){
    const star=document.createElement('span');star.textContent=i%3===0?'✨':'⭐';star.className='rewardSpark';
    star.style.left=(35+random(i+7000)*30)+'vw';
    star.style.top=(32+random(i+7200)*20)+'vh';
    star.style.setProperty('--dx',((random(i+7400)-.5)*490)+'px');
    star.style.setProperty('--dy',(-60-random(i+7600)*290)+'px');
    document.body.appendChild(star);star.addEventListener('animationend',()=>star.remove(),{once:true});
  }
} 
function chirp(){if(!soundOn)return;try{audio ||= new (window.AudioContext||window.webkitAudioContext)();let o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);o.type='triangle';o.frequency.setValueAtTime(520,audio.currentTime);o.frequency.exponentialRampToValueAtTime(840,audio.currentTime+.16);g.gain.setValueAtTime(.08,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.19);o.start();o.stop(audio.currentTime+.2)}catch{}}
function safe(s){return String(s ?? '').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;'}[x]))}
function rail(){ $('rail').innerHTML=stages.map((s,i)=>`<div class="step ${i===current?'active':i<current?'done':''}"><span>${i<current?'✓':s.icon}</span><div>${s.name}</div></div>`).join('');$('stage').textContent=`תחנה ${Math.min(current+1,5)} / 5`;$('score').textContent=`⭐ ${points}`}
function cleanTeamName(value, index=0){
  const text=String(value ?? '').replace(/undefined|null/gi,'').replace(/\s+/g,' ').trim();
  return text || `קבוצה ${index+1}`;
}
function stats(){return `<div class="teams">${teams.map((t,i)=>`<span class="team ${turn===i?'active':''}" aria-label="${i===turn?'הקבוצה המשחקת: ':''}${safe(cleanTeamName(t.name,i))}">${i===turn?'🎯 ':''}${safe(cleanTeamName(t.name,i))} ⭐ ${Number(t.score)||0}</span>`).join('')}</div>`}

function welcome(){mode='intro';showModal(`<div class="eyebrow">משחק הרפתקה תלת־ממדי • פרשת לך־לך</div><h1>🌟 יוצאים למסע עם אברהם!</h1><p>צאו לדרך עם אברהם: שיירות גמלים, נווה מדבר, רועים, כוכבים וחמש תחנות של פרשת לך־לך. עתי הוא מדריך המסע. בכל תחנה מחכה סוד מהפרשה ושלוש שאלות!</p><div class="introCard"><b>שליטה:</b> חצים או WASD לתנועה • אפשר גם ללחוץ על ״הולכים לתחנה״ כדי שאברהם יגיע בעצמו.</div><p>בחרו שמות לארבע קבוצות (אפשר לשנות):</p><div class="names">${[1,2,3,4].map(i=>`<input aria-label="שם קבוצה ${i}" value="קבוצה ${i}" maxlength="18" />`).join('')}</div><button class="primary" id="start">🎮 מתחילים לשחק!</button>`);$('start').onclick=()=>{teams=[...document.querySelectorAll('.names input')].map((x,i)=>({name:cleanTeamName(x.value,i),score:0}));rail();mode='travel';hideModal();};}
function fact(){mode='fact';showModal(`<div class="eyebrow">תחנה ${current+1} מתוך 5 • ${stages[current].name}</div><h2>📜 סוד מהמסע · הידעת?</h2><p class="fact">${stages[current].fact}</p><div class="introCard">עתי, כדאי לקרוא את העובדה בקול ולתת לכיתה כמה שניות להגיב.</div><button class="primary" id="questions">לשאלות התחנה ←</button>`);$('questions').onclick=()=>{question=0;quiz()}}
function quiz(){mode='quiz';const s=stages[current],q=s.q[question];const [title,opts]=q;showModal(`<div class="eyebrow">${s.icon} ${s.name} • שאלה ${question+1} מתוך ${s.q.length}</div>${stats()}<h2>${safe(title)}</h2><div class="options">${opts.map((o,i)=>`<button class="answer" data-answer="${i}"><b>${'אבגד'[i]}</b>${safe(o)}</button>`).join('')}</div><p class="activeTurn">🎯 התור של <strong>${safe(cleanTeamName(teams[turn].name,turn))}</strong> • תשובה נכונה = 10 כוכבים</p><div id="explain"></div>`);document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answer(Number(b.dataset.answer)))}
function answer(selected){const q=stages[current].q[question];const ok=selected===q[2];document.querySelectorAll('[data-answer]').forEach(b=>{b.disabled=true;const n=Number(b.dataset.answer);if(n===q[2])b.classList.add('right');else if(n===selected)b.classList.add('wrong')});if(ok){teams[turn].score+=10;points+=10;chirp();celebrate()}$('score').textContent=`⭐ ${points}`;$('explain').innerHTML=`<div class="explanation">${ok?'✅ תשובה נכונה! +10 כוכבים':'💡 לומדים וממשיכים'}<p>${safe(q[3])}</p></div><button class="primary" id="continue">${question===stages[current].q.length-1?'סיום התחנה 🏅':'השאלה הבאה ←'}</button>`;$('continue').onclick=()=>{turn=(turn+1)%teams.length;question++;if(question<stages[current].q.length){quiz()}else{complete()}}}
function complete(){mode='complete';current++;rail();showModal(`<h2>🏅 כל הכבוד!</h2><p>עברתם תחנה שלמה במדבר. אברהם ממשיך בדרכו, והמסע עוד לא נגמר.</p>${stats()}<button class="primary" id="continue">${current>=stages.length?'לסיכום המסע 🏆':'ממשיכים לתחנה הבאה 🐪'}</button>`);$('continue').onclick=()=>{if(current>=stages.length){finale();return}hideModal();mode='travel';$('hint').textContent='הגיעו לתחנה הזוהרת הבאה!';target=coords[current].clone();};}
function finale(){mode='final';const sorted=[...teams].sort((a,b)=>b.score-a.score),max=sorted[0].score,winners=sorted.filter(t=>t.score===max).map((t,i)=>safe(cleanTeamName(t.name,i))).join(' ו־');showModal(`<div class="eyebrow">המסע הושלם!</div><h1>🏆 כל הכבוד!</h1><h2>הקבוצה המנצחת: ${winners}</h2><div class="leaderboard">${sorted.map((t,i)=>`<div>${['🥇','🥈','🥉','⭐'][i]} ${safe(cleanTeamName(t.name,i))} — ${t.score} כוכבים</div>`).join('')}</div><p>מפרשת לך־לך למדנו על אמונה, אומץ, שלום, אחריות ועזרה לאחרים.</p><button class="primary" id="again">משחק חדש ↺</button>`);$('again').onclick=()=>location.reload()}
$('go').onclick=()=>{if(mode==='travel'){target=coords[current].clone();$('hint').textContent='אברהם צועד אל התחנה...'}};
$('enter').onclick=()=>{if(mode==='travel'&&avatar.position.distanceTo(coords[current])<4.3){target=null;fact()}};
$('help').onclick=()=>{const previous=mode;mode='help';showModal(`<h2>🎮 איך משחקים?</h2><p>מזיזים את אברהם עם חצים / WASD או לוחצים על הכפתור ״הולכים לתחנה״. כשהוא קרוב לאור הזהוב, לוחצים על ״פתח תחנה״.</p><p>בכל תחנה מחכה כרטיס ״הידעת?״ ושלוש שאלות. הקבוצות מתחלפות בתורות. כל תשובה נכונה שווה 10 כוכבים.</p><p>המשחק מותאם להקרנה על לוח חכם ולכ־30 דקות בכיתה.</p><button class="primary" id="closeHelp">חזרה למשחק</button>`);$('closeHelp').onclick=()=>{mode=previous;hideModal()}}
$('sound').onclick=()=>{soundOn=!soundOn;$('sound').textContent=`${soundOn?'🔊 צליל: פועל':'🔈 צליל: כבוי'}`;chirp()};
window.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();if(mode==='travel')pressed.add(e.key.toLowerCase());if(e.key==='Enter'&&mode==='travel'&&!$('enter').disabled)$('enter').click()});window.addEventListener('keyup',e=>pressed.delete(e.key.toLowerCase()));document.querySelectorAll('[data-key]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();pressed.add(b.dataset.key.toLowerCase());b.setPointerCapture(e.pointerId)});for(const evt of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(evt,()=>pressed.delete(b.dataset.key.toLowerCase()))});
let last=performance.now(),elapsed=0;function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.05);last=now;elapsed+=dt;let dx=0,dz=0;if(mode==='travel'){
 if(pressed.has('arrowup')||pressed.has('w'))dz-=1;if(pressed.has('arrowdown')||pressed.has('s'))dz+=1;if(pressed.has('arrowleft')||pressed.has('a'))dx-=1;if(pressed.has('arrowright')||pressed.has('d'))dx+=1;
 if(dx||dz)target=null;else if(target){dx=target.x-avatar.position.x;dz=target.z-avatar.position.z;if(Math.hypot(dx,dz)<2.7){dx=0;dz=0;target=null}}
 const len=Math.hypot(dx,dz);if(len>.001){const vx=dx/len,vz=dz/len;const speed=target?7:9;avatar.position.x+=vx*speed*dt;avatar.position.z+=vz*speed*dt;avatar.rotation.y=Math.atan2(vx,vz);moving=true}else{moving=false}}
 const near=current<5&&avatar.position.distanceTo(coords[current])<4.3;$('enter').disabled=mode!=='travel'||!near;if(near&&mode==='travel')$('hint').textContent=`${stages[current].icon} הגעתם לתחנה: ${stages[current].name}. פתחו אותה!`;
 markers.forEach((m,i)=>{
  m.crystal.rotation.y+=dt*.6;
  m.crystal.position.y=3+Math.sin(elapsed*2+i)*.16;
  m.group.visible=i>=current;
  m.ring.scale.setScalar(i===current?1+Math.sin(elapsed*3)*.035:1);
 });
 // Feet, sleeves, staff and cloak move in a synchronized walking cycle.
 const stride=moving?Math.sin(elapsed*9)*.28:0;
 const sway=moving?Math.sin(elapsed*9)*.045:Math.sin(elapsed*1.7)*.012;
 leftArm.rotation.x=-stride;
 rightArm.rotation.x=stride*.65;
 leftLeg.rotation.x=stride*.70;
 rightLeg.rotation.x=-stride*.70;
 cloak.rotation.z=sway;
 robe.rotation.z=sway*.35;
 avatar.position.y=moving?Math.abs(Math.sin(elapsed*9))*.065:0;
 dustCloud.position.copy(avatar.position);
 dustCloud.rotation.y=avatar.rotation.y;
 dustSpecks.forEach((p,i)=>{
   const a=i*2.4+elapsed*.35;
   p.position.set(Math.cos(a)*(.65+i*.035),.07+(elapsed*.35+i*.09)%1.1,Math.sin(a)*(.4+i*.025));
   p.visible=moving;
 });
 const nightTarget=current===3?1:0;
 nightLevel=THREE.MathUtils.damp(nightLevel,nightTarget,.9,dt);
 scene.background.copy(daySky).lerp(nightSky,nightLevel*.92);
 scene.fog.color.copy(dayFog).lerp(nightFog,nightLevel*.65);
 sun.intensity=3.1-nightLevel*1.65;
 hemi.intensity=2.2-nightLevel*.52;
 nightStars.material.opacity=nightLevel*.95;

 const ideal=new THREE.Vector3(avatar.position.x,9.6,avatar.position.z+12.2);
 camera.position.lerp(ideal,Math.min(1,dt*2.9));
 const look=new THREE.Vector3(avatar.position.x,2.0,avatar.position.z-6.5);
 camera.lookAt(look);
 renderer.render(scene,camera)
}requestAnimationFrame(animate);
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
rail();welcome();
