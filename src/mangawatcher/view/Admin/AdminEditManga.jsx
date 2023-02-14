import { useEffect, useRef, useState } from "react";
import { Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { LogoutOutlined } from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useForm } from "../../../hooks"
import { useAdminStore, useAuthStrore, useUIStore } from "../../hooks";
import { CardImagePreview, DemoUserButton, HeaderManagers } from "../../components";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

let initialForm = {
    uid: '',
    nombre: '',
    autor: '',
    portada: ''
}

export const AdminEditManga = () => {

	const { 
        //Parametros y Objetos
        listMangaTitles,
        infoManga,
        errorMessage,
        
        //Metodos y funciones
        startUpdateManga, 
        startObtenerTitulosMangas,
        startGetMangaInfo,
    } = useAdminStore();
        
    const { 
        manga, 
        nombre, 
        autor, 
        formState, 
        
        onInputChange, 
        onResetForm, 
        onInputCustomChange 
    } = useForm( initialForm );

    const portadaRef = useRef();
	const { styleMode } = useUIStore();
	const { user } = useAuthStrore();


    const [previewPortada, setPreviewPortada] = useState();
    const [mangaSelected, setMangaSelected] = useState( 0 );

    const onSaveManga = () => {

        console.log( formState )
        startUpdateManga( formState );

    }

    const onPortadaChange = ( { target } ) => {
        
        if ( !target.files[0] ) return;

        const fileUrl = previewImages( target.files[0] );

        const targetPortada = {
            name: 'portada',
            value: fileUrl.file
        }

        onInputCustomChange( targetPortada );

        setPreviewPortada( fileUrl.image );

    }

    const previewImages = ( file ) => {
		
		const url = URL.createObjectURL( file );

		const cardFile = { image: url, name: file.name, file }
		
		return cardFile;
		
	}

    const onChangeMangaSelected = ( { target } ) => {

        setMangaSelected( target.value );

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

    useEffect(() => {
        
        if( infoManga === null ) return;

        const { uid, nombre, autor, portada  } = infoManga;
        
        initialForm = {
            uid,
            nombre,
            autor,
            portada
        };

        setPreviewPortada( portada );

    }, [ infoManga ])

    useEffect(() => {
        
        if( mangaSelected === 0 ) return;
        
        startGetMangaInfo( mangaSelected );

    }, [ mangaSelected ])
    

    useEffect(() => {

		startObtenerTitulosMangas();
	
	}, [])


    return (    
        
        <Grid container minHeight='100vh' direction='column'  >	

					<Grid container direction='row' justifyContent='center' minHeight='100vh' pb={ 5 } sx={{ backgroundColor: `${ styleMode }.dark` }} >
						
						<Grid item xs={ 12 } md={ 10 } lg={ 9 } p={ 5 } sx={{ backgroundColor: `${ styleMode }.gray.claro` }} >
                            <Grid container spacing={ 2 }>
								
								<HeaderManagers titulo="Editar Manga" />

                                <Grid item xs={ 12 }>
									<Typography variant="h6">
										Seleccione un Manga
									</Typography>								
									<Divider />
								</Grid>

                                <Grid item xs={ 12 } mr={ 3 }  mb={ 3 }>
									<FormControl fullWidth>
										<InputLabel id="animeTitleLabel">Manga</InputLabel>
										<Select
											labelId="animeTitleLabel"
											value={ mangaSelected }
											label="Manga"
											name="manga"
											onChange={ onChangeMangaSelected }
                                            defaultValue = { 0 }
										>
                                            <MenuItem value={ 0 } disabled> Seleccione... </MenuItem>

											{
												listMangaTitles.map( ({ uid, nombre }) => (

													<MenuItem key={uid} value={ uid } > { nombre } </MenuItem>

												) )
											}
											
										</Select>
									</FormControl>
								</Grid>

								<Grid item xs={ 12 } mb={ 3 }>
									<Typography variant="h6">
										Informacion del Manga
									</Typography>								
									<Divider />
								</Grid>

                                <Grid container display={ ( mangaSelected === 0 ) ? 'none' : '' } className="animate__animated animate__fadeIn" spacing={ 2 }>
                                    <Grid item xs={ 12 } lg={ 6 } >
                                        <TextField
                                            type="text"
                                            fullWidth
                                            label="Manga"
                                            placeholder="Ingrese el nombre del manga"
                                            name="nombre"
                                            value={ nombre }
                                            onChange={ onInputChange }
                                        />
                                        
                                    </Grid>

                                    <Grid item xs={ 12 } lg={ 6 } >
                                        <TextField
                                            type="text"
                                            fullWidth
                                            placeholder="Ingrese el nombre del Autor"
                                            label="Autor"
                                            name="autor"
                                            value={ autor }
                                            onChange={ onInputChange }
                                        />
                                        
                                    </Grid>

                                    <Grid item xs={ 12 } mt={ 3 }>
                                        <input
                                            type="file"
                                            accept="image/*.webp" 
                                            multiple
                                            ref={ portadaRef }
                                            onChange={ onPortadaChange }
                                            style={{ display:'none' }}
                                        />
                                        
                                        <Button
                                            variant="outlined"
                                            onClick={ () => portadaRef.current.click() }
                                        >
                                            <CloudUploadIcon sx={{ mr:2 }} />
                                            Subir Portada
                                        </Button>
                                    </Grid>

                                    <Grid item xs={ 12 } mt={ 3 }>
                                        {
                                            ( previewPortada )
                                            ? ( <CardImagePreview  image={ previewPortada } title={ nombre } type={ '' } autor={ autor } /> )
                                            : ( <></> )
                                        }
                                    </Grid>
                                </Grid>

								
								
							</Grid>

							<Grid container justifyContent="space-between">
									
								<Grid item xs={ 12 } mt={ 5 } mb={ 5 }>
									<Divider />
								</Grid>

                                {
                                    ( user.uid === '1lnvyT41idVffnkoQqlW0NivKj33' )
                                    ? ( <DemoUserButton /> )
                                    : ( <Button variant="contained" onClick={ onSaveManga } > Guardar </Button> )
                                }
                                <Link to='/admin'>
                                    <Button variant="contained" color="error" > Cancelar </Button>
                                </Link>
												
							</Grid>
						</Grid>

					</Grid>
					
				</Grid>

    )
}
