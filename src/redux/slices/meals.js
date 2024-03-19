import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async () => {
    const { data } = await axios.get('/meals');
    return data;
})

export const fetchOneMeals = createAsyncThunk('meals/fetchOneMeals', async (id) => {
    const { data } = await axios.get(`/meals/${id}`);
    return data;
})

export const fetchAddMeals = createAsyncThunk('meals/fetchAddMeals', async (params) => {
    const { data } = await axios.post('/meals', params);
    return data;
});

export const fetchDeleteMeals = createAsyncThunk('meals/fetchDeleteMeals', async (id) => {
    const { data } = await axios.delete(`/meals/${id}`);
    return data;
});

export const fetchEditMeals = createAsyncThunk('meals/fetchEditMeals', async (params) => {
    const { data } = await axios.patch(`/meals/${params.id}`, params.params);
    return data;
});

const initialState = {
    meals: {
        items: [],
        status: 'loading'
    },
}

const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducer: {}
})

export const mealsReducer = mealsSlice.reducer;