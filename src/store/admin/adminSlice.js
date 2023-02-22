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
        listMangaTitles: [],
        listChaptersTitles: [],
        errorMessage: undefined,
    },
    reducers: {
        onCreating: ( state, { payload } ) => {
            state.isCreating = payload;
        },
        onLoading: ( state ) => {
            state.isLoading = true;
        },
        onSetErrorMessage: ( state, { payload } ) => {
            state.errorMessage = payload;
            state.isLoading = false;
        },
        onCreatedDone: ( state, { payload } ) => {
            state.isLoading = false;
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
        onSetChapetrsTitles: ( state, { payload } ) => {
            state.listChaptersTitles = payload;
            state.isLoading = false;
        },
        onClearStore: ( state ) => {
            state.isCreating = false;
            state.isLoading = false;
            state.message = '';
            state.errorMessage = undefined;
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
                onSetChapetrsTitles,
                onSetInfoManga,
                onSetMangaTitles,
                onSetNewChapter, 
                setImagesNewChapter,
                onSetErrorMessage,

            } = adminSlice.actions