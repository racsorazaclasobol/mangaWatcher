import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SimboloCargando } from "../components";

import { useMangaStore } from "../hooks";
import { MangaLayout } from "../layout/MangaLayout";
import { ListMangaView, MangaView } from "../view";

export const MangaPage = () => {
	
	const { activeManga, isLoading, startObtenerUltimoCap, startObtenerPorCapitulo } = useMangaStore();
	
	const { id, chapter, ...rest } = useParams();

	useEffect(() => {

		if( !id || isLoading ) return;
		
		if( chapter ) {

			startObtenerPorCapitulo( id, chapter );
			return;
		}

		startObtenerUltimoCap( id );

	}, [id, chapter])


	
	return (
		<>
			<MangaLayout>

				{
					( isLoading )
					? (<SimboloCargando />)
					: (<></>)
				}

				<Grid container pb={ 5 }>
					{
						( activeManga )
						? ( <MangaView /> )
						: ( <ListMangaView /> )
					}
				</Grid>

			</MangaLayout>
				
		</>
	);
};
