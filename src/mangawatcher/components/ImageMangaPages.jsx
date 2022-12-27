
import { Grid, Typography } from '@mui/material'
import { useState } from 'react';
import { useEffect } from 'react';
import { useUIStore } from '../hooks'

export const ImageMangaPages = ( { pagina } ) => {

    const { styleMode } = useUIStore();

    const [titulo, setTitulo] = useState('')

    useEffect(() => {
        if( !pagina ) return;

        switch (pagina.tipo) {
			case 'A':
				setTitulo('Agradecimientos');
				break;
			case 'P':
				setTitulo('Portada');
				break;
			case 'C':
				setTitulo(`Página: ${ pagina.pagina }`);
				break;
			case 'E':
				setTitulo('Extras');
				break;
		
			default:
				setTitulo('');
				break;
		}    

    }, [pagina])
    

    return (    
        <Grid container justifyContent="center">
            <Grid item >
                
                <Grid container sx={{ marginTop:'20px', marginBottom:'-15px' }}  justifyContent='center'>
                    <Typography variant='overline'> { titulo } </Typography>
                </Grid>
                
                <hr className="hr hr-blurry" style={{ color: `${ styleMode }.divider`, marginBottom: '20px' }}/> 
                
                <img src={ pagina.url } style={{ maxWidth:'100%' }} />

            </Grid>
        </ Grid>
    )
}
