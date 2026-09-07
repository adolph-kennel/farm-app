import { useState } from "react";

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
// CHICKEN DATA
// ============================================================
const INITIAL_FLOCKS = [
  { id: "f1", breed: "烏骨鶏（黒）",     male: 2, female: 6, note: "" },
  { id: "f2", breed: "烏骨鶏（白）",     male: 2, female: 3, note: "" },
  { id: "f3", breed: "烏骨鶏（マダラ）", male: 2, female: 7, note: "" },
  { id: "f4", breed: "岡崎おうはん",     male: 1, female: 2, note: "" },
];

const INITIAL_HATCH = [
  { id: "h1", flockId: null, breedLabel: "烏骨鶏", setDate: "2026-01-01", setCount: null, hatchDate: "2026-01-01", hatchCount: 7, male: null, female: null, note: "2026年度ヒナ" },
  { id: "h2", flockId: null, breedLabel: "岡崎おうはん", setDate: "2026-01-01", setCount: null, hatchDate: "2026-01-01", hatchCount: 2, male: null, female: null, note: "2026年度ヒナ" },
];

// ============================================================
// UTILS
// ============================================================
const ALL_DOGS_MAP = [...INITIAL_DOGS, ...EXTERNAL_DATA];
const findDog = (id) => ALL_DOGS_MAP.find(d => d.id === id);
const formatDate = (d) => d ? d.replace(/-/g, "/") : "－";
const getAge = (b) => {
  if (!b) return "";
  const diff = (new Date() - new Date(b)) / (1000 * 60 * 60 * 24 * 30.5);
  if (diff < 12) return `${Math.floor(diff)}ヶ月`;
  return `${Math.floor(diff / 12)}歳${Math.floor(diff % 12) > 0 ? Math.floor(diff % 12) + "ヶ月" : ""}`;
};

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
.home-cards{padding:16px 20px;display:flex;flex-direction:column;gap:12px;padding-bottom:40px}
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
.dog-av.husky{background:var(--blue-dim)}
.dog-av.corgi{background:var(--corgi-dim)}
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
.fab-wrap{position:fixed;bottom:26px;right:22px;display:flex;flex-direction:column;gap:9px;align-items:flex-end;z-index:150}
.fab{width:54px;height:54px;border-radius:15px;background:var(--gold);color:var(--bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(201,168,76,0.35);font-size:22px}
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
.btn-cancel{width:100%;padding:10px;border-radius:10px;border:1px solid var(--border2);background:none;font-family:'Noto Sans JP',sans-serif;font-size:13px;cursor:pointer;margin-top:7px;color:var(--text3)}
.empty{text-align:center;color:var(--text3);font-size:13px;padding:40px 0}
.flock-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:13px 15px;cursor:pointer;border-left:3px solid var(--green);margin-bottom:9px}
.flock-name{font-size:15px;font-weight:700}
.flock-count{font-size:26px;font-weight:900;font-family:'DM Mono',monospace;color:var(--green)}
.stat-box{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center}
.stat-num{font-size:20px;font-weight:900;font-family:'DM Mono',monospace}
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
function FamilyTree({ dog, allDogs, onSelect }) {
  const lookup = (id) => allDogs.find(d => d.id === id) || findDog(id);
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
// ADD / EDIT DOG MODAL
// ============================================================
function DogFormModal({ dog, dogs, breeds, onClose, onSave }) {
  const [form, setForm] = useState(dog ? { ...dog } : { gender: "メス", breed: breeds[0] || "" });
  const [customBreed, setCustomBreed] = useState("");
  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const isEdit = !!dog;

  return (
    <Modal title={isEdit ? `✏️ ${dog.callName} を編集` : "🐾 新しい犬を登録"} onClose={onClose}>
      <div className="field-row">
        <div className="field"><label>コールネーム *</label><input value={form.callName || ""} onChange={e => s("callName", e.target.value)} /></div>
        <div className="field"><label>性別</label>
          <select value={form.gender} onChange={e => s("gender", e.target.value)}><option>メス</option><option>オス</option></select>
        </div>
      </div>
      <div className="field"><label>犬種</label>
        <select value={form.breed === customBreed && customBreed ? "__custom__" : form.breed} onChange={e => {
          if (e.target.value === "__custom__") { s("breed", customBreed); }
          else s("breed", e.target.value);
        }}>
          {breeds.map(b => <option key={b} value={b}>{b}</option>)}
          <option value="__custom__">＋ 新しい犬種を追加</option>
        </select>
      </div>
      {(!breeds.includes(form.breed) || form.breed === "__custom__") && (
        <div className="field"><label>新しい犬種名</label>
          <input value={customBreed} onChange={e => { setCustomBreed(e.target.value); s("breed", e.target.value); }} placeholder="例: 柴犬" />
        </div>
      )}
      <div className="field"><label>血統書名</label><input value={form.pedigreeName || ""} onChange={e => s("pedigreeName", e.target.value)} /></div>
      <div className="field-row">
        <div className="field"><label>生年月日</label><input type="date" value={form.birthda        <button onClick={() => setFilter("all")} style={{ fontWeight: filter === "all" ? "bold" : "normal" }}>すべて</button>
        <button onClick={() => setFilter("ハスキー")} style={{ fontWeight: filter === "ハスキー" ? "bold" : "normal" }}>🐺 ハスキー</button>
        <button onClick={() => setFilter("コーギー")} style={{ fontWeight: filter === "コーギー" ? "bold" : "normal" }}>🐕 コーギー</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(dog => (
          <div key={dog.id} style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <div style={{ fontWeight: "bold", fontSize: 16 }}>{dog.callName}</div>
              <div style={{ fontSize: 13, color: "#666" }}>{dog.breed}</div>
            </div>
            <div style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 20,
              background: dog.gender === "メス" ? "#fce4ec" : "#e3f2fd",
              color: dog.gender === "メス" ? "#c2185b" : "#1565c0"
            }}>
              {dog.gender}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "dogs") {
    return <DogListScreen onBack={() => setScreen("home")} />;
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🌾 ファーム管理</h1>
      <button
        onClick={() => setScreen("dogs")}
        style={{ padding: "16px 32px", fontSize: 18, marginTop: 20 }}
      >
        🐕 犬の管理へ
      </button>
    </div>
  );
}
