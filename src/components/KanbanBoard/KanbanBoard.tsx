import { Col, Row } from "antd";
import CardList from "components/CardList";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { FC, useEffect, useState } from "react";
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
} from "redux/issues/slice";
import {
  todoListInit,
  inProgressListInit,
  doneListInit,
} from "utils/tempInitialState";

const KanbanBoard: FC = () => {
  const dispatch = useAppDispatch();

  const todoList: Issue[] = useAppSelector(selectTodoList);
  const inProgressList: Issue[] = useAppSelector(selectInProgressList);
  const doneList: Issue[] = useAppSelector(selectDoneList);

  const currentCardState = useState<Issue | null>(null);
  // const currentListState = useState<Issue[] | null>(null);

  useEffect(() => {
    console.log("onMount");
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
        />
      </Col>
      <Col span={8}>
        <CardList
          list={inProgressList}
          currentCardState={currentCardState}
          updateList={updateInProgressList}
        />
      </Col>
      <Col span={8}>
        <CardList
          list={doneList}
          currentCardState={currentCardState}
          updateList={updateDoneList}
        />
      </Col>
    </Row>
  );
};

export default KanbanBoard;
