import { useEffect, useState, useRef } from "react";
import { useGrid } from "../useState";

function range(n) {
  return [...Array(n).keys()];
}

function getGrid(grid, x, y) {
  const key = `${x},${y}`;
  return grid[key];
}

export function Grid({ editMode, onClick }) {
  const [grid, getGridElement, setGridElement] = useGrid();
  const clsHover = editMode && "hover:border-blue-500";
  return (
    <table className="bg-image m-auto">
      <tbody>
        {range(8).map((index) => (
          <tr key={index}>
            {range(8).map((jndex) => (
              <td
                key={`${index} ${jndex}`}
                className={`p-0 w-36 h-20 ${clsHover}`}
                onClick={() => onClick(index + 1, jndex + 1)}
              >
                <GridItem
                  isVisible={getGridElement(index + 1, jndex + 1)?.visited}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GridItem({ isVisible }) {
  const className = "p-3";
  return isVisible ? (
    <div className="w-full h-full bg-gray-100 border-black p-3 cursor-default" />
  ) : (
    <div className="w-full h-full p-3 border-white border-solid border cursor-pointer" />
  );
}

export function MiniForm({ url, media, onSubmit }) {
  const [urlInput, setUrl] = useState(url);
  const [mediaType, setMediaType] = useState(media);
  useEffect(() => {
    setUrl(url || "");
    setMediaType(media);
  }, [url, media]);
  const handleSave = () => onSubmit({ url: urlInput, mediaType });
  return (
    <div className="mx-20 my-5 flex flex-col">
      <input
        type="text"
        placeholder="YouTube video ID or image URL"
        className="focus:ring-indigo-500 px-3 py-2 focus:border-indigo-500 flex-1 w-full border rounded-md sm:text-sm border-gray-300"
        value={urlInput}
        onChange={(event) => setUrl(event.target.value)}
      />
      <div className="mt-2">
        <input
          type="radio"
          id="img"
          name="media"
          value="img"
          checked={mediaType === "img"}
          onClick={() => setMediaType("img")}
          className="ml-1 mr-2"
        />
        <label htmlFor="img" className="mr-5">Image</label>
        <input
          type="radio"
          id="video"
          name="media"
          value="video"
          checked={mediaType === "video"}
          onClick={() => setMediaType("video")}
          className="ml-1 mr-2"
        />
        <label htmlFor="video">Video</label>
      </div>
      <button className="hover:bg-blue-500 mt-5 px-2 py-1 w-64 border border-gray-300 rounded-md" onClick={handleSave}>Save</button>
      <div className="mt-10"/>
    </div>
  );
}
