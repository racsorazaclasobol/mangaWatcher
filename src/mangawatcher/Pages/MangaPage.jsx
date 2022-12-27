import { Grid } from "@mui/material";

import { useMangaStore } from "../hooks";
import { MangaLayout } from "../layout/MangaLayout";
import { ListMangaView, MangaView } from "../view";

export const MangaPage = () => {
	
	const { activeManga } = useMangaStore();

	return (
		<>
			<MangaLayout>
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
