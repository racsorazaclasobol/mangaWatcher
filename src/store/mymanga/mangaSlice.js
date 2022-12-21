import { createSlice } from '@reduxjs/toolkit'

export const mangaSlice = createSlice({
   name: 'manga',
   initialState: { 
        isLoading: false,
        messageOpen: '',
        mangas: [],
        activeManga: null
    },
   reducers: {

        onLoading: ( state ) => {
            state.isLoading = true;
        },
        onLoadMangas: ( state, action ) => {
            state.mangas = action.payload;
            state.isLoading = false;
        },
        setActiveManga: ( state, { payload } ) => {
            state.activeManga = payload ;
            state.isLoading = false;
        },
        clearActiveManga: (state) => {
            state.activeManga = null;
        }
    },
})

export const { onLoading, onLoadMangas, setActiveManga, clearActiveManga } = mangaSlice.actions