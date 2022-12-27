import { useDispatch, useSelector } from "react-redux"
import { onChangeStyle, onCloseModal, onDecrement, onIncrement, onOpenModal, onSetVisualizador } from "../../store/ui/uiSlice";

export const useUIStore = () => {

    const dispatch = useDispatch();
    const { counter, isOpenModal, visualizador, styleMode } = useSelector( state => state.ui );
    const localVisualizador = localStorage.getItem('visualizador');

    const scrollTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const incrementCounter = () => {
        
        dispatch( onIncrement() );
    }

    const decrementCounter = () => {
        
        dispatch( onDecrement() );
    }

    const openModal = () => {
        dispatch( onOpenModal() );
    }

    const closeModal = () => {
        dispatch( onCloseModal() );
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
        visualizador,
        localVisualizador,
        styleMode,
        
        //* Funciones y Metodos
        incrementCounter, 
        decrementCounter, 
        scrollTop,
        openModal,
        closeModal,
        setVisualizadorManga,
        changeStyleMode,

    }

}