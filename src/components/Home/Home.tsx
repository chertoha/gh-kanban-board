import { Col, Row } from "antd";
import InfoBar from "components/InfoBar/InfoBar";
import KanbanBoard from "components/KanbanBoard";
import SearchBar from "components/SearchBar";
import { FC, useEffect, useState } from "react";
import { StorageService } from "services/StorageService";
import { SEARCH_STORAGE_KEY, SEARCH_URL_BASE_PREFIX } from "utils/constants";

const storage = new StorageService<string>(SEARCH_STORAGE_KEY);

const Home: FC = () => {
  const [searchValue, setSearch] = useState(() => storage.get() || "");

  useEffect(() => {
    searchValue && storage.set(searchValue);
  }, [searchValue]);

  const parseSearchValue = (searchUrl: string) => {
    return searchUrl.replace(SEARCH_URL_BASE_PREFIX, "");
  };

  const repoPath = parseSearchValue(searchValue);

  return (
    <main style={{ paddingTop: "30px" }}>
      <h1 hidden>Github issues kanban board</h1>

      <Row justify="center">
        <Col span="16">
          <SearchBar onSearch={setSearch} value={searchValue} />
          <InfoBar repoPath={repoPath} />
          <KanbanBoard repoPath={repoPath} />
        </Col>
      </Row>
    </main>
  );
};

export default Home;
