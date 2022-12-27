import { Grid, Button, Card, CardContent, CardMedia, Typography, Box, CardHeader, CardActions } from "@mui/material";
import { useMangaStore } from "../hooks";

export const MangaTitleItem = () => {

    const { mangas, startObtenerUltimoCap } = useMangaStore();
    
    const onOpenManga = ( mangaId, titulo ) => {
        
        startObtenerUltimoCap( mangaId, titulo );
    }

    return (
        <>
            {
                mangas.map( manga => (
                    <Grid key={ manga.id } onClick={ () => onOpenManga( manga.id, manga.titulo ) } className="box-shadow pointer" m={2} maxHeight="360px" >
                        <Card sx={{ maxHeight: '380px', width: 300 }}>
                            <CardMedia
                                sx={{ height: '300px' }}
                                image={ manga.portada }
                                title="green iguana"
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
