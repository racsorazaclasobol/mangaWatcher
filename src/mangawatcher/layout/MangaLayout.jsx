import { Grid } from '@mui/material'

import { NavBar, Footer } from '../components';

export const MangaLayout = ({ children }) => {

  return (

    <>

        <Grid container direction='column' >

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