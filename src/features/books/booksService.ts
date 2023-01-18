import { NYTimes_URL } from '../../utils/utils';

const getNYTimesBestsellers = async function () {
  const formattedDate = `${new Date().getFullYear()}-${
    ('0' + (new Date().getMonth() + 1)).length === 2
      ? '0' + (new Date().getMonth() + 1)
      : ('0' + (new Date().getMonth() + 1)).slice(1)
  }-${
    ('0' + (new Date().getDate() + 1)).length === 2
      ? '0' + (new Date().getDate() + 1)
      : ('0' + (new Date().getDate() + 1)).slice(1)
  }`;
  const res = await fetch(NYTimes_URL(formattedDate));
  const data = await res.json();

  const allBestsellers = data.results.lists
    .reduce((acc: [], curr: any) => [...curr.books].concat(acc), [])
    .filter((book: any) => book.description !== '')
    .map((book: any) => {
      return {
        cover: book.book_image,
        author: book.author,
        title: book.title
          .split(' ')
          .map((word: string) => word[0] + word.slice(1).toLowerCase())
          .join(' '),
        description: book.description,
      };
    });
  return allBestsellers;
};

const booksService = {
  getNYTimesBestsellers,
};
export default booksService;
