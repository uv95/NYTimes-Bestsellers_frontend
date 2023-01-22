export const getFormattedCurrentDate = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();

  return {
    year: new Date().getFullYear().toString(),
    month:
      ('0' + currentMonth).length === 2
        ? '0' + currentMonth
        : ('0' + currentMonth).slice(1),
    date:
      ('0' + currentDate).length === 2
        ? '0' + currentDate
        : ('0' + currentDate).slice(1),
  };
};
