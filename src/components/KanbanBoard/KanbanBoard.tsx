import { Col, Row } from "antd";
import CardList from "components/CardList";
import { useAppSelector } from "hooks/hooks";
import { FC } from "react";
import {
  selectDoneList,
  selectInProgressList,
  selectTodoList,
} from "redux/issues/selectors";
import { Issue } from "types/types";

const KanbanBoard: FC = () => {
  const todoList: Issue[] = useAppSelector(selectTodoList);
  const inProgressList: Issue[] = useAppSelector(selectInProgressList);
  const doneList: Issue[] = useAppSelector(selectDoneList);

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
