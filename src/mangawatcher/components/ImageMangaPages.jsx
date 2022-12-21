
import { Grid } from '@mui/material'

export const ImageMangaPages = ( { pagina } ) => {

    return (    
        <Grid container justifyContent="center">
            <Grid item >
                <img src={ pagina.url } style={{ maxWidth:'100%' }} />
                <hr className="hr hr-blurry" style={{ color: 'white', marginBottom: '40px', marginTop: '40px' }}/>
            </Grid>
        </ Grid>
    )
}
