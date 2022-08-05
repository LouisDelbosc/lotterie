import { useState } from "react";

import { GridPage, MediaPage } from "./pages";
import { AnimatePresence } from "framer-motion";
import { useGrid } from "./useState";

function App() {
  const [count, setCount] = useState(0);
  const [videoRunning, setVideoRunning] = useState(false);
  const [_grid, getGridElement, _setter] = useGrid();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      {videoRunning ? (
        <MediaPage
          mediaData={getGridElement(...videoRunning)}
          changePage={() => setVideoRunning(false)}
        />
      ) : (
        <GridPage changePage={(x, y) => setVideoRunning([x, y])} />
      )}
    </AnimatePresence>
  );
}

export default App;
