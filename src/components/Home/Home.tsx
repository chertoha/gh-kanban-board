import { Col, Row } from "antd";
import InfoBar from "components/InfoBar";
import KanbanBoard from "components/KanbanBoard";
import SearchBar from "components/SearchBar";
import { FC, useState } from "react";

const SEARCH_URL_BASE_PREFIX = "https://github.com/";

const Home: FC = () => {
  const [searchValue, setSearch] = useState("");

  const parseSearchValue = (searchUrl: string) => {
    return searchUrl.replace(SEARCH_URL_BASE_PREFIX, "");
  };

  const repoPath = parseSearchValue(searchValue);

  return (
    <main>
      <h1 hidden>Github issues kanban board</h1>

      <Row justify="center">
        <Col span="16">
          <SearchBar onSearch={setSearch} />
          <InfoBar repoPath={repoPath} />
          <KanbanBoard repoPath={repoPath} />
        </Col>
      </Row>
    </main>
  );
};

export default Home;
