import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"

export const CardImagePreview = ({ image, title, type }) => {
  return (
    <>

        <Grid item className="animate__animated animate__fadeIn">
                <Card sx={{ maxHeight: 250, width:150 }} >
                    <CardMedia
                        component="img"
                        height="200"

                        image={ image }
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom>
                            { title }
                        </Typography>
                    </CardContent>
                </Card>
        </Grid>
    
    </>
  )
}
