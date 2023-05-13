import CardList from "components/CardList";
import { Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { FC, useEffect, useState } from "react";
import {
  selectDoneList,
  selectInProgressList,
  selectTodoList,
} from "redux/issues/selectors";
import { IKanbanLists, Issue } from "types/types";
import {
  updateTodoList,
  updateInProgressList,
  updateDoneList,
  updateAll,
  CommonIssuesActionsCreatorType,
} from "redux/issues/slice";
import { useChosenItemStyles } from "hooks/useChosenItemStyles";
import {
  getDoneIssues,
  getInProgressIssues,
  getTodoIssues,
} from "services/kanbanDataService";
import style from "./KanbanBoard.module.css";
import { ListStorageService } from "services/StorageService";
import { ISSUES_STORAGE_KEY } from "utils/constants";
import Title from "antd/es/typography/Title";

const storage = new ListStorageService<IKanbanLists>(ISSUES_STORAGE_KEY);

export interface ICurrentListState {
  currentList: Issue[] | null;
  updateCurrentList: CommonIssuesActionsCreatorType | null;
}

interface IKanbanBoard {
  repoPath: string;
}

const KanbanBoard: FC<IKanbanBoard> = ({ repoPath }) => {
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

    try {
      getTodoIssues(repoPath).then((res) => {
        dispatch(updateTodoList(res));
      });
      getInProgressIssues(repoPath).then((res) => {
        dispatch(updateInProgressList(res));
      });
      getDoneIssues(repoPath).then((res) => {
        dispatch(updateDoneList(res));
      });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, repoPath]);

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

  return (
    <Row style={{ boxSizing: "border-box" }} gutter={32}>
      <Col span={8}>
        <Title level={2} className={style.title}>
          ToDo
        </Title>
        <div className={style.column}>
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
        <Title level={2} className={style.title}>
          In Progress
        </Title>
        <div className={style.column}>
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
        <Title level={2} className={style.title}>
          Done
        </Title>
        <div className={style.column}>
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
