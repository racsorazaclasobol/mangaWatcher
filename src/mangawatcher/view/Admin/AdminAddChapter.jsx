import { useEffect, useRef, useState } from "react";

import Swal from 'sweetalert2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LogoutOutlined } from "@mui/icons-material";
import { Button, Divider, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

import { useForm } from "../../../hooks"
import { useUIStore, useAdminStore, useAuthStrore } from "../../hooks";
import { CardImagePreview, ChapterImagePreview, SimboloCargando, Breakpoints } from "../../components";


const initialForm = {
	manga: '',
	titulo: '',
	capitulo: '',
	paginas: []
}

const formValidation = {
	manga:		[ (value) => value.length > 0, 	'El manga es obligatorio.'],
	capitulo:   [ (value) => value.length > 0 , 'El capítulo es obligatorio.'],
	titulo:  	[ (value) => value.length > 1,  'El título del capitulo es obligatorio'],
  }

export const AdminAddChapter = () => {
	
	const { 
			//Parametros y Objetos
			infoManga, 
			isCreating, 
			isLoading, 
			listMangaTitles, 
			message, 

			//Metodos y funciones
			startClearStore, 
			startObtenerTitulosMangas,
			startStoreNuevoCapitulo, 
			startSaveChapter, 

		} = useAdminStore();

		
	const { styleMode } = useUIStore();
	const { startLogout, user } = useAuthStrore();
	
	const { 
			formState, manga, capitulo, titulo, isFormValid, mangaValid, capituloValid, tituloValid, 
			onInputChange, onResetForm, onInputCustomChange 

		} = useForm(initialForm, formValidation);
	
	const [thanksTitlesList, setThanksTitlesList] = useState([]);
	const [coverTitlesLists, setCoverTitlesLists] = useState([]);
	const [chapterTitlesList, setChapterTitlesLists] = useState([]);
	const [extrasTitlesList, setExtrasTitlesList] = useState([]);

	const [ultimoCapitulo, setUltimoCapitulo] = useState(null);

	const [formSubmitted, setFormSubmitted] = useState(false);
	const [validacionImagenes, setValidacionImagenes] = useState(null);
	
	const thanksInputRef = useRef();
	const coversInputRef = useRef();
	const chapterInputRef = useRef();
	const extrasInputRef = useRef();

	const onImageInputChange = ( { target }, tipo ) => {

		if( target.files === 0 ) return;
		
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

	const extractCardFile = ( targetFiles ) => {

		let files = [];

		for ( const file of targetFiles ){
			const result = previewImages( file );
			files.push( result );
		}

		return files;

	}
	
	const previewImages = ( file ) => {
		
		const url = URL.createObjectURL( file );

		const cardFile = { image: url, name: file.name, file }
		
		return cardFile;
		
	}

	const onClearForm = () => {
		
		onResetForm();
		setChapterTitlesLists([]);
		setCoverTitlesLists([]);
		setExtrasTitlesList([]);
		setThanksTitlesList([]);
		setUltimoCapitulo(null);
		setFormSubmitted(false);

		startClearStore();
		
		window.location.reload(true);

	}

	const onSaveManga = () => {

		setFormSubmitted(true);
		const allImages = [ ...thanksTitlesList, ...coverTitlesLists, ...chapterTitlesList, ...extrasTitlesList ];

		if( !isFormValid || allImages.length === 0 ) {
			if ( allImages.length === 0 ) setValidacionImagenes('Las imágenes del manga son obligatorias');
			return;
		}

		startSaveChapter( allImages );

	}

	const alertDemoMessage = () => {

		alert('Cuenta Demo - No se permite guardar');

	}

	const onLogout = () => {
		startLogout();
	}

	useEffect(() => {
		startStoreNuevoCapitulo( formState );
	}, [formState])

	useEffect( () => {
		if( message !== '' ){
			Swal.fire( 'Guardado Correctamente', message, 'success' )
			onClearForm();
		}
	},[ message ] )

	useEffect(() => {
		
		if ( !manga || !listMangaTitles || listMangaTitles?.length === 0 ) return;

		let { lastChapter } = listMangaTitles.filter( ({ uid }) => uid === manga )[0];


		setUltimoCapitulo( lastChapter );
		 
		const target = {
			value: lastChapter += 1, 
			name: 'capitulo'
		}
		
		onInputCustomChange( target );

  	}, [ manga ])

	useEffect(() => {

		startObtenerTitulosMangas();
	
	}, [])

	return (
		<>
				{
					( isCreating || isLoading )
					? (<SimboloCargando />)
					: (<></>)
				}

				<Grid container minHeight='100vh' direction='column'  >	

					<Grid container direction='row' justifyContent='center' sx={{ backgroundColor: `${ styleMode }.dark` }} minHeight='100vh' pb={ 5 } >
						
						<Grid item xs={ 12 } md={ 10 } lg={ 10 } sx={{ backgroundColor: `${ styleMode }.gray.claro` }} p={5} >
							<Grid container spacing={ 2 }>
								<Breakpoints />
								<Grid item xs={ 11 }  >
									<Typography variant="h4">
										Subir Capitulos
									</Typography>
								</Grid>

								<Grid item xs={ 1 }  >
									<IconButton color="error" onClick={ onLogout } >
										<LogoutOutlined sx={{ fontSize:'30px' }}/> 
									</IconButton>
								</Grid>

								<Grid item xs={ 12 } mb={ 5 }>
									<Divider />
								</Grid>

								<Grid item xs={ 12 } mb={ 3 }>
									<Typography variant="h5">
										Informacion del Manga
									</Typography>								
									<Divider />
								</Grid>

								<Grid item xs={ 12 } sm={ 7 } lg={ 5 }>
									<FormControl fullWidth>
										<InputLabel id="animeTitleLabel">Titulo del manga</InputLabel>
										<Select
											labelId="animeTitleLabel"
											value={ manga }
											label="Titulo del Manga"
											name="manga"
											onChange={ onInputChange }
											error={ !!mangaValid && formSubmitted && !isFormValid }
										>
											{
												listMangaTitles.map( ({ uid, nombre }) => (

													<MenuItem key={uid} value={ uid } > { nombre } </MenuItem>

												) )
											}
											
										</Select>
										<FormHelperText sx={{ color: 'red' }}> { ( formSubmitted ) ? mangaValid : '' } </FormHelperText>
									</FormControl>
								</Grid>

								<Grid item xs={ 12 } sm={ 5 } lg={ 2 }>
									<TextField
										type="number"
										fullWidth
										placeholder="Ingrese Capítulo"
										label={ ( ultimoCapitulo ) ? `Ult: ${ ultimoCapitulo }` : 'Capítulo' }
										name="capitulo"
										value={ capitulo }
										onChange={ onInputChange }
										error={ !!capituloValid && formSubmitted }
										helperText={ ( formSubmitted && !isFormValid ) ? capituloValid : '' }
									/>
									
								</Grid>

								<Grid item xs={ 12 } lg={ 5 }>
									<TextField
										type="text"
										fullWidth
										placeholder="Titulo del Capítulo"
										label="Titulo Capitulo"
										name="titulo"
										value={ titulo }
										onChange={ onInputChange }
										error={ !!tituloValid && formSubmitted }
										helperText={ ( formSubmitted && !isFormValid ) ? tituloValid : '' }
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
										accept=".webp" 
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
											thanksTitlesList.map( thanksFile => (

												<ChapterImagePreview key={ thanksFile.name } image={ thanksFile.image } title={ thanksFile.name } />

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
										accept=".webp" 
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
											coverTitlesLists.map( coverFile => (

												<ChapterImagePreview key={ coverFile.name } image={ coverFile.image } title={ coverFile.name }  />

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
										accept=".webp" 
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
											chapterTitlesList.map( chapterFile => (

												<ChapterImagePreview key={ chapterFile.name } image={ chapterFile.image } title={ chapterFile.name } />

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
										accept=".webp" 
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
											extrasTitlesList.map( extraFile => (

												<ChapterImagePreview key={ extraFile.name } image={ extraFile.image } title={ extraFile.name } />

											) )
										}
									</Grid>
								</Grid>

								{/* FIN IMAGENES DE EXTRAS */}
								
							</Grid>

							<Grid container justifyContent="space-between">
									
								<Grid item xs={ 12 } mt={ 5 } mb={ 5 }>
									<Divider />
								</Grid>

									{
										( user.uid === '1lnvyT41idVffnkoQqlW0NivKj33' )
										? ( <Button variant="contained" onClick={ alertDemoMessage }> Guardar </Button> )
										: ( <Button variant="contained" onClick={ onSaveManga }> Guardar </Button> )
									}

									<Button variant="contained" color="error" onClick={ onClearForm }> Cancelar </Button>
												
							</Grid>
						</Grid>

					</Grid>
					
				</Grid>
		</>
	)
}



