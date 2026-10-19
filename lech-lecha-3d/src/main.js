
import * as THREE from 'three';
import './style.css';

const stages = [
  {
    name: 'הקריאה למסע',
    icon: '🧭',
    x: 0, z: 0,
    fact: 'אברם היה בן 75 כאשר יצא מחרן. הוא יצא עם שרי אשתו ולוט בן אחיו. (בראשית י״ב, ד׳–ה׳)',
    q: [
      ['מהו הציווי שפותח את הפרשה?',
        ['לך־לך מארצך וממולדתך ומבית אביך', 'עשה לך תיבה', 'שלח את עמי', 'קום לך אל נינוה'],
        0, 'בראשית י״ב, א׳.'],
      ['בן כמה היה אברם כשיצא מחרן?',
        ['65', '75', '85', '99'],
        1, 'בראשית י״ב, ד׳.'],
      ['מי יצאו עם אברם מחרן?',
        ['שרי ולוט', 'יצחק ויעקב', 'משה ואהרן', 'עשו וישמעאל'],
        0, 'בראשית י״ב, ה׳.']
    ]
  },
  {
    name: 'אברם ולוט',
    icon: '🤝',
    x: -12, z: -17,
    fact: 'אברם אמר ללוט: ״אל נא תהי מריבה ביני ובינך״. הוא בחר להציע פתרון במקום להחריף את הריב. (בראשית י״ג, ח׳–ט׳)',
    q: [
      ['למה נפרדו אברם ולוט?',
        ['מפני שירדו למצרים', 'בגלל ריב בין הרועים ומחסור במקום', 'כי לוט שכח את הדרך', 'בגלל מלחמת המלכים'],
        1, 'בראשית י״ג, ו׳–ט׳.'],
      ['איזה אזור בחר לוט?',
        ['כיכר הירדן', 'מדבר סיני', 'הר הכרמל', 'ארץ מצרים'],
        0, 'בראשית י״ג, י׳–י״א.'],
      ['מה נוכל ללמוד מהצעת אברם ללוט?',
        ['תמיד חייבים לנצח', 'לפעמים כדאי לוותר כדי לשמור על שלום', 'לא כדאי לדבר', 'אסור לבחור'],
        1, 'אברם מציע להיפרד בשלום.']
    ]
  },
  {
    name: 'מצילים את לוט',
    icon: '🛡️',
    x: 11, z: -34,
    fact: 'לאחר שלוט נשבה, אברם יצא לחלץ אותו. הכתוב מספר שאברם הריק 318 מחניכיו ילידי ביתו. (בראשית י״ד, י״ד)',
    q: [
      ['כמה מלכים נלחמו מול חמשת המלכים?',
        ['2', '3', '4', '7'],
        2, 'בראשית י״ד, ט׳.'],
      ['מה עשה אברם כששמע שלוט נשבה?',
        ['התעלם', 'יצא לחלץ אותו', 'חזר לחרן', 'שלח מכתב'],
        1, 'בראשית י״ד, י״ד–ט״ז.'],
      ['מי פגש את אברם לאחר שובו ונשא לחם ויין?',
        ['מלכי־צדק מלך שלם', 'פרעה', 'לבן', 'נח'],
        0, 'בראשית י״ד, י״ח.']
    ]
  },
  {
    name: 'לילה של כוכבים',
    icon: '⭐',
    x: -9, z: -51,
    fact: 'ה׳ מבקש מאברם להביט לשמים ולספור את הכוכבים, כדי להמחיש לו את ההבטחה על ריבוי צאצאיו. (בראשית ט״ו, ה׳)',
    q: [
      ['מה נדרש אברם לנסות לספור?',
        ['עצים', 'כוכבים', 'כבשים', 'אבנים'],
        1, 'בראשית ט״ו, ה׳.'],
      ['מה הובטח לאברם בברית בין הבתרים?',
        ['ספינה', 'ארץ לזרעו', 'כתר מזהב', 'מגדל'],
        1, 'בראשית ט״ו, י״ח.'],
      ['השלימו: ״הבט נא השמימה וספור את ה...״',
        ['העננים', 'הכוכבים', 'הימים', 'ההרים'],
        1, 'בראשית ט״ו, ה׳.']
    ]
  },
  {
    name: 'ברית ושמות',
    icon: '📜',
    x: 3, z: -68,
    fact: 'בפרק י״ז ה׳ משנה את השמות אברם לאברהם ושרי לשרה. אברהם היה בן 99 כאשר נימול. (בראשית י״ז)',
    q: [
      ['מה השם החדש של אברם?',
        ['ישראל', 'אברהם', 'יעקב', 'אהרן'],
        1, 'בראשית י״ז, ה׳.'],
      ['מה השם החדש של שרי?',
        ['רבקה', 'מרים', 'שרה', 'רחל'],
        2, 'בראשית י״ז, ט״ו.'],
      ['בן כמה היה אברהם כאשר נימול?',
        ['75', '86', '90', '99'],
        3, 'בראשית י״ז, כ״ד.']
    ]
  }
];

