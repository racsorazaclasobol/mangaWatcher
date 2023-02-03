import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material"

export const CardImagePreview = ({ image='', title='', type='', autor='' }) => {
  return (
    <>

        <Grid item xs={ 5 } className="animate__animated animate__fadeIn">
            <Card sx={{ display: 'flex', height: '210px', justifyContent: 'flex-start' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 180, float:'right', boxShadow: '0px 0 7px 2px #888' }}
                    image={ image }
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }} mt={ 2 }>
                    <CardContent sx={{ flex: '1 0 auto' }} >

                        <Typography component="div" variant="h5" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                            { title }
                        </Typography>

                        <Divider />
                    </CardContent>
                    <CardContent>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            ~ { autor }
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Grid>
    
    </>
  )
}