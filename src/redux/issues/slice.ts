import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IKanbanLists, Issue } from "types/types";

const initialState: IKanbanLists = {
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

    updateAll: (state, action: PayloadAction<IKanbanLists>) => {
      state.todoList = action.payload.todoList;
      state.inProgressList = action.payload.inProgressList;
      state.doneList = action.payload.doneList;
    },
  },
});

export const {
  updateTodoList,
  updateInProgressList,
  updateDoneList,
  updateAll,
} = issuesSlice.actions;

export type CommonIssuesActionsCreatorType =
  | typeof updateTodoList
  | typeof updateInProgressList
  | typeof updateDoneList;

export default issuesSlice.reducer;
