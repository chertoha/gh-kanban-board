import KanbanCard from "components/KanbanCard";
import style from "./CardList.module.css";
import { List } from "antd";
import { Dispatch, DragEvent, FC, SetStateAction } from "react";
import { Issue } from "types/types";
import { CommonIssuesActionsCreatorType } from "redux/issues/slice";
import { useAppDispatch } from "hooks/hooks";
import { ICurrentListState } from "components/KanbanBoard/KanbanBoard";

interface ICardListProps {
  list: Issue[];
  currentCardState: [Issue | null, Dispatch<SetStateAction<Issue | null>>];
  updateList: CommonIssuesActionsCreatorType;
  currentListState: [
    ICurrentListState,
    Dispatch<SetStateAction<ICurrentListState>>
  ];
}

const CardList: FC<ICardListProps> = ({
  list,
  currentCardState: [currentCard, setCurrentCard],
  updateList,
  currentListState: [{ currentList, updateCurrentList }, setCurrentListState],
}) => {
  const dispatch = useAppDispatch();

  const dragStartHandler = (
    e: DragEvent<HTMLDivElement>,
    card: Issue,
    list: Issue[]
  ) => {
    setCurrentCard(card);
    setCurrentListState({ currentList: list, updateCurrentList: updateList });

    // const chosenCardIndex = list.findIndex(({ id }) => id === card.id);
    // const updatedList = [...list];
    // updatedList.splice(chosenCardIndex, 1);
    // dispatch(updateList(updatedList));
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.borderBottom = "none";
    // e.currentTarget.style.marginBottom = "0";
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    // e.currentTarget.style.marginBottom = "0";
    e.currentTarget.style.borderBottom = "none";
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // e.currentTarget.style.marginBottom = "80px";
    e.currentTarget.style.borderBottom = "4px solid gray";
  };

  const dropHandler = (
    e: DragEvent<HTMLDivElement>,
    card: Issue,
    list: Issue[]
  ) => {
    e.preventDefault();

    if (!currentCard) return;
    if (!currentList || !updateCurrentList) return;

    e.currentTarget.style.borderBottom = "0";

    // update lists after drop
    const removeCardIndex = currentList.findIndex(
      ({ id }) => id === currentCard.id
    );
    const prevList = [...currentList];
    prevList.splice(removeCardIndex, 1);

    if (list === currentList) {
      const afterCardIndex = prevList.findIndex(({ id }) => id === card.id);
      prevList.splice(afterCardIndex + 1, 0, currentCard);
      dispatch(updateList(prevList));
    } else {
      const afterCardIndex = list.findIndex(({ id }) => id === card.id);
      const nextList = [...list];
      nextList.splice(afterCardIndex + 1, 0, currentCard);
      dispatch(updateCurrentList(prevList));
      dispatch(updateList(nextList));
    }

    setCurrentCard(null);
    setCurrentListState({ currentList: null, updateCurrentList: null });
  };

  return (
    <div className={style.column}>
      <List
        className={style.column__list}
        dataSource={list}
        renderItem={(issue) => (
          <List.Item
            style={{ border: "none" }}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, issue, list)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, issue, list)}
          >
            <KanbanCard issue={issue} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CardList;
