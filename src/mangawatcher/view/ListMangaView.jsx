import { Grid } from '@mui/material'
import { MangaTitleItem } from '../components'

export const ListMangaView = () => {

	return (
		<>
			<Grid container spacing={ 0 } justifyContent="center" sx={{ minHeight: 'calc(100vh - 230px )', p: 2, pt:5 }} >

				<MangaTitleItem />

			</Grid>
		</>
	)
}
