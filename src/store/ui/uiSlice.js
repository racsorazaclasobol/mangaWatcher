import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
	name: 'ui',
	initialState: 
	{ 
		counter: 0,
		isOpenModal: false,
		isOpenChapterModal: false,
		visualizador: null,
		styleMode: 'white'
	},
	reducers: {
		/* COUNTER */
		onIncrement: ( state ) => {
			state.counter += 1
		},
		onDecrement: ( state ) => {
			state.counter -= 1
		},
		onIncrementByAmount: ( state, { payload } ) => {
			state.counter += payload
		},
		onResetCounter: ( state ) => {
			state.counter = 0;
		},

		/* MODAL */
		onOpenModal: ( state ) => {
			state.isOpenModal = true;
		},
		onCloseModal: ( state ) => {
			state.isOpenModal = false;
		},
		onOpenChapterModal: ( state ) => {
			state.isOpenChapterModal = true;
		},
		onCloseChapterModal: ( state ) => {
			state.isOpenChapterModal = false;
		},
		onSetVisualizador: ( state, { payload } ) => {
			state.visualizador = payload;
		},

		/* ESTILO */
		onChangeStyle: ( state, { payload } ) => {
			state.styleMode = payload;
		}

		
	},
})

export const { 
				/* GLOBAL */

				/* COUNTER */
				onIncrement, 
				onDecrement, 
				onIncrementByAmount, 
				onResetCounter,

				/* MODAL */
				onOpenModal,
				onCloseModal,
				onSetVisualizador,
				onOpenChapterModal,
				onCloseChapterModal,

				/* ESTILO */
				onChangeStyle,


			} = uiSlice.actions