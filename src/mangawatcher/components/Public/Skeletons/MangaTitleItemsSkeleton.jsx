import { Box, Card, CardContent, CardMedia, Divider, Grid, Skeleton, Typography } from "@mui/material"

export const MangaTitleItemsSkeleton = () => {

    return (

        <>
            <Grid container item xs={ 12 } sm={ 10 } md={ 6 } lg={ 4 } xl={ 3.5 } mb={ 5 } className="pointer animate__animated animate__fadeIn" >
                <Card sx={{ height: '200px', width:'100%' }}>
                    
                    <Skeleton sx={{ maxWidth: { xs: 140, sm: 180, xl: 200 }, float:'left' }} width="100%" height="100%" variant="rectangular" />

                    <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                        
                        <CardContent  >

                            <Skeleton variant="h6" />
                            <Divider />

                            <Box mt={ 3 }>
                                <Skeleton variant="text" sx={{ maxWidth: `${ Math.random() * (80 - 40) + 40 }%` }} />
                                <Skeleton variant="text" sx={{ maxWidth: `${ Math.random() * (80 - 40) + 40 }%` }} />
                            </Box>
                        </CardContent>

                        <CardContent sx={{ flex: '1 0 auto', maxWidth: `${ Math.random() * (80 - 40) + 40 }%` }} mb={ 1 } >
                            <Skeleton variant="text" />
                        </CardContent>

                    </Box>
                </Card>
            </Grid>
        </>

    )
}
