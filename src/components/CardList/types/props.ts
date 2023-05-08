import { ICurrentListState } from "components/KanbanBoard/KanbanBoard";
import { Dispatch, SetStateAction } from "react";
import { CommonIssuesActionsCreatorType } from "redux/issues/slice";
import { Issue } from "types/types";

export interface ICardListItemProps {
  list: Issue[];
  currentCardState: [Issue | null, Dispatch<SetStateAction<Issue | null>>];
  updateList: CommonIssuesActionsCreatorType;
  currentListState: [
    ICurrentListState,
    Dispatch<SetStateAction<ICurrentListState>>
  ];
  setChosenCard: (card: HTMLDivElement | null) => void;
  issue?: Issue | undefined;
}
