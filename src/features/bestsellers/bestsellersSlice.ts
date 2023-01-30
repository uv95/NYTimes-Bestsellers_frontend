import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import { IBestsellersState } from '../../utils/types';
import bestsellersService from './bestsellersService';

const initialState: IBestsellersState = {
  currentBestseller: null,
  currentBestsellersList: [],
  date: null,
  isDateChanged: true,
  isLoading: false,
};

export const getAllBestsellers = createAsyncThunk(
  '@@bestsellers/getAll',
  async (date: string, thunkAPI) => {
    try {
      return await bestsellersService.getNYTimesBestsellers(date);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

const bestsellersSlice = createSlice({
  name: '@@bestsellers',
  initialState,
  reducers: {
    setCurrentBestseller: (state, action: PayloadAction<number>) => {
      state.currentBestseller = state.currentBestsellersList[action.payload];
    },
    setDate: (state, action) => {
      state.date = action.payload;
      state.isDateChanged = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBestsellers.pending, (state) => {
        state.currentBestsellersList = [];
        state.currentBestseller = null;
        state.isDateChanged = false;
        state.isLoading = true;
      })
      .addCase(getAllBestsellers.fulfilled, (state, action) => {
        state.currentBestsellersList = action.payload;
        state.currentBestseller = action.payload[0];
        state.isDateChanged = false;
        state.isLoading = false;
      })
      .addCase(getAllBestsellers.rejected, (state) => {
        state.currentBestsellersList = [];
        state.currentBestseller = null;
        state.isLoading = false;
        state.isDateChanged = false;
      });
  },
});

export const { setCurrentBestseller, setDate } = bestsellersSlice.actions;

export default bestsellersSlice.reducer;
