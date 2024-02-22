import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchStats = createAsyncThunk('stats/fetchStats', async () => {
    const { data } = await axios.get('/stats');
    return data;
})

export const fetchAddStats = createAsyncThunk('stats/fetchAddStats', async (params) => {
    const { data } = await axios.post('/stats', params);
    return data;
});

export const fetchDeleteStats = createAsyncThunk('stats/fetchDeleteStats', async (id) => {
    const { data } = await axios.delete(`/stats/${id}`);
    return data;
});

export const fetchEditStats = createAsyncThunk('stats/fetchEditStats', async (params) => {
    const { data } = await axios.patch(`/stats/${params.id}`, params.params);
    return data;
});

const initialState = {
    stats: {
        items: [],
        status: 'loading'
    },
}

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducer: {}
})

export const statsReducer = statsSlice.reducer;