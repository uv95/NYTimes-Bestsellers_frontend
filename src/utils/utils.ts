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
  const formattedDate = `${new Date().getFullYear()}-${
    ('0' + (new Date().getMonth() + 1)).length === 2
      ? '0' + (new Date().getMonth() + 1)
      : ('0' + (new Date().getMonth() + 1)).slice(1)
  }-${
    ('0' + (new Date().getDate() + 1)).length === 2
      ? '0' + (new Date().getDate() + 1)
      : ('0' + (new Date().getDate() + 1)).slice(1)
  }`;
  const res = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=${formattedDate}&api-key=eIoal0qQr2Mwam9gXhcGUVF3ei0QpSMa`
  );
  const data = await res.json();
  const allBestsellers = data.results.lists
    .reduce((acc: [], curr: any) => [...curr.books].concat(acc), [])
    .filter((book: any) => book.description !== '');
  return allBestsellers;
};

export const getGenre = async function (title: string, author: string) {
  const formattedTitle = title
    .split(' ')
    .map((el: string) => el + '+')
    .join('')
    .toLowerCase()
    .slice(0, -1);
  const formattedAuthor = author.split(' ')[1].toLowerCase();

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${formattedTitle}+inauthor:${formattedAuthor}`
  );
  const data = await res.json();
  return data.items[0].volumeInfo.categories;
};
