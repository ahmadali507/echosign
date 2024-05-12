import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ContactData, User } from '@/interfaces';
import * as api from '../api'
import toast from 'react-hot-toast';
import Cookie from 'js-cookie'


interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: { message: string; code: string } | null;
}

export const register = createAsyncThunk<User, User>('auth/register', async (userCredentials) => {
  try {
    const { data } = await api.register(userCredentials);
    toast.success(data?.message)
    Cookie.set('echo.token', JSON.stringify(data?.token))
    return data?.result as User;
  } catch (error) {
    toast.error('Something went wrong!')
    throw error as string;
  }
});

export const login = createAsyncThunk<User, { usernameOrEmail: string; password: string }>('auth/login', async (userCredentials) => {
  try {
    const { data } = await api.login(userCredentials);
    toast.success(data?.message)
    Cookie.set('echo.token', JSON.stringify(data?.token))
    return data?.result as User;
  } catch (error) {
    toast.error('Something went wrong!')
    throw error as string;
  }
});

export const getProfile = createAsyncThunk<User>('auth/login', async () => {
  try {
    const { data } = await api.getProfile();
    return data?.result as User;
  } catch (error) {
    throw error as string;
  }
});
export const subscribe = createAsyncThunk<null, string>('auth/subscribe', async (email) => {
  try {
    const { data } = await api.subscribe(email);
    toast.success(data?.message)
    return null
  } catch (error) {
    toast.error('Something went wrong!')
    throw error as string;
  }
});
export const contact = createAsyncThunk<null, ContactData>('auth/subscribe', async (formData) => {
  try {
    const { data } = await api.contact(formData);
    toast.success(data?.message)
    return null
  } catch (error) {
    toast.error('Something went wrong!')
    throw error as string;
  }
});

const initialState: AuthState = { user: null, isLoading: false, error: null, };

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
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { message: action.error.message || '', code: action.error.code || '' };
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { message: action.error.message || '', code: action.error.code || '' };
      })
  },
});

export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth.user;
export const { resetState: resetAuthState } = authSlice.actions;
