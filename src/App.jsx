import { useState, useEffect } from "react";

const GAS_URL = "https://script.google.com/macros/s/AKfycbx6HgpIAsNOMtI0aeSyxYaXyNgpXaeZcWCVm8RLkNcncMjq_6KIR5Dabkihan_ZzoL0/exec";

// ============================================================
// DOG DATA
// ============================================================
const INITIAL_DOGS = [
  { id: "uri",     callName: "ウリ",      pedigreeName: "ADOLPH JP KALI",                      jkc: "HU-01349/23",   chip: "",              gender: "メス", birthdate: "2023-05-20", color: "BLACK & WHITE",  breed: "ハスキー",  fatherId: "zeus",   motherId: "kaoru",  note: "" },
  { id: "sae",     callName: "サエ",      pedigreeName: "ADOLPH JP MUT",                       jkc: "HU-00209/23",   chip: "392149002201909", gender: "メス", birthdate: "2022-11-17", color: "SILVER & WHITE", breed: "ハスキー",  fatherId: "ace",    motherId: "ran",    note: "" },
  { id: "luna",    callName: "ルナ",      pedigreeName: "ADOLPH JP LUNA FROST",                jkc: "HU-00468/26",   chip: "",              gender: "メス", birthdate: "2025-12-10", color: "BLACK & WHITE",  breed: "ハスキー",  fatherId: "waru",   motherId: "sae",    note: "" },
  { id: "uran",    callName: "ウラン",    pedigreeName: "BIRDIE OF OSAKA SAEKI JP",            jkc: "HU-00298/23",   chip: "",              gender: "メス", birthdate: "2022-11-24", color: "SILVER & WHITE", breed: "ハスキー",  fatherId: "ares",   motherId: "anna",   note: "" },
  { id: "nacchan", callName: "なっちゃん", pedigreeName: "ADOLPH JP SEDONA",                    jkc: "HU-00579/25",   chip: "",              gender: "メス", birthdate: "2025-01-01", color: "SILVER & WHITE", breed: "ハスキー",  fatherId: "runo",   motherId: "kaoru",  note: "" },
  { id: "shin",    callName: "シン",      pedigreeName: "",                                    jkc: "",              chip: "",              gender: "オス", birthdate: "",           color: "",               breed: "ハスキー",  fatherId: null,     motherId: null,     note: "" },
  { id: "alex",    callName: "アレックス", pedigreeName: "",                                    jkc: "",              chip: "",              gender: "オス", birthdate: "",           color: "",               breed: "ハスキー",  fatherId: null,     motherId: null,     note: "" },
  { id: "angel",   callName: "エンジェル", pedigreeName: "",                                    jkc: "",              chip: "",              gender: "オス", birthdate: "",           color: "",               breed: "ハスキー",  fatherId: null,     motherId: null,     note: "" },
  { id: "yomogi",  callName: "よもぎ",    pedigreeName: "FANKY KANAOKA JP YOMOGI",             jkc: "WP-01988/20",   chip: "392144000405691", gender: "メス", birthdate: "2020-03-19", color: "RED & WHITE",    breed: "コーギー", fatherId: "barley", motherId: "sango",  note: "" },
  { id: "chihiro", callName: "ちひろ",    pedigreeName: "FANKY KANAOKA JP NEVER ENDING STORY", jkc: "WP-02235/21",   chip: "392144000536142", gender: "メス", birthdate: "2021-05-06", color: "RED & WHITE",    breed: "コーギー", fatherId: "barley", motherId: "sakura", note: "" },
  { id: "alexa",   callName: "アレクサ",  pedigreeName: "MEILLEUR AMI JP AMAZON",              jkc: "WP-00215/23",   chip: "392149002201911", gender: "メス", birthdate: "2022-10-18", color: "RED & WHITE",    breed: "コーギー", fatherId: "prince", motherId: "yomogi", note: "" },
  { id: "asuka",   callName: "あすか",    pedigreeName: "",                                    jkc: "",              chip: "",              gender: "メス", birthdate: "",           color: "",               breed: "コーギー", fatherId: null,     motherId: null,     note: "" },
  { id: "prince",  callName: "プリンス",  pedigreeName: "BALLETCOR PRINCE CHARMING",           jkc: "WP-03885/19-I", chip: "977200009529573", gender: "オス", birthdate: "2018-11-23", color: "TRICOLOUR",      breed: "コーギー", fatherId: null,     motherId: null,     note: "外国産輸入" },
  { id: "ryusei",  callName: "りゅうせい", pedigreeName: "",                                    jkc: "",              chip: "",              gender: "オス", birthdate: "",           color: "",               breed: "コーギー", fatherId: null,     motherId: null,     note: "" },
];

const EXTERNAL_DATA = [
  { id: "zeus",   callName: "ゼウス",   breed: "ハスキー", gender: "オス", external: true },
  { id: "kaoru",  callName: "カオル",   breed: "ハスキー", gender: "メス", external: true },
  { id: "ace",    callName: "エース",   breed: "ハスキー", gender: "オス", external: true },
  { id: "ran",    callName: "ラン",     breed: "ハスキー", gender: "メス", external: true },
  { id: "waru",   callName: "ワル",     breed: "ハスキー", gender: "オス", external: true },
  { id: "ares",   callName: "アレス",   breed: "ハスキー", gender: "オス", external: true },
  { id: "anna",   callName: "アンナ",   breed: "ハスキー", gender: "メス", external: true },
  { id: "runo",   callName: "ルノ",     breed: "ハスキー", gender: "オス", external: true },
  { id: "nontan", callName: "ノンタン", breed: "ハスキー", gender: "オス", external: true, note: "里子に出た" },
  { id: "barley", callName: "バーリー", breed: "コーギー", gender: "オス", external: true },
  { id: "sango",  callName: "サンゴ",   breed: "コーギー", gender: "メス", external: true },
  { id: "sakura", callName: "さくら",   breed: "コーギー", gender: "メス", external: true },
  { id: "korleone", callName: "コルレオーネ", breed: "コーギー", gender: "オス", external: true },
];

// ============================================================
// CYCLE DATA（ヒート→交配→結果を1つにまとめた単位）
// ============================================================
const CYCLES_DATA = [
  { id: "c_uri_1", dogId: "uri", heatDate: "2025-08-29",
    matings: [{ id: "m1", date: "2025-09-05", method: "人工交配" }, { id: "m2", date: "2025-09-07", method: "自然交配" }],
    fatherName: "ワル", status: "非受胎",
    birthDate: null, birthMethod: null, pregnancyDays: null, totalPups: null, malePups: null, femalePups: null, stillborn: null, note: "" },
  { id: "c_uri_2", dogId: "uri", heatDate: null,
    matings: [{ id: "m3", date: "2025-09-09", method: "自然交配" }, { id: "m4", date: "2025-09-11", method: "自然交配" }, { id: "m5", date: "2025-09-13", method: "自然交配" }, { id: "m6", date: "2025-09-15", method: "自然交配" }],
    fatherName: "アク", status: "出産済",
    birthDate: "2025-11-13", birthMethod: "自然分娩", pregnancyDays: 63, totalPups: 4, malePups: 1, femalePups: 3, stillborn: 0, note: "" },
  { id: "c_uri_3", dogId: "uri", heatDate: "2026-04-27",
    matings: [{ id: "m7", date: "2026-05-04", method: "人工交配" }, { id: "m8", date: "2026-05-05", method: "人工交配" }, { id: "m9", date: "2026-05-08", method: "人工交配" }],
    fatherName: "ワル", status: "交配中",
    birthDate: null, birthMethod: null, pregnancyDays: null, totalPups: null, malePups: null, femalePups: null, stillborn: null, note: "" },

  { id: "c_uran_1", dogId: "uran", heatDate: "2025-08-31",
    matings: [{ id: "m10", date: "2025-09-07", method: "自然交配" }],
    fatherName: "エース", status: "非受胎",
    birthDate: null, birthMethod: null, pregnancyDays: null, totalPups: null, malePups: null, femalePups: null, stillborn: null, note: "" },
  { id: "c_uran_2", dogId: "uran", heatDate: "2026-01-20",
    matings: [{ id: "m11", date: "2026-01-27", method: "自然交配" }, { id: "m12", date: "2026-01-29", method: "自然交配" }],
    fatherName: "ノンタン", status: "出産済",
    birthDate: "2026-03-31", birthMethod: "自然分娩", pregnancyDays: 61, totalPups: 4, malePups: 1, femalePups: 3, stillborn: 0, note: "" },

  { id: "c_chihiro_1", dogId: "chihiro", heatDate: "2025-10-07",
    matings: [{ id: "m13", date: "2025-10-14", method: "人工交配" }],
    fatherName: "プリンス", status: "出産済",
    birthDate: "2025-12-16", birthMethod: "自然分娩", pregnancyDays: 62, totalPups: null, malePups: null, femalePups: null, stillborn: null, note: "" },
  { id: "c_chihiro_2", dogId: "chihiro", heatDate: "2026-02-17",
    matings: [{ id: "m14", date: "2026-02-24", method: "人工交配" }, { id: "m15", date: "2026-02-26", method: "人工交配" }, { id: "m16", date: "2026-02-28", method: "人工交配" }, { id: "m17", date: "2026-03-02", method: "人工交配" }, { id: "m18", date: "2026-03-04", method: "人工交配" }],
    fatherName: "プリンス", status: "妊娠中",
    birthDate: null, birthMethod: null, pregnancyDays: null, totalPups: null, malePups: null, femalePups: null, stillborn: null, note: "" },

  { id: "c_sae_1", dogId: "sae", heatDate: "2025-10-04",
    matings: [{ id: "m19", date: "2025-10-11", method: "自然交配" }, { id: "m20", date: "2025-10-16", method: "自然交配" }],
    fatherName: "エース", status: "出産済",
    birthDate: "2025-12-21", birthMethod: "自然分娩", pregnancyDays: 62, totalPups: 5, malePups: 1, femalePups: 4, stillborn: 1, note: "" },
  { id: "c_sae_2", dogId: "sae", heatDate: "2026-04-21",
    matings: [{ id: "m21", date: "2026-04-28", method: "自然交配" }],
    fatherName: "ノンタン", status: "交配中",
    birthDate: null, birthMethod: null, pregnancyDays: null, totalPups: null, malePups: null, femalePups: null, stillborn: null, note: "" },

  { id: "c_nacchan_1", dogId: "nacchan", heatDate: "2025-10-31",
    matings: [{ id: "m22", date: "2025-11-07", method: "自然交配" }],
    fatherName: "アク", status: "出産済",
    birthDate: "2026-01-11", birthMethod: "自然分娩", pregnancyDays: 62, totalPups: 7, malePups: 2, femalePups: 5, stillborn: 0, note: "初産" },

  { id: "c_yomogi_1", dogId: "yomogi", heatDate: "2026-02-12",
    matings: [{ id: "m23", date: "2026-02-15", method: "人工交配" }],
    fatherName: "プリンス", status: "出産済",
    birthDate: "2026-04-25", birthMethod: "自然分娩", pregnancyDays: 61, totalPups: 9, malePups: 1, femalePups: 1, stillborn: null, note: "" },

  { id: "c_alexa_1", dogId: "alexa", heatDate: "2026-01-30",
    matings: [{ id: "m24", date: "2026-02-05", method: "人工交配" }],
    fatherName: "コルレオーネ", status: "出産済",
    birthDate: "2026-04-09", birthMethod: "帝王切開", pregnancyDays: 63, totalPups: 9, malePups: 3, femalePups: 6, stillborn: 0, note: "" },
];

