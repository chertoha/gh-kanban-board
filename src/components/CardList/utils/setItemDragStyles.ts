import { DragEvent } from "react";

export const itemDragStyles = {
  apply: (e: DragEvent<HTMLDivElement>) => {
    // e.currentTarget.style.borderBottom = "10px dashed gray";
    e.currentTarget.classList.add("dragged-over");
  },

  remove: (e: DragEvent<HTMLDivElement>) => {
    // e.currentTarget.style.borderBottom = "none";
    e.currentTarget.classList.remove("dragged-over");
  },
};
