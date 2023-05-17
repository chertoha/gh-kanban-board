import Title from "antd/es/typography/Title";
import { Dispatch, FC, useEffect, useState } from "react";
import { Col, Row } from "antd";

import CardList from "components/CardList";
import NoSearchedData from "components/NoSearchedData";
import {
  selectDoneList,
  selectInProgressList,
  selectTodoList,
} from "redux/issues/selectors";
import {
  updateTodoList,
  updateInProgressList,
  updateDoneList,
  updateAll,
  CommonIssuesActionsCreatorType,
} from "redux/issues/slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useChosenItemStyles } from "hooks/useChosenItemStyles";
import { IKanbanLists, Issue } from "types/types";
import {
  getDoneIssues,
  getInProgressIssues,
  getTodoIssues,
} from "services/kanbanDataService";
import { ListStorageService } from "services/StorageService";
import { ISSUES_STORAGE_KEY } from "utils/constants";

import style from "./KanbanBoard.module.css";

const storage = new ListStorageService<IKanbanLists>(ISSUES_STORAGE_KEY);

export interface ICurrentListState {
  currentList: Issue[] | null;
  updateCurrentList: CommonIssuesActionsCreatorType | null;
}

interface IKanbanBoard {
  repoPath: string;
  setError: Dispatch<unknown>;
}

const KanbanBoard: FC<IKanbanBoard> = ({ repoPath, setError }) => {
  const dispatch = useAppDispatch();

  const todoList: Issue[] | null = useAppSelector(selectTodoList);
  const inProgressList: Issue[] | null = useAppSelector(selectInProgressList);
  const doneList: Issue[] | null = useAppSelector(selectDoneList);

  const currentCardState = useState<Issue | null>(null);
  const currentListState = useState<ICurrentListState>({
    currentList: null,
    updateCurrentList: null,
  });

  const chosenItemStyles = useChosenItemStyles();

  useEffect(() => {
    if (!repoPath) return;

    const issues = storage.get(repoPath);
    if (issues) {
      dispatch(updateAll(issues));
      return;
    }

    const updateAllLists = async () => {
      const toDo = await getTodoIssues(repoPath);
      dispatch(updateTodoList(toDo));

      const inProgress = await getInProgressIssues(repoPath);
      dispatch(updateInProgressList(inProgress));

      const done = await getDoneIssues(repoPath);
      dispatch(updateDoneList(done));
    };

    try {
      updateAllLists();
    } catch (err) {
      setError(err);
    }
  }, [dispatch, repoPath, setError]);

  useEffect(() => {
    if (!repoPath) return;

    if (!todoList || !inProgressList || !doneList) return;
    const issues: IKanbanLists = { todoList, inProgressList, doneList };
    storage.set(repoPath, issues);
  }, [todoList, inProgressList, doneList, repoPath]);

  const commonProps = {
    currentCardState,
    currentListState,
    chosenItemStyles,
  };

  if (!repoPath) {
    return <NoSearchedData />;
  }

  return (
    <Row gutter={32}>
      <Col span={8}>
        <div className={style.column}>
          <Title level={2} className={style.title}>
            ToDo
          </Title>
          {todoList && (
            <CardList
              list={todoList}
              updateList={updateTodoList}
              {...commonProps}
            />
          )}
        </div>
      </Col>
      <Col span={8}>
        <div className={style.column}>
          <Title level={2} className={style.title}>
            In Progress
          </Title>
          {inProgressList && (
            <CardList
              list={inProgressList}
              updateList={updateInProgressList}
              {...commonProps}
            />
          )}
        </div>
      </Col>
      <Col span={8}>
        <div className={style.column}>
          <Title level={2} className={style.title}>
            Done
          </Title>
          {doneList && (
            <CardList
              list={doneList}
              updateList={updateDoneList}
              {...commonProps}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default KanbanBoard;
