import { useState } from "react";

const INITIAL_DOGS = [
  { id: "uri",     callName: "ウリ",      breed: "ハスキー", gender: "メス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "sae",     callName: "サエ",      breed: "ハスキー", gender: "メス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "luna",    callName: "ルナ",      breed: "ハスキー", gender: "メス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "uran",    callName: "ウラン",    breed: "ハスキー", gender: "メス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "nacchan", callName: "なっちゃん", breed: "ハスキー", gender: "メス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "shin",    callName: "シン",      breed: "ハスキー", gender: "オス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "alex",    callName: "アレックス", breed: "ハスキー", gender: "オス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "angel",   callName: "エンジェル", breed: "ハスキー", gender: "オス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "yomogi",  callName: "よもぎ",    breed: "コーギー", gender: "メス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "chihiro", callName: "ちひろ",    breed: "コーギー", gender: "メス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "alexa",   callName: "アレクサ",  breed: "コーギー", gender: "メス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "asuka",   callName: "あすか",    breed: "コーギー", gender: "メス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "prince",  callName: "プリンス",  breed: "コーギー", gender: "オス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
  { id: "ryusei",  callName: "りゅうせい", breed: "コーギー", gender: "オス", pedigreeName: "", birthdate: "", color: "", jkc: "", chip: "", fatherId: null, motherId: null, note: "" },
];

function DogListScreen({ onBack }) {
  const [dogs] = useState(INITIAL_DOGS);
  const [filter, setFilter] = useState("all");

  const filtered = dogs.filter(d => filter === "all" || d.breed === filter);
  const huskyCount = dogs.filter(d => d.breed === "ハスキー").length;
  const corgiCount = dogs.filter(d => d.breed === "コーギー").length;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>← 戻る</button>
      <h1>🐕 犬リスト</h1>
      <p style={{ color: "#666" }}>
        総頭数 {dogs.length}頭（ハスキー{huskyCount}頭・コーギー{corgiCount}頭）
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setFilter("all")} style={{ fontWeight: filter === "all" ? "bold" : "normal" }}>すべて</button>
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
