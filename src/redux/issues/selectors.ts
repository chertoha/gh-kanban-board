import type { RootState } from "redux/store";

export const selectTodoList = (state: RootState) => state.issues.todoList;

export const selectInProgressList = (state: RootState) =>
  state.issues.inProgressList;

export const selectDoneList = (state: RootState) => state.issues.doneList;
