import { Link } from "react-router-dom"
import { Grid, Typography, Box, Card, CardMedia, CardContent, Divider, Badge } from "@mui/material"

import { MangaLayout } from "../../layout/MangaLayout"
import { HeaderManagers } from "../../components"

export const AdminMenu = () => {

    return (
        <>
            <MangaLayout>
                
                <Box mt={ 2 } >
                    <HeaderManagers />
                </Box>
                
                <Grid container minHeight={'calc(100vh - 230px)'} mt={ 2 }>

                    <Grid container spacing={ 2 } justifyContent='center' mb={ 15 }>

                        
                        <Grid item xs={ 11 } sm={ 8 } md={ 5 } xl={ 4 }>
                            <Card sx={{ display: 'flex', height: '265px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 180, boxShadow: '2px 0 7px 0px #888' }}
                                    image="./assets/manga.webp"
                                    alt="Live from space album cover"
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>

                                        <Typography component="div" variant="h4" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                            Mangas
                                        </Typography>

                                        <Divider />

                                        <Link to="/admin/managerManga/add" style={{ textDecoration: 'none' }}>
                                            <Typography variant="h6" mb={ 4 } mt={ 5 } color="text.secondary" component="div">
                                                Agrega Manga
                                            </Typography>
                                        </Link>

                                        <Link to="/admin/managerManga/edit" style={{ textDecoration: 'none' }}>
                                            <Typography variant="h6" color="text.secondary" component="div">
                                                Editar Manga
                                            </Typography>
                                        </Link>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>

                        <Grid item xs={ 11 } sm={ 8 } md={ 5 } xl={ 4 }>
                            <Card sx={{ display: 'flex', height: '265px', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }} style={{ marginRight:'19px' }}>

                                        <Typography component="div" variant="h4" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                            Chapters
                                        </Typography>

                                        <Divider />

                                        <Link to="/admin/managerChapter/add" style={{ textDecoration: 'none' }} >
                                            <Typography variant="h6" mb={ 4 } mt={ 5 } color="text.secondary" component="div">
                                                Agrega Chapter
                                            </Typography>
                                        </Link>

                                        <Link to="/admin/managerChapter/edit" style={{ textDecoration: 'none' }} >
                                            <Badge badgeContent={ 'En desarrollo..' } color="warning">
                                                <Typography variant="h6" color="text.secondary" component="div">
                                                    Editar Chapter
                                                </Typography>
                                            </Badge>

                                        </Link>
                                        
                                    </CardContent>
                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 180, float:'right', boxShadow: '0px 0 7px 2px #888' }}
                                    image="./assets/chapter.webp"
                                    alt="Live from space album cover"
                                />
                            </Card>
                        </Grid> 

                    </Grid>            
                </Grid>
            </MangaLayout>
        </>
    
    )
}
