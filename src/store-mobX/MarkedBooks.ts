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
  state: StateType = 'pending';

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
    this.setState('pending');
    this.setMarkedBooks([]);
    this.setIsNewBookMarked(false);

    try {
      const res = await axios.get(API_URL, this.config);

      runInAction(() => {
        this.setState('success');
        this.setMarkedBooks(res.data.data);
        this.setIsNewBookMarked(false);
      });
    } catch (error: any) {
      this.setState('error');
      this.setMarkedBooks([]);
      this.setIsNewBookMarked(false);
    }
  }

  setError(error: AxiosError) {
    this.state = 'error';
    toast.error(extractErrorMessage(error));
  }

  async addToBookmarks(book: IBookDetails) {
    try {
      const res = await axios.post(API_URL + 'bookmarks', book, this.config);

      runInAction(() => {
        this.state = 'success';

        if (
          !this.markedBooks.filter(
            (book) =>
              book.title === res.data.data.title &&
              book.author === res.data.data.author
          ).length
        )
          this.isNewBookMarked = true;
        this.markedBooks = this.markedBooks.map((book) =>
          book.title === res.data.data.title &&
          book.author === res.data.data.author
            ? res.data.data
            : book
        );
      });
    } catch (error: any) {
      this.setState('error');
      toast.warn('Please log in to mark books');
    }
  }

  async addToFinished(book: IBookDetails) {
    try {
      const res = await axios.post(API_URL + 'finished', book, this.config);
      runInAction(() => {
        this.state = 'success';
        if (
          !this.markedBooks.filter(
            (book) =>
              book.title === res.data.data.title &&
              book.author === res.data.data.author
          ).length
        )
          this.isNewBookMarked = true;
        this.markedBooks = this.markedBooks.map((book) =>
          book.title === res.data.data.title &&
          book.author === res.data.data.author
            ? res.data.data
            : book
        );
      });
    } catch (error: any) {
      this.setState('error');
      toast.warn('Please log in to mark books');
    }
  }

  async updateMarkedBook(bookId: string, updatedBook: Partial<IBookDetails>) {
    try {
      const res = await axios.patch(API_URL + bookId, updatedBook, this.config);

      runInAction(() => {
        this.markedBooks = this.markedBooks.map((book) =>
          book.title === res.data.data.title &&
          book.author === res.data.data.author
            ? res.data.data
            : book
        );
        this.state = 'success';
      });
    } catch (error: any) {
      this.setState('error');
      toast.warn('Please log in to mark books');
    }
  }
}

export default new MarkedBooks();
