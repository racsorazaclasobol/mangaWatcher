import { Grid, Typography, CircularProgress } from '@mui/material';

export const SimboloCargando = () => {
    return (
        <Grid container direction='column' className='simboloCarga'>
            <CircularProgress size={100} />
            <Typography variant='h6' color='#FFF'>
                Cargando...
            </Typography>
        </Grid>
    )
}
