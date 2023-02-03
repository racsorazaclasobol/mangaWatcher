import { Divider, Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

export const Footer = () => {
	return (
		<>
			<Grid container mt={ 0 } justifyContent='center' height={100} sx={{ backgroundColor:'black' }} >
				<Grid item xs={ 12 } sm={ 10 }  alignItems='center' alignContent='center' container >

					<img src="https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_150/v1671651562/MyManga/Logo/Logo_ByN_zyzvr6.png" height="60" />
					<Divider orientation="vertical" sx={{ backgroundColor:`${ grey[700] }`, height: '60%', marginLeft:'20px' }} flexItem />
					<Typography color={ grey[200] } ml={ 3 } mt={ 2 }>Entretenimiento para amantes del Manga.</Typography>

				</Grid>
			</Grid>		
		</>
	)
}
