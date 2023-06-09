import { DragEvent, FC } from "react";
import { RiDragDropFill } from "react-icons/ri";

import { useAppDispatch } from "hooks/hooks";
import { Issue } from "types/types";
import { ICardListProps } from "types/props";

import style from "./CardListItem.module.css";
import { calculateAfterDropLists } from "../utils/calculateAfterDropLists";
import { itemDragStyles } from "../utils/setItemDragStyles";

const CardListEmptyItem: FC<ICardListProps> = ({
  list,
  currentCardState: [currentCard, setCurrentCard],
  currentListState: [{ currentList, updateCurrentList }, setCurrentListState],
  chosenItemStyles,
  updateList,
}) => {
  const dispatch = useAppDispatch();

  const dropHandler = (
    e: DragEvent<HTMLDivElement>,
    card: Issue | null,
    list: Issue[]
  ) => {
    e.preventDefault();
    itemDragStyles.remove(e);
    chosenItemStyles.remove();

    if (!currentCard) return;
    if (!currentList || !updateCurrentList) return;

    const { prevList, nextList } = calculateAfterDropLists(
      currentCard,
      card,
      currentList,
      list
    );

    prevList && dispatch(updateCurrentList(prevList));
    nextList && dispatch(updateList(nextList));

    setCurrentCard(null);
    setCurrentListState({ currentList: null, updateCurrentList: null });
  };
  return (
    <div
      className={`column__item ${style.cardListEmptyItem}`}
      draggable={true}
      onDragStart={(e) => {
        e.preventDefault();
      }}
      onDragLeave={itemDragStyles.remove}
      onDragEnd={itemDragStyles.remove}
      onDragOver={(e) => {
        e.preventDefault();
        itemDragStyles.apply(e);
      }}
      onDrop={(e) => {
        dropHandler(e, null, list);
      }}
    >
      <RiDragDropFill size={50} />
    </div>
  );
};

export default CardListEmptyItem;
