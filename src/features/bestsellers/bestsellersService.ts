import { getArrOfUniqueBooks } from '../../utils/getUniqueBooksArray';
import { NYTimes_URL } from '../../utils/consts';

const getNYTimesBestsellers = async function (date: string) {
  const res = await fetch(NYTimes_URL(date));
  const data = await res.json();
  const allBestsellers = data.results.lists
    .reduce((acc: [], curr: any) => [...curr.books, ...acc], [])
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

  const listOfUniqueBestsellers = getArrOfUniqueBooks(allBestsellers, 'title');
  return listOfUniqueBestsellers;
};

const bestsellersService = {
  getNYTimesBestsellers,
};
export default bestsellersService;