// Classroom-friendly styling
const classroomStyles = document.createElement('style');
classroomStyles.textContent = `
  .panel .activeTurn {
    font-size: 20px;
    font-weight: 700;
    background: #fff0bf;
    border: 2px solid #e5b84e;
    border-radius: 14px;
    padding: 14px 16px;
    color: #543811;
  }
  .panel .activeTurn strong {
    color: #775019;
  }
  .panel .teams {
    display: flex;
    gap: 9px;
    flex-wrap: wrap;
    margin: 12px 0 18px;
  }
  .panel .team {
    font-size: 16px;
    padding: 8px 10px;
    border-radius: 10px;
    white-space: normal;
  }
  .panel .team.active {
    background: #f6c965;
    color: #35230d;
    outline: 2px solid #bd8121;
    font-weight: 900;
  }
  .panel .options .answer {
    font-size: clamp(18px, 1.5vw, 24px);
    min-height: 78px;
    line-height: 1.4;
  }
  .panel .fact {
    font-size: clamp(20px, 2vw, 27px);
    line-height: 1.75;
  }
  .panel h2 {
    line-height: 1.4;
  }
`;
document.head.appendChild(classroomStyles);

const app = document.getElementById('app');

app.innerHTML = `
  <div id="world"></div>

  <div class="topbar">
    <div class="brand">
      ✦ לך־לך
      <small>הרפתקת אברהם במדבר</small>
    </div>
    <div class="hud">
      <span id="stage">תחנה 1 / 5</span>
      <span id="score">⭐ 0</span>
      <button id="help">❔ הוראות</button>
    </div>
  </div>

  <div class="rail" id="rail"></div>

  <div class="bottom">
    <div id="hint">
      התקרבו לתחנה הזוהרת ולחצו על ״פתח תחנה״
    </div>
    <div class="actions">
      <button id="go">🚶 הולכים לתחנה</button>
      <button id="enter" disabled>🔓 פתח תחנה</button>
    </div>
  </div>

  <div class="controls">
    <button data-key="ArrowUp">▲</button>
    <div>
      <button data-key="ArrowRight">◀</button>
      <button data-key="ArrowDown">▼</button>
      <button data-key="ArrowLeft">▶</button>
    </div>
  </div>

  <div id="overlay" class="overlay">
    <div class="panel" id="panel"></div>
  </div>

  <button id="sound" class="sound">
    🔈 צליל: כבוי
  </button>
`;

const $ = id => document.getElementById(id);

let current = 0;
let points = 0;
let teams = [];
let turn = 0;
let question = 0;
let mode = 'intro';
let moving = false;
let soundOn = false;
let audio;

// THREE.JS SETUP
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false
});

renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

$('world').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x82afce);
scene.fog = new THREE.FogExp2(0xbfc9bc, .008);

