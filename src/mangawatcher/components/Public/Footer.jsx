import { Divider, Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

export const Footer = () => {
	return (
		<>
			<Grid container direction='column' maxHeight={150} pt={ 1 } pb={ 1 } sx={{ backgroundColor:'black' }} >
				<Grid item xs={ 3 } textAlign='center'>
					<img src="https://res.cloudinary.com/dmuswnvaf/image/upload/v1676220153/MyManga/Logo/Logo_Blanco_y_negro_hszouz.webp" height="60" />
				</Grid>
				<Grid item xs={ 9 } textAlign='center' >
					<Typography color={ grey[200] } ml={ 3 } mt={ 2 }>Entretenimiento para amantes del Manga.</Typography>
				</Grid>
			</Grid>		
		</>
	)
}
