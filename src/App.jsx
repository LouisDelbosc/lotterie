import { useState } from "react";
import { Grid } from "./components/Grid";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="m-10 w-full h-full">
      <h1 className="text-xl">SORARE LEGION</h1>
      <Grid />
    </div>
  );
}

export default App;
