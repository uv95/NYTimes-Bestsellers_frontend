import axios, { AxiosError } from 'axios';
import { StateType, IBookDetails } from '../utils/types';
import { BASE_URL } from '../utils/consts';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { toast } from 'react-toastify';
import { extractErrorMessage } from '../utils/errorMessage';
import { user } from '.';

const API_URL = BASE_URL + 'marked/';

class MarkedBooks {
  markedBooks: IBookDetails[] = [];
  isNewBookMarked: boolean = true;
  state: StateType = StateType.IDLE;

  constructor() {
    makeObservable(this, {
      markedBooks: observable,
      isNewBookMarked: observable,
      state: observable,
      getAllMarkedBooks: action,
      addToBookmarks: action,
      addToFinished: action,
      updateMarkedBook: action,
      setError: action,
      setIsNewBookMarked: action,
      setMarkedBooks: action,
      setState: action,
      bookmarkedBooks: computed,
      finishedBooks: computed,
      config: computed,
    });
  }

  get bookmarkedBooks() {
    return this.markedBooks.filter((book: IBookDetails) => book.isBookmarked);
  }

  get finishedBooks() {
    return this.markedBooks.filter((book: IBookDetails) => book.isFinished);
  }

  get config() {
    return {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }

  setMarkedBooks(markedBooks: IBookDetails[]) {
    this.markedBooks = markedBooks;
  }
  setIsNewBookMarked(isNewBookMarked: boolean) {
    this.isNewBookMarked = isNewBookMarked;
  }

  setState(state: StateType) {
    this.state = state;
  }

  async getAllMarkedBooks() {
    this.setState(StateType.PENDING);
    this.setMarkedBooks([]);
    this.setIsNewBookMarked(false);

    try {
      const res = await axios.get(API_URL, this.config);

      runInAction(() => {
        this.setState(StateType.SUCCESS);
        this.setMarkedBooks(res.data.data);
        this.setIsNewBookMarked(false);
      });
    } catch (error: any) {
      this.setState(StateType.ERROR);
      this.setMarkedBooks([]);
      this.setIsNewBookMarked(false);
    }
  }

  setError(error: AxiosError) {
    this.state = StateType.ERROR;
    toast.error(extractErrorMessage(error));
  }

  async addToBookmarks(book: IBookDetails) {
    try {
      const res = await axios.post(API_URL + 'bookmarks', book, this.config);

      runInAction(() => {
        this.state = StateType.SUCCESS;

        if (
          !this.markedBooks.filter((book) => isSameBook(book, res.data.data))
            .length
        ) {
          this.isNewBookMarked = true;
        }

        this.markedBooks = this.markedBooks.map((book) =>
          isSameBook(book, res.data.data) ? res.data.data : book
        );
      });
    } catch (error: any) {
      this.setState(StateType.ERROR);
      toast.warn('Please log in to mark books');
    }
  }

  async addToFinished(book: IBookDetails) {
    try {
      const res = await axios.post(API_URL + 'finished', book, this.config);

      runInAction(() => {
        this.state = StateType.SUCCESS;

        if (
          !this.markedBooks.filter((book) => isSameBook(book, res.data.data))
            .length
        ) {
          this.isNewBookMarked = true;
        }

        this.markedBooks = this.markedBooks.map((book) =>
          isSameBook(book, res.data.data) ? res.data.data : book
        );
      });
    } catch (error: any) {
      this.setState(StateType.ERROR);
      toast.warn('Please log in to mark books');
    }
  }

  async updateMarkedBook(bookId: string, updatedBook: Partial<IBookDetails>) {
    try {
      const res = await axios.patch(API_URL + bookId, updatedBook, this.config);

      runInAction(() => {
        this.markedBooks = this.markedBooks.map((book) =>
          isSameBook(book, res.data.data) ? res.data.data : book
        );
        this.state = StateType.SUCCESS;
      });
    } catch (error: any) {
      this.setState(StateType.ERROR);
      toast.warn('Please log in to mark books');
    }
  }
}

const markedBooksInstance = new MarkedBooks();
export default markedBooksInstance;

function isSameBook(book: IBookDetails, receivedBook: IBookDetails) {
  return (
    book.title === receivedBook.title && book.author === receivedBook.author
  );
}
