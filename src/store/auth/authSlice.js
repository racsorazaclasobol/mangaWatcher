import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
   name: 'auth',
   initialState: { counter: 10 },
   reducers: {
       increment: (state) => {
           state.counter += 1
       },
       decrement: (state) => {
           state.counter -= 1
       },
       incrementByAmount: (state, action) => {
           state.counter += action.payload
       },
    },
})

export const { increment, decrement, incrementByAmount } = authSlice.actions