const camera = new THREE.PerspectiveCamera(
  60,
  innerWidth / innerHeight,
  .1,
  300
);

const hemi = new THREE.HemisphereLight(
  0xe5f3ff,
  0x967045,
  2.2
);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffedc2, 3.1);
sun.position.set(-30, 55, -12);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -80;
sun.shadow.camera.right = 80;
sun.shadow.camera.top = 80;
sun.shadow.camera.bottom = -80;
scene.add(sun);

const mat = (color, extra = {}) =>
  new THREE.MeshStandardMaterial({
    color,
    roughness: .93,
    ...extra
  });

const sand = mat(0xd8b274);
const sand2 = mat(0xe8c88f);
const rock = mat(0x8c6a47);
const brown = mat(0x77503a);
const linen = mat(0xece0bd);
const skin = mat(0xe1aa76);
const white = mat(0xf4eadb);
const glow = mat(0xffd96b, {
  emissive: 0xba7418,
  emissiveIntensity: 1.3
});

function mesh(geo, m, x, y, z, cast = false) {
  const o = new THREE.Mesh(geo, m);
  o.position.set(x, y, z);
  o.castShadow = cast;
  o.receiveShadow = true;
  scene.add(o);
  return o;
}

// DESERT ENVIRONMENT
mesh(
  new THREE.PlaneGeometry(600, 600),
  sand,
  0, -.07, -40
).rotation.x = -Math.PI / 2;

const random = s => {
  let x = Math.sin(s * 127.1 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

for (let i = 0; i < 52; i++) {
  let x = (random(i + 2) - .5) * 180;
  let z = (random(i + 96) - .5) * 215 - 38;

  if (Math.abs(x) < 18 && z < 10 && z > -82) continue;

  let r = 2 + random(i + 23) * 9;

  let mound = mesh(
    new THREE.SphereGeometry(1, 12, 7),
    i % 3 ? sand2 : sand,
    x, -r * .39, z
  );

  mound.scale.set(r, r * .46, r * 1.4);
}

for (let i = 0; i < 90; i++) {
  const x = (random(i + 350) - .5) * 160;
  const z = (random(i + 460) - .5) * 200 - 40;

  if (Math.abs(x) < 8 && z < 10 && z > -78) continue;

  const stone = mesh(
    new THREE.DodecahedronGeometry(
      .3 + random(i + 130) * .8,
      0
    ),
    rock,
    x, .13, z
  );

  stone.rotation.set(
    random(i),
    random(i + 4),
    random(i + 9)
  );
}

function cylinder(r1, r2, h, m, x, y, z) {
  return mesh(
    new THREE.CylinderGeometry(r1, r2, h, 10),
    m, x, y, z, true
  );
}

// ABRAHAM CHARACTER
const avatar = new THREE.Group();

const robe = new THREE.Mesh(
  new THREE.CylinderGeometry(.42, .85, 2.1, 10),
  linen
);
robe.position.y = 1.45;
avatar.add(robe);

const belt = new THREE.Mesh(
  new THREE.CylinderGeometry(.49, .49, .16, 10),
  brown
);
belt.position.y = 1.5;
avatar.add(belt);

const head = new THREE.Mesh(
  new THREE.SphereGeometry(.42, 12, 10),
  skin
);
head.position.y = 2.9;
avatar.add(head);

const beard = new THREE.Mesh(
  new THREE.ConeGeometry(.34, .68, 9),
  white
);
beard.position.set(0, 2.43, .17);
avatar.add(beard);

const hair = new THREE.Mesh(
  new THREE.SphereGeometry(
    .46, 12, 10,
    0, Math.PI * 2,
    0, Math.PI * .42
  ),
  white
);
hair.position.y = 3.05;
avatar.add(hair);

const scarf = new THREE.Mesh(
  new THREE.BoxGeometry(.9, .22, .72),
  mat(0x9b7451)
);
scarf.position.y = 3.18;
avatar.add(scarf);

const stick = new THREE.Mesh(
  new THREE.CylinderGeometry(.055, .075, 3.3, 7),
  brown
);
stick.position.set(.75, 1.7, .1);
stick.rotation.z = .12;
avatar.add(stick);

const feet = new THREE.Mesh(
  new THREE.BoxGeometry(.95, .22, .5),
  brown
);
feet.position.y = .13;
avatar.add(feet);

avatar.traverse(x => {
  if (x.isMesh) {
    x.castShadow = true;
    x.receiveShadow = true;
  }
});

scene.add(avatar);

// STATION MARKERS
const markers = [];

for (let i = 0; i < stages.length; i++) {
  const st = stages[i];
  const group = new THREE.Group();

  group.position.set(st.x, 0, st.z);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.25, .13, 8, 42),
    glow
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = .17;
  group.add(ring);

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.45, 1.7, .52, 12),
    rock
  );
  base.position.y = .26;
  group.add(base);

  const pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(.6, .95, 2.0, 7),
    mat(0xb78b54)
  );
  pillar.position.y = 1.5;
  group.add(pillar);

  const crystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(.68),
    glow
  );
  crystal.position.y = 3;
  group.add(crystal);

  scene.add(group);
  markers.push({ group, ring, crystal });
}

