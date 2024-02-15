import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const { data } = await axios.get('/tasks');
    return data;
})

export const fetchAddTask = createAsyncThunk('tasks/fetchAddTask', async (params) => {
    const { data } = await axios.post('/tasks', params);
    return data;
});

export const fetchDeleteTask = createAsyncThunk('tasks/fetchDelete', async (id) => {
    const { data } = await axios.delete(`/tasks/${id}`);
    return data;
});

export const fetchEditTask = createAsyncThunk('tasks/fetchEdit', async (params) => {
    const { data } = await axios.patch(`/tasks/${params.id}`, params.params);
    return data;
});

export const fetchToggleCompleteTask = createAsyncThunk('tasks/fetchToggleComplete', async (params) => {
    const { data } = await axios.patch(`/tasks/complete/${params.id}`);
    return data;
});

const initialState = {
    tasks: {
        items: [],
        status: 'loading'
    },
}

const tasksSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {}
})

export const tasksReducer = tasksSlice.reducer;