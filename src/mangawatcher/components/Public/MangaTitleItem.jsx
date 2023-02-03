import { Grid, Card, CardContent, CardMedia, Typography, Box, Divider } from "@mui/material";
import { useMangaStore } from "../../hooks";

export const MangaTitleItem = () => {

    const { mangas, startObtenerUltimoCap } = useMangaStore();
    
    const onOpenManga = ( mangaId ) => {
       
        startObtenerUltimoCap( mangaId );
        
    }

    return (
        <>
            <Grid container>
                <Grid item sx={{ display: { xs: 'block', sm: 'none' } }} >
                    <h1>xs</h1> 
                </Grid>
                <Grid item sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }} >
                    <h1>sm</h1> 
                </Grid>
                <Grid item sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }} >
                    <h1>md</h1> 
                </Grid>
                <Grid item sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }} >
                    <h1>lg</h1> 
                </Grid>
                <Grid item sx={{ display: { xs: 'none', xl: 'block' } }} >
                    <h1>xl</h1> 
                </Grid>
            </Grid>
            <hr />
            {
                mangas.map( ({ uid, nombre, portada, autor }) => (
                    <>
                        <Grid key={ uid } item xs={ 12 } sm={ 6 } md={ 4 } xl={ 3.5 } onClick={ () => onOpenManga( uid, nombre ) } className="pointer" >
                            <Card sx={{ display: 'flex', height: '200px', justifyContent: 'flex-start' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 180, float:'right', boxShadow: '0px 0 7px 2px #888' }}
                                    image={ portada }
                                    alt=""
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }} mt={ 2 }>
                                    <CardContent sx={{ flex: '1 0 auto' }} >

                                        <Typography component="div" variant="h5" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                            { nombre }
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
                ))
            }
        </>
    );
};