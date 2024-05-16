import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@/interfaces';
import * as api from '../api'
import toast from 'react-hot-toast';


interface UserState {
    currentUser: User | null;
    loggedUser: User | null;
    users: User[];
    allUsers: User[];
    isLoading: boolean;
    error: { message: string; code: string } | null;
}
export const getProfile = createAsyncThunk<User>('auth/getProfile', async () => {
    try {
        const { data } = await api.getProfile();
        return data?.result as User;
    } catch (error) {
        throw error as string;
    }
});
export const getUsers = createAsyncThunk<User[]>('user/getUsers', async () => {
    try {
        const { data } = await api.getUsers();
        return data?.result as User[];
    } catch (error) {
        throw error as string;
    }
});

export const getUser = createAsyncThunk<User, string>('user/getUser', async (userId) => {
    try {
        const { data } = await api.getUser(userId);
        return data as User;
    } catch (error) {
        throw error as string;
    }
});

export const updateProfile = createAsyncThunk<User, { userId: string, data: { firstName: string, lastName: string, bio: string } }>('user/updateProfile', async ({ userId, data: input }) => {
    try {
        const { data } = await api.updateUser(userId, input);
        return data as User;
    } catch (error) {
        throw error as string;
    }
});
export const updatePassword = createAsyncThunk<null, { oldPassword: string, newPassword: string }>('auth/updateProfile', async (formData) => {
    try {
        const { data } = await api.updatePassword(formData);
        toast.success(data?.message)
        return null
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});
export const uploadImage = createAsyncThunk<User, FormData>('auth/updateProfile', async (formData) => {
    try {
        const { data } = await api.uploadImage(formData);
        toast.success(data?.message)
        return data?.result as User
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});
const initialState: UserState = { currentUser: null, loggedUser: null, users: [], allUsers: [], isLoading: false, error: null, };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: () => initialState,
        setUserSlice: (state, action) => { state.loggedUser = action.payload },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loggedUser = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = { message: action.error.message || '', code: action.error.code || '' };
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = { message: action.error.message || '', code: action.error.code || '' };
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = { message: action.error.message || '', code: action.error.code || '' };
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loggedUser = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = { message: action.error.message || '', code: action.error.code || '' };
            })
    },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.auth;
export const { resetState: resetUserState, setUserSlice } = userSlice.actions;
