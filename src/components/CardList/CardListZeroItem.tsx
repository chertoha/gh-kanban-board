import { List } from "antd";
import { useAppDispatch } from "hooks/hooks";
import { DragEvent, FC } from "react";
import { Issue } from "types/types";
import { ICardListItemProps } from "./types/props";
import { calculateAfterDropLists } from "./utils/calculateAfterDropLists";

const CardListZeroItem: FC<ICardListItemProps> = ({
  list,
  currentCardState: [currentCard, setCurrentCard],
  currentListState: [{ currentList, updateCurrentList }, setCurrentListState],
  setChosenCard,
  updateList,
}) => {
  const dispatch = useAppDispatch();

  const overHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderBottom = "10px dashed gray";
  };

  const leaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderBottom = "none";
  };

  const dropHandler = (
    e: DragEvent<HTMLDivElement>,
    card: Issue | null,
    list: Issue[]
  ) => {
    e.preventDefault();
    if (!currentCard) return;
    if (!currentList || !updateCurrentList) return;

    e.currentTarget.style.borderBottom = "none";

    const { prevList, nextList } = calculateAfterDropLists(
      currentCard,
      card,
      currentList,
      list
    );

    prevList && dispatch(updateCurrentList(prevList));
    nextList && dispatch(updateList(nextList));

    setChosenCard(null);
    setCurrentCard(null);
    setCurrentListState({ currentList: null, updateCurrentList: null });
  };

  return (
    <List.Item
      style={{ border: "none" }}
      draggable={true}
      onDragStart={(e) => {
        e.preventDefault();
      }}
      onDragLeave={leaveHandler}
      onDragEnd={leaveHandler}
      onDragOver={overHandler}
      onDrop={(e) => {
        dropHandler(e, null, list);
      }}
    ></List.Item>
  );
};

export default CardListZeroItem;
