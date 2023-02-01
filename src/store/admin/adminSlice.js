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
        listMangaTitles: []
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
        onSetMangaTitles: ( state, { payload } ) => {
            state.listMangaTitles = payload;
            state.isLoading = false;
        },
        onClearStore: ( state ) => {
            state.isCreating = false;
            state.isLoading = false;
            state.message = '';
            state.newChapter = null;
            state.newManga = null;
        },
    },
})

export const { 
                onClearStore,
                onCreatedDone,
                onCreating, 
                onLoading,
                onSetInfoManga,
                onSetMangaTitles,
                onSetNewChapter, 
                setImagesNewChapter, 

            } = adminSlice.actions