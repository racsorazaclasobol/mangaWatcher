import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth/Pages";
import { useMangaStore } from "../mangawatcher/hooks";
import { AdminPage, MangaPage } from "../mangawatcher/Pages";

export const AppRouter = () => {

	const { startObtenerTitulosMangas } = useMangaStore();

	const authState = "authenticated"; //Todo store.auth

	useEffect(() => {
		startObtenerTitulosMangas();
	}, [])

	if( authState === "authenticated"){

		//dispatch( startNewChapter() );

	}

	return (
		<>
			<Routes>
				
				{
					( authState === "authenticated" )
					? <Route path="/admin" element={ <AdminPage /> } /> //Ruta Privada
					: <Route path="/admin" element={ <LoginPage /> } /> //Ruta Publica
				}

				<Route path="/*" element={ <MangaPage /> }/>

			</Routes>
		</>
	)
}
