import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@/interfaces';
import * as api from '../api'


interface AuthState {
  auth: User | null;
  isLoading: boolean;
  error: { message: string; code: string } | null;
}

export const register = createAsyncThunk<User, User>('auth/register', async (userCredentials) => {
  try {
    const { data } = await api.register(userCredentials);
    return data.result as User;
  } catch (error) {
    throw error as string;
  }
});

export const verifyRegistrationEmail = createAsyncThunk<void, { email: string, otp: string }>('auth/verifyRegistrationEmail', async (email) => {
  try {
    const { data } = await api.verifyOTP(email);
    

  } catch (error) {
    throw error as string;
  }
});

export const login = createAsyncThunk<User, { username: string; password: string }>('auth/login', async (userCredentials) => {
  try {
    const response = await api.login(userCredentials);
    return response.data as User;
  } catch (error) {
    throw error as string;
  }
});

export const sendOTP = createAsyncThunk<void, string>('auth/sendOTP', async (email) => {
  try {
    await api.sendOTP(email);
  } catch (error) {
    throw error as string;
  }
});

export const verifyOTP = createAsyncThunk<void, { email: string, otp: string }>('auth/verifyOTP', async ({ email, otp }) => {
  try {
    await api.verifyOTP({ email, otp });
  } catch (error) {
    throw error as string;
  }
});

export const setNewPassword = createAsyncThunk<void, { email: string, password: string }>('auth/setNewPassword', async ({ email, password }) => {
  try {
    await api.setNewPassword({ email, password });
  } catch (error) {
    throw error as string;
  }
});

export const changePassword = createAsyncThunk<void, { oldPassword: string, newPassword: string }>('auth/changePassword', async ({ oldPassword, newPassword }) => {
  try {
    await api.changePassword({ oldPassword, newPassword });
  } catch (error) {
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
