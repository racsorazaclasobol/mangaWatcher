import { Grid } from '@mui/material'
import { MangaTitleItem } from '../components'

export const ListMangaView = () => {

	return (
		<>
			<Grid container spacing={ 0 } sx={{ minHeight: '100vh', p: 2, pt:5 }} >

				<Grid container justifyContent="center" spacing={ 2 }>

					<MangaTitleItem />

				</Grid>

			</Grid>
		</>
	)
}
