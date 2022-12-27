import { configureStore } from '@reduxjs/toolkit'
import { adminSlice } from './admin/adminSlice'
import { authSlice } from './auth/authSlice'
import { mangaSlice } from './mymanga/mangaSlice'
import { uiSlice } from './ui/uiSlice'

export const store = configureStore({
	reducer: {
		manga: mangaSlice.reducer,
		admin: adminSlice.reducer,
		ui: uiSlice.reducer,
		auth: authSlice.reducer,
	},
})