import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-red-400">Hello World</h1>
    </>
  );
}

export default App;
