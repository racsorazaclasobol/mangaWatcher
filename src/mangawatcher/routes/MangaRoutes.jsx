import { Navigate, Route, Routes } from "react-router-dom"
import { AdminPage, MangaManager, MangaPage } from "../Pages"

export const MangaRoutes = () => {
	return (
		<>
			
			<Routes>

				<Route path="home" element={ <MangaPage /> } />
				<Route path="reading/:id" element={ <MangaPage /> } />
				<Route path="/admin/managerManga/:action" element={ <MangaManager /> } />

				<Route path="/*" element={ <Navigate to="/home" /> } />

			</Routes>

		</>
	)
}
