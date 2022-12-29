import { createSlice } from '@reduxjs/toolkit'

export const mangaSlice = createSlice({
   name: 'manga',
   initialState: { 
        isLoading: false,
        messageOpen: '',
        mangas: [],
        activeManga: null,
        listaCaps: [],
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
        },
        onSetTitleActiveManga: ( state, { payload } ) => { 
            state.activeManga = { ...state.activeManga, tituloManga: payload }
        },
        clearActiveManga: (state) => {
            state.activeManga = null;
            state.isLoading = false;
        },
        onSetListaCaps: ( state, { payload } ) => {
            state.activeManga = { ...state.activeManga, listaCaps: payload }
            state.isLoading = false;
        }
    },
})

export const { 
                onLoading, 
                onLoadMangas, 
                setActiveManga, 
                clearActiveManga, 
                onSetListaCaps,
                onSetTitleActiveManga,
            
            
            } = mangaSlice.actions