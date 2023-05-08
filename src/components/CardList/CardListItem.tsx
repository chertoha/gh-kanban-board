import { List } from "antd";
import { ICurrentListState } from "components/KanbanBoard/KanbanBoard";
import KanbanCard from "components/KanbanCard";
import { useAppDispatch } from "hooks/hooks";
import { Dispatch, DragEvent, FC, SetStateAction } from "react";
import { CommonIssuesActionsCreatorType } from "redux/issues/slice";
import { Issue } from "types/types";
import { ICardListItemProps } from "./types/props";
import { calculateAfterDropLists } from "./utils/calculateAfterDropLists";

// interface ICardListItemProps {
//   list: Issue[];
//   currentCardState: [Issue | null, Dispatch<SetStateAction<Issue | null>>];
//   updateList: CommonIssuesActionsCreatorType;
//   currentListState: [
//     ICurrentListState,
//     Dispatch<SetStateAction<ICurrentListState>>
//   ];
//   setChosenCard: (card: HTMLDivElement | null) => void;
//   issue: Issue;
// }

const CardListItem: FC<ICardListItemProps> = ({
  list,
  currentCardState: [currentCard, setCurrentCard],
  updateList,
  currentListState: [{ currentList, updateCurrentList }, setCurrentListState],
  setChosenCard,
  issue,
}) => {
  const dispatch = useAppDispatch();

  const dragStartHandler = (
    e: DragEvent<HTMLDivElement>,
    card: Issue,
    list: Issue[]
  ) => {
    setChosenCard(e.currentTarget);
    setCurrentCard(card);
    setCurrentListState({ currentList: list, updateCurrentList: updateList });
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.borderBottom = "none";
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderBottom = "none";
    setChosenCard(null);
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderBottom = "10px dashed gray";
  };

  //   const dropHandler = (
  //     e: DragEvent<HTMLDivElement>,
  //     card: Issue | null,
  //     list: Issue[]
  //   ) => {
  //     e.preventDefault();
  //     e.currentTarget.style.borderBottom = "none";

  //     if (!currentCard) return;
  //     if (!currentList || !updateCurrentList) return;

  //     const removeCardIndex = findItemIndexFromListById(
  //       currentList,
  //       currentCard.id
  //     );
  //     const prevList = [...currentList];
  //     prevList.splice(removeCardIndex, 1);

  //     let afterCardIndex = -1;
  //     if (list === currentList) {
  //       if (card) {
  //         afterCardIndex = findItemIndexFromListById(prevList, card.id);
  //         afterCardIndex =
  //           afterCardIndex === -1 ? removeCardIndex - 1 : afterCardIndex;
  //       }
  //       prevList.splice(afterCardIndex + 1, 0, currentCard);
  //       dispatch(updateList(prevList));
  //     } else {
  //       if (card) {
  //         afterCardIndex = findItemIndexFromListById(list, card.id);
  //       }
  //       const nextList = [...list];
  //       nextList.splice(afterCardIndex + 1, 0, currentCard);
  //       dispatch(updateCurrentList(prevList));
  //       dispatch(updateList(nextList));
  //     }

  //     setChosenCard(null);
  //     setCurrentCard(null);
  //     setCurrentListState({ currentList: null, updateCurrentList: null });
  //   };

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

  if (!issue) return null;

  return (
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
  );
};

export default CardListItem;
