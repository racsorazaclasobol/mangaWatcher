import { Grid } from "@mui/material"

export const Breakpoints = () => {
  return (
    <>
        <Grid container>
            <Grid item sx={{ display: { xs: 'block', sm: 'none' } }}> sx </Grid>
            <Grid item sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}> sm </Grid>
            <Grid item sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}> md </Grid>
            <Grid item sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}> lg </Grid>
            <Grid item sx={{ display: { xs: 'none', xl: 'block' } }} > xl </Grid>
        </Grid>
    </>
  )
}
