import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseDB } from "../../firebase/config";
import { onCreating, setImagesNewChapter, onSetNewChapter, onCreatedDone, onClearStore, onLoading, onSetInfoManga } from "../../store/admin/adminSlice";
import { fileUpload } from "../helpers/fileUpload";

export const useAdminStore = () => {

    const dispatch = useDispatch();

    const { newChapter, message, isCreating, isLoading, infoManga } = useSelector( state => state.admin );
    const { mangas: mangaList } = useSelector( state => state.manga );

    const startSubirImagenes = async ( files = [] ) => {

        dispatch( onCreating( true ) );

        for ( const file of files ) {
            file.url = await fileUpload( file.file )
        }

        const filesToUpload = files.map( (currentValue, index, array) => {

            const tipo = currentValue.name.charAt(0);
            const paginaSinExtencion = currentValue.name.replace('.webp', '');
            const pagina = paginaSinExtencion.replace(tipo, '');

            return {
                pagina: pagina,
                tipo: tipo,
                url: currentValue.url
            }
        });

        dispatch( setImagesNewChapter( filesToUpload ) );

        startGuardarCapitulo( filesToUpload );
    }

    const startGuardarCapitulo = async( paginas ) => {
        
        try {
            
            const chapterToFirestore = { ...newChapter };
            chapterToFirestore.paginas = paginas;

            const docRef = doc( FirebaseDB, `mangas/${ newChapter.manga }/capitulos/${ newChapter.capitulo }` );
            await setDoc( docRef, chapterToFirestore, { merge: true } );
            
            dispatch( onCreatedDone('Capítulo agregado correctamente.') );
            
        } catch (error) {
            console.log(error)
        }
    }

    const startStoreNuevoCapitulo = ( formState ) => {

        dispatch( onSetNewChapter( formState ) );

    }

    const startClearStore = () => {
        dispatch ( onClearStore() );
    }

    const startObtenerUltimoCap = async ( mangaId, titulo ) => {

        dispatch( onLoading() );

        const mangaChapters = [];
        const chaptersNumber = [];

        const collRef = collection( FirebaseDB, `mangas/${ mangaId }/capitulos` );
        const mangaDoc = await getDocs( collRef );

        mangaDoc.forEach( chapter => {
            mangaChapters.push( { id: chapter.id, tituloManga: titulo, ...chapter.data() } );
            chaptersNumber.push( chapter.id );
        } )
        
        const lastChapter = Math.max( ...chaptersNumber );
        const chapter = mangaChapters.filter( chapter => chapter.id === lastChapter.toString() );

        dispatch( onSetInfoManga( chapter[0] ) );

    }


    return {
        //Propiedades y Objetos
        mangaList,
        message,
        isCreating,
        isLoading,
        infoManga,

        //Metodos y Funciones
        startSubirImagenes,
        startStoreNuevoCapitulo,
        startClearStore,
        startObtenerUltimoCap,
    }

}