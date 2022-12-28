import { Navigate, Route, Routes } from "react-router-dom"
import { MangaPage } from "../Pages"


export const MangaRoutes = () => {
	return (
		<>
			
			<Routes>

				<Route path="home" element={ <MangaPage /> } />
				<Route path="manga/:id" element={ <MangaPage /> } />
				<Route path="manga/:id/:chapter" element={ <MangaPage /> } />

				<Route path="/" element={ <Navigate to="/home" /> } />

			</Routes>

		</>
	)
}
