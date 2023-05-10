import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Issue } from "types/types";

interface IDesksState {
  todoList: Issue[] | null;
  inProgressList: Issue[] | null;
  doneList: Issue[] | null;
}

const initialState: IDesksState = {
  todoList: null,
  inProgressList: null,
  doneList: null,
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
