import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { extractErrorMessage } from '../../utils/errorMessage';
import { IBookDetails, IMarkedBooksState } from '../../utils/types';
import markedBooksService from './markedBooksService';

const initialState: IMarkedBooksState = {
  markedBooks: [],
  markedBook: null,
  isLoading: false,
  isNewBookMarked: true,
};

export const getAllMarkedBooks = createAsyncThunk(
  '@@markedBooks/getAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      return await markedBooksService.getAllMarkedBooks(token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const addToBookmarks = createAsyncThunk(
  '@@markedBooks/addToBookmarks',
  async (book: IBookDetails, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      return await markedBooksService.addToBookmarks(book, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const addToFinished = createAsyncThunk(
  '@@markedBooks/addToFinished',
  async (book: IBookDetails, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      return await markedBooksService.addToFinished(book, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const removeFromBookmarks = createAsyncThunk(
  '@@markedBooks/removeFromBookmarks',
  async (bookId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      return await markedBooksService.removeFromBookmarks(bookId, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const removeFromFinished = createAsyncThunk(
  '@@markedBooks/removeFromFinished',
  async (bookId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      return await markedBooksService.removeFromFinished(bookId, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

const markedBooksSlice = createSlice({
  name: '@@markedBooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMarkedBooks.pending, (state) => {
        state.markedBooks = [];
        state.isLoading = true;
        state.isNewBookMarked = false;
      })
      .addCase(getAllMarkedBooks.fulfilled, (state, action) => {
        state.markedBooks = action.payload.data;
        state.isLoading = false;
        state.isNewBookMarked = false;
      })
      .addCase(getAllMarkedBooks.rejected, (state) => {
        state.markedBooks = [];
        state.isLoading = false;
        state.isNewBookMarked = false;
      })
      .addCase(addToBookmarks.pending, (state) => {
        state.markedBook = null;
      })
      .addCase(addToBookmarks.fulfilled, (state, action) => {
        state.markedBook = action.payload.data;
        state.isNewBookMarked = true;
      })
      .addCase(addToBookmarks.rejected, (state) => {
        state.markedBook = null;
      })
      .addCase(addToFinished.pending, (state) => {
        state.markedBook = null;
      })
      .addCase(addToFinished.fulfilled, (state, action) => {
        state.markedBook = action.payload.data;
        state.isNewBookMarked = true;
      })
      .addCase(addToFinished.rejected, (state) => {
        state.markedBook = null;
      })
      //   .addCase(removeFromBookmarks.pending, (state) => {
      //     state.markedBook = null;
      //   })
      .addCase(removeFromBookmarks.fulfilled, (state, action) => {
        state.markedBook = action.payload.data;
      })
      //   .addCase(removeFromBookmarks.rejected, (state) => {
      //     state.markedBook = null;
      //   })
      //   .addCase(removeFromFinished.pending, (state) => {
      //     state.markedBook = null;
      //   })
      .addCase(removeFromFinished.fulfilled, (state, action) => {
        state.markedBook = action.payload.data;
      });
    //   .addCase(removeFromFinished.rejected, (state) => {
    //     state.markedBook = null;
    //   });
  },
});

//SELECTORS

export const selectBookmarkedBooks = createSelector(
  (state: RootState) => state.markedBooks,
  (markedBooks) =>
    markedBooks.markedBooks.filter((book: IBookDetails) => book.isBookmarked)
);
export const selectFinishedBooks = createSelector(
  (state: RootState) => state.markedBooks,
  (markedBooks) =>
    markedBooks.markedBooks.filter((book: IBookDetails) => book.isFinished)
);

export default markedBooksSlice.reducer;
