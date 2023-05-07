import CardList from "components/CardList";
import { Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { FC, useEffect, useRef, useState } from "react";
import {
  selectDoneList,
  selectInProgressList,
  selectTodoList,
} from "redux/issues/selectors";
import { Issue } from "types/types";
import {
  updateTodoList,
  updateInProgressList,
  updateDoneList,
  CommonIssuesActionsCreatorType,
} from "redux/issues/slice";
import {
  todoListInit,
  inProgressListInit,
  doneListInit,
} from "utils/tempInitialState";

export interface ICurrentListState {
  currentList: Issue[] | null;
  updateCurrentList: CommonIssuesActionsCreatorType | null;
}

const KanbanBoard: FC = () => {
  const dispatch = useAppDispatch();

  const todoList: Issue[] = useAppSelector(selectTodoList);
  const inProgressList: Issue[] = useAppSelector(selectInProgressList);
  const doneList: Issue[] = useAppSelector(selectDoneList);

  const currentCardState = useState<Issue | null>(null);
  const currentListState = useState<ICurrentListState>({
    currentList: null,
    updateCurrentList: null,
  });

  const chosenCardRef = useRef<HTMLDivElement | null>(null);

  const setChosenCard = (card: HTMLDivElement | null) => {
    if (card === null) {
      if (!chosenCardRef.current) return;
      chosenCardRef.current.style.backgroundColor = "inherit";
      chosenCardRef.current = null;
      return;
    }
    chosenCardRef.current = card;
    chosenCardRef.current.style.backgroundColor = "#ada89f";
  };

  useEffect(() => {
    try {
      setTimeout(() => {
        dispatch(updateTodoList(todoListInit));
      }, 100);
      setTimeout(() => {
        dispatch(updateInProgressList(inProgressListInit));
      }, 200);
      setTimeout(() => {
        dispatch(updateDoneList(doneListInit));
      }, 300);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  return (
    <Row style={{ boxSizing: "border-box" }} gutter={32}>
      <Col span={8}>
        <CardList
          list={todoList}
          currentCardState={currentCardState}
          updateList={updateTodoList}
          currentListState={currentListState}
          setChosenCard={setChosenCard}
        />
      </Col>
      <Col span={8}>
        <CardList
          list={inProgressList}
          currentCardState={currentCardState}
          updateList={updateInProgressList}
          currentListState={currentListState}
          setChosenCard={setChosenCard}
        />
      </Col>
      <Col span={8}>
        <CardList
          list={doneList}
          currentCardState={currentCardState}
          updateList={updateDoneList}
          currentListState={currentListState}
          setChosenCard={setChosenCard}
        />
      </Col>
    </Row>
  );
};

export default KanbanBoard;
