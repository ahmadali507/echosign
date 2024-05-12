import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@/interfaces';
import * as api from '../api'
import toast from 'react-hot-toast';
import Cookie from 'js-cookie'


interface AuthState {
  auth: User | null;
  isLoading: boolean;
  error: { message: string; code: string } | null;
}

export const register = createAsyncThunk<User, User>('auth/register', async (userCredentials) => {
  try {
    const { data } = await api.register(userCredentials);
    toast.success(data?.message)
    Cookie.set('echo.token', JSON.stringify(data.token))
    return data.result as User;
  } catch (error) {
    toast.error('Something went wrong!')
    throw error as string;
  }
});

export const login = createAsyncThunk<User, { username: string; password: string }>('auth/login', async (userCredentials) => {
  try {
    const { data } = await api.login(userCredentials);
    toast.success(data?.message)
    Cookie.set('echo.token', JSON.stringify(data.token))
    return data.result as User;
  } catch (error) {
    toast.error('Something went wrong!')
    throw error as string;
  }
});

const initialState: AuthState = {
  auth: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auth = action.payload;
        localStorage.setItem('auth', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { message: action.error.message || '', code: action.error.code || '' };
      })
      .addCase(authActions.resetState, () => {
        return initialState;
      });
  },
});

export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth.auth;
export const { actions: authActions } = authSlice;
