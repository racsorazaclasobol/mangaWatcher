
import { Grid } from '@mui/material'
import { InfoCapitulo } from './InfoCapitulo';

export const ImageMangaPages = ( { pagina } ) => {    

    return (    
        <Grid container justifyContent="center">
            <Grid item >
                
                <InfoCapitulo pagina={ pagina } />
                
                <img src={ pagina.url } style={{ maxWidth:'100%' }} />

            </Grid>
        </ Grid>
    )
}