// TENTS AND PALM TREES
function tent(x, z) {
  const cloth = mesh(
    new THREE.ConeGeometry(2.6, 3, 4),
    mat(0xc18f59),
    x, 1.4, z, true
  );

  cloth.rotation.y = Math.PI / 4;

  const entrance = mesh(
    new THREE.PlaneGeometry(1.25, 1.75),
    brown,
    x, 1.0, z + 1.86
  );

  entrance.material.side = THREE.DoubleSide;
}

tent(-17, -5);
tent(16, -47);
tent(-13, -68);

function palm(x, z) {
  cylinder(.22, .34, 4, brown, x, 2, z);

  const crown = mesh(
    new THREE.SphereGeometry(2, 6, 4),
    mat(0x6a8546),
    x, 4.4, z, true
  );

  crown.scale.set(1, .5, 1);
}

palm(18, -23);
palm(-20, -41);

// GAME STATE
const coords = stages.map(
  s => new THREE.Vector3(s.x, 0, s.z)
);

avatar.position.set(0, 0, 9);

const pressed = new Set();
let target = null;

function showModal(html) {
  $('panel').innerHTML = html;
  $('overlay').classList.remove('hidden');
}

function hideModal() {
  $('overlay').classList.add('hidden');
}

function chirp() {
  if (!soundOn) return;

  try {
    audio ||= new (
      window.AudioContext || window.webkitAudioContext
    )();

    let o = audio.createOscillator();
    let g = audio.createGain();

    o.connect(g);
    g.connect(audio.destination);

    o.type = 'triangle';
    o.frequency.setValueAtTime(520, audio.currentTime);
    o.frequency.exponentialRampToValueAtTime(
      840, audio.currentTime + .16
    );

    g.gain.setValueAtTime(.08, audio.currentTime);
    g.gain.exponentialRampToValueAtTime(
      .001, audio.currentTime + .19
    );

    o.start();
    o.stop(audio.currentTime + .2);
  } catch {}
}

function safe(s) {
  return String(s ?? '').replace(
    /[&<>"']/g,
    x => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[x])
  );
}

