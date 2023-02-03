import { useRef, useState } from "react";
import { Button, Divider, Grid, IconButton, TextField, Typography } from "@mui/material"
import { LogoutOutlined } from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useForm } from "../../../hooks"
import { useAdminStore, useUIStore } from "../../hooks";
import { CardImagePreview } from "../../components";
import { Breakpoints } from '../../components/Public/Breakpoints'


const initialForm = {
    nombre: '',
    autor: '',
    portada: ''
}

export const AdminAddManga = () => {

    const portadaRef = useRef();
	const { styleMode } = useUIStore();
	const { startSaveManga } = useAdminStore();
    const { nombre, autor, formState, onInputChange, onResetForm, onInputCustomChange } = useForm( initialForm );
    const [previewPortada, setPreviewPortada] = useState();

    const onSaveManga = () => {

        startSaveManga( formState );

    }

    const onPortadaChange = ( { target } ) => {
        
        if ( !target.files[0] ) return;

        const fileUrl = previewImages( target.files[0] );

        const targetPortada = {
            name: 'portada',
            value: fileUrl.file
        }

        onInputCustomChange( targetPortada );

        setPreviewPortada( fileUrl );

    }

    const previewImages = ( file ) => {
		
		const url = URL.createObjectURL( file );

		const cardFile = { image: url, name: file.name, file }
		
		return cardFile;
		
	}    


    return (    
        
        <Grid container minHeight='100vh' direction='column'  >	

					<Grid container direction='row' justifyContent='center' minHeight='100vh' pb={ 5 } sx={{ backgroundColor: `${ styleMode }.dark` }} >
						<Grid item xs={ 12 } md={ 10 } lg={ 9 } p={ 5 } sx={{ backgroundColor: `${ styleMode }.gray.claro` }} >
						<Breakpoints />
							<Grid container spacing={ 2 }>
								
								<Grid item xs={ 11 }  >
									<Typography variant="h4">
										Añadir Manga
									</Typography>
								</Grid>

								<Grid item xs={ 1 }  >
									<IconButton color="error" >
										<LogoutOutlined sx={{ fontSize:'30px' }}/> 
									</IconButton>
								</Grid>

								<Grid item xs={ 12 } mb={ 5 }>
									<Divider />
								</Grid>

								<Grid item xs={ 12 } mb={ 3 }>
									<Typography variant="h6">
										Informacion del Manga
									</Typography>								
									<Divider />
								</Grid>

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
                                        ? ( <CardImagePreview  image={ previewPortada.image } title={ nombre } type={ '' } autor={ autor } /> )
                                        : ( <></> )
                                    }
								</Grid>
								
							</Grid>

							<Grid container justifyContent="space-between">
									
								<Grid item xs={ 12 } mt={ 5 } mb={ 5 }>
									<Divider />
								</Grid>

									<Button variant="contained" onClick={ onSaveManga } > Agregar </Button>
									<Button variant="contained" color="error"> Cancelar </Button>
												
							</Grid>
						</Grid>

					</Grid>
					
				</Grid>

    )
}
