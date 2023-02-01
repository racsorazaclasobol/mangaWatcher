import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth/Pages";
import { SimboloCargando } from "../mangawatcher/components";
import { useMangaStore, useAuthStrore } from "../mangawatcher/hooks";
import { AdminMenu, AdminPage } from "../mangawatcher/Pages";
import { MangaRoutes } from "../mangawatcher/routes/MangaRoutes";

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

	return (	
		<>

			<Routes>
				
				{
					( status === "authenticated" )
					? <Route path="/admin" element={ <AdminMenu /> } /> //Ruta Privada
					: <Route path="/admin" element={ <LoginPage /> } />
				}

				<Route path="/*" element={ <MangaRoutes /> }/> 

			</Routes>
		</>
	)
}
