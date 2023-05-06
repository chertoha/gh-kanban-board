import KanbanCard from "components/KanbanCard";
import style from "./CardList.module.css";
import { List } from "antd";
import { Dispatch, DragEvent, FC, SetStateAction } from "react";
import { Issue } from "types/types";
import { CommonIssuesActionsCreatorType } from "redux/issues/slice";
import { useAppDispatch } from "hooks/hooks";

interface ICardListProps {
  list: Issue[];
  currentCardState: [Issue | null, Dispatch<SetStateAction<Issue | null>>];
  updateList: CommonIssuesActionsCreatorType;
}

const CardList: FC<ICardListProps> = ({
  list,
  currentCardState: [currentCard, setCurrentCard],
  updateList,
}) => {
  const dispatch = useAppDispatch();

  const dragStartHandler = (
    e: DragEvent<HTMLDivElement>,
    card: Issue,
    list: Issue[]
  ) => {
    //
    // console.log(list);
    // console.log(card);
    setCurrentCard(card);

    const chosenCardIndex = list.findIndex(({ id }) => id === card.id);
    const updatedList = [...list];
    updatedList.splice(chosenCardIndex, 1);
    // console.log(updatedList);
    dispatch(updateList(updatedList));
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
    // e.currentTarget.style.borderBottom = "none";

    e.currentTarget.style.marginBottom = "0";

    // console.log(currentOverCard);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.marginBottom = "0";
    // e.currentTarget.style.borderBottom = "none";
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.marginBottom = "80px";
    // e.currentTarget.style.borderBottom = "4px solid gray";
    // console.log("over", card);
  };

  const dropHandler = (
    e: DragEvent<HTMLDivElement>,
    card: Issue,
    list: Issue[]
  ) => {
    e.preventDefault();

    if (currentCard === null) return;

    e.currentTarget.style.borderBottom = "0";
    // console.log(list);
    // console.log(card);
    const chosenCardIndex = list.findIndex(({ id }) => id === card.id);
    // console.log(chosenCardIndex);
    const updatedList = [...list];
    updatedList.splice(chosenCardIndex + 1, 0, currentCard);
    // console.log(updatedList);
    dispatch(updateList(updatedList));
    setCurrentCard(null);
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
