import { Grid } from "@mui/material";

import { useMangaStore } from "../hooks";
import { MangaLayout } from "../layout/MangaLayout";
import { ListMangaView } from "../view/ListMangaView";
import { MangaView } from "../view/MangaView";

export const MangaPage = () => {
	
	const { activeManga } = useMangaStore();

	return (
		<>
			<MangaLayout>
				<Grid container>
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
