
import Modal from 'react-modal'
import { useUIStore } from '../hooks/useUiStore';

import SwipeIcon from '@mui/icons-material/Swipe';
import SwipeVerticalIcon from '@mui/icons-material/SwipeVertical';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-30%',
        transform: 'translate(-50%, -50%)',
    },

};

export const ModalSelectorVis = () => {

    const { isOpenModal, openModal, closeModal, setVisualizadorManga } = useUIStore();

    const onCloseModal = () => {
        closeModal();
    }
    
    const onSetVisualizador = ( opcion ) => {
        setVisualizadorManga( opcion );
        closeModal();
    }
  
  
    return (
            <Modal
                isOpen = { isOpenModal }
                style = { customStyles }
                className = "modal"
                contentLabel = 'Opciones de Visualizacion'
                overlayClassName = "modal-fondo"
                closeTimeoutMS={ 200 }
                ariaHideApp= { false }
            >
                <div className='container' style={{ textAlign:'center' }}>
                    <h4>¿Como desea visualizar las páginas?</h4>
                </div>
                <hr />
                <div className='container' style={{ backgroundColor:'white' }} >
                    <div style={{ height:'200px' }} className='row align-items-center justify-content-center'>
                        <div className='col-5 text-center vis-option' style={{ padding: '40px' }} onClick={ () => onSetVisualizador(0) }>
                            <div className='' >
                                <SwipeIcon style={{ fontSize:'70' }} />    
                            </div>
                            <br />
                            <div className=''>
                                Botones
                            </div>
                        </div>
                        <div className='col-1 d-flex justify-content-center' style={{ height: '90%' }}>
                            <div className="vr"></div>
                        </div>
                        <div className='col-5 text-center vis-option' style={{ padding: '40px' }} onClick={ () => onSetVisualizador(1) } >
                            <div className='' >
                                <SwipeVerticalIcon style={{ fontSize:'70' }} />    
                            </div>
                            <br />
                            <div className=''>
                                Scroll
                            </div>
                        </div>                                                
                    </div>
                </div>
            </Modal>
    )
}
