import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { onChangeStyle, onCloseChapterModal, onCloseModal, onDecrement, onIncrement, onOpenChapterModal, onOpenModal, onResetCounter, onSetVisualizador } from "../../store/ui/uiSlice";

export const useUIStore = () => {

    const dispatch = useDispatch();
    const { counter, isOpenModal, isOpenChapterModal, visualizador, styleMode } = useSelector( state => state.ui );
    const localVisualizador = localStorage.getItem('visualizador');
    const navigate = useNavigate();

    const scrollTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const incrementCounter = () => {
        
        dispatch( onIncrement() );
    }

    const decrementCounter = () => {
        
        dispatch( onDecrement() );
    }

    const resetCounter = () => {

        dispatch( onResetCounter() );

    }

    const openModal = () => {
        dispatch( onOpenModal() );
    }

    const closeModal = () => {
        dispatch( onCloseModal() );
    }

    const openChapterModal = () => {
        dispatch( onOpenChapterModal() );
    }

    const closeChapterModal = () => {
        dispatch( onCloseChapterModal() );
    }

    const setVisualizadorManga = ( opcion ) => {

        dispatch( onSetVisualizador( opcion ) );
        localStorage.setItem('visualizador', opcion);

    }

    const changeStyleMode = ( mode ) => {
        dispatch( onChangeStyle( mode ) );
    }
    


    return {
        //* Propiedades y Objetos
        counter,
        isOpenModal,
        isOpenChapterModal,
        visualizador,
        localVisualizador,
        styleMode,
        
        //* Funciones y Metodos
        incrementCounter, 
        decrementCounter, 
        scrollTop,
        openModal,
        closeModal,
        openChapterModal,
        closeChapterModal,
        setVisualizadorManga,
        changeStyleMode,
        navigate,
        resetCounter,

    }

}