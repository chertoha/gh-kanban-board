import { DragEvent } from "react";

export const itemDragStyles = {
  apply: (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderBottom = "10px dashed gray";
  },

  remove: (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderBottom = "none";
  },
};
