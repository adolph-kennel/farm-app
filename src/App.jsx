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
      <button className="btn-save" onClick={() => { if (form.callName) { onSave({ ...form, id: form.id || `dog_${Date.now()}` }); onClose(); } }}>
        {isEdit ? "保存する" : "登録する"}
      </button>
    </Modal>
  );
}

// ============================================================
// DOG DETAIL
// ============================================================
function DogDetail({ dog, dogs, onSelectDog, onEdit }) {
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
        <FamilyTree dog={dog} allDogs={allDogs} onSelect={onSelectDog} />
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
function DogListScreen({ dogs, setDogs, onBack }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [modal, setModal] = useState(null); // "add" | "edit"

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
        <DogDetail dog={detail} dogs={dogs} onSelectDog={handleSelect} onEdit={(d) => setModal({ type: "edit", dog: d })} />
        {modal?.type === "edit" && (
          <DogFormModal dog={modal.dog} dogs={dogs} breeds={breeds} onClose={() => setModal(null)} onSave={saveDog} />
        )}
      </div>
    );
  }

  const filtered = dogs.filter(d => {
    const mb = filter === "all" || d.breed === filter;
    const ms = !search || d.callName.includes(search);
    return mb && ms;
  });

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
        {breeds.map(b => (
          <button key={b} className={`breed-tab ${filter === b ? "on" : ""}`} onClick={() => setFilter(b)}>{b}</button>
        ))}
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
      <div className="fab-wrap">
        <button className="fab" onClick={() => setModal({ type: "add" })}>＋</button>
      </div>
      {modal?.type === "add" && (
        <DogFormModal dogs={dogs} breeds={breeds} onClose={() => setModal(null)} onSave={saveDog} />
      )}
    </div>
  );
}

