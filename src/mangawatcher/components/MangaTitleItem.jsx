import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useMangaStore, useUIStore } from "../hooks";

export const MangaTitleItem = () => {

    const { mangas, startObtenerUltimoCap } = useMangaStore();
    const { navigate } = useUIStore();
    
    const onOpenManga = ( mangaId, tituloManga ) => {
        
        startObtenerUltimoCap( mangaId, tituloManga );

        
        navigate( `/manga/${ mangaId }`)
        
    }

    return (
        <>
            {
                mangas.map( manga => (
                    <Grid key={ manga.id } onClick={ () => onOpenManga( manga.id, manga.titulo ) } className="box-shadow pointer .d-none" m={2} maxHeight="360px" >
                        <Card sx={{ maxHeight: '380px', width: 300 }}>

                            <CardMedia
                                sx={{ height: '300px' }}
                                image={ manga.portada }
                                title={ manga.titulo }
                            />

                            <CardContent>
                                <Typography variant="h6" >
                                    { manga.titulo }
                                </Typography>

                                <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
                                    ~ { manga.autor }
                                </Typography>
                            </CardContent>

                        </Card>
                    </Grid>
                ))
            }
        </>
    );
};
