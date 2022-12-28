import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SimboloCargando } from "../components";

import { useMangaStore } from "../hooks";
import { MangaLayout } from "../layout/MangaLayout";
import { ListMangaView, MangaView } from "../view";

export const MangaPage = () => {
	
	const { activeManga, isLoading, startObtenerUltimoCap } = useMangaStore();
	
	const { id, chapter, ...rest } = useParams();

	useEffect(() => {
		
		if( !id || activeManga || isLoading ) return;

		startObtenerUltimoCap( id );

	}, [id])


	
	return (
		<>
			<MangaLayout>

				{
					( isLoading )
					? (<SimboloCargando />)
					: (<></>)
				}

				<Grid container >
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
