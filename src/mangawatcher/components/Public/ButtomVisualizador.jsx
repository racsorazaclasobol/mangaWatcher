import { useMangaStore, useUIStore } from "../../hooks";
import { Grid } from "@mui/material";
import { ButtonInvisible, TitleMangas, InfoCapitulo } from "../";

export const ButtomVisualizador = () => {

    const { activeManga } = useMangaStore();
	const { counter } = useUIStore();

	const { paginas } = activeManga;

	//TODO: Agregar memo a paginas

	const lastPage = paginas.length - 1;
	const pag = paginas[counter].url;	
	
    return (
		<>

				<TitleMangas />
                
				<Grid container justifyContent="center" position='relative' >

					
                    <Grid item lg={ 8 } sm={ 10 } xs={ 12 } textAlign='center' className="animate__animated animate__fadeIn" >

						<InfoCapitulo pagina={ paginas[counter] }/>

                        <img src={ pag } style={{ maxWidth:'100%' }} className="animate__animated animate__fadeIn" /> 

                    </Grid>
					
					<ButtonInvisible lastPage = { lastPage } />

                </Grid>

        </>
    )
}
