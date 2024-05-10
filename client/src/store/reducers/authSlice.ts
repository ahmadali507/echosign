import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface AuthState {
  auth: any | null;
  isLoading: boolean;
  error: { message: string; code: string } | null;
}


export const signUp = createAsyncThunk<any, any>('auth/signUp', async (userCredentials) => {
  try {


  } catch (error: any) {
    throw error.message;
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
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auth = action.payload;
        localStorage.setItem('auth', JSON.stringify(action.payload));
      })
      .addCase(signUp.rejected, (state, action) => {
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
