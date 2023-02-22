import { useEffect, useRef, useState } from "react";
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import { useForm } from "../../../hooks";
import { ChapterImagePreview, HeaderManagers, SimboloCargando } from "../../components"
import { useAdminStore, useUIStore } from "../../hooks"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

let initialFilter = { manga: '', chapter: '' };

export const AdminEditChapter = () => {

	const [validacionImagenes, setValidacionImagenes] = useState(null);
	const [capitulo, setCapitulo] = useState('');
	const [titulo, setTitulo] = useState('');

    const thanksInputRef = useRef();
	const coversInputRef = useRef();
	const chapterInputRef = useRef();
	const extrasInputRef = useRef();

    const [thanksTitlesList,    setThanksTitlesList] = useState([]);
	const [coverTitlesLists,    setCoverTitlesLists] = useState([]);
	const [chapterTitlesList,   setChapterTitlesLists] = useState([]);
	const [extrasTitlesList,    setExtrasTitlesList] = useState([]);

    const { styleMode } = useUIStore();
    const { 
        //Objetos y Variables
        isLoading,
        listMangaTitles,
        listChaptersTitles,
        infoManga,
        errorMessage,
        formatImages,

        // Funciones
        startObtenerTitulosMangas,
        startObtenerListaCapitulos,
        startObtenerChapterPorUID,
        startUpdateChapter,
        startReportarError,
        startClearStore,

    } = useAdminStore();

    const { formState, 
            manga, 
            chapter,

            onInputChange
        } = useForm(initialFilter);
    
    const onUpdateChapter = () => {

        const paginas = [ ...thanksTitlesList, ...coverTitlesLists, ...chapterTitlesList, ...extrasTitlesList ];

        const chapterToUpdate = {
            uid: chapter,
            titulo,
            capitulo,
            paginas
        }

        startUpdateChapter( chapterToUpdate );

    }

    const onImageInputChange = ( { target }, tipo ) => {

        if( target.files === 0 ) return;

		if ( !validateFormat( target.files[0].type ) ) return; 
        
        const filePreview = extractCardFile( target.files );

        switch (tipo) {
            case 'A':
                setThanksTitlesList( filePreview );
                break;
            
            case 'P':
                setCoverTitlesLists( filePreview );
                break;

            case 'C':
                setChapterTitlesLists( filePreview );
                break;

            case 'E':
                setExtrasTitlesList( filePreview );
                break;
        
            default:
                break;
        }
    }

    const cargarInfoChapter = async() => {

        const { titulo, estado, capitulo, paginas  } = infoManga;

        setCapitulo( capitulo );
        setTitulo( titulo );

        let thanksPages = [];
        let coverPages  = [];
        let chapterPages = [];
        let extrasPages = [];


        paginas.forEach( ({ pagina, tipo, url, _id })  => {

            switch (tipo) {
                case 'A':
                    thanksPages.push( { pagina, tipo, url, _id } );
                    break;
                case 'P':
                    coverPages.push( { pagina, tipo, url, _id } );
                    break;
                case 'C':
                    chapterPages.push( { pagina, tipo, url, _id } );
                    break;
                case 'E':
                    extrasPages.push( { pagina, tipo, url, _id } );
                    break;
                default:
                    break;
            }            
        });

        setThanksTitlesList(thanksPages);
        setCoverTitlesLists(coverPages);
        setChapterTitlesLists(chapterPages);
        setExtrasTitlesList(extrasPages);


    }

    const validateFormat = ( fileFormat ) => {
		if( formatImages.includes( fileFormat ) ) return true;

		startReportarError(false, 'Formato inválido', 'Los formatos permitidos son: webp, png, jfif, jpg, jpeg', 'warning');
		return false;

	}

    useEffect( () => {

		if ( !errorMessage ) return;
		const { ok, title, msg, type } = errorMessage;

		Swal.fire( title, msg, type )
		.then( resp => {
			if( resp.isConfirmed || resp.isDismissed ){
				startClearStore();
			}
		});

			
	},[ errorMessage ] )

    useEffect( () => {

        if( !infoManga ) return;

        cargarInfoChapter();

    }, [ infoManga ]);

    useEffect(() => {

        if( !chapter ) return;

		startObtenerChapterPorUID( chapter );
	
	}, [ chapter ])    

    useEffect(() => {

        if( !manga ) return;

		startObtenerListaCapitulos( manga );
	
	}, [ manga ])    

    useEffect(() => {

		startObtenerTitulosMangas();
	
	}, [])    
    
    return (

        <>
            {
                ( isLoading )
                ? (<SimboloCargando />)
                : (<></>)
            }
            <Grid container direction='row' justifyContent='center' minHeight='100vh' pb={ 5 } sx={{ backgroundColor: `${ styleMode }.dark` }} >
                <Grid item xs={ 12 } md={ 10 } lg={ 9 } p={ 5 } sx={{ backgroundColor: `${ styleMode }.gray.claro` }} >
                    
                    <Grid container spacing={ 2 }>
                        
                        <HeaderManagers titulo="Editar Chapter" />

                        <Grid item xs={ 12 } sm={ 7 } lg={ 6 }>
                            <FormControl fullWidth>
                                <InputLabel id="animeTitleLabel">Titulo del manga</InputLabel>
                                <Select
                                    labelId="animeTitleLabel"
                                    value={ manga }
                                    label="Titulo del Manga"
                                    name="manga"
                                    onChange={ onInputChange }
                                    defaultValue={ 0 }
                                    >
                                    <MenuItem value={ 0 } disabled> Seleccione </MenuItem>
                                    {
                                        listMangaTitles.map( ({ uid, nombre }) => (
                                            
                                            <MenuItem key={uid} value={ uid } > { nombre } </MenuItem>
                                            
                                            ) )
                                        }
                                    
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 7 } lg={ 6 }>
                            <FormControl fullWidth>
                                <InputLabel id="animeTitleLabel">Titulo del Chapter</InputLabel>
                                <Select
                                    labelId="animeTitleLabel"
                                    value={ chapter }
                                    label="Titulo del Chapter"
                                    name="chapter"
                                    onChange={ onInputChange }
                                    defaultValue={ 0 }
                                    >
                                    <MenuItem value={ 0 } disabled> Seleccione </MenuItem>
                                    {
                                        listChaptersTitles.map( ({ uid, titulo, capitulo }) => (
                                            
                                            <MenuItem key={uid} value={ uid } >{ capitulo } - { titulo }</MenuItem>
                                            
                                            ) )
                                        }
                                    
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={ 12 } mt={ 2 } mb={ 2 }>
                            <Typography variant="h5">
                                Informacion del Manga
                            </Typography>								
                            <Divider />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 5 } lg={ 4 }>
                            <TextField
                                type="number"
                                fullWidth
                                placeholder="Ingrese Capítulo"
                                label="Capítulo"
                                name="capitulo"
                                value={ capitulo }
                                onChange={ ( e ) => setCapitulo( e.target.value ) }
                            />
                            
                        </Grid>

                        <Grid item xs={ 12 } lg={ 8 }>
                            <TextField
                                type="text"
                                fullWidth
                                placeholder="Ingrese un Título"
                                label="Título"
                                name="titulo"
                                value={ titulo }
                                onChange={ ( e ) => setTitulo( e.target.value ) }
                            />
                            
                        </Grid>

                        <Grid item xs={ 12 } mb={ 3 } mt={ 5 }>
                            <Typography variant="h5">
                                Paginas del Manga
                            </Typography>								
                            <Divider />
                        </Grid>

                        {/* INICIO IMAGENES DE AGRADECIMIENTO */}
                        {/* Mensaje validacion imagenes */}
                        {
                            ( validacionImagenes )
                            ? ( <Grid xs={ 12 }><Typography color='red'> { validacionImagenes } </Typography></Grid> )
                            : ( <></> )
                        }

                        <Grid item xs={ 12 } md={ 9 } >
                            <Typography variant="h6">
                                Imagenes de Agradecimiento
                            </Typography>								
                            <Divider />
                        </Grid>


                        <Grid item xs={ 12 } md={ 3 }  >
                            <input
                                type="file"
                                accept={ formatImages } 
                                multiple
                                ref={ thanksInputRef }
                                onChange={ (e) => onImageInputChange(e, 'A' ) }
                                style={{ display:'none' }}
                            />
                            
                            <Button
                                variant="outlined"
                                onClick={ () => thanksInputRef.current.click() }
                            >
                                <CloudUploadIcon sx={{ mr: 2 }} />
                                Subir Imagenes
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } >		
                            <Grid container spacing={ 2 }>							
                                {
                                    thanksTitlesList.map( ( thanksFile, index, array ) => (

                                        <ChapterImagePreview key={ index } image={ thanksFile.url }  />

                                    ) )
                                }
                            </Grid>
                        </Grid>

                        {/* FIN IMAGENES DE AGRADECIMIENTO */}

                        {/* INICIO IMAGENES DE PORTADA */}

                        <Grid item xs={ 12 } md={ 9 }>
                            <Typography variant="h6">
                                Imagenes de Portada
                            </Typography>								
                            <Divider />
                        </Grid>

                        <Grid item xs={ 12 } md={ 3 } >
                            <input
                                type="file"
                                accept={ formatImages } 
                                multiple
                                ref={ coversInputRef }
                                onChange={ (e) => onImageInputChange(e, 'P' ) }
                                style={{ display:'none' }}
                            />
                            
                            <Button
                                variant="outlined"
                                onClick={ () => coversInputRef.current.click() }
                            >
                                <CloudUploadIcon sx={{ mr:2 }} />
                                Subir Imagenes
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 }>		
                            <Grid container spacing={ 2 }>							
                                {
                                    coverTitlesLists.map( ( coverFiles, index, array ) => (

                                        <ChapterImagePreview key={ index } image={ coverFiles.url }  />

                                    ) )
                                }
                            </Grid>
                        </Grid>

                        {/* FIN IMAGENES DE PORTADA */}

                        {/* INICIO IMAGENES DEL CAPITULO */}

                        <Grid item xs={ 12 } md={ 9 }>
                            <Typography variant="h6">
                                Imagenes del Capitulo
                            </Typography>								
                            <Divider />
                        </Grid>

                        <Grid item xs={ 12 } md={ 3 }>
                            <input
                                type="file"
                                accept={ formatImages } 
                                multiple
                                ref={ chapterInputRef }
                                onChange={ (e) => onImageInputChange(e, 'C' ) }
                                style={{ display:'none' }}
                            />
                            
                            <Button
                                variant="outlined"
                                onClick={ () => chapterInputRef.current.click() }
                            >
                                <CloudUploadIcon sx={{ mr:2 }} />
                                Subir Imagenes
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } >		
                            <Grid container spacing={ 2 }>							
                                {
                                    chapterTitlesList.map( ( chapterFile, index, array ) => (

                                        <ChapterImagePreview key={ index } image={ chapterFile.url }  />

                                    ) )
                                }
                            </Grid>
                        </Grid>

                        {/* FIN IMAGENES DEL CAPITULO */}

                        {/* INICIO IMAGENES DE EXTRAS */}

                        <Grid item xs={ 12 } md={ 9 }>
                            <Typography variant="h6">
                                Imagenes de Extras
                            </Typography>								
                            <Divider />
                        </Grid>

                        <Grid item xs={ 12 } md={ 3 }>
                            <input
                                type="file"
                                accept={ formatImages }
                                multiple
                                ref={ extrasInputRef }
                                onChange={ (e) => onImageInputChange(e, 'E' ) }
                                style={{ display:'none' }}
                            />
                            
                            <Button
                                variant="outlined"
                                onClick={ () => extrasInputRef.current.click() }
                            >
                                <CloudUploadIcon sx={{ mr:2 }} />
                                Subir Imagenes
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } >		
                            <Grid container spacing={ 2 }>							
                                {
                                    extrasTitlesList.map( ( extraFiles, index, array ) => (

                                        <ChapterImagePreview key={ index } image={ extraFiles.url }  />

                                    ) )
                                }
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="space-between">
                                
                            <Grid item xs={ 12 } mt={ 5 } mb={ 5 }>
                                <Divider />
                            </Grid>


                            <Button variant="contained" onClick={ onUpdateChapter }> Guardar </Button>


                            <Link to='/admin'>
                                <Button variant="contained" color="error" > Cancelar </Button>
                            </Link>
												
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
