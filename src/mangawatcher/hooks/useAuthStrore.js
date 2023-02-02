import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { FirebaseAuth } from "../../firebase/config";
import { onChecking, onClearErrorMessage, onLogin, onLogout } from "../../store/auth/authSlice";

const errorLoginMessages = ['auth/wrong-password', 'auth/user-not-found'];


export const useAuthStrore = () => {
    
    const dispatch = useDispatch();
    const { status, user } = useSelector( state => state.auth );


    const startLoginWithEmailPassword = async({ loginEmail = '', loginPassword = '' }) => {

        dispatch( onChecking() );

        try {
            const { user } = await signInWithEmailAndPassword( FirebaseAuth, loginEmail, loginPassword );
            const { accessToken, displayName, email, uid } = user;

            localStorage.setItem( 'token', accessToken );

            const userToSave = {
                uid: uid,
                name: displayName,
            }

            dispatch( onLogin( userToSave) );

            
        } catch (error) {
            console.log(error.code)
            const errorMessage = ( errorLoginMessages.some( elem => elem === error.code ) ) ? 'Credenciales no validas' : '';
            Swal.fire( 'Error de autenticación', errorMessage, 'error' );
            dispatch( onLogout( error.code ) );
        }


    }

    const startCheckingAuth = () => {

        dispatch( onChecking() );

        onAuthStateChanged( FirebaseAuth, (user) => {
            
            if( !user ) return dispatch( onLogout() );

            const { uid, displayName, email, accessToken } = user;
            localStorage.setItem( 'token', accessToken );

            const userToSave = {
                uid,
                name: displayName
            }

            dispatch( onLogin( userToSave ) );

        })

    }

    const startLogout = async () => {

        dispatch( onChecking() );

        await FirebaseAuth.signOut();

        dispatch( onLogout() );
        dispatch( onClearErrorMessage() );

    }
    
    
    
    return {
        //Objetos y Propiedades
        status,
        user,

        //Funciones y Metodos
        startLoginWithEmailPassword,
        startCheckingAuth,
        startLogout
    }
}
