import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import { IBooksState } from '../../utils/types';
import booksService from './booksService';

const initialState: IBooksState = {
  currentBestseller: null,
  currentBestsellersList: [],
  date: null,
  dateIsChanged: true,
  isLoading: false,
};

export const getAllBestsellers = createAsyncThunk(
  '@@books/getAll',
  async (date: string, thunkAPI) => {
    try {
      return await booksService.getNYTimesBestsellers(date);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

const booksSlice = createSlice({
  name: '@@books',
  initialState,
  reducers: {
    setCurrentBestseller: (state, action: PayloadAction<number>) => {
      state.currentBestseller = state.currentBestsellersList[action.payload];
    },
    setDate: (state, action) => {
      state.date = action.payload;
      state.dateIsChanged = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBestsellers.pending, (state) => {
        state.currentBestsellersList = [];
        state.currentBestseller = null;
        state.dateIsChanged = false;
        state.isLoading = true;
      })
      .addCase(getAllBestsellers.fulfilled, (state, action) => {
        state.currentBestsellersList = action.payload;
        state.currentBestseller = action.payload[0];
        state.dateIsChanged = false;
        state.isLoading = false;
      })
      .addCase(getAllBestsellers.rejected, (state) => {
        state.currentBestsellersList = [];
        state.currentBestseller = null;
        state.isLoading = false;
        state.dateIsChanged = false;
      });
  },
});

export const { setCurrentBestseller, setDate } = booksSlice.actions;

export default booksSlice.reducer;
