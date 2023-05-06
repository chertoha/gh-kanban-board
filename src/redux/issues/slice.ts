import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Issue } from "types/types";

interface IDesksState {
  todoList: Issue[];
  inProgressList: Issue[];
  doneList: Issue[];
}

const initialState: IDesksState = {
  todoList: [],
  inProgressList: [],
  doneList: [],
};

export const issuesSlice = createSlice({
  name: "issues",

  initialState,

  reducers: {
    updateTodoList: (state, action: PayloadAction<Issue[]>) => {
      state.todoList = action.payload;
    },

    updateInProgressList: (state, action: PayloadAction<Issue[]>) => {
      state.inProgressList = action.payload;
    },

    updateDoneList: (state, action: PayloadAction<Issue[]>) => {
      state.doneList = action.payload;
    },
  },
});

export const { updateTodoList, updateInProgressList, updateDoneList } =
  issuesSlice.actions;

export type CommonIssuesActionsCreatorType =
  | typeof updateTodoList
  | typeof updateInProgressList
  | typeof updateDoneList;

export default issuesSlice.reducer;
