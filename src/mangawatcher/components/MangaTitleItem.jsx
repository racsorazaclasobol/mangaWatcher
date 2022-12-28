import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMangaStore } from "../hooks";

export const MangaTitleItem = () => {

    const { mangas, startObtenerUltimoCap } = useMangaStore();
    const navigate = useNavigate();
    
    const onOpenManga = ( mangaId ) => {
        
        startObtenerUltimoCap( mangaId );
        
        navigate( `/manga/${ mangaId }`)
        
    }

    return (
        <>
            {
                mangas.map( manga => (
                    <Grid key={ manga.id } onClick={ () => onOpenManga( manga.id ) } className="box-shadow pointer .d-none" m={2} maxHeight="360px" >
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
