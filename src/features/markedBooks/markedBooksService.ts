import axios from 'axios';
import { BASE_URL } from '../../utils/consts';
import { IBookDetails } from '../../utils/types';

const API_URL = BASE_URL + 'marked/';

const getAllMarkedBooks = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL, config);
  return res.data;
};

const addToBookmarks = async (book: IBookDetails, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL + 'bookmarks', book, config);
  return res.data;
};

const addToFinished = async (book: IBookDetails, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL + 'finished', book, config);
  return res.data;
};

const updateMarkedBook = async (
  bookId: string,
  updatedBook: Partial<IBookDetails>,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.patch(API_URL + bookId, updatedBook, config);
  return res.data;
};

const markedBooksService = {
  getAllMarkedBooks,
  addToBookmarks,
  addToFinished,
  updateMarkedBook,
};

export default markedBooksService;
