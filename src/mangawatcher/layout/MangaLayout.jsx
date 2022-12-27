import { Grid } from '@mui/material'

import { NavBar, Footer } from '../components';
import { useUIStore } from '../hooks';

export const MangaLayout = ({ children }) => {

	const { styleMode } = useUIStore();

    return (

        <>

            <Grid container direction='column' sx={{ backgroundColor: `${ styleMode }.secondary` }} >

                <Grid item xs={12} >
                    <NavBar />
                </Grid>

                <Grid item xs={ 12 }>

                    { children }

                </Grid>

                <Grid item xs={ 12 }>
                    <Footer />
                </Grid>


            </Grid>
        </>

    )
}