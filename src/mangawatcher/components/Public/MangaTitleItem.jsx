import { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Box, Divider, Skeleton, Badge, IconButton } from "@mui/material";

import { useMangaStore, useUIStore } from "../../hooks";
import { MangaTitleItemsSkeleton } from "./Skeletons/MangaTitleItemsSkeleton";

export const MangaTitleItem = () => {

    const { mangas, isLoading ,startObtenerUltimoCap } = useMangaStore();
    const { styleMode } = useUIStore();
    // const [isLoadingFake, setIsLoadingFake] = useState( true );
    const listSkeletor = [1,2,3,4,5,6];

    const onOpenManga = ( mangaId ) => {
        startObtenerUltimoCap( mangaId );
    }

    // useEffect( () => {

    //     setTimeout( () => {

    //         setIsLoadingFake(false);

    //     }, 5000 );

    // }, [] )
    

    return (
        <>  
            {
                ( isLoading )
                ?   (
                        <>
                            {
                                listSkeletor.map( list => ( <MangaTitleItemsSkeleton key={ list } /> ) )
                            }
                            
                        </>
                    )
                :   (
                        <Grid container spacing={ 2 } justifyContent="center" ml={ 2 } >
                        {
                            mangas.map( ( { uid, nombre, portada, autor, capitulo, titulo, isNew }, index, array ) => (
                                <Grid item key={ index }  xs={ 12 } sm={ 10 } md={ 6 } lg={ 4 } xl={ 3.5 }  onClick={ () => onOpenManga( uid, nombre ) }  className="pointer animate__animated animate__fadeIn" >
                                    <Badge  badgeContent={ ( isNew ) ? 'Nuevo' : 0 } color="warning" anchorOrigin={{ vertical:"top", horizontal: "left" }} sx={{ width:'100%' }} >
                                        
                                        <Card sx={{ display: 'flex', height: '200px', width:'100%' }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ maxWidth: 151, minWidth: 151 }}
                                                image={ portada }
                                                alt="Live from space album cover"
                                                />
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <CardContent sx={{ flex: '1 0 auto' }}>
                                                    <Typography component="div" variant="h5" sx={{ fontWeight: 'bold'  }}>
                                                        { nombre }
                                                    </Typography>

                                                    <Divider />
                                                    
                                                    <Box mt={1}>
                                                        <Typography variant="subtitle2" color="text.secondary" > Capítulo: { capitulo } </Typography>
                                                        <Typography variant="subtitle2" color="text.secondary" noWrap> Título: { titulo } </Typography>
                                                    </Box>
                                                </CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                                    <Typography noWrap variant="subtitle2" color="text.secondary">
                                                            ~ { autor }
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Card>

                                    </Badge>
                                </Grid>
                        ))
                        }
                        </Grid>
                    )            
            }
        </>
    );
};