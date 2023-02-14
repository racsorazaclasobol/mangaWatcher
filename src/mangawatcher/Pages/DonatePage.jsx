import { Button, Divider, Grid, Typography, Box, IconButton, Link, Snackbar, TextField, Tooltip, Alert } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { MangaLayout } from "../layout/MangaLayout"
import { useState } from "react";
import { useUIStore } from "../hooks";
import { color } from "@mui/system";
import { Breakpoints } from "../components";

export const DonatePage = () => {

    const [open, setOpen] = useState(false)
    const { styleMode } = useUIStore();
    
    const textColor = ( styleMode === 'white' ) ? 'colors.gray.oscuro' : 'colors.gray.claro';
    const buttonVariant = ( styleMode === 'white' ) ? 'outlined' : 'contained';

    const criptoUSDT = "0x8e5545771705c67b8fdbf2799a165c9fca22aa77";
    const criptoBTC = "0x8e5545771705c67b8fdbf2799a165c9fca22aa77";

    const onCopyClick = ( value ) => {

        navigator.clipboard.writeText( value );
        setOpen(true);

    }


    

    return (
        <MangaLayout>
            <Grid container minHeight="calc(100vh - 230px)" mt={ 5 } mb={ 5 } justifyContent="center" className="animate__animated animate__fadeIn">

                {/* <Breakpoints /> */}

                <Grid item xs={ 10 } container>

                    <Grid item xs={ 12 } md={ 10 } >

                        <Typography variant={ "h5" } sx={{ fontWeight:'bold', color: textColor }} >
                            Ayudanos con una donación
                        </Typography>
                        <br />
                        <Typography variant="p" sx={{ color: textColor }}>
                                Ayudanos a seguir ofreciendo un servicio gratuito y libre de publicidad.
                        </Typography>
                        <Divider />

                    </Grid>

                    <Grid container >
                        <Grid item xs={ 12 } md={ 10 } mt={ 5 }>

                            <Typography  variant="h6" color={ textColor }> Métodos de donación</Typography>

                            <Divider />

                            <Typography sx={{ fontWeight: 'bold' }} color={ textColor } mb={ 1 } mt={ 5 }> Paypal: </Typography>

                            <Link href="https://paypal.me/mimangapage?country.x=CL&locale.x=es_XC" underline="none" target="_blank" rel="noopener">
                                <Button variant={ buttonVariant }> Donar por Paypal </Button>
                            </Link>

                        </Grid>
                                
                        <Grid item xs={ 10 } sm={ 8 } md={ 6 } mt={ 5 }>

                            <Typography mb={ 2 } sx={{ fontWeight: 'bold' }} color={ textColor }> Criptomoneda: </Typography>

                            <Typography fontSize={ 12 } mb={ 1 } color={ textColor } noWrap > USDT / BEP20 </Typography>

                            <Typography sx={{ borderBlockEnd: '0.5px solid gray' }} color={ textColor } noWrap> { criptoUSDT } </Typography>

                        </Grid>

                        <Grid item xs={ 2 } sm={ 4 }  mt={ 12 } >
                            <Tooltip title="Copiar">
                                <IconButton onClick={ () => onCopyClick( criptoUSDT ) } >
                                    <ContentCopyIcon sx={{ fontSize:'25px' }} color={ ( styleMode === 'white' ) ? "action" : "warning" } />
                                </IconButton>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={ 10 } sm={ 8 } md={ 6 } mt={ 2 } >
                            <Typography fontSize={ 12 } mb={ 1 } color={ textColor }> BTC / BEP20 </Typography>
                            <Typography sx={{ borderBlockEnd: '0.5px solid gray' }} color={ textColor } noWrap> { criptoBTC } </Typography>
                        </Grid>

                        <Grid item xs={ 2 } sm={ 4 } mt={ 4 } >
                            <Tooltip title="Copiar">
                                <IconButton onClick={ () => onCopyClick( criptoBTC ) } >
                                    <ContentCopyIcon sx={{ fontSize:'25px' }} color={ ( styleMode === 'white' ) ? "action" : "warning"} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    
                </Grid>

                <Snackbar open={open} autoHideDuration={2000} onClose={ () => setOpen(false) }>
                    <Alert onClose={ () => setOpen(false) } severity="success" sx={{ width: '100%' }}>
                        Copiado correctamente.
                    </Alert>
                </Snackbar>             
            </Grid>

        </MangaLayout>
    )

}
