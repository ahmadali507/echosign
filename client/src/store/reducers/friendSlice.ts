/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@/interfaces';
import * as api from '../api'


interface InitialState {
    isLoading: boolean;
    error: any;
    sentRequests: User[] | [];
    receivedRequests: User[] | [];
    suggestedUsers: User[] | [];
    friends: User[] | [];
    count: number;
}

export const sendFriendRequest = createAsyncThunk<any, string>('sendFriendRequest', async (receiverId) => {
    const { data } = await api.sendFriendRequest(receiverId)
    return data
})
export const rejectFriendRequest = createAsyncThunk<any, string>('rejectFriendRequest', async (receiverId) => {
    const { data } = await api.rejectFriendRequest(receiverId)
    return data
})
export const removeFriendRequest = createAsyncThunk<any, string>('removeFriendRequest', async (receiverId) => {
    const { data } = await api.removeFriendRequest(receiverId)
    return data
})
export const acceptFriendRequest = createAsyncThunk<any, string>('acceptFriendRequest', async (senderId) => {
    const { data } = await api.acceptFriendRequest(senderId)
    return data
})
export const getSuggestedUsers = createAsyncThunk<any, string>('getSuggestedUsers', async (query) => {
    const { data } = await api.getSuggestedUsers(query)
    return data
})
export const getFriends = createAsyncThunk<any, string>('getFriends', async (query) => {
    const { data } = await api.getFriends(query)
    return { result: data.result, count: data.count }
})
export const searchFriends = createAsyncThunk<any, string>('searchFriends', async (query) => {
    const { data } = await api.searchFriends(query)
    return { result: data.result, count: data.count }
})
export const searchUsers = createAsyncThunk<any, string>('searchUsers', async (query) => {
    const { data } = await api.searchUsers(query)
    return { result: data.result, count: data.count }
})
export const getSentRequests = createAsyncThunk<any, string>('getSentRequests', async (query) => {
    const { data } = await api.getSentRequests(query)
    return data
})
export const getReceivedRequests = createAsyncThunk<any, string>('getReceivedRequests', async (query) => {
    const { data } = await api.getReceivedRequests(query)
    return data
})

const initialState: InitialState = {
    isLoading: false,
    error: "",
    suggestedUsers: [],
    friends: [],
    sentRequests: [],
    receivedRequests: [],
    count: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFriends.fulfilled, (state, action) => {
                state.friends = action.payload.result;
                state.count = action.payload.count;
            })
            .addCase(getSuggestedUsers.fulfilled, (state, action) => {
                state.suggestedUsers = action.payload;
            })
            .addCase(getSentRequests.fulfilled, (state, action) => {
                state.sentRequests = action.payload;
            })
            .addCase(getReceivedRequests.fulfilled, (state, action) => {
                state.receivedRequests = action.payload;
            })
            .addCase(sendFriendRequest.fulfilled, (state, action) => {
                state.sentRequests = [...state.sentRequests, action.payload];
                state.suggestedUsers = state.suggestedUsers.filter((user) => user._id != action.payload._id);
            })
            .addCase(acceptFriendRequest.fulfilled, (state, action) => {
                state.receivedRequests = state.receivedRequests.filter((user) => user._id != action.payload._id);
                state.friends = [...state.friends, action.payload];
            })
            .addCase(removeFriendRequest.fulfilled, (state, action) => {
                state.sentRequests = state.sentRequests.filter((user) => user._id != action.payload._id); // here sender is loggedUser
            })
            .addCase(rejectFriendRequest.fulfilled, (state, action) => {
                state.receivedRequests = state.receivedRequests.filter((user) => user._id != action.payload._id);
            })
    },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.auth;
export const { resetState: resetInitialState } = userSlice.actions;