// Fix malformed team names
function cleanTeamName(value, index = 0) {
  const text = String(value ?? '')
    .replace(/undefined|null/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  return text || `קבוצה ${index + 1}`;
}

function rail() {
  $('rail').innerHTML = stages.map((s, i) => `
    <div class="step ${
      i === current ? 'active' : i < current ? 'done' : ''
    }">
      <span>${i < current ? '✓' : s.icon}</span>
      <div>${s.name}</div>
    </div>
  `).join('');

  $('stage').textContent =
    `תחנה ${Math.min(current + 1, 5)} / 5`;

  $('score').textContent = `⭐ ${points}`;
}

function stats() {
  return `
    <div class="teams">
      ${teams.map((t, i) => `
        <span class="team ${turn === i ? 'active' : ''}">
          ${turn === i ? '🎯 ' : ''}
          ${safe(cleanTeamName(t.name, i))}
          ⭐ ${Number(t.score) || 0}
        </span>
      `).join('')}
    </div>
  `;
}

// WELCOME SCREEN
function welcome() {
  mode = 'intro';

  showModal(`
    <div class="eyebrow">
      משחק הרפתקה תלת־ממדי • פרשת לך־לך
    </div>

    <h1>🌟 יוצאים למסע עם אברהם!</h1>

    <p>
      הזיזו את אברהם ברחבי המדבר,
      גלו חמש תחנות, פתרו חידות,
      ואספו כוכבים.
      עתי הוא מדריך המסע.
    </p>

    <div class="introCard">
      <b>שליטה:</b>
      חצים או WASD לתנועה.
      אפשר גם ללחוץ על ״הולכים לתחנה״
      כדי שאברהם יגיע בעצמו.
    </div>

    <p>בחרו שמות לארבע קבוצות:</p>

    <div class="names">
      ${[1, 2, 3, 4].map(i => `
        <input
          aria-label="שם קבוצה ${i}"
          value="קבוצה ${i}"
          maxlength="18"
        />
      `).join('')}
    </div>

    <button class="primary" id="start">
      🎮 מתחילים לשחק!
    </button>
  `);

  $('start').onclick = () => {
    teams = [
      ...document.querySelectorAll('.names input')
    ].map((x, i) => ({
      name: cleanTeamName(x.value, i),
      score: 0
    }));

    rail();
    mode = 'travel';
    hideModal();
  };
}

// DID YOU KNOW
function fact() {
  mode = 'fact';

  showModal(`
    <div class="eyebrow">
      תחנה ${current + 1} מתוך 5
      • ${stages[current].name}
    </div>

    <h2>📜 סוד מהמסע · הידעת?</h2>

    <p class="fact">
      ${stages[current].fact}
    </p>

    <div class="introCard">
      עתי, כדאי לקרוא את העובדה בקול
      ולתת לכיתה כמה שניות להגיב.
    </div>

    <button class="primary" id="questions">
      לשאלות התחנה ←
    </button>
  `);

  $('questions').onclick = () => {
    question = 0;
    quiz();
  };
}

// QUIZ SCREEN
function quiz() {
  mode = 'quiz';

  const s = stages[current];
  const q = s.q[question];
  const [title, opts] = q;

  showModal(`
    <div class="eyebrow">
      ${s.icon} ${s.name}
      • שאלה ${question + 1} מתוך ${s.q.length}
    </div>

    ${stats()}

    <h2>${safe(title)}</h2>

    <div class="options">
      ${opts.map((o, i) => `
        <button
          class="answer"
          data-answer="${i}"
        >
          <b>${'אבגד'[i]}</b>
          ${safe(o)}
        </button>
      `).join('')}
    </div>

    <p class="activeTurn">
      🎯 התור של
      <strong>
        ${safe(cleanTeamName(teams[turn].name, turn))}
      </strong>
      • תשובה נכונה = 10 כוכבים
    </p>

    <div id="explain"></div>
  `);

  document.querySelectorAll('[data-answer]')
    .forEach(b => {
      b.onclick = () =>
        answer(Number(b.dataset.answer));
    });
}

// ANSWER CHECKING
function answer(selected) {
  const q = stages[current].q[question];
  const ok = selected === q[2];

  document.querySelectorAll('[data-answer]')
    .forEach(b => {
      b.disabled = true;

      const n = Number(b.dataset.answer);

      if (n === q[2]) {
        b.classList.add('right');
      } else if (n === selected) {
        b.classList.add('wrong');
      }
    });

  if (ok) {
    teams[turn].score += 10;
    points += 10;
    chirp();
  }

  $('score').textContent = `⭐ ${points}`;

  $('explain').innerHTML = `
    <div class="explanation">
      ${ok
        ? '✅ תשובה נכונה! +10 כוכבים'
        : '💡 לומדים וממשיכים'
      }

      <p>${safe(q[3])}</p>
    </div>

    <button class="primary" id="continue">
      ${question === stages[current].q.length - 1
        ? 'סיום התחנה 🏅'
        : 'השאלה הבאה ←'
      }
    </button>
  `;

  $('continue').onclick = () => {
    turn = (turn + 1) % teams.length;
    question++;

    if (question < stages[current].q.length) {
      quiz();
    } else {
      complete();
    }
  };
}

// COMPLETE STATION
function complete() {
  mode = 'complete';
  current++;
  rail();

  showModal(`
    <h2>🏅 כל הכבוד!</h2>

    <p>
      עברתם תחנה שלמה במדבר.
      אברהם ממשיך בדרכו,
      והמסע עוד לא נגמר.
    </p>

    ${stats()}

    <button class="primary" id="continue">
      ${current >= stages.length
        ? 'לסיכום המסע 🏆'
        : 'ממשיכים לתחנה הבאה 🐪'
      }
    </button>
  `);

  $('continue').onclick = () => {
    if (current >= stages.length) {
      finale();
      return;
    }

    hideModal();
    mode = 'travel';
    $('hint').textContent =
      'הגיעו לתחנה הזוהרת הבאה!';

    target = coords[current].clone();
  };
}

// FINAL LEADERBOARD
function finale() {
  mode = 'final';

  const sorted = [...teams].sort(
    (a, b) => b.score - a.score
  );

  const max = sorted[0].score;

  const winners = sorted
    .filter(t => t.score === max)
    .map((t, i) =>
      safe(cleanTeamName(t.name, i))
    )
    .join(' ו־');

  showModal(`
    <div class="eyebrow">
      המסע הושלם!
    </div>

    <h1>🏆 כל הכבוד!</h1>

    <h2>
      הקבוצה המנצחת: ${winners}
    </h2>

    <div class="leaderboard">
      ${sorted.map((t, i) => `
        <div>
          ${['🥇', '🥈', '🥉', '⭐'][i]}
          ${safe(cleanTeamName(t.name, i))}
          — ${t.score} כוכבים
        </div>
      `).join('')}
    </div>

    <p>
      מפרשת לך־לך למדנו על
      אמונה, אומץ, שלום,
      אחריות ועזרה לאחרים.
    </p>

    <button class="primary" id="again">
      משחק חדש ↺
    </button>
  `);

  $('again').onclick = () => location.reload();
}

// GAME BUTTONS
$('go').onclick = () => {
  if (mode === 'travel') {
    target = coords[current].clone();
    $('hint').textContent =
      'אברהם צועד אל התחנה...';
  }
};

$('enter').onclick = () => {
  if (
    mode === 'travel' &&
    avatar.position.distanceTo(coords[current]) < 4.3
  ) {
    target = null;
    fact();
  }
};

$('help').onclick = () => {
  const previous = mode;
  mode = 'help';

  showModal(`
    <h2>🎮 איך משחקים?</h2>

    <p>
      מזיזים את אברהם עם חצים / WASD
      או לוחצים על ״הולכים לתחנה״.
      כשהוא קרוב לאור הזהוב,
      לוחצים על ״פתח תחנה״.
    </p>

    <p>
      בכל תחנה מחכה כרטיס ״הידעת?״
      ושלוש שאלות.
      הקבוצות מתחלפות בתורות.
      כל תשובה נכונה שווה 10 כוכבים.
    </p>

    <p>
      המשחק מותאם להקרנה על לוח חכם
      ולכ־30 דקות בכיתה.
    </p>

    <button class="primary" id="closeHelp">
      חזרה למשחק
    </button>
  `);

  $('closeHelp').onclick = () => {
    mode = previous;
    hideModal();
  };
};

$('sound').onclick = () => {
  soundOn = !soundOn;

  $('sound').textContent = soundOn
    ? '🔊 צליל: פועל'
    : '🔈 צליל: כבוי';

  chirp();
};

// KEYBOARD AND TOUCH CONTROLS
window.addEventListener('keydown', e => {
  if (
    ['ArrowUp', 'ArrowDown', 'ArrowLeft',
     'ArrowRight', ' '].includes(e.key)
  ) {
    e.preventDefault();
  }

  pressed.add(e.key.toLowerCase());

  if (
    e.key === 'Enter' &&
    mode === 'travel' &&
    !$('enter').disabled
  ) {
    $('enter').click();
  }
});

window.addEventListener('keyup', e => {
  pressed.delete(e.key.toLowerCase());
});

document.querySelectorAll('[data-key]')
  .forEach(b => {
    b.addEventListener('pointerdown', e => {
      e.preventDefault();
      pressed.add(b.dataset.key.toLowerCase());
      b.setPointerCapture(e.pointerId);
    });

    for (const evt of [
      'pointerup',
      'pointercancel',
      'lostpointercapture'
    ]) {
      b.addEventListener(evt, () =>
        pressed.delete(b.dataset.key.toLowerCase())
      );
    }
  });

// ANIMATION LOOP
let last = performance.now();
let elapsed = 0;

function animate(now) {
  requestAnimationFrame(animate);

  const dt = Math.min((now - last) / 1000, .05);
  last = now;
  elapsed += dt;

  let dx = 0;
  let dz = 0;

  if (mode === 'travel') {
    if (pressed.has('arrowup') || pressed.has('w'))
      dz -= 1;

    if (pressed.has('arrowdown') || pressed.has('s'))
      dz += 1;

    if (pressed.has('arrowleft') || pressed.has('a'))
      dx -= 1;

    if (pressed.has('arrowright') || pressed.has('d'))
      dx += 1;

    if (dx || dz) {
      target = null;
    } else if (target) {
      dx = target.x - avatar.position.x;
      dz = target.z - avatar.position.z;

      if (Math.hypot(dx, dz) < 2.7) {
        dx = 0;
        dz = 0;
        target = null;
      }
    }

    const len = Math.hypot(dx, dz);

    if (len > .001) {
      const vx = dx / len;
      const vz = dz / len;
      const speed = target ? 7 : 9;

      avatar.position.x += vx * speed * dt;
      avatar.position.z += vz * speed * dt;

      avatar.rotation.y = Math.atan2(vx, vz);
      avatar.children[0].rotation.z =
        Math.sin(elapsed * 11) * .045;

      moving = true;
    } else {
      moving = false;
      avatar.children[0].rotation.z = 0;
    }
  }

  const near =
    current < stages.length &&
    avatar.position.distanceTo(coords[current]) < 4.3;

  $('enter').disabled =
    mode !== 'travel' || !near;

  if (near && mode === 'travel') {
    $('hint').textContent =
      `${stages[current].icon} הגעתם לתחנה: ` +
      `${stages[current].name}. פתחו אותה!`;
  }

  markers.forEach((m, i) => {
    m.crystal.rotation.y += dt * .6;

    m.crystal.position.y =
      3 + Math.sin(elapsed * 2 + i) * .16;

    m.group.visible = i >= current;
  });

  const ideal = new THREE.Vector3(
    avatar.position.x,
    14,
    avatar.position.z + 20
  );

  camera.position.lerp(
    ideal,
    Math.min(1, dt * 2.8)
  );

  const look = new THREE.Vector3(
    avatar.position.x,
    1.5,
    avatar.position.z - 8
  );

  camera.lookAt(look);
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
});

rail();
welcome();
