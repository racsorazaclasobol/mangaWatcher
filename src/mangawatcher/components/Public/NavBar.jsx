import { Box, Grid, Tooltip, Typography } from '@mui/material'
import { useUIStore, useMangaStore } from '../../hooks';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SwipeIcon from '@mui/icons-material/Swipe';
import SwipeVerticalIcon from '@mui/icons-material/SwipeVertical';
import { Link } from 'react-router-dom';

export const NavBar = () => {

	const { styleMode, localVisualizador, visualizador, changeStyleMode, setVisualizadorManga, closeModal, navigate } = useUIStore();
	const { activeManga, startLimpiarMangaActivo } = useMangaStore();

	const onChangeStyleMode = () => {
		
		const newMode = ( styleMode === 'dark' ) ? 'white' : 'dark';
 		changeStyleMode( newMode );
	}

	const onSetVisualizador = ( opcion ) => {
        setVisualizadorManga( opcion );
        closeModal();
    }

	const onBackHomePage = () => {
		startLimpiarMangaActivo();

		navigate('/home');
	}

  return (

		<Grid container justifyContent='center' height={130} sx={{ backgroundColor:`${ styleMode }.primary` }} className='box-shadow' >
			<Grid item xs={ 12 } sm={ 10 } justifyContent='space-between' alignItems='center' container >

				<Grid item onClick={ onBackHomePage } className='pointer' >
					{
						( styleMode === 'dark' )
						? ( <Box>
								<img src='https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_80/v1676168829/MyManga/Logo/Logo_3.1_xegt58.webp' className='d-block d-sm-none'/> 
								<img src='https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_100/v1676168829/MyManga/Logo/Logo_3.1_xegt58.webp' className='d-none d-sm-block'/> 								
							</Box>
						  )
						
						: ( 
							<Box >
								<img src="https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_80/v1676168828/MyManga/Logo/Logo_3.0_oyk9ie.webp" className='d-block d-sm-none'/> 
								<img src="https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_100/v1676168828/MyManga/Logo/Logo_3.0_oyk9ie.webp" className='d-none d-sm-block'/> 
							</Box>
						  )
					}
				</Grid>

				<Grid item pt={ 2 } pr={ 2 }>

					{
						( !activeManga )
						? 	( 
								<Tooltip title="Donar">
									<Link to="/donate">
										<VolunteerActivismIcon sx={{ fontSize: '33px', }} className='botonesNavbar'/>
									</Link>
								</Tooltip>
						 	)	
						: ( <></> )
					}
					
					<Tooltip title="Luz">
					{
						( styleMode === 'dark' )
						? ( <NightlightOutlinedIcon sx={{ fontSize: '33px', }} className='botonesNavbar' onClick={ onChangeStyleMode } /> )
						: ( <LightModeOutlinedIcon sx={{ fontSize: '33px',  }} className='botonesNavbar' onClick={ onChangeStyleMode } /> )
					} 
					</Tooltip>

					{
						( activeManga )
						? 	(
								<Tooltip title="Visualización">
									{
										( localVisualizador === '0' )
										? ( <SwipeIcon className='botonesNavbar' sx={{ fontSize: '33px' }} onClick={ () => onSetVisualizador( 1 ) } /> )
										: ( <SwipeVerticalIcon className='botonesNavbar' sx={{ fontSize: '33px' }} onClick={ () => onSetVisualizador( 0 ) } />)
									}
								</Tooltip>
							)
						: ( <> </> )
					}
				</Grid>

			</Grid>
		</Grid>					

  )
}
