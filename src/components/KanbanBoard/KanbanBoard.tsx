import CardList from "components/CardList";
import { Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { FC, useEffect, useState } from "react";
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
// import {
//   todoListInit,
//   inProgressListInit,
//   doneListInit,
// } from "utils/tempInitialState";
import { useChosenItemStyles } from "components/CardList/hooks/useChosenItemStyles";
import {
  getDoneIssues,
  getInProgressIssues,
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

  useEffect(() => {
    try {
      getTodoIssues("facebook", "react").then((res) => {
        dispatch(updateTodoList(res));
      });
      getInProgressIssues("facebook", "react").then((res) => {
        dispatch(updateInProgressList(res));
      });
      getDoneIssues("facebook", "react").then((res) => {
        dispatch(updateDoneList(res));
      });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

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
