import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SimboloCargando } from "../components";

import { useMangaStore } from "../hooks";
import { MangaLayout } from "../layout/MangaLayout";
import { ListMangaView, MangaView } from "../view";

export const MangaPage = () => {
	
	const { activeManga, isLoading, startObtenerChapterPorUID, start } = useMangaStore();

	const { id } = useParams();

	useEffect(() => {
		
		if( activeManga === null && id ){

			startObtenerChapterPorUID( id );

		}

	}, [id])


	
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