const PUPPIES_DATA = [
  { id: "p_au1", birthId: "c_uri_2", no: 1, gender: "オス", color: "BLACK & WHITE",  eyeColor: "", identifier: "赤リボン", birthWeight: "", name: "", chip: "", note: "" },
  { id: "p_au2", birthId: "c_uri_2", no: 2, gender: "メス", color: "BLACK & WHITE",  eyeColor: "", identifier: "青リボン", birthWeight: "", name: "", chip: "", note: "" },
  { id: "p_au3", birthId: "c_uri_2", no: 3, gender: "メス", color: "SILVER & WHITE", eyeColor: "", identifier: "黄リボン", birthWeight: "", name: "", chip: "", note: "" },
  { id: "p_au4", birthId: "c_uri_2", no: 4, gender: "メス", color: "SILVER & WHITE", eyeColor: "", identifier: "緑リボン", birthWeight: "", name: "", chip: "", note: "" },
];

// ============================================================
// CHICKEN DATA
// ============================================================
const INITIAL_FLOCKS = [
  { id: "f1", breed: "烏骨鶏（黒）",     male: 2, female: 6, note: "" },
  { id: "f2", breed: "烏骨鶏（白）",     male: 2, female: 3, note: "" },
  { id: "f3", breed: "烏骨鶏（マダラ）", male: 2, female: 7, note: "" },
  { id: "f4", breed: "岡崎おうはん",     male: 1, female: 2, note: "" },
];
const INITIAL_PRODUCTS = [
  { id: "pr1", flockId: "f1", name: "烏骨鶏卵 6個入り",      count: 6,  price: 2000 },
  { id: "pr2", flockId: "f1", name: "烏骨鶏卵 10個入り",     count: 10, price: 2800 },
  { id: "pr3", flockId: "f4", name: "岡崎おうはん卵 10個入り", count: 10, price: 2180 },
];
const INITIAL_EGGS = [
  { id: "e1", flockId: "f1", date: "2026-05-09", count: 10, note: "" },
  { id: "e2", flockId: "f4", date: "2026-05-09", count: 2,  note: "" },
];
const INITIAL_HATCH = [
  { id: "h1", breedLabel: "烏骨鶏",      setDate: "", setCount: null, hatchDate: "2026-01-01", hatchCount: 7, male: null, female: null, note: "2026年度ヒナ" },
  { id: "h2", breedLabel: "岡崎おうはん", setDate: "", setCount: null, hatchDate: "2026-01-01", hatchCount: 2, male: null, female: null, note: "2026年度ヒナ" },
];
const INITIAL_PURCHASES = [];
const INITIAL_CUSTOMERS = [
  { id: "c1", name: "田中様", contact: "example@mail.com", address: "", note: "ストアーズ" },
];
const INITIAL_SALES = [
  { id: "s1", customerId: "c1", productId: "pr1", date: "2026-04-20", qty: 2, total: 4000, channel: "ストアーズ", note: "" },
];

// ============================================================
// UTILS
// ============================================================
const todayStr = () => new Date().toISOString().slice(0, 10);
const formatDate = (d) => d ? String(d).replace(/-/g, "/") : "－";
const formatMD = (d) => { if (!d) return "－"; const parts = String(d).split("-"); return `${parseInt(parts[1])}/${parseInt(parts[2])}`; };
const getAge = (b) => {
  if (!b) return "";
  const diff = (new Date() - new Date(b)) / (1000 * 60 * 60 * 24 * 30.5);
  if (diff < 12) return `${Math.floor(diff)}ヶ月`;
  return `${Math.floor(diff / 12)}歳${Math.floor(diff % 12) > 0 ? Math.floor(diff % 12) + "ヶ月" : ""}`;
};
const daysDiff = (a, b = todayStr()) => !a ? null : Math.round((new Date(b) - new Date(a)) / 86400000);
const addDays = (dateStr, days) => { const d = new Date(dateStr); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); };

const STATUS_COLOR = {
  "ヒートのみ": { bg: "rgba(212,120,158,0.15)", text: "#d4789e", border: "rgba(212,120,158,0.4)" },
  "交配中": { bg: "rgba(91,143,201,0.15)",  text: "#5b8fc9", border: "rgba(91,143,201,0.4)" },
  "妊娠中": { bg: "rgba(201,168,76,0.15)",  text: "#c9a84c", border: "rgba(201,168,76,0.4)" },
  "出産済": { bg: "rgba(80,180,120,0.15)",  text: "#50b478", border: "rgba(80,180,120,0.4)" },
  "非受胎": { bg: "rgba(180,80,80,0.15)",   text: "#c96060", border: "rgba(180,80,80,0.4)" },
};

function isNonEmptyArray(arr) { return Array.isArray(arr) && arr.length > 0; }

// その子の過去のヒート間隔から次回予測を計算（データが少なければ180日で仮予測）
function predictNextHeat(dogCycles) {
  const heatDates = dogCycles.filter(c => c.heatDate).map(c => c.heatDate).sort();
  if (heatDates.length === 0) return null;
  const lastHeat = heatDates[heatDates.length - 1];
  let avgDays = 180;
  let isEstimate = true;
  if (heatDates.length >= 2) {
    const diffs = [];
    for (let i = 1; i < heatDates.length; i++) {
      diffs.push(daysDiff(heatDates[i - 1], heatDates[i]));
    }
    avgDays = Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length);
    isEstimate = false;
  }
  const center = addDays(lastHeat, avgDays);
  const rangeStart = addDays(center, -7);
  const rangeEnd = addDays(center, 7);
  return { lastHeat, avgDays, rangeStart, rangeEnd, isEstimate };
}

