import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { genericRequestThunk } from './app.slice';

const VITE_API_URL='https://movies-list-web.onrender.com';


export const moviesSlice = createSlice({
    name: 'movie',
    initialState: [],
    reducers: {
        setMovie: (_, action) => action.payload,
        addMovie: (state, { payload }) => { state.push(payload) },
        deleteMovie: (state, { payload }) =>
            state.filter(movie => movie.id !== payload),
        updateMovie: (state, { payload: { id, movie } }) => {
            const index = state.findIndex(movie => movie.id === id);
            console.log(movie);
            state[index] = movie;
        }
    }
})

export const getMoviesThunk = () => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.get(VITE_API_URL+'/movies')
        dispatch(setMovie(res.data));
    }));
}

export const addMovieThunk = movie => dispatch => {
    return dispatch(genericRequestThunk(async () => {
        const { data } = await axios.post(VITE_API_URL+'/movies', movie);
        const { data: genres } = await axios.post(VITE_API_URL+`/movies/${data.id}/genres`, movie.genres);
        const { data: directors } = await axios.post(VITE_API_URL+`/movies/${data.id}/directors`, movie.directors);
        const { data: actors } = await axios.post(VITE_API_URL+`/movies/${data.id}/actors`, movie.actors);
        dispatch(addMovie({...data, genres, directors, actors}));
    }, "Movie added successfully"))
}

export const deleteMovieThunk = id => dispatch => {
    dispatch(genericRequestThunk(async () => {
        await axios.delete(VITE_API_URL+`/movies/${id}`)
        dispatch(deleteMovie(id));
    }, "Movie deleted successfully"))
}

export const updateMovieThunk = (id, movie) => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const {data: movieRes} = await axios.put(VITE_API_URL+`/movies/${id}`, movie)
        const { data: genres } = await axios.post(VITE_API_URL+`/movies/${id}/genres`, movie.genres);
        const { data: directors } = await axios.post(VITE_API_URL+`/movies/${id}/directors`, movie.directors);
        const { data: actors } = await axios.post(VITE_API_URL+`/movies/${id}/actors`, movie.actors);
        dispatch(updateMovie({id, movie: {...movieRes, genres, directors, actors}}));
    }, "Movie updated succesfully"));
}


export const { setMovie, addMovie, deleteMovie, updateMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
