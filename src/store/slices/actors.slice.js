import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { genericRequestThunk } from './app.slice';

export const actorsSlice = createSlice({
    name: 'actors',
    initialState: [],
    reducers: {
        setActors: (_, action) => action.payload,
        addActor: (state, { payload }) => { state.push(payload) },
        deleteActor: (state, { payload }) =>
            state.filter(actor => actor.id !== payload),
        updateActor: (state, { payload: { id, actor } }) => {
            const index = state.findIndex(actor => actor.id === id);
            state[index] = actor;
        }
    }
})

export const getActorsThunk = () => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.get('/actors')
        dispatch(setActors(res.data));
    }));
}

export const addActorThunk = actor => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.post('/actors', actor);
        dispatch(addActor(res.data));
    }, "Actor added successfully"))
}

export const deleteActorThunk = id => dispatch => {
    dispatch(genericRequestThunk(async () => {
        await axios.delete(`/actors/${id}`)
        dispatch(deleteActor(id));
    }, "Actor deleted successfully"))
}

export const updateActorThunk = (id, actorParams) => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const {data: actor} = await axios.put(`/actors/${id}`, actorParams)
        dispatch(updateActor({id, actor}))
    }, "Actor updated succesfully"));
}


export const { setActors, addActor, deleteActor, updateActor } = actorsSlice.actions;

export default actorsSlice.reducer;
