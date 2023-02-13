import { useEffect, useRef, useState } from "react";
import { Button, Divider, Grid, IconButton, TextField, Typography } from "@mui/material"
import { LogoutOutlined } from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useForm } from "../../../hooks"
import { useAdminStore, useAuthStrore, useUIStore } from "../../hooks";
import { CardImagePreview, DemoUserButton, HeaderManagers } from "../../components";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const initialForm = {
    nombre: '',
    autor: '',
    portada: ''
}

export const AdminAddManga = () => {

    const portadaRef = useRef();
	const { styleMode } = useUIStore();
	const { errorMessage, startClearStore, startSaveManga } = useAdminStore();
	const { user } = useAuthStrore();
    const { nombre, autor, formState, onInputChange, onInputCustomChange } = useForm( initialForm );
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

    return (    
        
        <Grid container minHeight='100vh' direction='column'  >	

			<Grid container direction='row' justifyContent='center' minHeight='100vh' pb={ 5 } sx={{ backgroundColor: `${ styleMode }.dark` }} >
				<Grid item xs={ 12 } md={ 10 } lg={ 9 } p={ 5 } sx={{ backgroundColor: `${ styleMode }.gray.claro` }} >
					<Grid container spacing={ 2 }>
						
						<HeaderManagers titulo="Añadir Manga" />

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

							{
								( user.uid === '1lnvyT41idVffnkoQqlW0NivKj33' )
								? ( <DemoUserButton /> )
								: ( <Button variant="contained" onClick={ onSaveManga } > Agregar </Button> )
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
