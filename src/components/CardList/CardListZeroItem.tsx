import { List } from "antd";
import { useAppDispatch } from "hooks/hooks";
import { DragEvent, FC } from "react";
import { Issue } from "types/types";
import { ICardListProps } from "../../types/props";
import { calculateAfterDropLists } from "./utils/calculateAfterDropLists";
import { itemDragStyles } from "./utils/setItemDragStyles";

const CardListZeroItem: FC<ICardListProps> = ({
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
    <List.Item
      className="column__item"
      style={{ border: "none" }}
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
    ></List.Item>
  );
};

export default CardListZeroItem;
