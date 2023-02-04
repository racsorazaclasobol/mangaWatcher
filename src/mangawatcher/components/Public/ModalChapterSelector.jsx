
import Modal from 'react-modal'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import { useForm } from '../../../hooks';
import { useMangaStore, useUIStore } from '../../hooks/';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0%',
        transform: 'translate(0%, -50%)',
    },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const initialForm = {
    chapter: 0,
}

export const ModalChapterSelector = () => {

    const { isOpenChapterModal, closeChapterModal }   = useUIStore();
    const { activeManga, startObtenerChapterPorUID }  = useMangaStore();


    const { chapter, onInputChange, onResetForm }    = useForm( initialForm );
    const { listaCaps } = activeManga;

    //TODO: Aplicar memo a listaCaps

    const onCloseModal = () => {
        closeChapterModal();
        onResetForm();
    } 

    const onSelectChapter = () => {
        
        if( chapter === 0 ) return;

        startObtenerChapterPorUID( chapter );

        onCloseModal();
    }
  
    return (
            <Modal
                isOpen = { isOpenChapterModal }
                style = { customStyles }
                className = "modal-chapter"
                contentLabel = 'Selector de capítulos'
                overlayClassName = "modal-fondo"
                closeTimeoutMS = { 200 }
                ariaHideApp = { false }
                onRequestClose = { onCloseModal } 
                shouldCloseOnEsc = { true }
                shouldCloseOnOverlayClick = { true }
            >
                <Grid container justifyContent='center' p={ 2 } spacing={ 5 }>
                    <Grid item textAlign='center'>
                        <Typography variant='h5'>
                            Seleccione un capítulo
                        </Typography>
                    </Grid>

                    <Grid item bgcolor='white'>
                        <FormControl fullWidth>
                            <InputLabel id='chapterLabel'> Capítulo </InputLabel>
                            
                            <Select 
                                fullWidth
                                labelId='chapterLabel'
                                value={ chapter }
                                name='chapter'
                                label=" Capítulo"
                                onChange={ onInputChange }
                            >
                                <MenuItem value={ 0 } disabled > Seleccione... </MenuItem>
                                {
                                    listaCaps.map( ({ uid, capitulo, titulo }) => ( 
                                        <MenuItem key={ uid } value={ uid }  > <Typography noWrap > { capitulo } - { titulo } </Typography> </MenuItem>
                                    ) )
                                }

                            </Select>

                        </FormControl>

                        <Button 
                            fullWidth 
                            variant='contained' 
                            sx={{ marginTop: '30px' }}
                            onClick={ onSelectChapter }
                            disabled={ ( chapter === 0 ) ? true : false } > 
                            {
                                ( chapter === 0 )
                                ? ( <a> Seleccione </a> )
                                : ( <a> ¡ A disfrutar ! </a> )
                            }
                        </Button>

                </Grid>

                </Grid>
                
                
            </Modal>
    )
}
