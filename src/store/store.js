import { configureStore } from '@reduxjs/toolkit'
import { adminSlice } from './admin/adminSlice'
import { mangaSlice } from './mymanga'
import { uiSlice } from './ui/uiSlice'

export const store = configureStore({
	reducer: {
		manga: mangaSlice.reducer,
		admin: adminSlice.reducer,
		ui: uiSlice.reducer,
	},
})