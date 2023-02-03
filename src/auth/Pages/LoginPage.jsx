import { useState } from "react";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "../../hooks";
import { useAuthStrore, useUIStore } from "../../mangawatcher/hooks"
import { MangaLayout } from "../../mangawatcher/layout/MangaLayout"
import { Breakpoints } from '../../mangawatcher/components/Public/Breakpoints'

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
    const { status, startLoginWithEmailPassword } = useAuthStrore();
    const { formState, loginEmail, loginPassword, loginEmailValid, loginPasswordValid, isFormValid, onInputChange } = useForm(loginFormField, formValidation);
    
    const [formSubmitted, setFormSubmitted] = useState(false)

    const onLogin = ( e ) => {
        e.preventDefault();
        setFormSubmitted( true );

        startLoginWithEmailPassword( formState );

    }


    return (
        <>
			<MangaLayout>

				<Grid container justifyContent='center' alignContent='center' height='calc(100vh - 230px)' >


                    <Grid item xs={ 12 } sm={ 10 } md={ 7 } lg={ 6 } xl={ 4 } textAlign='center' bgcolor={`${ styleMode }.gray.suave`} sx={{ borderRadius: '10px' }} p={5} className='box-shadow'>
                    <Breakpoints />
                        <Typography variant="h5"> Iniciar Sesión </Typography>
                        <Divider sx={{ marginBottom: '16px', marginTop: '16px' }} />

                        <form onSubmit={ onLogin }>
                            
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

                            <Button fullWidth variant="contained" type="submit" > Iniciar Sesion </Button>

                        </form>
                                                
                    </Grid>

                </Grid>

			</MangaLayout>
        </>
    )
}