// ============================================================
// STYLES
// ============================================================
const S = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0f0e0c;--surface:#1a1815;--surface2:#232018;
  --border:#2e2b24;--border2:#3d3930;
  --gold:#c9a84c;--gold2:#e8c97a;--gold-dim:rgba(201,168,76,0.12);
  --text:#f0ead8;--text2:#a09880;--text3:#6b6454;
  --pink:#d4789e;--pink-dim:rgba(212,120,158,0.12);
  --blue:#5b8fc9;--blue-dim:rgba(91,143,201,0.12);
  --green:#50b478;--green-dim:rgba(80,180,120,0.12);
  --corgi:#c97b3a;--corgi-dim:rgba(201,123,58,0.12);
  --r:14px;--r-sm:8px;
}
body{font-family:'Noto Sans JP',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.app{max-width:480px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column}
.hdr{padding:14px 20px 12px;background:var(--surface);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;display:flex;align-items:center;gap:10px}
.hdr-back{background:none;border:none;color:var(--text2);cursor:pointer;display:flex;align-items:center;padding:4px;border-radius:8px;flex-shrink:0;font-size:20px}
.hdr-title{font-size:16px;font-weight:700}
.hdr-sub{font-size:10px;color:var(--text3);font-family:'DM Mono',monospace}
.home-hero{padding:28px 20px 20px;background:linear-gradient(160deg,var(--surface2),var(--surface));border-bottom:1px solid var(--border)}
.home-eyebrow{font-size:10px;font-weight:700;letter-spacing:0.15em;color:var(--gold);text-transform:uppercase;margin-bottom:6px}
.home-title{font-family:'Playfair Display',serif;font-size:26px;line-height:1.25}
.home-title em{font-style:italic;color:var(--gold2)}
.home-cards{padding:16px 20px;display:flex;flex-direction:column;gap:12px;padding-bottom:16px}
.home-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:18px 20px;cursor:pointer;display:flex;align-items:center;gap:16px}
.home-card.dog{border-left:4px solid var(--blue)}
.home-card.chicken{border-left:4px solid var(--green)}
.home-card-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.home-card-icon.dog{background:var(--blue-dim)}
.home-card-icon.chicken{background:var(--green-dim)}
.home-card-name{font-size:17px;font-weight:700}
.home-card-desc{font-size:12px;color:var(--text3);margin-top:3px}
.menu-list{padding:16px 20px;display:flex;flex-direction:column;gap:10px}
.menu-item{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:16px 18px;cursor:pointer;display:flex;align-items:center;gap:14px}
.menu-item-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.menu-item-name{font-size:15px;font-weight:700}
.menu-item-desc{font-size:11px;color:var(--text3);margin-top:2px}
.breed-tabs{display:flex;gap:8px;padding:12px 20px;border-bottom:1px solid var(--border);overflow-x:auto}
.breed-tab{padding:7px 14px;border-radius:20px;border:1px solid var(--border2);background:none;font-family:'Noto Sans JP',sans-serif;font-size:12px;font-weight:700;cursor:pointer;color:var(--text3);white-space:nowrap}
.breed-tab.on{background:var(--gold-dim);border-color:var(--gold);color:var(--gold)}
.dog-list{padding:12px 20px;display:flex;flex-direction:column;gap:9px;padding-bottom:100px}
.dog-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:13px 15px;cursor:pointer;display:flex;align-items:center;gap:12px}
.dog-card.husky{border-left:3px solid var(--blue)}
.dog-card.corgi{border-left:3px solid var(--corgi)}
.dog-av{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.dog-callname{font-size:15px;font-weight:700}
.dog-badges{display:flex;gap:5px;margin-top:5px;flex-wrap:wrap}
.badge{font-size:10px;padding:2px 7px;border-radius:20px;font-weight:600}
.badge.female{background:rgba(212,120,158,0.2);color:var(--pink)}
.badge.male{background:var(--blue-dim);color:var(--blue)}
.badge.age{background:var(--surface2);color:var(--text2)}
.detail-hero{padding:18px 20px;background:var(--surface);border-bottom:1px solid var(--border)}
.detail-name{font-size:26px;font-weight:900}
.detail-ped{font-size:10px;color:var(--text3);font-family:'DM Mono',monospace;margin-top:3px}
.detail-badges{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap}
.info-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);margin:12px 20px 0;padding:14px 16px}
.info-card-title{font-size:10px;font-weight:700;letter-spacing:0.1em;color:var(--gold);text-transform:uppercase;margin-bottom:11px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.info-item label{font-size:10px;color:var(--text3);display:block;margin-bottom:2px}
.info-item span{font-size:13px;font-weight:500}
.info-item.full{grid-column:1/-1}
.link-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.link-btn{padding:7px 12px;border-radius:var(--r-sm);border:1px solid var(--border2);background:var(--surface2);font-family:'Noto Sans JP',sans-serif;font-size:12px;font-weight:700;cursor:pointer;color:var(--text2)}
.link-btn.gold{border-color:rgba(201,168,76,0.4);color:var(--gold);background:var(--gold-dim)}
.link-btn.pink{border-color:rgba(212,120,158,0.4);color:var(--pink);background:var(--pink-dim)}
.tree-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);margin:12px 20px 0;padding:14px 16px}
.tree-title{font-size:10px;font-weight:700;letter-spacing:0.1em;color:var(--gold);text-transform:uppercase;margin-bottom:14px}
.tree-wrap{overflow-x:auto;padding-bottom:4px}
.tree-box{background:var(--surface2);border:1px solid var(--border2);border-radius:8px;padding:7px 10px;min-width:84px;cursor:pointer}
.tree-box.mine{border-color:var(--gold);background:var(--gold-dim)}
.tree-box.ext{border-style:dashed;opacity:0.7}
.tree-box .t-name{font-size:12px;font-weight:700}
.tree-box .t-role{font-size:9px;color:var(--text3);margin-top:1px}
.tree-box.m .t-name{color:var(--blue)}
.tree-box.f .t-name{color:var(--pink)}
.tree-box.mine .t-name{color:var(--gold2)}
.dog-selector{display:flex;gap:8px;padding:10px 20px;overflow-x:auto;border-bottom:1px solid var(--border)}
.dog-chip{padding:7px 13px;border-radius:20px;border:1px solid var(--border2);background:none;font-family:'Noto Sans JP',sans-serif;font-size:12px;font-weight:700;cursor:pointer;color:var(--text3);white-space:nowrap;flex-shrink:0}
.dog-chip.on.husky{background:var(--blue-dim);border-color:var(--blue);color:var(--blue)}
.dog-chip.on.corgi{background:var(--corgi-dim);border-color:var(--corgi);color:var(--corgi)}
.dog-hdr{padding:12px 20px;background:var(--surface);border-bottom:1px solid var(--border)}
.dog-hdr-name{font-size:19px;font-weight:900}
.dog-hdr-stats{display:flex;gap:18px;margin-top:9px}
.dhs-num{font-size:17px;font-weight:900;font-family:'DM Mono',monospace}
.dhs-lbl{font-size:10px;color:var(--text3);margin-top:1px}
.next-heat{margin:11px 20px 0;background:var(--pink-dim);border:1px solid rgba(212,120,158,0.25);border-radius:var(--r);padding:11px 15px}
.nh-label{font-size:11px;color:var(--pink);font-weight:700;margin-bottom:4px}
.nh-range{font-size:16px;font-weight:700;font-family:'DM Mono',monospace}
.nh-sub{font-size:10px;color:var(--text3);margin-top:4px}
.cycle-list{padding:14px 20px;padding-bottom:110px;display:flex;flex-direction:column;gap:12px}
.cycle-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);overflow:hidden}
.cycle-hdr{padding:12px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:flex-start}
.cycle-heat{font-size:11px;color:var(--pink);font-weight:700}
.cycle-body{padding:12px 16px}
.mating-line{font-family:'DM Mono',monospace;font-size:12px;color:var(--text2);line-height:1.7}
.mating-detail{font-size:11px;color:var(--text3);margin-top:3px}
.status-badge{display:inline-flex;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;border:1px solid;margin-top:8px}
.birth-summary{margin-top:8px;padding:9px 12px;background:var(--green-dim);border-radius:8px;border:1px solid rgba(80,180,120,0.2);cursor:pointer}
.birth-num{font-size:22px;font-weight:900;font-family:'DM Mono',monospace;color:var(--green)}
.birth-detail{font-size:11px;color:var(--text2);margin-top:2px}
.pup-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:9px}
.pup-chip{background:var(--surface2);border:1px solid var(--border2);border-radius:var(--r-sm);padding:8px 10px;cursor:pointer;text-align:center}
.pup-chip.pm{border-left:3px solid var(--blue)}
.pup-chip.pf{border-left:3px solid var(--pink)}
.pup-chip-no{font-size:9px;color:var(--text3);margin-bottom:2px}
.pup-chip-gender{font-size:11px;font-weight:700}
.pup-chip-color{font-size:9px;color:var(--text3);margin-top:2px}
.pup-chip-id{font-size:9px;color:var(--gold);margin-top:2px}
.add-pup-btn{width:100%;padding:9px;border-radius:var(--r-sm);border:1px dashed var(--border2);background:none;font-family:'Noto Sans JP',sans-serif;font-size:12px;color:var(--text3);cursor:pointer;margin-top:7px}
.cycle-actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.cycle-act-btn{padding:7px 12px;border-radius:var(--r-sm);border:1px solid var(--border2);background:var(--surface2);font-family:'Noto Sans JP',sans-serif;font-size:11px;font-weight:700;cursor:pointer;color:var(--text2)}
.fab-wrap{position:fixed;bottom:26px;right:22px;display:flex;flex-direction:column;gap:9px;align-items:flex-end;z-index:150}
.fab{width:54px;height:54px;border-radius:15px;background:var(--gold);color:var(--bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(201,168,76,0.35);font-size:22px}
.fab-sub{padding:9px 15px;border-radius:11px;border:none;font-family:'Noto Sans JP',sans-serif;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,0.3);white-space:nowrap}
.fab-sub.heat{background:var(--pink);color:white}
.fab-sub.breeding{background:var(--gold);color:var(--bg)}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:200;display:flex;align-items:flex-end}
.modal{background:var(--surface);border-radius:20px 20px 0 0;border-top:1px solid var(--border2);padding:18px 20px 40px;width:100%;max-height:88vh;overflow-y:auto}
.modal-title{font-size:15px;font-weight:700;margin-bottom:14px;color:var(--gold2)}
.field{margin-bottom:13px}
.field label{font-size:11px;font-weight:700;color:var(--text3);display:block;margin-bottom:4px}
.field input,.field select,.field textarea{width:100%;border:1px solid var(--border2);border-radius:8px;padding:9px 11px;font-size:13px;font-family:'Noto Sans JP',sans-serif;background:var(--surface2);color:var(--text);outline:none}
.field select option{background:var(--surface2)}
.field textarea{resize:vertical;min-height:56px}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.btn-save{width:100%;padding:12px;border-radius:10px;border:none;background:var(--gold);color:var(--bg);font-family:'Noto Sans JP',sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-top:5px}
.btn-save.pink{background:var(--pink);color:white}
.btn-cancel{width:100%;padding:10px;border-radius:10px;border:1px solid var(--border2);background:none;font-family:'Noto Sans JP',sans-serif;font-size:13px;cursor:pointer;margin-top:7px;color:var(--text3)}
.empty{text-align:center;color:var(--text3);font-size:13px;padding:40px 0}
.flock-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:13px 15px;cursor:pointer;border-left:3px solid var(--green);margin-bottom:9px}
.flock-name{font-size:15px;font-weight:700}
.flock-count{font-size:26px;font-weight:900;font-family:'DM Mono',monospace;color:var(--green)}
.stat-box{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center}
.stat-num{font-size:20px;font-weight:900;font-family:'DM Mono',monospace}
.egg-row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border);font-size:12px}
.sync-btn{width:100%;padding:13px;border-radius:var(--r);border:1px solid rgba(201,168,76,0.4);background:var(--gold-dim);color:var(--gold);font-family:'Noto Sans JP',sans-serif;font-size:14px;font-weight:700;cursor:pointer}
.sync-hint{font-size:10px;color:var(--text3);text-align:center;margin-top:5px}
.loading-screen{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:12px}
.loading-spinner{width:36px;height:36px;border:3px solid var(--border2);border-top-color:var(--gold);border-radius:50%;animation:spin 0.8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
`;

// ============================================================
// SHARED COMPONENTS
// ============================================================
function Hdr({ title, sub, onBack }) {
  return (
    <div className="hdr">
      {onBack && <button className="hdr-back" onClick={onBack}>←</button>}
      <div><div className="hdr-title">{title}</div>{sub && <div className="hdr-sub">{sub}</div>}</div>
    </div>
  );
}
function Modal({ title, onClose, children }) {
  return (
    <div className="overlay" onClick={e => e.target.className === "overlay" && onClose()}>
      <div className="modal">
        <div className="modal-title">{title}</div>
        {children}
        <button className="btn-cancel" onClick={onClose}>キャンセル</button>
      </div>
    </div>
  );
}

// ============================================================
// FAMILY TREE
// ============================================================
function FamilyTree({ dog, dogs, onSelect }) {
  const allDogs = [...dogs, ...EXTERNAL_DATA];
  const lookup = (id) => allDogs.find(d => d.id === id);
  const fa = lookup(dog.fatherId), mo = lookup(dog.motherId);
  const ff = fa ? lookup(fa.fatherId) : null, fm = fa ? lookup(fa.motherId) : null;
  const mf = mo ? lookup(mo.fatherId) : null, mm = mo ? lookup(mo.motherId) : null;
  const Box = ({ d, role }) => {
    if (!d) return <div className="tree-box ext"><div className="t-name" style={{color:"var(--text3)"}}>不明</div><div className="t-role">{role}</div></div>;
    const mine = !d.external;
    return <div className={`tree-box ${mine?"mine":"ext"} ${d.gender==="オス"?"m":"f"}`} onClick={() => mine && onSelect(d)}>
      <div className="t-name">{d.callName}</div><div className="t-role">{role}{d.external?" (外)":""}</div>
    </div>;
  };
  const line = <div style={{width:20,height:1,background:"var(--border2)"}}/>;
  return (
    <div className="tree-wrap">
      <div style={{display:"flex",alignItems:"center",gap:0,minWidth:"max-content"}}>
        <div style={{display:"flex",flexDirection:"column",gap:32}}>
          <div style={{display:"flex",flexDirection:"column",gap:8}}><Box d={ff} role="父方祖父"/><Box d={fm} role="父方祖母"/></div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}><Box d={mf} role="母方祖父"/><Box d={mm} role="母方祖母"/></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:32,width:20}}>
          <div style={{display:"flex",alignItems:"center",height:66}}>{line}</div>
          <div style={{display:"flex",alignItems:"center",height:66}}>{line}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:32}}><Box d={fa} role="父"/><Box d={mo} role="母"/></div>
        {line}
        <div className="tree-box mine" style={{borderWidth:2,minWidth:90}}>
          <div className="t-name" style={{fontSize:13}}>{dog.callName}</div><div className="t-role">本犬</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DOG ADD / EDIT MODAL
// ============================================================
function DogFormModal({ dog, dogs, breeds, onClose, onSave }) {
  const [form, setForm] = useState(dog ? { ...dog } : { gender: "メス", breed: breeds[0] || "" });
  const [showCustom, setShowCustom] = useState(dog ? !breeds.includes(dog.breed) : false);
  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const isEdit = !!dog;

  return (
    <Modal title={isEdit ? `✏️ ${dog.callName} を編集` : "🐾 新しい犬を登録"} onClose={onClose}>
      <div className="field-row">
        <div className="field"><label>コールネーム *</label><input value={form.callName || ""} onChange={e => s("callName", e.target.value)} /></div>
        <div className="field"><label>性別</label><select value={form.gender} onChange={e => s("gender", e.target.value)}><option>メス</option><option>オス</option></select></div>
      </div>
      <div className="field"><label>犬種</label>
        <select value={showCustom ? "__custom__" : form.breed} onChange={e => {
          if (e.target.value === "__custom__") { setShowCustom(true); s("breed", ""); }
          else { setShowCustom(false); s("breed", e.target.value); }
        }}>
          {breeds.map(b => <option key={b} value={b}>{b}</option>)}
          <option value="__custom__">＋ 新しい犬種を追加</option>
        </select>
      </div>
      {showCustom && (
        <div className="field"><label>新しい犬種名</label><input value={form.breed || ""} onChange={e => s("breed", e.target.value)} placeholder="例: 柴犬" /></div>
      )}
      <div className="field"><label>血統書名</label><input value={form.pedigreeName || ""} onChange={e => s("pedigreeName", e.target.value)} /></div>
      <div className="field-row">
        <div className="field"><label>生年月日</label><input type="date" value={form.birthdate || ""} onChange={e => s("birthdate", e.target.value)} /></div>
        <div className="field"><label>毛色</label><input value={form.color || ""} onChange={e => s("color", e.target.value)} /></div>
      </div>
      <div className="field"><label>JKC登録番号</label><input value={form.jkc || ""} onChange={e => s("jkc", e.target.value)} /></div>
      <div className="field"><label>マイクロチップ番号</label><input value={form.chip || ""} onChange={e => s("chip", e.target.value)} /></div>
      <div className="field-row">
        <div className="field"><label>父犬</label>
          <select value={form.fatherId || ""} onChange={e => s("fatherId", e.target.value || null)}>
            <option value="">不明/外部</option>
            {dogs.filter(d => d.gender === "オス" && d.id !== form.id).map(d => <option key={d.id} value={d.id}>{d.callName}</option>)}
          </select>
        </div>
        <div className="field"><label>母犬</label>
          <select value={form.motherId || ""} onChange={e => s("motherId", e.target.value || null)}>
            <option value="">不明/外部</option>
            {dogs.filter(d => d.gender === "メス" && d.id !== form.id).map(d => <option key={d.id} value={d.id}>{d.callName}</option>)}
          </select>
        </div>
      </div>
      <div className="field"><label>備考</label><textarea value={form.note || ""} onChange={e => s("note", e.target.value)} /></div>
      <button className="btn-save" onClick={() => { if (form.callName && form.breed) { onSave({ ...form, id: form.id || `dog_${Date.now()}` }); onClose(); } }}>
        {isEdit ? "保存する" : "登録する"}
      </button>
    </Modal>
  );
}

// ============================================================
// DOG DETAIL
// ============================================================
function DogDetail({ dog, dogs, onSelectDog, onEdit, onGoHeat }) {
  const allDogs = [...dogs, ...EXTERNAL_DATA];
  const children = allDogs.filter(d => d.fatherId === dog.id || d.motherId === dog.id);
  const isHusky = dog.breed === "ハスキー";
  const emoji = dog.breed === "ハスキー" ? "🐺" : dog.breed === "コーギー" ? "🐕" : "🐶";

  return (
    <div style={{ flex: 1, paddingBottom: 80 }}>
      <div className="detail-hero">
        <div style={{ fontSize: 32, marginBottom: 6 }}>{emoji}</div>
        <div className="detail-name">{dog.callName}</div>
        <div className="detail-ped">{dog.pedigreeName || "血統書名 未登録"}</div>
        <div className="detail-badges">
          <span className={`badge ${dog.gender === "メス" ? "female" : "male"}`}>{dog.gender}</span>
          <span className="badge age" style={{ background: isHusky ? "var(--blue-dim)" : "var(--corgi-dim)", color: isHusky ? "var(--blue)" : "var(--corgi)" }}>{dog.breed}</span>
          {dog.birthdate && <span className="badge age">{getAge(dog.birthdate)}</span>}
        </div>
        <div className="link-row">
          <button className="link-btn gold" onClick={() => onEdit(dog)}>✏️ 編集する</button>
          {dog.gender === "メス" && <button className="link-btn pink" onClick={() => onGoHeat(dog)}>🌸 ヒート・交配記録</button>}
        </div>
      </div>

      <div className="info-card">
        <div className="info-card-title">基本情報</div>
        <div className="info-grid">
          <div className="info-item"><label>生年月日</label><span>{formatDate(dog.birthdate)}</span></div>
          <div className="info-item"><label>毛色</label><span style={{ fontSize: 11 }}>{dog.color || "－"}</span></div>
          <div className="info-item full"><label>JKC登録番号</label><span style={{ fontFamily: "DM Mono,monospace", fontSize: 12 }}>{dog.jkc || "－"}</span></div>
          <div className="info-item full"><label>マイクロチップ</label><span style={{ fontFamily: "DM Mono,monospace", fontSize: 11 }}>{dog.chip || "－"}</span></div>
          {dog.note && <div className="info-item full"><label>備考</label><span>{dog.note}</span></div>}
        </div>
      </div>

      <div className="tree-card">
        <div className="tree-title">家系図（3世代）</div>
        <FamilyTree dog={dog} dogs={dogs} onSelect={onSelectDog} />
        <div style={{ fontSize: 9, color: "var(--text3)", marginTop: 8 }}>金枠=自犬舎 · 点線=外部 · タップで詳細へ</div>
      </div>

      {children.length > 0 && (
        <div className="info-card" style={{ marginBottom: 0 }}>
          <div className="info-card-title">子犬 ({children.length}頭)</div>
          {children.filter(c => !c.external).map(c => (
            <div key={c.id} onClick={() => onSelectDog(c)} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--surface2)", borderRadius: 8, padding: "9px 12px", cursor: "pointer", border: "1px solid var(--border)", marginBottom: 7 }}>
              <span style={{ fontSize: 16 }}>{c.breed === "ハスキー" ? "🐺" : "🐕"}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.callName}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{c.breed} · {formatDate(c.birthdate)}</div>
              </div>
              <span className={`badge ${c.gender === "メス" ? "female" : "male"}`}>{c.gender}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// DOG LIST SCREEN
// ============================================================
function DogListScreen({ dogs, setDogs, onBack, onGoHeat }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [modal, setModal] = useState(null);

  const breeds = [...new Set(dogs.map(d => d.breed))];

  const handleSelect = (dog) => {
    const found = dogs.find(d => d.id === dog.id);
    if (found) setDetail(found);
  };

  const saveDog = (updated) => {
    setDogs(ds => {
      const exists = ds.some(d => d.id === updated.id);
      return exists ? ds.map(d => d.id === updated.id ? updated : d) : [...ds, updated];
    });
    setDetail(updated);
  };

  if (detail) {
    return (
      <div className="app">
        <Hdr title={detail.callName} sub={detail.breed} onBack={() => setDetail(null)} />
        <DogDetail dog={detail} dogs={dogs} onSelectDog={handleSelect} onEdit={(d) => setModal({ type: "edit", dog: d })} onGoHeat={(d) => { setDetail(null); onGoHeat(d); }} />
        {modal?.type === "edit" && <DogFormModal dog={modal.dog} dogs={dogs} breeds={breeds} onClose={() => setModal(null)} onSave={saveDog} />}
      </div>
    );
  }

  const filtered = dogs.filter(d => (filter === "all" || d.breed === filter) && (!search || d.callName.includes(search)));
  const breedCounts = breeds.map(b => ({ breed: b, count: dogs.filter(d => d.breed === b).length }));

  return (
    <div className="app">
      <Hdr title="🐾 犬リスト" sub="KENNEL LIST" onBack={onBack} />
      <div style={{ padding: "12px 20px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
        {breedCounts.map(bc => (
          <div key={bc.breed} className="stat-box" style={{ flex: "1 1 30%" }}>
            <div className="stat-num" style={{ color: "var(--gold)" }}>{bc.count}</div>
            <div style={{ fontSize: 10, color: "var(--text3)" }}>{bc.breed}</div>
          </div>
        ))}
      </div>
      <div className="breed-tabs">
        <button className={`breed-tab ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}>すべて</button>
        {breeds.map(b => <button key={b} className={`breed-tab ${filter === b ? "on" : ""}`} onClick={() => setFilter(b)}>{b}</button>)}
      </div>
      <div style={{ padding: "10px 20px 0" }}>
        <input placeholder="🔍 名前で検索..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 10, padding: "9px 13px", fontSize: 13, color: "var(--text)" }} />
      </div>
      <div className="dog-list">
        {filtered.map(d => {
          const isH = d.breed === "ハスキー";
          return (
            <div key={d.id} className={`dog-card ${isH ? "husky" : "corgi"}`} onClick={() => setDetail(d)}>
              <div className="dog-av" style={{ background: isH ? "var(--blue-dim)" : "var(--corgi-dim)" }}>{isH ? "🐺" : "🐕"}</div>
              <div style={{ flex: 1 }}>
                <div className="dog-callname">{d.callName}</div>
                <div className="dog-badges">
                  <span className={`badge ${d.gender === "メス" ? "female" : "male"}`}>{d.gender}</span>
                  <span className="badge age">{d.breed}</span>
                  {d.birthdate && <span className="badge age">{getAge(d.birthdate)}</span>}
                </div>
              </div>
              <span style={{ color: "var(--text3)", fontSize: 18 }}>›</span>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="empty">該当する犬がいません</div>}
      </div>
      <div className="fab-wrap"><button className="fab" onClick={() => setModal({ type: "add" })}>＋</button></div>
      {modal?.type === "add" && <DogFormModal dogs={dogs} breeds={breeds} onClose={() => setModal(null)} onSave={saveDog} />}
    </div>
  );
}

// ============================================================
// PUPPY EDIT MODAL
// ============================================================
function PuppyEditModal({ pup, onClose, onSave }) {
  const [f, setF] = useState({ ...pup });
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (
    <Modal title={`#${pup.no} ${pup.gender} の詳細`} onClose={onClose}>
      <div className="field-row">
        <div className="field"><label>性別</label><select value={f.gender} onChange={e => s("gender", e.target.value)}><option>オス</option><option>メス</option></select></div>
        <div className="field"><label>識別</label><input value={f.identifier||""} onChange={e => s("identifier", e.target.value)} placeholder="赤リボン など" /></div>
      </div>
      <div className="field"><label>毛色</label><input value={f.color||""} onChange={e => s("color", e.target.value)} /></div>
      <div className="field"><label>アイカラー（目が開いてから）</label><input value={f.eyeColor||""} onChange={e => s("eyeColor", e.target.value)} /></div>
      <div className="field-row">
        <div className="field"><label>出生体重(g)</label><input type="number" value={f.birthWeight||""} onChange={e => s("birthWeight", e.target.value)} /></div>
        <div className="field"><label>コールネーム</label><input value={f.name||""} onChange={e => s("name", e.target.value)} /></div>
      </div>
      <div className="field"><label>マイクロチップ番号</label><input value={f.chip||""} onChange={e => s("chip", e.target.value)} /></div>
      <div className="field"><label>備考</label><textarea value={f.note||""} onChange={e => s("note", e.target.value)} /></div>
      <button className="btn-save" onClick={() => { onSave(f); onClose(); }}>保存する</button>
    </Modal>
  );
}

// ============================================================
// CYCLE CARD（ヒート→交配→結果をまとめた1枚）
// ============================================================
function CycleCard({ cycle, puppies, setPuppies, onUpdate, onAddMating, onSetStatus, onRecordBirth }) {
  const [expanded, setExpanded] = useState(false);
  const [editPup, setEditPup] = useState(null);
  const sc = STATUS_COLOR[cycle.status] || STATUS_COLOR["ヒートのみ"];
  const birthPups = puppies.filter(p => p.birthId === cycle.id);
  const firstMating = cycle.matings[0]?.date;
  const canAddMating = cycle.status === "ヒートのみ" || cycle.status === "交配中";
  const canRecordBirth = cycle.status === "妊娠中" || cycle.status === "交配中";

  return (
    <div className="cycle-card">
      <div className="cycle-hdr">
        <div>
          {cycle.heatDate && <div className="cycle-heat">🌸 ヒート {formatDate(cycle.heatDate)}</div>}
          {cycle.fatherName && <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>💞 × {cycle.fatherName}</div>}
        </div>
        <span className="status-badge" style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>{cycle.status}</span>
      </div>
      <div className="cycle-body">
        {cycle.matings.length > 0 && (
          <div>
            <div className="mating-line">
              {cycle.matings.map((m, i) => {
                const prev = i > 0 ? cycle.matings[i-1].date : null;
                return (prev && m.date.slice(0,7)===prev.slice(0,7)) ? m.date.slice(8) : formatDate(m.date);
              }).join("、")}
            </div>
            <div className="mating-detail">計{cycle.matings.length}回 · {[...new Set(cycle.matings.map(m => m.method))].join("・")}</div>
          </div>
        )}

        {(cycle.status === "妊娠中" || cycle.status === "交配中") && firstMating && (
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--text3)" }}>
            出産予定: {formatDate(addDays(firstMating, 60))} 〜 {formatDate(addDays(firstMating, 63))}
          </div>
        )}

        {cycle.status === "出産済" && (
          <div className="birth-summary" onClick={() => setExpanded(e => !e)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 11, color: "var(--text3)" }}>{formatDate(cycle.birthDate)}</span>
                {cycle.totalPups != null && <><span className="birth-num">{cycle.totalPups}</span><span style={{ fontSize: 12, color: "var(--text2)" }}>頭</span></>}
              </div>
              {cycle.totalPups != null && <span style={{ fontSize: 11, color: "var(--green)" }}>{expanded ? "▲ 閉じる" : "▼ 仔犬を見る"}</span>}
            </div>
            {cycle.totalPups != null && (
              <div className="birth-detail">
                {cycle.birthMethod}{cycle.pregnancyDays ? ` · 妊娠${cycle.pregnancyDays}日` : ""} · ♂{cycle.malePups} ♀{cycle.femalePups}{cycle.stillborn > 0 ? ` · 死産${cycle.stillborn}` : ""}
              </div>
            )}
          </div>
        )}

        {expanded && cycle.status === "出産済" && (
          <div>
            {birthPups.length > 0 ? (
              <div className="pup-grid">
                {birthPups.map(p => (
                  <div key={p.id} className={`pup-chip ${p.gender==="オス"?"pm":"pf"}`} onClick={() => setEditPup(p)}>
                    <div className="pup-chip-no">#{p.no}</div>
                    <div className="pup-chip-gender" style={{color:p.gender==="オス"?"var(--blue)":"var(--pink)"}}>{p.gender==="オス"?"♂":"♀"} {p.gender}</div>
                    <div className="pup-chip-color">{p.color||"未入力"}</div>
                    {p.identifier && <div className="pup-chip-id">{p.identifier}</div>}
                  </div>
                ))}
              </div>
            ) : <div style={{ fontSize: 11, color: "var(--text3)", textAlign: "center", padding: "10px 0" }}>仔犬情報未登録</div>}
            <button className="add-pup-btn" onClick={() => {
              const np = { id: `p_${Date.now()}`, birthId: cycle.id, no: birthPups.length + 1, gender: "メス", color: "", eyeColor: "", identifier: "", birthWeight: "", name: "", chip: "", note: "" };
              setPuppies(ps => [...ps, np]); setEditPup(np);
            }}>＋ 仔犬を追加</button>
          </div>
        )}

        {cycle.note && <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6, fontStyle: "italic" }}>{cycle.note}</div>}

        <div className="cycle-actions">
          {canAddMating && <button className="cycle-act-btn" onClick={() => onAddMating(cycle)}>＋ 交配を追加</button>}
          {cycle.status !== "出産済" && cycle.status !== "非受胎" && <button className="cycle-act-btn" onClick={() => onSetStatus(cycle)}>ステータス変更</button>}
          {canRecordBirth && <button className="cycle-act-btn" onClick={() => onRecordBirth(cycle)}>🐶 出産を記録</button>}
        </div>
      </div>
      {editPup && <PuppyEditModal pup={editPup} onClose={() => setEditPup(null)} onSave={updated => { setPuppies(ps => ps.map(p => p.id===updated.id?updated:p)); setEditPup(null); }} />}
    </div>
  );
}

