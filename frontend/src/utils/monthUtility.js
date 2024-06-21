export const months = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

export const getMonthByValue = (object, value) => {
  let selectedMonthString = value.toString();
  selectedMonthString =
    selectedMonthString.length === 1
      ? "0" + selectedMonthString
      : selectedMonthString;
  return Object.keys(object).find((key) => object[key] === selectedMonthString);
};
