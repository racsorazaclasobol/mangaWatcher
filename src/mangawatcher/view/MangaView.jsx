import { useEffect } from 'react';

import { useMangaStore, useUIStore } from '../hooks';
import { ButtomVisualizador, ModalSelectorVis, ScrollVisualizador } from '../components';
import { Grid } from '@mui/material';

export const MangaView = () => {

	const { localVisualizador, openModal } = useUIStore();
	const { startLimpiarMangaActivo } = useMangaStore();
	
	window.onpopstate = () => {

		startLimpiarMangaActivo();

	}

	useEffect( () => {
		if( localVisualizador == null ){

			openModal();
		}
	}, [localVisualizador] )	

	return (
		<>
            <Grid container >

				{
					( localVisualizador == 0 )
					? ( <ButtomVisualizador /> )
					: ( <ScrollVisualizador /> ) 
				}
				
				<ModalSelectorVis />
			</Grid>
		</>
	)
}
