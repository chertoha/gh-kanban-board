export const findItemIndexFromListById = (
  list: { id: string | number }[],
  itemId: string | number
) => {
  return list.findIndex(({ id }) => id === itemId);
};
