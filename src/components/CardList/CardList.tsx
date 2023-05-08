import KanbanCard from "components/KanbanCard";
import style from "./CardList.module.css";
import { List } from "antd";
import { Dispatch, DragEvent, FC, SetStateAction } from "react";
import { Issue } from "types/types";
import { CommonIssuesActionsCreatorType } from "redux/issues/slice";
import { useAppDispatch } from "hooks/hooks";
import { ICurrentListState } from "components/KanbanBoard/KanbanBoard";
import { RiDragDropFill } from "react-icons/ri";
import { findItemIndexFromListById } from "utils/findItemIndexFromListById";
import CardListItem from "./CardListItem";
import { calculateAfterDropLists } from "./utils/calculateAfterDropLists";
import CardListZeroItem from "./CardListZeroItem";
import CardListEmptyItem from "./CardListEmptyItem";

interface ICardListProps {
  list: Issue[];
  currentCardState: [Issue | null, Dispatch<SetStateAction<Issue | null>>];
  updateList: CommonIssuesActionsCreatorType;
  currentListState: [
    ICurrentListState,
    Dispatch<SetStateAction<ICurrentListState>>
  ];
  setChosenCard: (card: HTMLDivElement | null) => void;
}

const CardList: FC<ICardListProps> = ({
  list,
  currentCardState: [currentCard, setCurrentCard],
  updateList,
  currentListState: [{ currentList, updateCurrentList }, setCurrentListState],
  setChosenCard,
}) => {
  // const dispatch = useAppDispatch();

  // const dragStartHandler = (
  //   e: DragEvent<HTMLDivElement>,
  //   card: Issue,
  //   list: Issue[]
  // ) => {
  //   setChosenCard(e.currentTarget);
  //   setCurrentCard(card);
  //   setCurrentListState({ currentList: list, updateCurrentList: updateList });
  // };

  // const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
  //   e.currentTarget.style.borderBottom = "none";
  // };

  // const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
  //   e.currentTarget.style.borderBottom = "none";
  //   setChosenCard(null);
  // };

  // const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.currentTarget.style.borderBottom = "10px dashed gray";
  // };

  // const dropHandler = (
  //   e: DragEvent<HTMLDivElement>,
  //   card: Issue | null,
  //   list: Issue[]
  // ) => {
  //   e.preventDefault();
  //   if (!currentCard) return;
  //   if (!currentList || !updateCurrentList) return;

  //   e.currentTarget.style.borderBottom = "none";

  //   const { prevList, nextList } = calculateAfterDropLists(
  //     currentCard,
  //     card,
  //     currentList,
  //     list
  //   );

  //   prevList && dispatch(updateCurrentList(prevList));
  //   nextList && dispatch(updateList(nextList));

  //   setChosenCard(null);
  //   setCurrentCard(null);
  //   setCurrentListState({ currentList: null, updateCurrentList: null });
  // };

  // Zero Item handlers
  // const onZeroItemStartHandler = (e: DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };
  // const onZeroItemOverHandler = (e: DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.currentTarget.style.borderBottom = "10px dashed gray";
  // };
  // const onZeroItemLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
  //   e.currentTarget.style.borderBottom = "none";
  // };

  return (
    <div className={style.column}>
      {list.length > 0 ? (
        <List
          className={style.column__list}
          dataSource={list}
          renderItem={(issue, i) => (
            <>
              {i === 0 && (
                // <List.Item
                //   style={{ border: "none" }}
                //   draggable={true}
                //   onDragStart={onZeroItemStartHandler}
                //   onDragLeave={onZeroItemLeaveHandler}
                //   onDragEnd={onZeroItemLeaveHandler}
                //   onDragOver={onZeroItemOverHandler}
                //   onDrop={(e) => {
                //     dropHandler(e, null, list);
                //   }}
                // ></List.Item>
                <CardListZeroItem
                  list={list}
                  currentCardState={[currentCard, setCurrentCard]}
                  updateList={updateList}
                  currentListState={[
                    { currentList, updateCurrentList },
                    setCurrentListState,
                  ]}
                  setChosenCard={setChosenCard}
                />
              )}
              {/* <List.Item
                style={{ border: "none" }}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, issue, list)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, issue, list)}
              >
                <KanbanCard issue={issue} />
              </List.Item> */}
              <CardListItem
                list={list}
                currentCardState={[currentCard, setCurrentCard]}
                updateList={updateList}
                currentListState={[
                  { currentList, updateCurrentList },
                  setCurrentListState,
                ]}
                setChosenCard={setChosenCard}
                issue={issue}
              />
            </>
          )}
        />
      ) : (
        // <div
        //   style={{
        //     height: "100%",
        //     borderRadius: "20px",
        //     display: "flex",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     color: "gray",
        //   }}
        //   draggable={true}
        //   onDragStart={onZeroItemStartHandler}
        //   onDragLeave={onZeroItemLeaveHandler}
        //   onDragEnd={onZeroItemLeaveHandler}
        //   onDragOver={onZeroItemOverHandler}
        //   onDrop={(e) => {
        //     dropHandler(e, null, list);
        //   }}
        // >
        //   <RiDragDropFill size={50} />
        // </div>
        <CardListEmptyItem
          list={list}
          currentCardState={[currentCard, setCurrentCard]}
          updateList={updateList}
          currentListState={[
            { currentList, updateCurrentList },
            setCurrentListState,
          ]}
          setChosenCard={setChosenCard}
        />
      )}
    </div>
  );
};

export default CardList;
