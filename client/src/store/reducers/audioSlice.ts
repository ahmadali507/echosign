/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AudioInputToAPI } from '@/interfaces';
// import * as api from '../api'

interface AudioState {
    audio: string;
    isLoading: boolean;
    error: { message: string; code: string } | null;
}

export const textToVoice = createAsyncThunk<any, { voiceId: string, input: AudioInputToAPI }>('audio/textToVoice', async ({ voiceId, input }) => {
    try {

        // const { data } = await api.textToVoice(voiceId, input);
        // console.log('data', data)
        const options = {
            method: 'POST',
            headers: {
              'xi-api-key': '73c5188af912bc39d0473fb0fdcb36f2',
              'Content-Type': 'application/json'
            },
            body: '{"text":"Lorem ipsum dolar emit Lorem ipsum dolar emit Lorem ipsum dolar emit Lorem ipsum dolar emit Lorem ipsum dolar emit Lorem ipsum dolar emit "}'
          };
          
          fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream?optimize_streaming_latency=1&output_format=mp3_22050_32', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        return ''
    } catch (error) {
        throw error as string;
    }
});

const initialState: AudioState = {
    audio: '',
    isLoading: false,
    error: null,
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(textToVoice.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(textToVoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.audio = action.payload;
            })
            .addCase(textToVoice.rejected, (state, action) => {
                state.isLoading = false;
                state.error = { message: action.error.message || '', code: action.error.code || '' };
            })
            .addCase(audioActions.resetState, () => {
                return initialState;
            });
    },
});

export default audioSlice.reducer;
export const selectAudio = (state: RootState) => state.audio;
export const { actions: audioActions } = audioSlice;
