export const getShortNumberView = (num: number | string): string => {
  if (typeof num === "string" && Number.isNaN(Number(num))) {
    return num;
  }

  const strNum = num.toString();
  const length = strNum.length;

  if (length >= 10) {
    return strNum.slice(0, -9) + " B";
  }
  if (length >= 7) {
    return strNum.slice(0, -6) + " M";
  }
  if (length >= 5) {
    return strNum.slice(0, -3) + " K";
  }
  return strNum;
};
