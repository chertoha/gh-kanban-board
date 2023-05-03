import { Col, Row } from "antd";
import { FC } from "react";
import style from "./KanbanBoard.module.css";

const KanbanBoard: FC = () => {
  return (
    <Row style={{ boxSizing: "border-box" }} gutter={32}>
      <Col span={8}>
        <div className={style.column}>To Do</div>
      </Col>
      <Col span={8}>
        <div className={style.column}>In progress</div>
      </Col>
      <Col span={8}>
        <div className={style.column}>Done</div>
      </Col>
    </Row>
  );
};

export default KanbanBoard;
