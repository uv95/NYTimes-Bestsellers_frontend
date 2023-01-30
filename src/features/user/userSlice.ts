import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';
import { extractErrorMessage } from '../../utils/errorMessage';
import { IRegister, ILogin, IUpdatedAuth, IUser } from '../../utils/types';
import { RootState } from '../../store';

const userStr = localStorage.getItem('user');
let user = null;
let token = null;
if (userStr) {
  user = JSON.parse(userStr).data.user;
  token = JSON.parse(userStr).token;
}

const initialState = {
  user: user || null,
  token: token || null,
  isLoading: false,
};

export const register = createAsyncThunk(
  '@@user/register',
  async (user: IRegister, thunkAPI) => {
    try {
      return await userService.register(user);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const login = createAsyncThunk(
  '@@user/login',
  async (user: ILogin, thunkAPI) => {
    try {
      return await userService.login(user);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const updatePassword = createAsyncThunk(
  '@auth/updatePassword',
  async (updatedData: IUpdatedAuth, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      return await userService.updatePassword(token, updatedData);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getMe = createAsyncThunk('@user/getMe', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const { token } = state.user;
    return await userService.getMe(token);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});
export const updateMe = createAsyncThunk(
  '@user/updateMe',
  async (updatedData: Partial<IUser>, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      return await userService.updateMe(token, updatedData);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const deleteAccount = createAsyncThunk(
  '@user/deleteAccount',
  async (userId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      return await userService.deleteAccount(token, userId);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.user = null;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.user = null;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload.data.user };
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.data;
      })
      .addCase(getMe.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(updateMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(updateMe.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;
