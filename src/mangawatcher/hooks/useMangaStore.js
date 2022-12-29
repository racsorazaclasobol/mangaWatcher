import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";

import { FirebaseDB } from "../../firebase/config";
import { clearActiveManga, onLoading, onLoadMangas, onSetListaCaps, onSetTitleActiveManga, setActiveManga } from "../../store/mymanga/mangaSlice";
import { onCloseModal, onResetCounter } from "../../store/ui/uiSlice";
import { useUIStore } from "./useUiStore";

export const useMangaStore = () => {

    const dispatch = useDispatch();
    const { mangas, tituloManga, activeManga, isLoading } = useSelector( state => state.manga )
    const { navigate, resetCounter } = useUIStore();

    const startObtenerTitulosMangas = async() => {

        dispatch( onLoading() );
        
        const mangaTitles = [];

        try {

            const collRef = collection( FirebaseDB, 'mangas' );
            const mangaDoc =  await getDocs( collRef );
                
            mangaDoc.forEach( doc => {
                mangaTitles.push( { id: doc.id, ...doc.data() } );
            } )
            
            dispatch( onLoadMangas( mangaTitles ) );

        } catch (error) {

        }

    }

    const startObtenerUltimoCap = async ( mangaId = '', tituloManga = '' ) => {
        
        if( mangaId === '' ) {
            abortarMision();
            return;
        }

        dispatch( onLoading() );
        dispatch( onResetCounter());

        const mangaChapters = [];
        const chaptersNumber = [];

        if( tituloManga === ''){
            const infoMangaRef = doc( FirebaseDB, `mangas/${ mangaId }` );
            const infoManga = await getDoc( infoMangaRef );

            if( !infoManga.data() ) {
                abortarMision() 
                return; 
            };

            const { titulo } = infoManga.data()
            tituloManga = titulo;
        }
        
        const mandaChapterRef = collection( FirebaseDB, `mangas/${ mangaId }/capitulos` );
        const mangaChapter = await getDocs( mandaChapterRef );
                
        mangaChapter.forEach( chapter => {
            mangaChapters.push( { id: chapter.id, tituloManga, ...chapter.data() } );
            chaptersNumber.push( chapter.id );
        } )

        const lastChapter = Math.max( ...chaptersNumber );
        const chapter = mangaChapters.filter( chapter => chapter.id === lastChapter.toString() );
        
        dispatch( setActiveManga( chapter[0] ) );
        dispatch( onSetListaCaps( chaptersNumber ) );

    }

    const startObtenerPorCapitulo = async ( mangaId = '', chapterNumber = 0, tituloManga = '' ) => {
        
        try {
            
            if( mangaId === '' || chapterNumber === 0 ) {
                abortarMision() 
                return; 
            };

            dispatch( onLoading() );
            dispatch( onResetCounter() );

            
            const chaptersNumber = [];

            if( tituloManga === ''){
                const infoMangaRef = doc( FirebaseDB, `mangas/${ mangaId }` );
                const infoManga = await getDoc( infoMangaRef );

                if( !infoManga ) {
                    abortarMision() 
                    return; 
                };

                const { titulo } = infoManga.data()
                tituloManga = titulo;
            }

            const mangaChapterRef = doc( FirebaseDB, `mangas/${ mangaId }/capitulos/${ chapterNumber }` );
            const mangaChapter = await getDoc( mangaChapterRef );

            if( !mangaChapter.data() ) {
                abortarMision() 
                return; 
            };

            const listaChaptersRef = collection( FirebaseDB, `mangas/${ mangaId }/capitulos` );
            const listaChapters = await getDocs( listaChaptersRef );

            if( !listaChapters ) {
                abortarMision() 
                return; 
            };

                    
            listaChapters.forEach( chapter => {
                chaptersNumber.push( chapter.id );
            } )
            
            const chapter = { ...mangaChapter.data(), tituloManga }
            
            dispatch( setActiveManga( chapter ) );
            dispatch( onSetListaCaps( chaptersNumber ) )
            
        } catch (error) {
            console.log(error);
            abortarMision();
        }
    }

    const abortarMision = () => {

        navigate('/home');
        resetCounter();
        dispatch( clearActiveManga() );
    }

    const startLimpiarMangaActivo = () => {
        dispatch( clearActiveManga() );
        dispatch( onResetCounter() );
        dispatch( onCloseModal() );
    }

    return {
        //* Propiedades y Objetos
        mangas,
        activeManga,
        isLoading,

        //* Funciones y Metodos
        startObtenerTitulosMangas,
        startObtenerUltimoCap,
        startLimpiarMangaActivo,
        startObtenerPorCapitulo,
    }

}