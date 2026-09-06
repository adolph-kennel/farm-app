import { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "dogs") {
    return (
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        <button onClick={() => setScreen("home")}>← 戻る</button>
        <h1>🐕 犬の管理</h1>
        <p>ここに犬の機能を追加していきます</p>
      </div>
    );
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
