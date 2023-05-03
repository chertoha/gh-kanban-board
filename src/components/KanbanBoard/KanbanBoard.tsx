import { Col, Row } from "antd";
import CardList from "components/CardList";
import { FC } from "react";

const KanbanBoard: FC = () => {
  return (
    <Row style={{ boxSizing: "border-box" }} gutter={32}>
      <Col span={8}>
        <CardList />
      </Col>
      <Col span={8}>
        <CardList />
      </Col>
      <Col span={8}>
        <CardList />
      </Col>
    </Row>
  );
};

export default KanbanBoard;
