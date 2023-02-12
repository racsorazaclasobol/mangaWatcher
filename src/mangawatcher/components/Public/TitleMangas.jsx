import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import PinIcon from '@mui/icons-material/Pin';

import { useMangaStore, useUIStore } from "../../hooks";
import { ModalChapterSelector } from "./ModalChapterSelector";

export const TitleMangas = () => {

	const { styleMode, openChapterModal } = useUIStore();
    const { activeManga } = useMangaStore();

    const { titulo, capitulo, manga, } = activeManga;

    const onOpenModal = () => {
        openChapterModal();        
    }

    return (
        <Grid container justifyContent='center'  textAlign='center' pb={ 2 } className="animate__animated animate__fadeIn">

            
                <Grid item  xs={ 10 } p={ 1 } minHeight='50px' className="box-shadow" sx={{ paddingLeft: { md: '150px', sm: '75px', xs: '0px', lg: '250px',  } , borderTop: '1px solid', borderColor: `${ styleMode }.secondary` , borderBottomLeftRadius:'10px', backgroundColor: `${ styleMode }.primary` }} >
                    
                    <Typography variant='h6' mt={ 1 } sx={{ color: `colors.gray.claro`, fontWeight: 'bold' }} >
                        { `${ manga.nombre }  ${ capitulo } Español - ${ titulo } `}			
                    </Typography>

                </Grid>

                <Grid item xs={ 2 } minHeight='50px' className="box-shadow" sx={{ borderTop: '1px solid', borderColor: `${ styleMode }.secondary`, borderBottomRightRadius:'10px', display:'flex' }} bgcolor={ `${ styleMode }.primary` } alignItems='center' justifyContent='center' >
                    <Tooltip title='Capítulos'>
                        <IconButton onClick={ onOpenModal }>
                            <PinIcon sx={{ fontSize: '33px' }} className='botonesNavbar' />
                        </IconButton>
                    </Tooltip>
                </Grid>
           

            <ModalChapterSelector />

        </Grid>
    )
}
