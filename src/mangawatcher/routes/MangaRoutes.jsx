import { Navigate, Route, Routes } from "react-router-dom"
import { MangaPage } from "../Pages"

export const MangaRoutes = () => {
	return (
		<>
			
			<Routes>

				<Route path="home" element={ <MangaPage /> } />
				<Route path="reading/:id" element={ <MangaPage /> } />

				<Route path="/*" element={ <Navigate to="/home" /> } />

			</Routes>

		</>
	)
}
