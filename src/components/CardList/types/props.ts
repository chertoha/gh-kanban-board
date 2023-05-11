import { ICurrentListState } from "components/KanbanBoard/KanbanBoard";
import { Dispatch, SetStateAction } from "react";
import { CommonIssuesActionsCreatorType } from "redux/issues/slice";
import { Issue } from "types/types";
import { ChosenItemStylesHook } from "../../../hooks/useChosenItemStyles";

export interface ICardListProps {
  list: Issue[];

  currentCardState: [Issue | null, Dispatch<SetStateAction<Issue | null>>];

  updateList: CommonIssuesActionsCreatorType;

  currentListState: [
    ICurrentListState,
    Dispatch<SetStateAction<ICurrentListState>>
  ];

  chosenItemStyles: ChosenItemStylesHook;

  issue?: Issue | undefined;
}
