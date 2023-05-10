import { Col, Row } from "antd";
import InfoBar from "components/InfoBar";
import KanbanBoard from "components/KanbanBoard";
import SearchBar from "components/SearchBar";
import { FC } from "react";

const Home: FC = () => {
  return (
    <main>
      <h1 hidden>Github issues kanban board</h1>

      <Row justify="center">
        <Col span="16">
          <SearchBar />
          <InfoBar />
          <KanbanBoard />
        </Col>
      </Row>
    </main>
  );
};

export default Home;
