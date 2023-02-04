import { Grid, Card, CardContent, CardMedia, Typography, Box, Divider } from "@mui/material";
import { useMangaStore, useUIStore } from "../../hooks";
import { Breakpoints } from "./Breakpoints";

export const MangaTitleItem = () => {

    const { mangas, startObtenerUltimoCap } = useMangaStore();
    const { styleMode } = useUIStore();
    
    const onOpenManga = ( mangaId ) => {
        startObtenerUltimoCap( mangaId );
    }

    return (
        <>
            <Breakpoints />
            {
                mangas.map( ( { uid, nombre, portada, autor, capitulo, titulo }, index, array ) => (
                    <Grid container key={ index } item xs={ 12 } sm={ 10 } md={ 6 } lg={ 4 } xl={ 3.5 } onClick={ () => onOpenManga( uid, nombre ) } className="pointer" >
                        <Card sx={{ display: '', height: '200px', width:'100%',  backgroundColor: `${ styleMode }.bgColorCards` }}>
                            <CardMedia
                                component="img"
                                sx={{ maxWidth: { xs: 140, sm: 180, xl: 200 }, float:'left', boxShadow: '0px 0 7px 2px #888' }}
                                image={ portada }
                                alt=""
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                                <CardContent  >

                                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold'  }}>
                                        { nombre }
                                    </Typography>

                                    <Divider />
                                    <Box mt={ 1 }>
                                        <Typography variant="subtitle2" color="text.secondary" > Capítulo: { capitulo } </Typography>
                                        <Typography variant="subtitle2" color="text.secondary" noWrap> Título: { titulo } </Typography>
                                    </Box>
                                </CardContent>
                                <CardContent sx={{ flex: '1 0 auto' }} mb={ 1 }>
                                    <Typography noWrap variant="subtitle2" color="text.secondary">
                                        ~ { autor }
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                ))
            }
        </>
    );
};