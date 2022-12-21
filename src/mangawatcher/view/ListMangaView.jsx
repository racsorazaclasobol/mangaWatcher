import { Grid, Typography } from '@mui/material'
import { MangaTitleItem } from '../components/MangaTitleItem'
import { useUIStore } from '../hooks';

export const ListMangaView = () => {

	const { styleMode } = useUIStore();


	return (
		<>
			<Grid container spacing={ 0 } sx={{ minHeight: '100vh', backgroundColor: `${ styleMode }.secondary`, p: 2, pt:5 }} >

				<Grid container justifyContent="center" spacing={ 2 }>

					<MangaTitleItem />

				</Grid>

			</Grid>
		</>
	)
}
