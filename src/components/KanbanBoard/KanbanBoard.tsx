import CardList from "components/CardList";
import { Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { FC, useEffect, useRef, useState } from "react";
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
  CommonIssuesActionsCreatorType,
} from "redux/issues/slice";
import {
  todoListInit,
  inProgressListInit,
  doneListInit,
} from "utils/tempInitialState";
import { useChosenItemStyles } from "components/CardList/hooks/useChosenItemStyles";
import { api } from "services/api";
import {
  getDoneIssues,
  getRepoStars,
  getTodoIssues,
} from "services/kanbanDataService";

export interface ICurrentListState {
  currentList: Issue[] | null;
  updateCurrentList: CommonIssuesActionsCreatorType | null;
}

const KanbanBoard: FC = () => {
  const dispatch = useAppDispatch();

  const todoList: Issue[] = useAppSelector(selectTodoList);
  const inProgressList: Issue[] = useAppSelector(selectInProgressList);
  const doneList: Issue[] = useAppSelector(selectDoneList);

  const currentCardState = useState<Issue | null>(null);
  const currentListState = useState<ICurrentListState>({
    currentList: null,
    updateCurrentList: null,
  });

  const chosenItemStyles = useChosenItemStyles();

  // useEffect(() => {
  //   try {
  //     setTimeout(() => {
  //       dispatch(updateTodoList(todoListInit));
  //     }, 100);
  //     setTimeout(() => {
  //       dispatch(updateInProgressList(inProgressListInit));
  //     }, 200);
  //     setTimeout(() => {
  //       dispatch(updateDoneList(doneListInit));
  //     }, 300);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [dispatch]);

  useEffect(() => {
    try {
      const testApi = async () => {
        const data = await getDoneIssues("facebook", "react");
        console.log(data);
      };
      testApi();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const commonProps = { currentCardState, currentListState, chosenItemStyles };

  return (
    <Row style={{ boxSizing: "border-box" }} gutter={32}>
      <Col span={8}>
        <CardList
          list={todoList}
          updateList={updateTodoList}
          {...commonProps}
        />
      </Col>
      <Col span={8}>
        <CardList
          list={inProgressList}
          updateList={updateInProgressList}
          {...commonProps}
        />
      </Col>
      <Col span={8}>
        <CardList
          list={doneList}
          updateList={updateDoneList}
          {...commonProps}
        />
      </Col>
    </Row>
  );
};

export default KanbanBoard;
