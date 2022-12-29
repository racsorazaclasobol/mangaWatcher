import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useMangaStore, useUIStore } from "../hooks";
import PinIcon from '@mui/icons-material/Pin';
import { ModalChapterSelector } from "./ModalChapterSelector";

export const TitleMangas = () => {

	const { styleMode, openChapterModal } = useUIStore();
    const { activeManga } = useMangaStore();

    const { capitulo, titulo: tituloCap, tituloManga } = activeManga;

    const onOpenModal = () => {
        openChapterModal();        
    }


    return (
        <Grid container justifyContent='center' pb={ 2 } className="animate__animated animate__fadeIn">

            <Grid item lg={ 7 } sm={ 9 } xs={ 10 } pl={ 13 } pr={ 3 } minHeight='50px' className="box-shadow" sx={{ borderTop: '1px solid', borderColor: `${ styleMode }.secondary` , borderBottomLeftRadius:'10px' }} bgcolor={ `${ styleMode }.primary` } alignItems='center' textAlign='center' >
                
				<Typography variant='h6' mt={ 1 } sx={{ color: `colors.gray.claro` }} >
                    { `${ tituloManga }  ${ capitulo } Español - ${ tituloCap } `}			
				</Typography>

            </Grid>

            <Grid item lg={ 1 } sm={ 1 } xs={ 2 } minHeight='50px' className="box-shadow" sx={{ borderTop: '1px solid', borderColor: `${ styleMode }.secondary`, borderBottomRightRadius:'10px', display:'flex' }} bgcolor={ `${ styleMode }.primary` } alignItems='center' justifyContent='center' >
                <Tooltip title='Capítulo'>
                    <IconButton onClick={ onOpenModal }>
                        <PinIcon sx={{ fontSize: '33px' }} className='botonesNavbar' />
                    </IconButton>
                </Tooltip>
            </Grid>

            <ModalChapterSelector />

        </Grid>
    )
}
