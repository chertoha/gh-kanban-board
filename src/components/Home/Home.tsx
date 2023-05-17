import InfoBar from "components/InfoBar/InfoBar";
import KanbanBoard from "components/KanbanBoard";
import SearchBar from "components/SearchBar";
import SearchError from "components/SearchError";
import { Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { StorageService } from "services/StorageService";
import { SEARCH_STORAGE_KEY, SEARCH_URL_BASE_PREFIX } from "utils/constants";
import style from "./Home.module.css";

const storage = new StorageService<string>(SEARCH_STORAGE_KEY);

const Home: FC = () => {
  const [searchValue, setSearch] = useState(() => storage.get() || "");
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setError(null);
    searchValue && storage.set(searchValue);
  }, [searchValue]);

  const parseSearchValue = (searchUrl: string) => {
    return searchUrl.replace(SEARCH_URL_BASE_PREFIX, "");
  };

  const repoPath = parseSearchValue(searchValue);

  return (
    <main className={style.home}>
      <h1 hidden>Github issues kanban board</h1>

      <Row justify="center">
        <Col span={20}>
          <SearchBar onSearch={setSearch} value={searchValue} />

          {!error ? (
            <>
              <InfoBar repoPath={repoPath} setError={setError} />
              <KanbanBoard repoPath={repoPath} setError={setError} />
            </>
          ) : (
            <SearchError error={error} />
          )}
        </Col>
      </Row>
    </main>
  );
};

export default Home;
