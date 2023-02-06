import { useEffect, useState } from "react";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "../../hooks";
import { useAuthStrore, useUIStore } from "../../mangawatcher/hooks"
import { MangaLayout } from "../../mangawatcher/layout/MangaLayout"
import Swal from "sweetalert2";

const loginFormField = {
    loginEmail: '',
    loginPassword: ''
}

const formValidation = {
    loginEmail:        [ (value) => (value.includes('@') || value.length >= 1), 'Ingrese un correo válido'],
    loginPassword:     [ (value) => value.length >= 1 , 'Ingrese una contraseña válida'],
  }

export const LoginPage = () => {

    const { styleMode } = useUIStore();
    const { errorMessage, startLoginWithEmailPassword } = useAuthStrore();
    const { loginEmail, loginPassword, loginEmailValid, loginPasswordValid, isFormValid, onInputChange } = useForm(loginFormField, formValidation);
    
    const [formSubmitted, setFormSubmitted] = useState(false)

    const onLogin = () => {

        setFormSubmitted( true );
        startLoginWithEmailPassword({ correo: loginEmail, password: loginPassword });

    }

    useEffect(() => {

        console.log(errorMessage)
        
		if( errorMessage !== undefined ){
			Swal.fire('Error en la autenticación', errorMessage, 'error')
		}
	
	}, [errorMessage])

    return (
        <>
			<MangaLayout>

				<Grid container justifyContent='center' alignContent='center' height='calc(100vh - 230px)' >


                    <Grid item xs={ 12 } sm={ 10 } md={ 7 } lg={ 6 } xl={ 4 } textAlign='center' bgcolor={`${ styleMode }.gray.suave`} sx={{ borderRadius: '10px' }} p={5} className='box-shadow'>
                        <Typography variant="h5"> Iniciar Sesión </Typography>
                        <Divider sx={{ marginBottom: '16px', marginTop: '16px' }} />

                        <TextField
                            fullWidth
                            type="email"
                            label="Ingrese su correo"
                            name="loginEmail"
                            value={ loginEmail }
                            onChange={ onInputChange }
                            error={ !!loginEmailValid && formSubmitted }
                            helperText={ ( formSubmitted && !isFormValid ) ? loginEmailValid : '' }
                        />

                        <TextField
                            fullWidth
                            sx={{ marginTop: '10px', marginBottom: '36px' }}
                            type="password"
                            label="Ingrese su contraseña"
                            name="loginPassword"
                            value={ loginPassword }
                            onChange={ onInputChange }
                            error={ !!loginPasswordValid && formSubmitted }
                            helperText={ ( formSubmitted && !isFormValid ) ? loginPasswordValid : '' }
                        />

                        <Button fullWidth variant="contained" onClick={ onLogin }> Iniciar Sesion </Button>
                                                
                    </Grid>

                </Grid>

			</MangaLayout>
        </>
    )
}
