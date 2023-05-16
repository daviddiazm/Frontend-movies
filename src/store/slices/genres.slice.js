import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { genericRequestThunk } from './app.slice';

export const genresSlice = createSlice({
    name: 'genres',
    initialState: [],
    reducers: {
        setGenres: (_, action) => action.payload,
        addGenre: (state, { payload }) => { state.push(payload) },
        deleteGenre: (state, { payload }) =>
            state.filter(genre => genre.id !== payload),
        updateGenre: (state, { payload: { id, genre } }) => {
            const index = state.findIndex(genre => genre.id === id);
            state[index] = genre;
        }
    }
})

export const getGenresThunk = () => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.get('/genres');
        dispatch(setGenres(res.data));
    }))
}

export const addGenreThunk = (name) => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.post('/genres', {name});
        dispatch(addGenre(res.data));
    }))
}

export const deleteGenreThunk = id => dispatch => {
    dispatch(genericRequestThunk(async () => {
        await axios.delete(`/genres/${id}`)
        dispatch(deleteGenre(id))
    }))
}

export const updateGenreThunk = (id, name) => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.put(`/genres/${id}`, {name})
        dispatch(updateGenre({id, genre: res.data}));
    }))
}

export const { setGenres, addGenre, deleteGenre, updateGenre } = genresSlice.actions;

export default genresSlice.reducer;
