import { Issue } from "types/types";
import { findItemIndexFromListById } from "utils/findItemIndexFromListById";

export const calculateAfterDropLists = (
  currentCard: Issue,
  afterCard: Issue | null,
  listFrom: Issue[],
  listTo: Issue[]
): { prevList: Issue[] | null; nextList: Issue[] | null } => {
  const removeCardIndex = findItemIndexFromListById(listFrom, currentCard.id);
  const prevList = [...listFrom];
  prevList.splice(removeCardIndex, 1);

  let afterCardIndex = -1;
  let nextList;

  if (listTo === listFrom) {
    if (afterCard) {
      afterCardIndex = findItemIndexFromListById(prevList, afterCard.id);
      afterCardIndex =
        afterCardIndex === -1 ? removeCardIndex - 1 : afterCardIndex;
    }
    prevList.splice(afterCardIndex + 1, 0, currentCard);

    return { prevList: null, nextList: prevList };
  } else {
    if (afterCard) {
      afterCardIndex = findItemIndexFromListById(listTo, afterCard.id);
    }
    nextList = [...listTo];
    nextList.splice(afterCardIndex + 1, 0, currentCard);

    return { prevList, nextList };
  }
};
