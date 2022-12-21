import { Grid, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useMangaStore } from "../hooks/useMangaStore";

export const MangaTitleItem = () => {

    const { mangas, startObtenerUltimoCap } = useMangaStore();
    
    const onOpenManga = ( mangaId, titulo ) => {
        
        startObtenerUltimoCap( mangaId, titulo );
    }

  return (
    <>

        {
            mangas.map( manga => (
                <Grid key={manga.id} item className="animate__animated animate__fadeIn">
                    <Button onClick={ () => onOpenManga( manga.id, manga.titulo ) }>
                        <Card sx={{ width: 300, maxHeight: 400,  }} >
                            <CardMedia
                                component="img"
                                height="350"
                                image={ manga.portada }
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" >
                                    { manga.titulo }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Button>
                </Grid>
                
            ))
        }

        
    </>
  );
};
