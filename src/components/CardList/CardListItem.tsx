import KanbanCard from "components/KanbanCard";
import { itemDragStyles } from "./utils/setItemDragStyles";
import { List } from "antd";
import { useAppDispatch } from "hooks/hooks";
import { DragEvent, FC } from "react";
import { Issue } from "types/types";
import { ICardListProps } from "./types/props";
import { calculateAfterDropLists } from "./utils/calculateAfterDropLists";

const CardListItem: FC<ICardListProps> = ({
  list,
  currentCardState: [currentCard, setCurrentCard],
  updateList,
  currentListState: [{ currentList, updateCurrentList }, setCurrentListState],
  chosenItemStyles,
  issue,
}) => {
  const dispatch = useAppDispatch();

  const dragStartHandler = (
    e: DragEvent<HTMLDivElement>,
    card: Issue,
    list: Issue[]
  ) => {
    chosenItemStyles.apply(e.currentTarget);

    setCurrentCard(card);
    setCurrentListState({ currentList: list, updateCurrentList: updateList });
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    itemDragStyles.remove(e);
    chosenItemStyles.remove();
  };

  const dropHandler = (
    e: DragEvent<HTMLDivElement>,
    card: Issue | null,
    list: Issue[]
  ) => {
    e.preventDefault();
    if (!currentCard) return;
    if (!currentList || !updateCurrentList) return;

    itemDragStyles.remove(e);
    chosenItemStyles.remove();

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

  if (!issue) return null;

  return (
    <List.Item
      style={{ border: "none" }}
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, issue, list)}
      onDragLeave={itemDragStyles.remove}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => {
        e.preventDefault();
        itemDragStyles.apply(e);
      }}
      onDrop={(e) => dropHandler(e, issue, list)}
    >
      <KanbanCard issue={issue} />
    </List.Item>
  );
};

export default CardListItem;