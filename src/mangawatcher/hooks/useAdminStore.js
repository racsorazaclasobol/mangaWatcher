import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import mangaApi from "../../api/mangaApi";
import { onCreating, onSetNewChapter, onCreatedDone, onClearStore, onLoading, onSetInfoManga, onSetMangaTitles, onSetChapetrsTitles, onSetErrorMessage } from "../../store/admin/adminSlice";

export const useAdminStore = () => {

    const dispatch = useDispatch();

    const { listMangaTitles, listChaptersTitles, newChapter, message, errorMessage, isCreating, isLoading, infoManga } = useSelector( state => state.admin );
    const { mangas: mangaList } = useSelector( state => state.manga );


    const startClearStore = () => {
        dispatch ( onClearStore() );
    }

    const startReportarError = ( ok, title, msg, type ) => {

        dispatch( onSetErrorMessage( { ok, title, msg } ) );

    }

    /* **************************************** */
    /*          MANEJO DE CHAPTERS              */
    /* **************************************** */

    const startStoreNuevoCapitulo = ( formState ) => {

        dispatch( onSetNewChapter( formState ) );

    }

    const startObtenerChapterPorUID = async( chapterUid = '' ) => {

        try {

            dispatch( onLoading() );

            const { data: chapter } = await mangaApi.get( `/chapters/byid/${ chapterUid }` );
            
            dispatch( onSetInfoManga( chapter ) );
            
        } catch (error) {
            console.log(error);
        }

    }

    //TODO: Validaciones
    const startObtenerListaCapitulos = async( mangaUid = '' ) => {

        dispatch( onLoading() );

        const { data } = await mangaApi.get( `/chapters/list/${ mangaUid }` );

        dispatch( onSetChapetrsTitles( data ) )

    }

    const startUpdateChapter = async( chapter ) => {

        dispatch( onLoading() );

        const { uid, ...chapterToUpdate } = chapter;
        const { paginas } = chapterToUpdate;

        const { data } = await mangaApi.put( `/${ uid }`, chapterToUpdate )

    }

    const startSaveChapter = async ( files = [] ) => {

        dispatch( onLoading() );
        
        try {

            if( files.length <= 4 ) return dispatch( onSetErrorMessage({ ok: false, title: 'Hay un problema con su publicación', msg: 'Debe subir al menos 5 páginas', type: 'warning' }) )
        
            const chapterToSave = { ...newChapter };
            
            let formData = new FormData();
            
            const { data } = await mangaApi.post( '/chapters/', chapterToSave );

            if( !data ) return onSetErrorMessage({ ok: false, title: 'Ha ocurrido un error', msg: 'Ha ocurrido un error subiendo el capítulo', type: 'error' })
            
            for ( const fileSelected of files ) {
                const { file } = fileSelected;
                formData.append( 'archivo', file );
            }
            
            await mangaApi.put( `/uploads/${ data.uid }`, formData, { headers: { 'Content-Type': 'multipart/form-data' } } );

            dispatch( onCreatedDone('Capítulo agregado correctamente.') );
            
        } catch (error) {
            const { response }  = error;
            const { data }      = response;

            onSetErrorMessage({ ok: false, title: 'Ha ocurrido un error', msg: data.msgError, type: 'error' })
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

    const startGetMangaInfo = async ( uid ) => {

        try {

            dispatch( onCreating( true ) );

            const { data } = await mangaApi.get( `/mangas/${ uid }` );

            dispatch( onSetInfoManga( data ) );
            
        } catch (error) {
            console.log(error)
        }

    }

    const startUpdateManga = async ( manga ) => {

        dispatch( onCreating( true ) );
        
        try {
        
            const { portada, ...mangaToUpdate } = manga;
            const { uid } = mangaToUpdate;

            if( typeof portada === 'string' ){
                
                await mangaApi.put( `/mangas/${ uid }`, manga );
                
                dispatch( onCreatedDone('Manga agregado correctamente.') );
                
                return;
            }

            let formData = new FormData();
            formData.append( 'archivo', portada );     
            
            const { data } = await mangaApi.put( `/mangas/${ uid }`, mangaToUpdate );
        
            await mangaApi.put( `/uploads/portada-manga/${ data.uid }`, formData, { headers: { 'Content-Type': 'multipart/form-data' } } );

            dispatch( onCreatedDone('Manga agregado correctamente.') );
            
        } catch (error) {
            console.log(error);
            const { data } = error.response;

            dispatch( onSetErrorMessage({ ok: false, title: 'Ha ocurrido un error', msg: data.msg, type: 'error' }) );
        }        
    }

    


    return {
        //Propiedades y Objetos
        infoManga,
        isCreating,
        isLoading,
        listChaptersTitles,
        listMangaTitles,
        mangaList,
        message,
        errorMessage,

        //Metodos y Funciones
        startClearStore,
        startReportarError,
        startObtenerChapterPorUID,
        startObtenerListaCapitulos,
        startObtenerTitulosMangas,
        startObtenerUltimoCap,
        startSaveChapter,
        startStoreNuevoCapitulo,
        startUpdateChapter,

        startSaveManga,
        startUpdateManga,
        startGetMangaInfo,
    }

}