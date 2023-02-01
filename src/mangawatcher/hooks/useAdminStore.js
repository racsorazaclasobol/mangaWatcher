import { useDispatch, useSelector } from "react-redux";
import mangaApi from "../../api/mangaApi";
import { onCreating, onSetNewChapter, onCreatedDone, onClearStore, onLoading, onSetInfoManga, onSetMangaTitles } from "../../store/admin/adminSlice";

export const useAdminStore = () => {

    const dispatch = useDispatch();

    const { listMangaTitles, newChapter, message, isCreating, isLoading, infoManga } = useSelector( state => state.admin );
    const { mangas: mangaList } = useSelector( state => state.manga );


    const startClearStore = () => {
        dispatch ( onClearStore() );
    }

    /* **************************************** */
    /*          MANEJO DE CHAPTERS              */
    /* **************************************** */

    const startStoreNuevoCapitulo = ( formState ) => {

        dispatch( onSetNewChapter( formState ) );

    }

    //TODO: Validaciones
    const startSaveChapter = async ( files = [] ) => {

        dispatch( onCreating( true ) );
        
        try {
        
            const chapterToSave = { ...newChapter };
            
            let formData = new FormData();
            
            const { data } = await mangaApi.post( '/chapters/', chapterToSave );
            
            for ( const fileSelected of files ) {
                const { file } = fileSelected;
                formData.append( 'archivo', file );                
            }
            
            await mangaApi.put( `/uploads/${ data.uid }`, formData, { headers: { 'Content-Type': 'multipart/form-data' } } );

            dispatch( onCreatedDone('Capítulo agregado correctamente.') );
            
        } catch (error) {
            console.log(error)
            
        }        
    }

    //TODO: Validaciones
    const startObtenerTitulosMangas = async() => {

        dispatch( onLoading() );

        try {
            
            let mangaList = [];

            const { data } = await mangaApi.get( '/mangas/' );

            for (const manga of data) {

                const { data } = await mangaApi.get( `/chapters/last/${ manga.uid }` );
                
                const newManga = { ...manga, lastChapter: data.capitulo };
                
                mangaList.push( newManga );
                
            };

            dispatch( onSetMangaTitles( mangaList ) );
            
        } catch (error) {
            console.log(error)
            
        }

    }

    //TODO: Validaciones
    const startObtenerUltimoCap = async ( mangaId = '' ) => {

        try {
            
            if( mangaId === '' ) return;
    
            dispatch( onLoading() );
            dispatch( onResetCounter());
            
            const { data: chapter } = await mangaApi.get( `/chapters/last/${ mangaId }` );

            dispatch( onSetInfoManga( chapter ) );

        } catch (error) {
            console.log( error );
            //TODO: Mejorar manejo del error
        }

    }

    /* **************************************** */
    /*            MANEJO DE MANGAS              */
    /* **************************************** */

        //TODO: Validaciones
        const startSaveManga = async ( manga ) => {

            dispatch( onCreating( true ) );
            
            try {
            
                const { portada, ...mangaToSave } = manga;
                
                let formData = new FormData();
                formData.append( 'archivo', portada );                
                
                const { data } = await mangaApi.post( '/mangas/', mangaToSave );
                
                await mangaApi.put( `/uploads/portada-manga/${ data.uid }`, formData, { headers: { 'Content-Type': 'multipart/form-data' } } );
    
                dispatch( onCreatedDone('Manga agregado correctamente.') );
                
            } catch (error) {
                console.log(error)
                
            }        
        }

    


    return {
        //Propiedades y Objetos
        infoManga,
        isCreating,
        isLoading,
        mangaList,
        message,
        listMangaTitles,

        //Metodos y Funciones
        startSaveChapter,
        startStoreNuevoCapitulo,
        startClearStore,
        startObtenerUltimoCap,
        startObtenerTitulosMangas,

        startSaveManga,
    }

}