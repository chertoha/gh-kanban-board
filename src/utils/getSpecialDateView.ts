import { formatDistance } from "date-fns";

export const getSpecialDateView = (date: string): string => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
};
