import { Col, Row } from "antd";
import CardList from "components/CardList";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { FC, useEffect } from "react";
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

  useEffect(() => {
    console.log("onMount");
    try {
      setTimeout(() => {
        dispatch(updateTodoList(todoListInit));
      }, 1000);
      setTimeout(() => {
        dispatch(updateInProgressList(inProgressListInit));
      }, 2000);
      setTimeout(() => {
        dispatch(updateDoneList(doneListInit));
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  return (
    <Row style={{ boxSizing: "border-box" }} gutter={32}>
      <Col span={8}>
        <CardList list={todoList} />
      </Col>
      <Col span={8}>
        <CardList list={inProgressList} />
      </Col>
      <Col span={8}>
        <CardList list={doneList} />
      </Col>
    </Row>
  );
};

export default KanbanBoard;
