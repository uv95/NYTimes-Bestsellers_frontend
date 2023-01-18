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

export const NYTimes_URL = (date: string) =>
  `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=${date}&api-key=eIoal0qQr2Mwam9gXhcGUVF3ei0QpSMa`;
// export const GoogleApi_URL = (title: string, author: string) =>
//   `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}`;

// export const getGenre = async function (title: string, author: string) {
//   const formattedTitle = title
//     .split(' ')
//     .map((el: string) => el + '+')
//     .join('')
//     .toLowerCase()
//     .slice(0, -1);
//   const formattedAuthor = author.split(' ')[1].toLowerCase();

//   const res = await fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=${formattedTitle}+inauthor:${formattedAuthor}`
//   );
//   const data = await res.json();
//   return data.items[0].volumeInfo.categories;
// };
