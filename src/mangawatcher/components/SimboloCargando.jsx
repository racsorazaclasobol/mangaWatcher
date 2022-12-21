import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';

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
