import { useRef } from "react";

export type ChosenItemStylesHook = {
  apply: (item: HTMLDivElement) => void;
  remove: () => void;
};

export const useChosenItemStyles = (): ChosenItemStylesHook => {
  const itemRef = useRef<HTMLDivElement | null>(null);

  const apply = (item: HTMLDivElement) => {
    itemRef.current = item;
    itemRef.current.style.backgroundColor = "#ada89f";
  };

  const remove = () => {
    if (!itemRef.current) return;
    itemRef.current.style.backgroundColor = "inherit";
    itemRef.current = null;
  };

  return { apply, remove };
};
