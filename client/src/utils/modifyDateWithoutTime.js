const monthsArray = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

export function modifyDateWithoutTime(string) {
    const rowDate = new Date(string);
    const newDate = String(
      rowDate.getDate() +
        " " +
        monthsArray[rowDate.getMonth()] +
        " " +
        rowDate.getFullYear() +
        " г. "
    );
    return newDate
  }