import { useDispatch, useSelector } from "react-redux";

import { clearActiveManga, onLoading, onLoadMangas, onSetListaCaps, setActiveManga } from "../../store/mymanga/mangaSlice";
import { onCloseModal, onResetCounter } from "../../store/ui/uiSlice";
import { useUIStore } from "./useUiStore";
import mangaApi from "../../api/mangaApi";

export const useMangaStore = () => {
    
    const dispatch = useDispatch();
    const { mangas, activeManga, isLoading } = useSelector( state => state.manga )
    const { navigate } = useUIStore();
    

    //* ACTUALIZADO CON BACKEND NODE
    //TODO: Validaciones
    const startObtenerTitulosMangas = async() => {

        dispatch( onLoading() );

        try {

            const { data } = await mangaApi.get( '/mangas' );
            
            dispatch( onLoadMangas( data ) );

        } catch (error) {
            console.log( error );
            abortarMision();
        }

    }

    //* ACTUALIZADO CON BACKEND NODE
    //TODO: Validaciones
    const startObtenerUltimoCap = async ( mangaId = '' ) => {    

        try {
            
            if( mangaId === '' ) return abortarMision();
    
            dispatch( onLoading() );
            dispatch( onResetCounter());
            
            const { data: chapter }      = await mangaApi.get( `/chapters/last/${ mangaId }` );
            const { data: listChapters } = await mangaApi.get( `/chapters/list/${ mangaId }` );

            dispatch( setActiveManga( chapter ) );
            dispatch( onSetListaCaps( listChapters ) );

            navigate(`/reading/${ chapter.uid }`);

        } catch (error) {
            console.log( error );
            abortarMision();
        }

    }

    //* ACTUALIZADO CON BACKEND NODE
    //TODO: Validaciones
    const startObtenerChapterPorUID = async( chapterID = '' ) => {

        if ( chapterID === '' ) return abortarMision();

        try {

            dispatch( onLoading() );
            dispatch( onResetCounter());

            const { data: chapter } = await mangaApi.get( `/chapters/byid/${ chapterID }` );

            if( !chapter ) return abortarMision();

            const { data: listChapters } = await mangaApi.get( `/chapters/list/${ chapter.manga._id }` );
            
            dispatch( setActiveManga( chapter ) );
            dispatch( onSetListaCaps( listChapters ) );

            navigate(`/reading/${ chapter.uid }`);
            
        } catch (error) {
            console.log(error);
            abortarMision();
        }

    }

    const abortarMision = () => {

        navigate('/home');
        startLimpiarMangaActivo();
        dispatch( clearActiveManga() );
    }

    const startLimpiarMangaActivo = () => {
        dispatch( clearActiveManga() );
        dispatch( onResetCounter() );
        dispatch( onCloseModal() );
    }

    return {
        //* Propiedades y Objetos
        activeManga,
        isLoading,
        mangas,

        //* Funciones y Metodos
        startLimpiarMangaActivo,
        startObtenerChapterPorUID,
        startObtenerTitulosMangas,
        startObtenerUltimoCap,
    }

}