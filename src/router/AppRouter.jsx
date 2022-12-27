import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth/Pages";
import { SimboloCargando } from "../mangawatcher/components";
import { useMangaStore, useAuthStrore } from "../mangawatcher/hooks";
import { AdminPage, MangaPage } from "../mangawatcher/Pages";

export const AppRouter = () => {

	const { startObtenerTitulosMangas } = useMangaStore();
	const { status, startCheckingAuth } = useAuthStrore();

	useEffect(() => {
		startObtenerTitulosMangas();
	}, []);

	useEffect( () => {
		startCheckingAuth();
	}, [] );

	if( status === 'checking' ){
		return ( <SimboloCargando />)
	}

	console.log(status)

	return (	
		<>

			<Routes>
				
				{
					( status === "authenticated" )
					? <Route path="/admin" element={ <AdminPage /> } /> //Ruta Privada
					: <Route path="/admin" element={ <LoginPage /> } /> //Ruta Publica
				}

				<Route path="/*" element={ <MangaPage /> }/>

			</Routes>
		</>
	)
}
