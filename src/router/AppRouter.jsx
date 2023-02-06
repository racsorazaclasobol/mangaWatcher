import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth/Pages";
import { SimboloCargando } from "../mangawatcher/components";
import { useMangaStore, useAuthStrore } from "../mangawatcher/hooks";
import { AdminMenu } from '../mangawatcher/Pages/Admin/AdminMenu'
import { MangaRoutes } from "../mangawatcher/routes/MangaRoutes";

export const AppRouter = () => {

	const { startObtenerTitulosMangas } = useMangaStore();
	const { status, startCheckAuthToken } = useAuthStrore();

	useEffect(() => {
		startObtenerTitulosMangas();
	}, []);

	useEffect( () => {
		startCheckAuthToken();
	}, [] );

	if( status === 'checking' ){
		return ( <SimboloCargando />)
	}

	return (	
		<>

			<Routes>
				
				{
					( status === "non-authenticated" )
					? <Route path="/admin/*" element={ <LoginPage /> } />
					: <Route path="/admin" element={ <AdminMenu /> } /> 
				}

				<Route path="/*" element={ <MangaRoutes /> }/> 

			</Routes>
		</>
	)
}
