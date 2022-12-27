import { Box, Grid } from '@mui/material'
import { useUIStore, useMangaStore } from '../hooks';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import SwipeIcon from '@mui/icons-material/Swipe';
import SwipeVerticalIcon from '@mui/icons-material/SwipeVertical';

export const NavBar = () => {

	const { styleMode, localVisualizador, visualizador, changeStyleMode, setVisualizadorManga, closeModal } = useUIStore();
	const { activeManga, startLimpiarMangaActivo } = useMangaStore();

	const onChangeStyleMode = () => {
		
		const newMode = ( styleMode === 'dark' ) ? 'white' : 'dark';
 		changeStyleMode( newMode );
	}

	const onSetVisualizador = ( opcion ) => {
        setVisualizadorManga( opcion );
        closeModal();
    }	

  return (

		<Grid container justifyContent='center' height={130} sx={{ backgroundColor:`${ styleMode }.primary` }} className='box-shadow' >
			<Grid item xs={ 12 } sm={ 10 } justifyContent='space-between' alignItems='center' container >

				<Grid item onClick={ startLimpiarMangaActivo } className='pointer' >
					{
						( styleMode === 'dark' )
						? ( <Box>
								<Box sx={{ display: { xs: 'block', sm: 'none' } }} >
									<img src="https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_80/v1670807848/MyManga/Logo/Logo_Peque%C3%B1o_yrfjbi.png" /> 
								</Box>
								<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
									<img src="https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_100/v1670807848/MyManga/Logo/Logo_Peque%C3%B1o_yrfjbi.png" /> 
								</Box>
							</Box>
						  )
						
						: ( 
							<Box>
								<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
									<img src='https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_80/v1670807816/MyManga/Logo/White_Mode_Logo_Peque%C3%B1o_jwwxou.png'/> 
								</Box>
								<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
									<img src='https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_100/v1670807816/MyManga/Logo/White_Mode_Logo_Peque%C3%B1o_jwwxou.png'/> 
								</Box>
							</Box>
						  )
					}
				</Grid>

				<Grid item pt={ 2 } >

					{
						( styleMode === 'dark' )
						? ( <NightlightOutlinedIcon sx={{ fontSize: '33px' }} className='botonesNavbar' onClick={ onChangeStyleMode } /> )
						: ( <LightModeOutlinedIcon sx={{ fontSize: '33px' }} className='botonesNavbar' onClick={ onChangeStyleMode } /> )
					} 

					{
						( activeManga )
						? 	(
								( localVisualizador === '0' )
								? ( <SwipeIcon className='botonesNavbar' sx={{ fontSize: '33px' }} onClick={ () => onSetVisualizador( 1 ) } /> )
								: ( <SwipeVerticalIcon className='botonesNavbar' sx={{ fontSize: '33px' }} onClick={ () => onSetVisualizador( 0 ) } />)
							)
						: ( <> </> )
					}
				</Grid>

			</Grid>
		</Grid>					

  )
}
