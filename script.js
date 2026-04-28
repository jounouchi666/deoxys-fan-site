const DEX_NO = "#386";

const typeJaMap = {
  normal: "ノーマル",
  fire: "ほのお",
  water: "みず",
  electric: "でんき",
  grass: "くさ",
  ice: "こおり",
  fighting: "かくとう",
  poison: "どく",
  ground: "じめん",
  flying: "ひこう",
  psychic: "エスパー",
  bug: "むし",
  rock: "いわ",
  ghost: "ゴースト",
  dragon: "ドラゴン",
  dark: "あく",
  steel: "はがね",
  fairy: "フェアリー"
};

const abilityJaMap = {
  pressure: "プレッシャー"
};

const forms = [
  {
    key: "deoxys-normal",
    label: "ノーマル",
    fullLabel: "ノーマルフォルム",
    displayName: "デオキシス ノーマルフォルム",
    note: "攻撃・特攻が高い標準形態。基準形態ではあるが、耐久は低く、実質的には高速高火力型。",
    tags: ["基準形態", "高火力", "低耐久"],
    battle: {
      role: "高速特殊/物理アタッカー",
      style: "高い攻撃性能を活かして相手を削る。耐久は薄いため、長く場に残るよりも一気に圧をかける運用が向く。",
      tags: ["アタッカー", "短期決戦", "両刀候補"],
      moves: [
        ["サイコブースト", "高火力一致技"],
        ["れいとうビーム", "ドラゴン・飛行対策"],
        ["10まんボルト", "水・飛行対策"],
        ["ばかぢから", "鋼・悪への打点"]
      ]
    }
  },
  {
    key: "deoxys-attack",
    label: "アタック",
    fullLabel: "アタックフォルム",
    displayName: "デオキシス アタックフォルム",
    note: "攻撃・特攻が極端に高い超火力形態。代わりに防御面は非常に脆く、尖り方が最も激しい。",
    tags: ["超火力", "紙耐久", "尖った性能"],
    battle: {
      role: "超火力アタッカー",
      style: "一撃性能を押し付ける形態。行動できれば強烈だが、被弾には非常に弱い。先制・襷・サポートとの相性が良い。",
      tags: ["最大火力", "行動保証が重要", "ロマン枠"],
      moves: [
        ["サイコブースト", "主力一致技"],
        ["しんそく", "先制技"],
        ["ばかぢから", "悪・鋼対策"],
        ["あくのはどう", "エスパー・ゴースト対策"]
      ]
    }
  },
  {
    key: "deoxys-defense",
    label: "ディフェンス",
    fullLabel: "ディフェンスフォルム",
    displayName: "デオキシス ディフェンスフォルム",
    note: "防御・特防に寄せた形態。他フォルムとは印象が大きく異なり、要塞・サポート役としての個性が強い。",
    tags: ["高耐久", "要塞型", "サポート"],
    battle: {
      role: "耐久サポート / 起点作成",
      style: "高い耐久を活かして場作りを行う。火力で押すより、ステルスロック、壁、状態異常などの補助寄り運用が似合う。",
      tags: ["場作り", "耐久", "サポート"],
      moves: [
        ["ステルスロック", "起点作成"],
        ["リフレクター", "物理耐久補助"],
        ["ひかりのかべ", "特殊耐久補助"],
        ["じこさいせい", "継戦能力"]
      ]
    }
  },
  {
    key: "deoxys-speed",
    label: "スピード",
    fullLabel: "スピードフォルム",
    displayName: "デオキシス スピードフォルム",
    note: "素早さに特化した形態。デオキシスらしい異質感と、高速戦闘のスタイリッシュさが強い。",
    tags: ["高速型", "先制展開", "起点作成"],
    battle: {
      role: "高速サポート / 起点作成",
      style: "圧倒的な素早さで先に行動し、場を整える。攻撃よりも、先制で展開を作る役割に向いている。",
      tags: ["最速級", "展開役", "先手重視"],
      moves: [
        ["ステルスロック", "先制で設置"],
        ["ちょうはつ", "相手の補助技妨害"],
        ["でんじは", "素早さ操作"],
        ["サイコブースト", "最低限の攻撃手段"]
      ]
    }
  }
];

const statNames = {
  hp: "HP",
  attack: "こうげき",
  defense: "ぼうぎょ",
  "special-attack": "とくこう",
  "special-defense": "とくぼう",
  speed: "すばやさ"
};

const compareStats = {
  "deoxys-normal": { hp: 50, attack: 150, defense: 50, "special-attack": 150, "special-defense": 50, speed: 150 },
  "deoxys-attack": { hp: 50, attack: 180, defense: 20, "special-attack": 180, "special-defense": 20, speed: 150 },
  "deoxys-defense": { hp: 50, attack: 70, defense: 160, "special-attack": 70, "special-defense": 160, speed: 90 },
  "deoxys-speed": { hp: 50, attack: 95, defense: 90, "special-attack": 95, "special-defense": 90, speed: 180 }
};

