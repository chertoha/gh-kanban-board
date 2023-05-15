import { DragEvent } from "react";

export const itemDragStyles = {
  apply: (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add("dragged-over");
  },

  remove: (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("dragged-over");
  },
};
