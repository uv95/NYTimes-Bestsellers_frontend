export const classNames = (
  mainClass: string,
  ...conditionalClasses: (boolean | string | undefined)[]
) => {
  if (!conditionalClasses.length) return '';
  const filtered = conditionalClasses
    .map((el) => (!!el ? `${mainClass}--${el}` : ''))
    .join(' ')
    .trim();
  return filtered;
};

export const getNYTimesBestsellers = async function () {
  const res = await fetch(
    'https://api.nytimes.com/svc/books/v3/lists/current/middle-grade-paperback-monthly.json?api-key=eIoal0qQr2Mwam9gXhcGUVF3ei0QpSMa'
  );
  const data = await res.json();
  console.log(data.results);
  return data.results.books;
};
