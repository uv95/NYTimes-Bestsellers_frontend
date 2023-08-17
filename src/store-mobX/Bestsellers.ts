import { makeAutoObservable, runInAction } from 'mobx';
import { getArrOfUniqueBooks } from '../utils/getUniqueBooksArray';
import { NYTimes_URL } from '../utils/consts';
import { IBookDetails, StateType } from '../utils/types';
import axios from 'axios';

export class Bestsellers {
  currentBestsellersList: IBookDetails[] = [];
  currentBestseller: IBookDetails | null = null;
  date: string | null = null;
  isDateChanged: boolean = true;
  state: StateType = StateType.IDLE;

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

  async fetchBestsellersLists(date: string) {
    this.state = StateType.PENDING;
    try {
      const res = await axios.get(NYTimes_URL(date));
      return res.data.results.lists;
    } catch (error) {
      this.state = StateType.ERROR;
    }
  }

  formatBestsellers(books: any) {
    return books
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
  }

  async setBestsellers(date: string) {
    this.currentBestsellersList = [];
    this.currentBestseller = null;
    this.isDateChanged = false;

    try {
      const bestsellersLists = await this.fetchBestsellersLists(date);
      const formattedBestsellers = this.formatBestsellers(bestsellersLists);
      const listOfUniqueBestsellers = getArrOfUniqueBooks(formattedBestsellers);

      runInAction(() => {
        this.currentBestsellersList = listOfUniqueBestsellers;
        this.currentBestseller = listOfUniqueBestsellers[0];
        this.state = StateType.SUCCESS;
        this.isDateChanged = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.state = StateType.ERROR;
        this.currentBestseller = null;
        this.currentBestsellersList = [];
        this.isDateChanged = false;
      });
    }
  }
}

export default new Bestsellers();
