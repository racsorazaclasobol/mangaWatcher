import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useMangaStore, useUIStore } from "../hooks";

export const MangaTitleItem = () => {

    const { mangas, startObtenerUltimoCap } = useMangaStore();
    const { navigate } = useUIStore();
    
    const onOpenManga = ( mangaId ) => {
       
        startObtenerUltimoCap( mangaId );
        
    }

    return (
        <>
            {
                mangas.map( ({ uid, nombre, portada, autor }) => (
                    <Grid key={ uid } onClick={ () => onOpenManga( uid, nombre ) } className="box-shadow pointer .d-none" m={2} maxHeight="360px" >
                        <Card sx={{ maxHeight: '380px', width: 300 }}>

                            <CardMedia
                                sx={{ height: '300px' }}
                                image={ portada }
                                title={ nombre }
                            />

                            <CardContent>
                                <Typography variant="h6" >
                                    { nombre }
                                </Typography>

                                <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
                                    ~ { autor }
                                </Typography>
                            </CardContent>

                        </Card>
                    </Grid>
                ))
            }
        </>
    );
};