// ============================================================
// DOG MODULE MENU
// ============================================================
function DogModule({ dogs, setDogs, onBack }) {
  const [screen, setScreen] = useState(null);
  if (screen === "list") return <DogListScreen dogs={dogs} setDogs={setDogs} onBack={() => setScreen(null)} />;
  return (
    <div className="app">
      <Hdr title="🐕 犬の管理" sub="DOG MANAGEMENT" onBack={onBack} />
      <div className="menu-list">
        <div className="menu-item" onClick={() => setScreen("list")}>
          <div className="menu-item-icon" style={{ background: "var(--blue-dim)" }}>🐾</div>
          <div><div className="menu-item-name">犬リスト・家系図</div><div className="menu-item-desc">個体情報・血統・3世代家系図・犬種の追加編集</div></div>
          <span style={{ color: "var(--text3)", fontSize: 18, marginLeft: "auto" }}>›</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CHICKEN MODULE
// ============================================================
function ChickenModule({ onBack }) {
  const [flocks, setFlocks] = useState(INITIAL_FLOCKS);
  const [hatches, setHatches] = useState(INITIAL_HATCH);
  const [tab, setTab] = useState("flock");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const totalBirds = flocks.reduce((s, f) => s + f.male + f.female, 0);
  const totalMale = flocks.reduce((s, f) => s + f.male, 0);
  const totalFemale = flocks.reduce((s, f) => s + f.female, 0);

  const TABS = [{ id: "flock", label: "群れ" }, { id: "hatch", label: "孵化記録" }];

  return (
    <div className="app">
      <Hdr title="🐓 鶏の管理" sub="CHICKEN MANAGEMENT" onBack={onBack} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "12px 20px 0" }}>
        <div className="stat-box"><div className="stat-num" style={{ color: "var(--green)" }}>{totalBirds}</div><div style={{ fontSize: 10, color: "var(--text3)" }}>総羽数</div></div>
        <div className="stat-box"><div className="stat-num" style={{ color: "var(--blue)" }}>{totalMale}</div><div style={{ fontSize: 10, color: "var(--text3)" }}>オス</div></div>
        <div className="stat-box"><div className="stat-num" style={{ color: "var(--pink)" }}>{totalFemale}</div><div style={{ fontSize: 10, color: "var(--text3)" }}>メス</div></div>
      </div>
      <div style={{ display: "flex", gap: 6, padding: "12px 20px 0" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "7px 13px", borderRadius: 20, border: `1px solid ${tab === t.id ? "var(--green)" : "var(--border2)"}`, background: tab === t.id ? "var(--green-dim)" : "none", fontSize: 12, fontWeight: 700, color: tab === t.id ? "var(--green)" : "var(--text3)", cursor: "pointer" }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: "12px 20px", paddingBottom: 100, flex: 1, overflowY: "auto" }}>
        {tab === "flock" && <>
          {flocks.map(f => (
            <div key={f.id} className="flock-card" onClick={() => { setForm({ ...f }); setModal("editFlock"); }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="flock-name">{f.breed}</div>
                  <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    <span style={{ fontSize: 12, color: "var(--blue)" }}>♂ オス {f.male}羽</span>
                    <span style={{ fontSize: 12, color: "var(--pink)" }}>♀ メス {f.female}羽</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="flock-count">{f.male + f.female}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)" }}>羽</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 10, color: "var(--text3)", textAlign: "center", marginTop: 4 }}>群れをタップすると編集できます</div>
        </>}

        {tab === "hatch" && <>
          {hatches.length === 0 && <div className="empty">孵化記録なし</div>}
          {hatches.map(h => (
            <div key={h.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "13px 15px", marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{h.breedLabel}</span>
                <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "DM Mono" }}>{formatDate(h.hatchDate)}</span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "DM Mono", color: "var(--green)" }}>{h.hatchCount}</span>
                <span style={{ fontSize: 13, color: "var(--text2)", marginLeft: 4 }}>羽 孵化</span>
              </div>
              {h.note && <div style={{ fontSize: 11, color: "var(--gold)", marginTop: 4 }}>{h.note}</div>}
            </div>
          ))}
          <button className="btn-save" onClick={() => { setForm({ hatchDate: new Date().toISOString().slice(0,10) }); setModal("addHatch"); }}>＋ 孵化記録を追加</button>
        </>}
      </div>

      <div className="fab-wrap">
        {tab === "flock" && <button className="fab" onClick={() => { setForm({ breed: "", male: 0, female: 0 }); setModal("addFlock"); }}>＋</button>}
      </div>

      {modal === "editFlock" && (
        <Modal title={`${form.breed} を編集`} onClose={() => setModal(null)}>
          <div className="field"><label>品種・色</label><input value={form.breed || ""} onChange={e => sf("breed", e.target.value)} /></div>
          <div className="field-row">
            <div className="field"><label>オス羽数</label><input type="number" value={form.male ?? 0} onChange={e => sf("male", parseInt(e.target.value) || 0)} /></div>
            <div className="field"><label>メス羽数</label><input type="number" value={form.female ?? 0} onChange={e => sf("female", parseInt(e.target.value) || 0)} /></div>
          </div>
          <button className="btn-save" onClick={() => {
            setFlocks(fs => fs.map(f => f.id === form.id ? { ...f, breed: form.breed, male: form.male, female: form.female } : f));
            setModal(null);
          }}>保存する</button>
        </Modal>
      )}

      {modal === "addFlock" && (
        <Modal title="＋ 新しい群れを追加" onClose={() => setModal(null)}>
          <div className="field"><label>品種・色（例: 烏骨鶏（茶）)</label><input value={form.breed || ""} onChange={e => sf("breed", e.target.value)} /></div>
          <div className="field-row">
            <div className="field"><label>オス羽数</label><input type="number" value={form.male ?? 0} onChange={e => sf("male", parseInt(e.target.value) || 0)} /></div>
            <div className="field"><label>メス羽数</label><input type="number" value={form.female ?? 0} onChange={e => sf("female", parseInt(e.target.value) || 0)} /></div>
          </div>
          <button className="btn-save" onClick={() => {
            if (!form.breed) return;
            setFlocks(fs => [...fs, { id: `f_${Date.now()}`, breed: form.breed, male: form.male || 0, female: form.female || 0, note: "" }]);
            setModal(null);
          }}>追加する</button>
        </Modal>
      )}

      {modal === "addHatch" && (
        <Modal title="🐣 孵化記録を追加" onClose={() => setModal(null)}>
          <div className="field"><label>品種</label><input value={form.breedLabel || ""} onChange={e => sf("breedLabel", e.target.value)} placeholder="例: 烏骨鶏" /></div>
          <div className="field-row">
            <div className="field"><label>孵化日</label><input type="date" value={form.hatchDate || ""} onChange={e => sf("hatchDate", e.target.value)} /></div>
            <div className="field"><label>孵化数</label><input type="number" value={form.hatchCount || ""} onChange={e => sf("hatchCount", parseInt(e.target.value) || 0)} /></div>
          </div>
          <div className="field"><label>メモ</label><textarea value={form.note || ""} onChange={e => sf("note", e.target.value)} /></div>
          <button className="btn-save" onClick={() => {
            if (!form.breedLabel || !form.hatchDate) return;
            setHatches(hs => [...hs, { id: `h_${Date.now()}`, flockId: null, breedLabel: form.breedLabel, setDate: form.hatchDate, setCount: null, hatchDate: form.hatchDate, hatchCount: form.hatchCount || 0, male: null, female: null, note: form.note || "" }]);
            setModal(null);
          }}>記録する</button>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// HOME
// ============================================================
export default function App() {
  const [dogs, setDogs] = useState(INITIAL_DOGS);
  const [screen, setScreen] = useState("home");

  const now = new Date();
  const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;

  if (screen === "dogs") return <><style>{S}</style><DogModule dogs={dogs} setDogs={setDogs} onBack={() => setScreen("home")} /></>;
  if (screen === "chickens") return <><style>{S}</style><ChickenModule onBack={() => setScreen("home")} /></>;

  return (
    <div className="app">
      <style>{S}</style>
      <Hdr title="🌾 ファーム管理" sub="FARM MANAGEMENT" />
      <div className="home-hero">
        <div className="home-eyebrow">My Farm</div>
        <div className="home-title">わんこと鶏の<br /><em>管理帳</em></div>
        <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "DM Mono", marginTop: 8 }}>{dateStr}</div>
      </div>
      <div className="home-cards">
        <div className="home-card dog" onClick={() => setScreen("dogs")}>
          <div className="home-card-icon dog">🐕</div>
          <div><div className="home-card-name">犬の管理</div><div className="home-card-desc">犬リスト・家系図・犬種の追加編集</div></div>
          <span style={{ color: "var(--text3)", fontSize: 22, marginLeft: "auto" }}>›</span>
        </div>
        <div className="home-card chicken" onClick={() => setScreen("chickens")}>
          <div className="home-card-icon chicken">🐓</div>
          <div><div className="home-card-name">鶏の管理</div><div className="home-card-desc">群れ・孵化記録・品種の追加編集</div></div>
          <span style={{ color: "var(--text3)", fontSize: 22, marginLeft: "auto" }}>›</span>
        </div>
      </div>
    </div>
  );
}