const mainSprite = document.getElementById("mainSprite");
const pokemonName = document.getElementById("pokemonName");
const flavor = document.getElementById("flavor");
const types = document.getElementById("types");
const abilities = document.getElementById("abilities");
const meta = document.getElementById("meta");
const statsBox = document.getElementById("statsBox");
const galleryBox = document.getElementById("galleryBox");
const formTabs = document.getElementById("formTabs");
const currentFormTitle = document.getElementById("currentFormTitle");
const currentFormNote = document.getElementById("currentFormNote");
const currentFormTags = document.getElementById("currentFormTags");
const formSummaryGrid = document.getElementById("formSummaryGrid");
const battleRoleTitle = document.getElementById("battleRoleTitle");
const battleRoleText = document.getElementById("battleRoleText");
const battleStyleText = document.getElementById("battleStyleText");
const battleTags = document.getElementById("battleTags");
const moveList = document.getElementById("moveList");
const compareGrid = document.getElementById("compareGrid");
const controlPanel = document.getElementById("controlPanel");

let ticking = false;
let isAutoScrolling = false;
let autoScrollTargetId = null;
let autoScrollTimerId = null;

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${url}`);
  return res.json();
}

function getForm(key) {
  return forms.find(form => form.key === key) || forms[0];
}

function getJapaneseType(typeName) {
  return typeJaMap[typeName] || typeName;
}

function getJapaneseAbility(abilityName) {
  return abilityJaMap[abilityName] || abilityName.replaceAll("-", " ");
}

function getControlOffset() {
  return controlPanel.offsetHeight + 24;
}

function setActiveSectionNav(sectionId) {
  document.querySelectorAll(".section-nav button[data-scroll]").forEach(button => {
    button.classList.toggle("active", button.dataset.scroll === sectionId);
  });
}

function getTargetTop(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return 0;
  return Math.max(0, target.offsetTop - getControlOffset());
}

function finishAutoScroll() {
  if (!isAutoScrolling) return;

  isAutoScrolling = false;

  if (autoScrollTimerId) {
    clearTimeout(autoScrollTimerId);
    autoScrollTimerId = null;
  }

  if (autoScrollTargetId) {
    setActiveSectionNav(autoScrollTargetId);
  }

  autoScrollTargetId = null;
  requestScrollSpyUpdate();
}

function checkAutoScrollArrival() {
  if (!isAutoScrolling || !autoScrollTargetId) return;

  const targetTop = getTargetTop(autoScrollTargetId);
  const distance = Math.abs(window.scrollY - targetTop);

  if (distance <= 3) {
    finishAutoScroll();
  }
}

function getCurrentSectionId() {
  const sections = Array.from(document.querySelectorAll("[data-spy-section]"));
  const offset = getControlOffset();
  const currentLine = window.scrollY + offset + 20;

  let currentId = sections[0].id;

  for (const section of sections) {
    if (section.offsetTop <= currentLine) {
      currentId = section.id;
    } else {
      break;
    }
  }

  const scrollBottom = window.scrollY + window.innerHeight;
  const pageBottom = document.documentElement.scrollHeight;

  if (pageBottom - scrollBottom < 80) {
    currentId = sections[sections.length - 1].id;
  }

  return currentId;
}

function updateActiveNavByScroll() {
  if (isAutoScrolling) {
    checkAutoScrollArrival();
    ticking = false;
    return;
  }

  setActiveSectionNav(getCurrentSectionId());
  ticking = false;
}

function requestScrollSpyUpdate() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(updateActiveNavByScroll);
}

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  if (autoScrollTimerId) {
    clearTimeout(autoScrollTimerId);
  }

  isAutoScrolling = true;
  autoScrollTargetId = sectionId;
  setActiveSectionNav(sectionId);

  window.scrollTo({
    top: getTargetTop(sectionId),
    behavior: "smooth"
  });

  autoScrollTimerId = window.setTimeout(() => {
    finishAutoScroll();
  }, 1000);
}

function setupNavigation() {
  document.querySelectorAll(".section-nav button[data-scroll]").forEach(button => {
    button.addEventListener("click", () => {
      scrollToSection(button.dataset.scroll);
    });
  });

  window.addEventListener("scroll", requestScrollSpyUpdate, { passive: true });
  window.addEventListener("resize", () => {
    if (isAutoScrolling && autoScrollTargetId) {
      setActiveSectionNav(autoScrollTargetId);
      return;
    }

    requestScrollSpyUpdate();
  });

  requestScrollSpyUpdate();
}

function renderFormTabs(activeKey) {
  formTabs.innerHTML = "";

  forms.forEach(form => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = form.label;
    button.className = form.key === activeKey ? "active" : "";
    button.addEventListener("click", () => loadPokemon(form.key));
    formTabs.appendChild(button);
  });
}

function renderCurrentFormDetail(activeKey) {
  const form = getForm(activeKey);
  currentFormTitle.textContent = form.fullLabel;
  currentFormNote.textContent = form.note;
  currentFormTags.innerHTML = form.tags.map(tag => `<span class="pill">${tag}</span>`).join("");
}

function renderBattle(activeKey) {
  const form = getForm(activeKey);
  const battle = form.battle;

  battleRoleTitle.textContent = battle.role;
  battleRoleText.textContent = form.note;
  battleStyleText.textContent = battle.style;
  battleTags.innerHTML = battle.tags.map(tag => `<span class="pill">${tag}</span>`).join("");

  moveList.innerHTML = battle.moves.map(([name, desc]) => `
    <div class="move">
      <strong>${name}</strong>
      <span>${desc}</span>
    </div>
  `).join("");
}

function renderFormSummary(activeKey) {
  formSummaryGrid.innerHTML = "";

  forms.forEach(form => {
    const card = document.createElement("div");
    card.className = "form-summary-card" + (form.key === activeKey ? " active" : "");
    card.innerHTML = `
      <h3>${form.fullLabel}</h3>
      <p class="muted">${form.note}</p>
      <div class="pill-row">
        ${form.tags.map(tag => `<span class="pill">${tag}</span>`).join("")}
      </div>
    `;
    card.addEventListener("click", () => loadPokemon(form.key));
    formSummaryGrid.appendChild(card);
  });
}

function renderStats(stats) {
  statsBox.innerHTML = "";

  stats.forEach(item => {
    const name = statNames[item.stat.name] || item.stat.name;
    const value = item.base_stat;
    const percent = Math.min(100, Math.round((value / 180) * 100));

    const row = document.createElement("div");
    row.className = "stat-line";
    row.innerHTML = `
      <strong>${name}</strong>
      <div class="bar"><span style="width:${percent}%"></span></div>
      <b>${value}</b>
    `;
    statsBox.appendChild(row);
  });
}

function renderCompare(activeKey) {
  compareGrid.innerHTML = "";

  forms.forEach(form => {
    const stats = compareStats[form.key];
    const card = document.createElement("div");
    card.className = "compare-card" + (form.key === activeKey ? " active" : "");

    card.innerHTML = `
      <h3>${form.fullLabel}</h3>
      ${Object.entries(stats).map(([key, value]) => {
        const percent = Math.min(100, Math.round((value / 180) * 100));
        return `
          <div class="mini-stat">
            <span>${statNames[key]}</span>
            <div class="mini-bar"><span style="width:${percent}%"></span></div>
            <b>${value}</b>
          </div>
        `;
      }).join("")}
    `;

    card.addEventListener("click", () => loadPokemon(form.key));
    compareGrid.appendChild(card);
  });
}

function renderSprites(sprites) {
  galleryBox.innerHTML = "";

  const items = [
    ["正面", sprites.front_default],
    ["色違い 正面", sprites.front_shiny],
    ["背面", sprites.back_default],
    ["色違い 背面", sprites.back_shiny],
    ["公式アート", sprites.other?.["official-artwork"]?.front_default],
    ["HOME", sprites.other?.home?.front_default],
    ["HOME 色違い", sprites.other?.home?.front_shiny]
  ].filter(([, src]) => src);

  items.forEach(([label, src]) => {
    const fig = document.createElement("figure");
    fig.innerHTML = `
      <img src="${src}" alt="${label}">
      <figcaption>${label}</figcaption>
    `;
    galleryBox.appendChild(fig);
  });
}

async function loadPokemon(name) {
  try {
    const form = getForm(name);

    renderFormTabs(name);
    renderCurrentFormDetail(name);
    renderBattle(name);
    renderFormSummary(name);
    renderCompare(name);

    pokemonName.textContent = "Loading...";
    flavor.textContent = "PokeAPIからデータを取得中...";

    const pokemon = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const species = await fetchJson("https://pokeapi.co/api/v2/pokemon-species/deoxys");

    pokemonName.textContent = `${DEX_NO} ${form.displayName}`;

    const jpFlavor = species.flavor_text_entries.find(
      entry => entry.language.name === "ja-Hrkt" || entry.language.name === "ja"
    );

    flavor.textContent = jpFlavor
      ? jpFlavor.flavor_text.replace(/\n|\f/g, " ")
      : "DNAポケモン。宇宙由来の異質な存在として語られる幻のポケモン。";

    types.innerHTML = pokemon.types
      .map(t => `<span class="pill">タイプ: ${getJapaneseType(t.type.name)}</span>`)
      .join("");

    abilities.innerHTML = pokemon.abilities
      .map(a => `<span class="pill">特性: ${getJapaneseAbility(a.ability.name)}</span>`)
      .join("");

    meta.textContent =
      `全国図鑑番号: ${DEX_NO} / 高さ: ${pokemon.height / 10}m / 重さ: ${pokemon.weight / 10}kg`;

    const official =
      pokemon.sprites.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.other?.home?.front_default ||
      pokemon.sprites.front_default;

    mainSprite.src = official;
    mainSprite.alt = form.displayName;

    renderStats(pokemon.stats);
    renderSprites(pokemon.sprites);
    requestScrollSpyUpdate();
  } catch (error) {
    pokemonName.textContent = "Data Load Error";
    flavor.textContent = "PokeAPIからデータを取得できませんでした。ネットワーク接続を確認してください。";
    console.error(error);
  }
}

setupNavigation();
loadPokemon("deoxys-normal");