// ============================================================
// HEAT SCREEN（サイクル方式）
// ============================================================
function HeatScreen({ dogs, cycles, setCycles, puppies, setPuppies, onBack, initialDog }) {
  const femaleDogs = dogs.filter(d => d.gender === "メス");
  const [selDog, setSelDog] = useState(initialDog || femaleDogs[0]);
  const [fabOpen, setFabOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [activeCycle, setActiveCycle] = useState(null);
  const [form, setForm] = useState({});
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const allMales = dogs.filter(d => d.gender === "オス").map(d => d.callName);
  const dogCycles = cycles.filter(c => c.dogId === selDog?.id).sort((a, b) => {
    const da = a.heatDate || a.matings[0]?.date || "";
    const db = b.heatDate || b.matings[0]?.date || "";
    return db.localeCompare(da);
  });

  const prediction = predictNextHeat(dogCycles);
  const heatCount = dogCycles.filter(c => c.heatDate).length;
  const matingCount = dogCycles.filter(c => c.matings.length > 0).length;
  const birthCount = dogCycles.filter(c => c.status === "出産済").length;

  const byYear = dogCycles.reduce((acc, c) => {
    const d = c.heatDate || c.matings[0]?.date || "不明";
    const y = d.slice(0, 4);
    if (!acc[y]) acc[y] = [];
    acc[y].push(c);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  const updateCycle = (updated) => setCycles(cs => cs.map(c => c.id === updated.id ? updated : c));

  return (
    <div className="app">
      <Hdr title="🌸 ヒート・交配管理" sub="HEAT & BREEDING" onBack={onBack} />
      <div className="dog-selector">
        {femaleDogs.map(d => (
          <button key={d.id} className={`dog-chip ${d.breed==="ハスキー"?"husky":"corgi"} ${selDog?.id===d.id?"on":""}`} onClick={() => setSelDog(d)}>{d.callName}</button>
        ))}
      </div>
      {selDog && <>
        <div className="dog-hdr">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div><div className="dog-hdr-name">{selDog.callName}</div><div style={{fontSize:11,color:"var(--text3)",marginTop:2}}>{selDog.breed}</div></div>
            <div className="dog-hdr-stats">
              <div><div className="dhs-num" style={{color:"var(--pink)"}}>{heatCount}</div><div className="dhs-lbl">ヒート</div></div>
              <div><div className="dhs-num" style={{color:"var(--gold)"}}>{matingCount}</div><div className="dhs-lbl">交配</div></div>
              <div><div className="dhs-num" style={{color:"var(--green)"}}>{birthCount}</div><div className="dhs-lbl">出産</div></div>
            </div>
          </div>
        </div>

        {prediction && (
          <div className="next-heat">
            <div className="nh-label">🌸 次回ヒート予測{prediction.isEstimate ? "（仮・平均6ヶ月）" : "（この子の平均間隔）"}</div>
            <div className="nh-range">{formatMD(prediction.rangeStart)} 〜 {formatMD(prediction.rangeEnd)} 頃</div>
            <div className="nh-sub">前回: {formatDate(prediction.lastHeat)}{!prediction.isEstimate ? ` ・ 平均${prediction.avgDays}日周期` : ""}</div>
          </div>
        )}

        <div className="cycle-list">
          {dogCycles.length === 0 && <div className="empty">記録がありません</div>}
          {years.map(year => (
            <div key={year}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", marginBottom: 4 }}>{year}年</div>
              {byYear[year].map(cycle => (
                <div key={cycle.id} style={{ marginBottom: 10 }}>
                  <CycleCard
                    cycle={cycle}
                    puppies={puppies}
                    setPuppies={setPuppies}
                    onAddMating={(c) => { setActiveCycle(c); setForm({ date: todayStr(), method: "自然交配", fatherName: c.fatherName || "" }); setModal("addMating"); }}
                    onSetStatus={(c) => { setActiveCycle(c); setForm({ status: c.status }); setModal("setStatus"); }}
                    onRecordBirth={(c) => { setActiveCycle(c); setForm({ birthDate: todayStr(), birthMethod: "自然分娩" }); setModal("recordBirth"); }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </>}

      <div className="fab-wrap">
        {fabOpen && <>
          <button className="fab-sub breeding" onClick={() => { setForm({ date: todayStr(), method: "自然交配", fatherName: "" }); setModal("newCycleMating"); setFabOpen(false); }}>💞 交配を記録（新規）</button>
          <button className="fab-sub heat" onClick={() => { setForm({ date: todayStr() }); setModal("newHeat"); setFabOpen(false); }}>🌸 ヒートを記録</button>
        </>}
        <button className="fab" onClick={() => setFabOpen(o => !o)}>{fabOpen?"✕":"＋"}</button>
      </div>

      {/* 新しいヒート記録（実際に確認できた日） */}
      {modal === "newHeat" && (
        <Modal title={`🌸 ヒートを記録 — ${selDog?.callName}`} onClose={() => setModal(null)}>
          <div className="field"><label>ヒート確認日</label><input type="date" value={form.date||""} onChange={e => sf("date",e.target.value)} /></div>
          <div className="field"><label>メモ</label><textarea value={form.note||""} onChange={e => sf("note",e.target.value)} /></div>
          <button className="btn-save pink" onClick={() => {
            if (!form.date) return;
            setCycles(cs => [...cs, { id: `c_${Date.now()}`, dogId: selDog.id, heatDate: form.date, matings: [], fatherName: null, status: "ヒートのみ", birthDate: null, birthMethod: null, pregnancyDays: null, totalPups: null, malePups: null, femalePups: null, stillborn: null, note: form.note || "" }]);
            setModal(null);
          }}>記録する</button>
        </Modal>
      )}

      {/* 新しいサイクルとして交配を記録 */}
      {modal === "newCycleMating" && (
        <Modal title={`💞 新しい交配を記録 — ${selDog?.callName}`} onClose={() => setModal(null)}>
          <div className="field"><label>父犬</label>
            <select value={form.fatherName||""} onChange={e => sf("fatherName",e.target.value)}>
              <option value="">選択してください</option>
              {allMales.map(m => <option key={m} value={m}>{m}</option>)}
              <option value="__manual__">外部犬（手入力）</option>
            </select>
          </div>
          {form.fatherName === "__manual__" && <div className="field"><label>父犬の名前</label><input value={form.fatherNameManual||""} onChange={e => sf("fatherNameManual",e.target.value)} /></div>}
          <div className="field-row">
            <div className="field"><label>交配日</label><input type="date" value={form.date||""} onChange={e => sf("date",e.target.value)} /></div>
            <div className="field"><label>交配方法</label><select value={form.method||"自然交配"} onChange={e => sf("method",e.target.value)}><option>自然交配</option><option>人工交配</option></select></div>
          </div>
          <button className="btn-save" onClick={() => {
            const fn = form.fatherName==="__manual__"?(form.fatherNameManual||"外部犬"):form.fatherName;
            if (!fn||!form.date) return;
            setCycles(cs => [...cs, { id: `c_${Date.now()}`, dogId: selDog.id, heatDate: null, matings: [{ id: `m_${Date.now()}`, date: form.date, method: form.method }], fatherName: fn, status: "交配中", birthDate: null, birthMethod: null, pregnancyDays: null, totalPups: null, malePups: null, femalePups: null, stillborn: null, note: "" }]);
            setModal(null); setFabOpen(false);
          }}>記録する</button>
        </Modal>
      )}

      {/* 既存サイクルに交配を追加 */}
      {modal === "addMating" && activeCycle && (
        <Modal title={`＋ 交配を追加 — ${selDog?.callName}`} onClose={() => setModal(null)}>
          {!activeCycle.fatherName && (
            <div className="field"><label>父犬</label>
              <select value={form.fatherName||""} onChange={e => sf("fatherName",e.target.value)}>
                <option value="">選択してください</option>
                {allMales.map(m => <option key={m} value={m}>{m}</option>)}
                <option value="__manual__">外部犬（手入力）</option>
              </select>
            </div>
          )}
          {form.fatherName === "__manual__" && <div className="field"><label>父犬の名前</label><input value={form.fatherNameManual||""} onChange={e => sf("fatherNameManual",e.target.value)} /></div>}
          <div className="field-row">
            <div className="field"><label>交配日</label><input type="date" value={form.date||""} onChange={e => sf("date",e.target.value)} /></div>
            <div className="field"><label>交配方法</label><select value={form.method||"自然交配"} onChange={e => sf("method",e.target.value)}><option>自然交配</option><option>人工交配</option></select></div>
          </div>
          <button className="btn-save" onClick={() => {
            if (!form.date) return;
            const fn = activeCycle.fatherName || (form.fatherName === "__manual__" ? (form.fatherNameManual || "外部犬") : form.fatherName);
            if (!fn) return;
            const newMating = { id: `m_${Date.now()}`, date: form.date, method: form.method || "自然交配" };
            updateCycle({ ...activeCycle, fatherName: fn, matings: [...activeCycle.matings, newMating], status: activeCycle.status === "ヒートのみ" ? "交配中" : activeCycle.status });
            setModal(null);
          }}>追加する</button>
        </Modal>
      )}

      {/* ステータス変更 */}
      {modal === "setStatus" && activeCycle && (
        <Modal title="ステータス変更" onClose={() => setModal(null)}>
          <div className="field"><label>ステータス</label>
            <select value={form.status||""} onChange={e => sf("status",e.target.value)}>
              <option>ヒートのみ</option><option>交配中</option><option>妊娠中</option><option>非受胎</option>
            </select>
          </div>
          <button className="btn-save" onClick={() => { updateCycle({ ...activeCycle, status: form.status }); setModal(null); }}>変更する</button>
        </Modal>
      )}

      {/* 出産を記録 */}
      {modal === "recordBirth" && activeCycle && (
        <Modal title="🐶 出産を記録" onClose={() => setModal(null)}>
          <div className="field"><label>出産日</label><input type="date" value={form.birthDate||""} onChange={e => sf("birthDate",e.target.value)} /></div>
          <div className="field"><label>出産方法</label><select value={form.birthMethod||"自然分娩"} onChange={e => sf("birthMethod",e.target.value)}><option>自然分娩</option><option>帝王切開</option></select></div>
          <div className="field-row">
            <div className="field"><label>総頭数</label><input type="number" value={form.totalPups||""} onChange={e => sf("totalPups",parseInt(e.target.value)||0)} /></div>
            <div className="field"><label>死産数</label><input type="number" value={form.stillborn||""} onChange={e => sf("stillborn",parseInt(e.target.value)||0)} /></div>
          </div>
          <div className="field-row">
            <div className="field"><label>オス頭数</label><input type="number" value={form.malePups||""} onChange={e => sf("malePups",parseInt(e.target.value)||0)} /></div>
            <div className="field"><label>メス頭数</label><input type="number" value={form.femalePups||""} onChange={e => sf("femalePups",parseInt(e.target.value)||0)} /></div>
          </div>
          <button className="btn-save" onClick={() => {
            if (!form.birthDate) return;
            const firstMating = activeCycle.matings[0]?.date;
            const pregDays = firstMating ? daysDiff(firstMating, form.birthDate) : null;
            updateCycle({ ...activeCycle, status: "出産済", birthDate: form.birthDate, birthMethod: form.birthMethod || "自然分娩", pregnancyDays: pregDays, totalPups: form.totalPups || 0, malePups: form.malePups || 0, femalePups: form.femalePups || 0, stillborn: form.stillborn || 0 });
            setModal(null);
          }}>記録する</button>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// DOG MODULE MENU
// ============================================================
function DogModule({ dogs, setDogs, cycles, setCycles, puppies, setPuppies, onBack }) {
  const [screen, setScreen] = useState(null);
  const [heatInitDog, setHeatInitDog] = useState(null);
  const goHeat = (dog) => { setHeatInitDog(dog); setScreen("heat"); };

  if (screen === "list") return <DogListScreen dogs={dogs} setDogs={setDogs} onBack={() => setScreen(null)} onGoHeat={goHeat} />;
  if (screen === "heat") return <HeatScreen dogs={dogs} cycles={cycles} setCycles={setCycles} puppies={puppies} setPuppies={setPuppies} onBack={() => setScreen(null)} initialDog={heatInitDog} />;

  return (
    <div className="app">
      <Hdr title="🐕 犬の管理" sub="DOG MANAGEMENT" onBack={onBack} />
      <div className="menu-list">
        <div className="menu-item" onClick={() => setScreen("list")}>
          <div className="menu-item-icon" style={{background:"var(--blue-dim)"}}>🐾</div>
          <div><div className="menu-item-name">犬リスト・家系図</div><div className="menu-item-desc">個体情報・血統・3世代家系図・犬種の追加編集</div></div>
          <span style={{color:"var(--text3)",fontSize:18,marginLeft:"auto"}}>›</span>
        </div>
        <div className="menu-item" onClick={() => { setHeatInitDog(null); setScreen("heat"); }}>
          <div className="menu-item-icon" style={{background:"var(--pink-dim)"}}>🌸</div>
          <div><div className="menu-item-name">ヒート・交配・出産</div><div className="menu-item-desc">サイクル単位で管理・予測は平均間隔から自動計算</div></div>
          <span style={{color:"var(--text3)",fontSize:18,marginLeft:"auto"}}>›</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CHICKEN MODULE
// ============================================================
function ChickenModule({
  flocks, setFlocks, products, setProducts, eggs, setEggs,
  hatches, setHatches, purchases, setPurchases, customers, setCustomers,
  sales, setSales, onBack
}) {
  const [tab, setTab] = useState("flock");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const totalBirds = flocks.reduce((s, f) => s + f.male + f.female, 0);
  const todayEggs  = eggs.filter(e => e.date === todayStr()).reduce((s, e) => s + e.count, 0);
  const monthSales = sales.filter(s => s.date.slice(0,7) === todayStr().slice(0,7)).reduce((s, r) => s + r.total, 0);

  const TABS = [
    { id: "flock",    label: "群れ" },
    { id: "eggs",     label: "産卵" },
    { id: "hatch",    label: "孵化" },
    { id: "purchase", label: "入荷" },
    { id: "sales",    label: "販売" },
    { id: "customer", label: "顧客" },
  ];

  const getFlockName = id => flocks.find(f => f.id === id)?.breed || "不明";
  const getProductName = id => products.find(p => p.id === id)?.name || "不明";
  const getCustomerName = id => customers.find(c => c.id === id)?.name || "不明";

  return (
    <div className="app">
      <Hdr title="🐓 鶏の管理" sub="CHICKEN MANAGEMENT" onBack={onBack} />
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,padding:"12px 20px 0"}}>
        <div className="stat-box"><div className="stat-num" style={{color:"var(--green)"}}>{totalBirds}</div><div style={{fontSize:10,color:"var(--text3)"}}>総羽数</div></div>
        <div className="stat-box"><div className="stat-num" style={{color:"var(--gold)"}}>{todayEggs}</div><div style={{fontSize:10,color:"var(--text3)"}}>本日産卵</div></div>
        <div className="stat-box"><div className="stat-num" style={{fontSize:14,color:"var(--blue)"}}>¥{monthSales.toLocaleString()}</div><div style={{fontSize:10,color:"var(--text3)"}}>今月売上</div></div>
      </div>
      <div style={{display:"flex",gap:6,padding:"12px 20px 0",overflowX:"auto"}}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{padding:"7px 13px",borderRadius:20,border:`1px solid ${tab===t.id?"var(--green)":"var(--border2)"}`,background:tab===t.id?"var(--green-dim)":"none",fontSize:12,fontWeight:700,color:tab===t.id?"var(--green)":"var(--text3)",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{t.label}</button>
        ))}
      </div>

      <div style={{padding:"12px 20px",paddingBottom:100,flex:1,overflowY:"auto"}}>
        {tab === "flock" && <>
          {flocks.map(f => (
            <div key={f.id} className="flock-card" onClick={() => { setForm({...f}); setModal("editFlock"); }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div className="flock-name">{f.breed}</div>
                  <div style={{display:"flex",gap:10,marginTop:6}}>
                    <span style={{fontSize:12,color:"var(--blue)"}}>♂ オス {f.male}羽</span>
                    <span style={{fontSize:12,color:"var(--pink)"}}>♀ メス {f.female}羽</span>
                  </div>
                </div>
                <div style={{textAlign:"right"}}><div className="flock-count">{f.male+f.female}</div><div style={{fontSize:10,color:"var(--text3)"}}>羽</div></div>
              </div>
            </div>
          ))}
          <div style={{fontSize:10,color:"var(--text3)",textAlign:"center",marginTop:4}}>群れをタップすると編集できます</div>
        </>}

        {tab === "eggs" && <>
          <div style={{background:"var(--green-dim)",border:"1px solid rgba(80,180,120,0.3)",borderRadius:"var(--r)",padding:"12px 16px",marginBottom:14}}>
            <div style={{fontSize:11,color:"var(--green)",fontWeight:700,marginBottom:4}}>🥚 本日の産卵合計</div>
            <div style={{fontSize:28,fontWeight:900,fontFamily:"DM Mono",color:"var(--green)"}}>{todayEggs}<span style={{fontSize:14,marginLeft:4}}>個</span></div>
          </div>
          {eggs.sort((a,b)=>b.date.localeCompare(a.date)).map(e => (
            <div key={e.id} className="egg-row">
              <span style={{fontWeight:600,fontSize:13}}>{getFlockName(e.flockId)}</span>
              <span style={{fontSize:11,color:"var(--text3)",fontFamily:"DM Mono"}}>{formatDate(e.date)}</span>
              <span style={{fontFamily:"DM Mono",fontWeight:700}}>{e.count}個</span>
            </div>
          ))}
          <button className="btn-save" onClick={() => { setForm({date:todayStr(),flockId:flocks[0]?.id}); setModal("egg"); }}>＋ 産卵を記録</button>
        </>}

        {tab === "hatch" && <>
          {hatches.length === 0 && <div className="empty">孵化記録なし</div>}
          {hatches.map(h => (
            <div key={h.id} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"13px 15px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontWeight:700,fontSize:14}}>{h.breedLabel}</span>
                <span style={{fontSize:11,color:"var(--text3)",fontFamily:"DM Mono"}}>{formatDate(h.hatchDate)}</span>
              </div>
              <div style={{marginTop:8}}>
                <span style={{fontSize:20,fontWeight:900,fontFamily:"DM Mono",color:"var(--green)"}}>{h.hatchCount}</span>
                <span style={{fontSize:13,color:"var(--text2)",marginLeft:4}}>羽 孵化</span>
              </div>
              {h.note && <div style={{fontSize:11,color:"var(--gold)",marginTop:4}}>{h.note}</div>}
            </div>
          ))}
          <button className="btn-save" onClick={() => { setForm({hatchDate:todayStr()}); setModal("addHatch"); }}>＋ 孵化記録を追加</button>
        </>}

        {tab === "purchase" && <>
          {purchases.length === 0 && <div className="empty">入荷記録なし</div>}
          {purchases.map(p => (
            <div key={p.id} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"13px 15px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{p.breedLabel}</div>
                  <div style={{fontSize:12,color:"var(--text2)",marginTop:3}}>{p.type} · {p.count}{p.type==="個体"?"羽":"個"}</div>
                  <div style={{fontSize:11,color:"var(--text3)",marginTop:2}}>仕入先: {p.from}</div>
                </div>
                <div style={{fontSize:11,color:"var(--text3)",fontFamily:"DM Mono"}}>{formatDate(p.date)}</div>
              </div>
            </div>
          ))}
          <button className="btn-save" onClick={() => { setForm({date:todayStr(),type:"個体"}); setModal("purchase"); }}>＋ 入荷を記録</button>
        </>}

        {tab === "sales" && <>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--text3)",marginBottom:8}}>商品ラインナップ</div>
            {products.map(p => (
              <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r-sm)",marginBottom:6}}>
                <div><div style={{fontSize:13,fontWeight:600}}>{p.name}</div><div style={{fontSize:11,color:"var(--text3)"}}>{getFlockName(p.flockId)}</div></div>
                <div style={{fontFamily:"DM Mono",fontWeight:700,color:"var(--gold)"}}>¥{p.price.toLocaleString()}</div>
              </div>
            ))}
            <button className="btn-cancel" onClick={() => { setForm({flockId:flocks[0]?.id,count:6,price:0}); setModal("addProduct"); }}>＋ 商品を追加</button>
          </div>
          <div style={{fontSize:11,fontWeight:700,color:"var(--text3)",marginBottom:8}}>販売記録</div>
          {sales.sort((a,b)=>b.date.localeCompare(a.date)).map(s => (
            <div key={s.id} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"11px 14px",marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontWeight:700,fontSize:13}}>{getCustomerName(s.customerId)}</div>
                  <div style={{fontSize:12,color:"var(--text2)",marginTop:2}}>{getProductName(s.productId)} × {s.qty}</div>
                  <div style={{fontSize:10,color:"var(--text3)",marginTop:2}}>{s.channel} · {formatDate(s.date)}</div>
                </div>
                <div style={{fontFamily:"DM Mono",fontWeight:700,color:"var(--green)",fontSize:15}}>¥{s.total.toLocaleString()}</div>
              </div>
            </div>
          ))}
          <button className="btn-save" onClick={() => { setForm({date:todayStr(),customerId:customers[0]?.id,productId:products[0]?.id,qty:1,channel:"ストアーズ"}); setModal("sale"); }}>＋ 販売を記録</button>
        </>}

        {tab === "customer" && <>
          {customers.map(c => {
            const cSales = sales.filter(s => s.customerId === c.id);
            const cTotal = cSales.reduce((s, r) => s + r.total, 0);
            return (
              <div key={c.id} style={{background:"var(--surface)",border:"1px solid var(--border)",borderLeft:"3px solid var(--green)",borderRadius:"var(--r)",padding:"13px 15px",marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:15}}>{c.name}</div>
                    <div style={{fontSize:11,color:"var(--text3)",marginTop:2}}>{c.contact}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"DM Mono",fontWeight:700,color:"var(--green)"}}>¥{cTotal.toLocaleString()}</div>
                    <div style={{fontSize:10,color:"var(--text3)",marginTop:2}}>累計 {cSales.length}回</div>
                  </div>
                </div>
              </div>
            );
          })}
          <button className="btn-save" onClick={() => { setForm({}); setModal("customer"); }}>＋ 顧客を追加</button>
        </>}
      </div>

      {modal === "editFlock" && (
        <Modal title={`${form.breed} を編集`} onClose={() => setModal(null)}>
          <div className="field"><label>品種・色</label><input value={form.breed||""} onChange={e => sf("breed",e.target.value)} /></div>
          <div className="field-row">
            <div className="field"><label>オス羽数</label><input type="number" value={form.male??0} onChange={e => sf("male",parseInt(e.target.value)||0)} /></div>
            <div className="field"><label>メス羽数</label><input type="number" value={form.female??0} onChange={e => sf("female",parseInt(e.target.value)||0)} /></div>
          </div>
          <button className="btn-save" onClick={() => { setFlocks(fs => fs.map(f => f.id===form.id?{...f,breed:form.breed,male:form.male,female:form.female}:f)); setModal(null); }}>保存する</button>
        </Modal>
      )}
      {modal === "egg" && (
        <Modal title="🥚 産卵を記録" onClose={() => setModal(null)}>
          <div className="field"><label>群れ</label><select value={form.flockId||""} onChange={e => sf("flockId",e.target.value)}>{flocks.map(f => <option key={f.id} value={f.id}>{f.breed}</option>)}</select></div>
          <div className="field"><label>日付</label><input type="date" value={form.date||""} onChange={e => sf("date",e.target.value)} /></div>
          <div className="field"><label>産卵数</label><input type="number" value={form.count||""} onChange={e => sf("count",parseInt(e.target.value)||0)} /></div>
          <button className="btn-save" onClick={() => { if(!form.flockId||!form.date) return; setEggs(es => [...es,{id:`e${Date.now()}`,flockId:form.flockId,date:form.date,count:form.count||0,note:""}]); setModal(null); }}>記録する</button>
        </Modal>
      )}
      {modal === "addHatch" && (
        <Modal title="🐣 孵化記録を追加" onClose={() => setModal(null)}>
          <div className="field"><label>品種</label><input value={form.breedLabel||""} onChange={e => sf("breedLabel",e.target.value)} /></div>
          <div className="field-row">
            <div className="field"><label>孵化日</label><input type="date" value={form.hatchDate||""} onChange={e => sf("hatchDate",e.target.value)} /></div>
            <div className="field"><label>孵化数</label><input type="number" value={form.hatchCount||""} onChange={e => sf("hatchCount",parseInt(e.target.value)||0)} /></div>
          </div>
          <div className="field"><label>メモ</label><textarea value={form.note||""} onChange={e => sf("note",e.target.value)} /></div>
          <button className="btn-save" onClick={() => { if(!form.breedLabel||!form.hatchDate) return; setHatches(hs => [...hs,{id:`h${Date.now()}`,breedLabel:form.breedLabel,setDate:"",setCount:null,hatchDate:form.hatchDate,hatchCount:form.hatchCount||0,male:null,female:null,note:form.note||""}]); setModal(null); }}>記録する</button>
        </Modal>
      )}
      {modal === "purchase" && (
        <Modal title="📦 入荷を記録" onClose={() => setModal(null)}>
          <div className="field"><label>品種</label><input value={form.breedLabel||""} onChange={e => sf("breedLabel",e.target.value)} /></div>
          <div className="field-row">
            <div className="field"><label>日付</label><input type="date" value={form.date||""} onChange={e => sf("date",e.target.value)} /></div>
            <div className="field"><label>種類</label><select value={form.type||"個体"} onChange={e => sf("type",e.target.value)}><option>個体</option><option>卵（孵化用）</option></select></div>
          </div>
          <div className="field-row">
            <div className="field"><label>数量</label><input type="number" value={form.count||""} onChange={e => sf("count",parseInt(e.target.value)||0)} /></div>
            <div className="field"><label>仕入先</label><input value={form.from||""} onChange={e => sf("from",e.target.value)} /></div>
          </div>
          <button className="btn-save" onClick={() => { if(!form.breedLabel||!form.date) return; setPurchases(ps => [...ps,{id:`pu${Date.now()}`,breedLabel:form.breedLabel,date:form.date,type:form.type||"個体",count:form.count||0,from:form.from||""}]); setModal(null); }}>記録する</button>
        </Modal>
      )}
      {modal === "sale" && (
        <Modal title="💰 販売を記録" onClose={() => setModal(null)}>
          <div className="field"><label>顧客</label><select value={form.customerId||""} onChange={e => sf("customerId",e.target.value)}>{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div className="field"><label>商品</label><select value={form.productId||""} onChange={e => sf("productId",e.target.value)}>{products.map(p => <option key={p.id} value={p.id}>{p.name} ¥{p.price.toLocaleString()}</option>)}</select></div>
          <div className="field-row">
            <div className="field"><label>日付</label><input type="date" value={form.date||""} onChange={e => sf("date",e.target.value)} /></div>
            <div className="field"><label>数量</label><input type="number" value={form.qty||1} onChange={e => sf("qty",parseInt(e.target.value)||1)} /></div>
          </div>
          <div className="field"><label>販売チャネル</label><select value={form.channel||"ストアーズ"} onChange={e => sf("channel",e.target.value)}><option>ストアーズ</option><option>BASE</option><option>無人販売所</option><option>その他</option></select></div>
          <button className="btn-save" onClick={() => {
            if (!form.customerId||!form.productId||!form.date) return;
            const p = products.find(p => p.id===form.productId);
            const total = (p?.price||0) * (form.qty||1);
            setSales(ss => [...ss,{id:`s${Date.now()}`,customerId:form.customerId,productId:form.productId,date:form.date,qty:form.qty||1,total,channel:form.channel||"ストアーズ"}]);
            setModal(null);
          }}>記録する</button>
        </Modal>
      )}
      {modal === "customer" && (
        <Modal title="👤 顧客を追加" onClose={() => setModal(null)}>
          <div className="field"><label>お名前</label><input value={form.name||""} onChange={e => sf("name",e.target.value)} /></div>
          <div className="field"><label>連絡先</label><input value={form.contact||""} onChange={e => sf("contact",e.target.value)} /></div>
          <button className="btn-save" onClick={() => { if(!form.name) return; setCustomers(cs => [...cs,{id:`c${Date.now()}`,name:form.name,contact:form.contact||"",address:"",note:""}]); setModal(null); }}>登録する</button>
        </Modal>
      )}
      {modal === "addProduct" && (
        <Modal title="＋ 商品を追加" onClose={() => setModal(null)}>
          <div className="field"><label>群れ</label><select value={form.flockId||""} onChange={e => sf("flockId",e.target.value)}>{flocks.map(f => <option key={f.id} value={f.id}>{f.breed}</option>)}</select></div>
          <div className="field"><label>商品名</label><input value={form.name||""} onChange={e => sf("name",e.target.value)} placeholder="例: 烏骨鶏卵 6個入り" /></div>
          <div className="field-row">
            <div className="field"><label>個数</label><input type="number" value={form.count||6} onChange={e => sf("count",parseInt(e.target.value)||0)} /></div>
            <div className="field"><label>価格(円)</label><input type="number" value={form.price||0} onChange={e => sf("price",parseInt(e.target.value)||0)} /></div>
          </div>
          <button className="btn-save" onClick={() => { if(!form.name) return; setProducts(ps => [...ps,{id:`pr${Date.now()}`,flockId:form.flockId,name:form.name,count:form.count||0,price:form.price||0}]); setModal(null); }}>追加する</button>
        </Modal>
      )}

      <div className="fab-wrap">
        {tab === "flock" && <button className="fab" onClick={() => { setForm({breed:"",male:0,female:0}); setModal("addFlock"); }}>＋</button>}
      </div>
      {modal === "addFlock" && (
        <Modal title="＋ 新しい群れを追加" onClose={() => setModal(null)}>
          <div className="field"><label>品種・色（例: 烏骨鶏（茶）)</label><input value={form.breed||""} onChange={e => sf("breed",e.target.value)} /></div>
          <div className="field-row">
            <div className="field"><label>オス羽数</label><input type="number" value={form.male??0} onChange={e => sf("male",parseInt(e.target.value)||0)} /></div>
            <div className="field"><label>メス羽数</label><input type="number" value={form.female??0} onChange={e => sf("female",parseInt(e.target.value)||0)} /></div>
          </div>
          <button className="btn-save" onClick={() => { if(!form.breed) return; setFlocks(fs => [...fs,{id:`f_${Date.now()}`,breed:form.breed,male:form.male||0,female:form.female||0,note:""}]); setModal(null); }}>追加する</button>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// HOME (auto-load + Google Sheets sync)
// ============================================================
export default function App() {
  const [dogs, setDogs] = useState(INITIAL_DOGS);
  const [cycles, setCycles] = useState(CYCLES_DATA);
  const [puppies, setPuppies] = useState(PUPPIES_DATA);
  const [flocks, setFlocks] = useState(INITIAL_FLOCKS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [eggs, setEggs] = useState(INITIAL_EGGS);
  const [hatches, setHatches] = useState(INITIAL_HATCH);
  const [purchases, setPurchases] = useState(INITIAL_PURCHASES);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [sales, setSales] = useState(INITIAL_SALES);

  const [screen, setScreen] = useState("home");
  const [syncStatus, setSyncStatus] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loadStatus, setLoadStatus] = useState(null);

  const now = new Date();
  const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,"0")}/${String(now.getDate()).padStart(2,"0")}`;

  // JSON文字列で保存された配列項目（matingsなど）を元の配列に戻す
  const parseCyclesFromSheet = (rawCycles) => {
    return rawCycles.map(c => ({
      ...c,
      matings: (() => { try { return typeof c.matings === "string" ? JSON.parse(c.matings) : (c.matings || []); } catch { return []; } })(),
      totalPups: c.totalPups === "" || c.totalPups == null ? null : Number(c.totalPups),
      malePups: c.malePups === "" || c.malePups == null ? null : Number(c.malePups),
      femalePups: c.femalePups === "" || c.femalePups == null ? null : Number(c.femalePups),
      stillborn: c.stillborn === "" || c.stillborn == null ? null : Number(c.stillborn),
      pregnancyDays: c.pregnancyDays === "" || c.pregnancyDays == null ? null : Number(c.pregnancyDays),
    }));
  };

  const applyLoadedData = (data) => {
    if (isNonEmptyArray(data.dogs)) setDogs(data.dogs);
    if (isNonEmptyArray(data.cycles)) setCycles(parseCyclesFromSheet(data.cycles));
    if (isNonEmptyArray(data.puppies)) setPuppies(data.puppies);
    if (isNonEmptyArray(data.flocks)) setFlocks(data.flocks);
    if (isNonEmptyArray(data.products)) setProducts(data.products);
    if (isNonEmptyArray(data.eggs)) setEggs(data.eggs);
    if (isNonEmptyArray(data.hatches)) setHatches(data.hatches);
    if (isNonEmptyArray(data.purchases)) setPurchases(data.purchases);
    if (isNonEmptyArray(data.customers)) setCustomers(data.customers);
    if (isNonEmptyArray(data.sales)) setSales(data.sales);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(GAS_URL, { method: "POST", body: JSON.stringify({ action: "loadAll" }) });
        const data = await res.json();
        if (data.success) applyLoadedData(data);
      } catch (err) { /* 初期データのまま */ }
      setInitializing(false);
    })();
  }, []);

  const saveToSheets = async () => {
    setSyncStatus("saving");
    try {
      const payload = { dogs, cycles, puppies, flocks, products, eggs, hatches, purchases, customers, sales };
      const res = await fetch(GAS_URL, { method: "POST", body: JSON.stringify({ action: "saveAll", payload }) });
      const data = await res.json();
      setSyncStatus(data.success ? "saved" : "error");
    } catch (err) { setSyncStatus("error"); }
    setTimeout(() => setSyncStatus(null), 3000);
  };

  const loadFromSheets = async () => {
    setLoadStatus("loading");
    try {
      const res = await fetch(GAS_URL, { method: "POST", body: JSON.stringify({ action: "loadAll" }) });
      const data = await res.json();
      if (data.success) { applyLoadedData(data); setLoadStatus("loaded"); }
      else setLoadStatus("error");
    } catch (err) { setLoadStatus("error"); }
    setTimeout(() => setLoadStatus(null), 3000);
  };

  const syncLabel = { saving: "⏳ 保存中...", saved: "✅ 保存完了！", error: "❌ エラー" };
  const loadLabel = { loading: "⏳ 読み込み中...", loaded: "✅ 読み込み完了！", error: "❌ エラー" };

  if (initializing) {
    return (
      <div className="app">
        <style>{S}</style>
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <div style={{ color: "var(--text3)", fontSize: 13 }}>読み込み中...</div>
        </div>
      </div>
    );
  }

  if (screen === "dogs") return <><style>{S}</style><DogModule dogs={dogs} setDogs={setDogs} cycles={cycles} setCycles={setCycles} puppies={puppies} setPuppies={setPuppies} onBack={() => setScreen("home")} /></>;
  if (screen === "chickens") return <><style>{S}</style><ChickenModule
      flocks={flocks} setFlocks={setFlocks}
      products={products} setProducts={setProducts}
      eggs={eggs} setEggs={setEggs}
      hatches={hatches} setHatches={setHatches}
      purchases={purchases} setPurchases={setPurchases}
      customers={customers} setCustomers={setCustomers}
      sales={sales} setSales={setSales}
      onBack={() => setScreen("home")} /></>;

  return (
    <div className="app">
      <style>{S}</style>
      <Hdr title="🌾 ファーム管理" sub="FARM MANAGEMENT" />
      <div className="home-hero">
        <div className="home-eyebrow">My Farm</div>
        <div className="home-title">わんこと鶏の<br /><em>管理帳</em></div>
        <div style={{fontSize:11,color:"var(--text3)",fontFamily:"DM Mono",marginTop:8}}>{dateStr}</div>
      </div>
      <div className="home-cards">
        <div className="home-card dog" onClick={() => setScreen("dogs")}>
          <div className="home-card-icon dog">🐕</div>
          <div><div className="home-card-name">犬の管理</div><div className="home-card-desc">犬リスト・家系図・ヒート・交配・出産</div></div>
          <span style={{color:"var(--text3)",fontSize:22,marginLeft:"auto"}}>›</span>
        </div>
        <div className="home-card chicken" onClick={() => setScreen("chickens")}>
          <div className="home-card-icon chicken">🐓</div>
          <div><div className="home-card-name">鶏の管理</div><div className="home-card-desc">群れ・産卵・孵化・入荷・販売・顧客</div></div>
          <span style={{color:"var(--text3)",fontSize:22,marginLeft:"auto"}}>›</span>
        </div>
        <button className="sync-btn" onClick={saveToSheets} disabled={syncStatus==="saving"}>
          {syncStatus ? syncLabel[syncStatus] : "📊 スプレッドシートに保存"}
        </button>
        <div className="sync-hint">今の入力内容をGoogleスプレッドシートに保存します</div>
        <button className="sync-btn" onClick={loadFromSheets} disabled={loadStatus==="loading"} style={{marginTop:4}}>
          {loadStatus ? loadLabel[loadStatus] : "📥 スプレッドシートから読み込む"}
        </button>
        <div className="sync-hint">前回保存したデータを読み込みます（アプリを開いた時も自動で読み込みます）</div>
      </div>
    </div>
  );
}
