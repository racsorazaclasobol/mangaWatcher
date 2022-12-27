import { Grid, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useMangaStore, useUIStore } from "../hooks";

export const TitleMangas = () => {

    const { activeManga } = useMangaStore();
    const { counter, localVisualizador, styleMode } = useUIStore();

    const { capitulo, titulo: tituloCap, tituloManga, paginas } = activeManga;
	const [titulo, setTitulo] = useState('')

    useEffect(() => {
		if( localVisualizador != 0 ) return

		switch (paginas[counter].tipo) {
			case 'A':
				setTitulo('Agradecimientos');
				break;
			case 'P':
				setTitulo('Portada');
				break;
			case 'C':
				setTitulo(`Página: ${ paginas[counter].pagina }`);
				break;
			case 'E':
				setTitulo('Extras');
				break;
		
			default:
				setTitulo('');
				break;
		}
	}, [counter])	

    return (
        <Grid container justifyContent='center' pb={ 5 } className="animate__animated animate__fadeIn">

            <Grid item lg={ 8 } sm={ 10 } xs={ 12 } minHeight='50px' className="box-shadow" sx={{ borderTop: '1px solid', borderColor: `${ styleMode }.secondary` , borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px' }} bgcolor={ `${ styleMode }.primary` } alignItems='center' textAlign='center' >
                <Typography variant='h6' mt={ 1 } sx={{ color: `colors.gray.claro` }} >
                    { `${ tituloManga } ${ capitulo } Español - ${ tituloCap } `} <br /> {` ${ titulo }` }				
				</Typography>
            </Grid>

        </Grid>
    )
}
