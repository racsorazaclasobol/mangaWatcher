import { Navigate, Route, Routes } from "react-router-dom"
import { ChapterManager, MangaManager, MangaPage } from "../Pages"

export const MangaRoutes = () => {
	return (
		<>
			
			<Routes>

				<Route path="" element={ <MangaPage /> } />
				<Route path="reading/:id" element={ <MangaPage /> } />
				<Route path="/admin/managerManga/:action" element={ <MangaManager /> } />
				<Route path="/admin/managerChapter/:action" element={ <ChapterManager /> } />

				<Route path="/*" element={ <Navigate to="/" /> } />

			</Routes>

		</>
	)
}
