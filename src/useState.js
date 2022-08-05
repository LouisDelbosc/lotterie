import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const gridStateAtom = atomWithStorage("grid-state", {});

export function useGrid() {
  const [grid, setGrid] = useAtom(gridStateAtom);
  const getGridElement = (x, y) => grid[`${x},${y}`];
  const setGridElement = (x, y) => (result) =>
    setGrid((state) => ({ ...state, [`${x},${y}`]: result }));
  return [grid, getGridElement, setGridElement];
}

export function useResetGrid() {
  const [grid, setGrid] = useAtom(gridStateAtom);
  return () => setGrid({});
}

export const editModeAtom = atom("edit", false);

export function useToggleEdit() {
  const [edit, setEdit] = useAtom(editModeAtom);
  const toggle = () => setEdit((s) => !s);
  return [edit, toggle];
}
