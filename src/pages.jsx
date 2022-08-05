import { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { motion } from "framer-motion";
import { Grid, MiniForm } from "./components/Grid";
import { useGrid, useResetGrid, useToggleEdit } from "./useState";

function selectedToIndex(selectedArray) {
  const [a, b] = selectedArray;
  return `${a},${b}`;
}

export function GridPage({ changePage }) {
  const [edit, toggle] = useToggleEdit();
  const [selected, setSelected] = useState("");
  const [grid, getGridElement, setGridElement] = useGrid();
  const reset = useResetGrid();
  console.log("grid", grid);
  const handleClick = (x, y) => {
    if (edit) {
      setSelected([x, y]);
    } else {
      const elem = getGridElement(x, y);
      setGridElement(x, y)({ ...elem, visited: true });
      changePage(x, y);
    }
  };
  const handleSubmit = ({ url, mediaType }) => {
    const [a, b] = selected;
    console.log({ a, b, url, mediaType });
    setGridElement(a, b)({ url, mediaType, visited: false });
  };
  const data = getGridElement(...selected);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen bg-white"
    >
      <div className="p-10 text-center w-full h-full">
        <h1 className="text-5xl mb-16">SORARE LEGION</h1>
        <Grid editMode={edit} onClick={handleClick} />
      </div>
      <button className="ml-20 border-solid border-blue-500 bg-indigo-500 px-5 py-2 rounded-lg" onClick={toggle}>
        {edit ? "EDIT" : "USE"}
      </button>
      <div className="ml-20 mt-5 ">completion: {Object.keys(grid).length}/64</div>
      {edit && (
        <>
          <h1 className="text-2xl mx-20 mt-5">coordinates: {selected[0]}, {selected[1]}</h1>
          <MiniForm
            url={data?.url}
            media={data?.mediaType}
            onSubmit={handleSubmit}
          />
        </>
      )}
      <button className="w-64 bg-red-600 px-2 py-1 rounded-md mt-5" onClick={reset}>RESET</button>
    </motion.div>
  );
}

export function MediaPage({ mediaData, changePage }) {
  const { url, mediaType } = mediaData;
  console.log({ mediaType });
  const opts = {
    width: '960',
    height: '720',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
    },
  };
  const handleReady = (event) => {
    event.target.setPlaybackQuality('hd1080');
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="h-screen bg-black"
    >
      <button
        className="absolute text-white mx-6 my-4 text-5xl exit-cross"
        onClick={changePage}
      />
      <div className="m-auto flex text-center items-center justify-center h-full">
        {mediaType === "video" ? (
          <YouTube
            className="flex justify-center"
            opts={opts}
            videoId={url}
            onReady={handleReady}
          />
        ) : (
          <img className="m-auto" src={url} alt="image" />
        )}
      </div>
    </motion.div>
  );
}
