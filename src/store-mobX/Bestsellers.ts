import { makeAutoObservable, runInAction } from 'mobx';
import { getArrOfUniqueBooks } from '../utils/getUniqueBooksArray';
import { NYTimes_URL } from '../utils/consts';
import { IBookDetails, StateType } from '../utils/types';

class Bestsellers {
  currentBestsellersList: IBookDetails[] = [];
  currentBestseller: IBookDetails | null = null;
  date: string | null = null;
  isDateChanged: boolean = true;
  state: StateType = 'pending';

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentBestseller(index: number) {
    this.currentBestseller = this.currentBestsellersList[index];
  }

  setDate(date: string) {
    this.date = date;
    this.isDateChanged = true;
  }

  async loadBestsellers(date: string) {
    this.currentBestsellersList = [];
    this.state = 'pending';
    this.currentBestseller = null;
    this.isDateChanged = false;

    try {
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
            isbn: book.primary_isbn10,
          };
        });

      const listOfUniqueBestsellers = getArrOfUniqueBooks(allBestsellers);
      runInAction(() => {
        this.currentBestsellersList = listOfUniqueBestsellers;
        this.currentBestseller = listOfUniqueBestsellers[0];
        this.state = 'success';
        this.isDateChanged = false;
      });
    } catch (error: any) {
      this.state = 'error';
      this.currentBestseller = null;
      this.currentBestsellersList = [];
      this.isDateChanged = false;
    }
  }
}

export default new Bestsellers();
