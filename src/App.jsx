import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>ファーム管理アプリ</h1>
      <p>公開テスト成功！</p>
      <button onClick={() => setCount(count + 1)}>
        押した回数: {count}
      </button>
    </div>
  );
}
