import { useDispatch, useSelector } from "react-redux"
import mangaApi from "../../api/mangaApi";
import { onChecking, onClearErrorMessage, onLogin, onLogout } from "../../store/auth/authSlice";

const errorLoginMessages = ['auth/wrong-password', 'auth/user-not-found'];


export const useAuthStrore = () => {
    
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector( state => state.auth );


    const startLoginWithEmailPassword = async({ correo, password }) => {

        dispatch( onChecking() );

        try {

            const { data } = await mangaApi.post( '/auth/login', { correo, password } );
            
            const { usuario, token } = data;

            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getDate() );

            dispatch( onLogin({ name: usuario.nombre, uid: usuario.uid }) );
            
        } catch (error) {

            dispatch( onLogout( error.response.data.msg ) );
        }
    }

    const startCheckAuthToken = async() => {

        const token = localStorage.getItem('token');

        if ( !token ) {
            return dispatch( onLogout() );
        }

        try {

            const { data } = await mangaApi.get( '/auth/renew' );

            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getDate() );

            dispatch( onLogin( { name: data.nombre, uid: data.uid } ) );
            
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = async () => {
        localStorage.clear();

        dispatch( onLogout() );

    }
    
    return {
        //Objetos y Propiedades
        status,
        user,
        errorMessage,

        //Funciones y Metodos
        startLoginWithEmailPassword,
        startCheckAuthToken,
        startLogout
    }
}
