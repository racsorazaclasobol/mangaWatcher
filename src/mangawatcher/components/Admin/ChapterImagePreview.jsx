import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"

export const ChapterImagePreview = ({ image='', title='' }) => {
  return (
    <>
        <Grid item className="animate__animated animate__fadeIn">
            <Card sx={{ display: 'flex', height: '310px', justifyContent: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ minHeight: '250px' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 150 }}
                            image={ image }
                            alt="Live from space album cover"
                        />
                    </CardContent>
                    
                    <CardContent >
                        <Typography component="div" variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                            { title }
                        </Typography>

                    </CardContent>
                </Box>
            </Card>
        </Grid>
    </>
  )
}