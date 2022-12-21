import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name: 'admin',
    initialState: { 
        isCreating: false,
        isLoading: false,
        message: '',
        newChapter: null,
        newManga: null,
        infoManga: null,
    },
    reducers: {
        onCreating: ( state, { payload } ) => {
            state.isCreating = payload;
        },
        onLoading: ( state ) => {
            state.isLoading = true;
        },
        onCreatedDone: ( state, { payload } ) => {
            state.isCreating = false;
            state.message = payload;
        },
        onSetNewChapter: ( state, action ) => {
            state.newChapter = action.payload;
        },
        setImagesNewChapter: ( state, action ) => {
            state.newChapter.paginas = [ ...action.payload ];
        },
        onSetInfoManga: ( state, { payload } ) => {
            state.infoManga = payload;
            state.isLoading = false;
        },
        onClearStore: ( state ) => {
            state.newChapter = null;
            state.message = '';
        },
    },
})

export const { 
                onCreating, 
                onLoading,
                onSetNewChapter, 
                setImagesNewChapter, 
                onCreatedDone,
                onSetInfoManga,
                onClearStore,

            } = adminSlice.actions