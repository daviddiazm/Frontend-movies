import { configureStore } from '@reduxjs/toolkit'
import actorsSlice from './slices/actors.slice'
import appSlice from './slices/app.slice'
import directorsSlice from './slices/directors.slice'
import genresSlice from './slices/genres.slice'
import moviesSlice from './slices/movies.slice'

export default configureStore({
    reducer: {
        app: appSlice,
        movies: moviesSlice,
        genres: genresSlice,
        actors: actorsSlice,
        directors: directorsSlice
    }
})
