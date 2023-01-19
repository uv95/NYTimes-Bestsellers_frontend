import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import { IBooksState } from '../../utils/types';
import booksService from './booksService';

const initialState: IBooksState = {
  currentBestseller: null,
  currentBestsellersList: [],
  isLoading: false,
};

export const getAllBestsellers = createAsyncThunk(
  '@@books/getAll',
  async (_, thunkAPI) => {
    try {
      return await booksService.getNYTimesBestsellers();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

const booksSlice = createSlice({
  name: '@@books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBestsellers.pending, (state) => {
        state.currentBestsellersList = [];
        state.currentBestseller = null;
        state.isLoading = true;
      })
      .addCase(getAllBestsellers.fulfilled, (state, action) => {
        state.currentBestsellersList = action.payload;
        state.currentBestseller = action.payload[0];
        state.isLoading = false;
      })
      .addCase(getAllBestsellers.rejected, (state) => {
        state.currentBestsellersList = [];
        state.currentBestseller = null;
        state.isLoading = false;
      });
  },
});

export default booksSlice.reducer;
