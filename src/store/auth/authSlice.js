import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
   name: 'auth',
   initialState: { 
        status: 'non-authenticated', //* authenticated, checking, non-authenticated
        user: {},
        errorMessage: undefined,
    },
   reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = payload;
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'non-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        onClearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    },
})

export const { onChecking, onLogin, onLogout, onClearErrorMessage } = authSlice.actions