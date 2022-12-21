import { useEffect } from "react";

import { useMangaStore, useUIStore } from "../hooks";

import { Grid } from "@mui/material";
import { ButtonInvisible, TitleMangas } from "./";

export const ButtomVisualizador = () => {

    const { activeManga } = useMangaStore();
	const { counter, incrementCounter, decrementCounter, scrollTop } = useUIStore();

	const { paginas } = activeManga;
	const lastPage = paginas.length - 1;
	const pag = paginas[counter].url;

	const onPrevPage = () => {
		if( counter <= 0 ) return;

		decrementCounter();
	}

	const onNextPage = () => {
		if( counter === lastPage ) return;

		incrementCounter();
	}

	document.onkeydown = function( { key } ) {
		switch (key) {
			case 'ArrowLeft':
				onPrevPage();
				break;

			case 'ArrowRight':
				onNextPage();
				break;
		
			default:
				break;
		}
	};

	/* USE EFFECTS */

	
	useEffect(() => {
	  scrollTop();
	}, [pag]);

	useEffect( () => {
		
	}, [] )
	
    return (
		<>

				<TitleMangas />
                
				<Grid container justifyContent="center" position='relative' >

					
                    <Grid item lg={ 8 } sm={ 10 } xs={ 12 } textAlign='center' className="animate__animated animate__fadeIn" >

                        <img src={ pag } style={{ maxWidth:'100%' }} className="animate__animated animate__fadeIn" /> 

                    </Grid>
					
					<ButtonInvisible lastPage = { lastPage } />

                </Grid>

        </>
    )
}
