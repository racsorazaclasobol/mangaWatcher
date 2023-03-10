import { useDispatch, useSelector } from "react-redux";

import { clearActiveManga, onLoading, onLoadMangas, onSetListaCaps, setActiveManga } from "../../store/mymanga/mangaSlice";
import { onCloseModal, onResetCounter } from "../../store/ui/uiSlice";
import { useUIStore } from "./useUiStore";
import { compararDosFechas, parsearFecha, sumarDias } from '../../helpers/manageDates'
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
            
            let mangas = [];
            
            const fechaActual               = parsearFecha( new Date(), "DD-MM-YYYY" );
            for (const manga of data) {
                    
                const { data } = await mangaApi.get( `/chapters/titleLast/${ manga.uid }` );
                const { uid, fechaPublicacion, ...tempData } = data;
                
                const isFechaConsideradaNueva   = parsearFecha( sumarDias( fechaPublicacion, 3 ), "DD-MM-YYYY" );
                const isANewChapter             = compararDosFechas( isFechaConsideradaNueva, 'isSameOrAfter', fechaActual );
                
                tempData.isNew                  = isANewChapter;
    
                const tempManga = { ...manga, ...tempData };

                mangas.push( tempManga );

            }
            
            dispatch( onLoadMangas( mangas ) );

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
             
            //Agregamos ??ltima pagina fin
            chapter.paginas.push( { pagina: 1, tipo: 'F', url: 'https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_800/v1676218829/MyManga/assets/Fin_drbwxg.webp' } )

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

            //Agregamos ??ltima pagina fin
            chapter.paginas.push( { pagina: 1, tipo: 'F', url: 'https://res.cloudinary.com/dmuswnvaf/image/upload/c_scale,h_800/v1676218829/MyManga/assets/Fin_drbwxg.webp' } )

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