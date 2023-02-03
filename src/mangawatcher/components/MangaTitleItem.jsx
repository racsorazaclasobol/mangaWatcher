import { Grid, Card, CardContent, CardMedia, Typography, Box, Divider } from "@mui/material";
import { useMangaStore } from "../hooks";

export const MangaTitleItem = () => {

    const { mangas, startObtenerUltimoCap } = useMangaStore();
    
    const onOpenManga = ( mangaId ) => {
       
        startObtenerUltimoCap( mangaId );
        
    }

    return (
        <>
            {
                mangas.map( ({ uid, nombre, portada, autor }) => (
                    <>
                        <Grid key={ uid } item xs={ 3.5 } onClick={ () => onOpenManga( uid, nombre ) } className="pointer" >
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