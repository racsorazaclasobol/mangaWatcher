import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";

import { FirebaseDB } from "../../firebase/config";
import { clearActiveManga, onLoading, onLoadMangas, setActiveManga } from "../../store/mymanga/mangaSlice";
import { onCloseModal, onResetCounter } from "../../store/ui/uiSlice";

export const useMangaStore = () => {

    const dispatch = useDispatch();
    const { mangas, activeManga, isLoading } = useSelector( state => state.manga )

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

    const startObtenerUltimoCap = async ( mangaId ) => {

        dispatch( onLoading() );

        const mangaChapters = [];
        const chaptersNumber = [];

        const docRef = doc( FirebaseDB, `mangas/${ mangaId }` );
        const mangaInfo = await getDoc( docRef );

        const { titulo } = mangaInfo.data();
        
        const collRef = collection( FirebaseDB, `mangas/${ mangaId }/capitulos` );
        const mangaDoc = await getDocs( collRef );
                
        mangaDoc.forEach( chapter => {
            mangaChapters.push( { id: chapter.id, tituloManga: titulo, ...chapter.data() } );
            chaptersNumber.push( chapter.id );
        } )
        
        const lastChapter = Math.max( ...chaptersNumber );
        const chapter = mangaChapters.filter( chapter => chapter.id === lastChapter.toString() );

        dispatch( setActiveManga( chapter[0] ) );

    }

    const startObtenerPorCapitulo = async ( mangaId ) => {

        dispatch( onLoading() );

        const mangaChapters = [];
        const chaptersNumber = [];

        const docRef = doc( FirebaseDB, `mangas/${ mangaId }` );
        const mangaInfo = await getDoc( docRef );

        const { titulo } = mangaInfo.data();
        
        const collRef = collection( FirebaseDB, `mangas/${ mangaId }/capitulos` );
        const mangaDoc = await getDocs( collRef );
                
        mangaDoc.forEach( chapter => {
            mangaChapters.push( { id: chapter.id, tituloManga: titulo, ...chapter.data() } );
            chaptersNumber.push( chapter.id );
        } )
        
        const lastChapter = Math.max( ...chaptersNumber );
        const chapter = mangaChapters.filter( chapter => chapter.id === lastChapter.toString() );

        dispatch( setActiveManga( chapter[0] ) );

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