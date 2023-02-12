import { Navigate, Route, Routes } from "react-router-dom"
import { ChapterManager, DonatePage, MangaManager, MangaPage } from "../Pages"

export const MangaRoutes = () => {
	return (
		<>
			
			<Routes>

				<Route path="/home" element={ <MangaPage /> } />
				<Route path="/donate" element={ <DonatePage /> } />
				<Route path="reading/:id" element={ <MangaPage /> } />
				<Route path="/admin/managerManga/:action" element={ <MangaManager /> } />
				<Route path="/admin/managerChapter/:action" element={ <ChapterManager /> } />

				<Route path="/*" element={ <Navigate to="/home" /> } />

			</Routes>

		</>
	)
}
