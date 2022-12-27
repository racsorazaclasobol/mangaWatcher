import { createTheme } from "@mui/material";
import { grey, red, orange } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {

        white:{
            primary:'#1CA3AA',
            secondary: '#EDEDED',
            normalText: '#000000',
            divider: grey[500],
            white: '#EDEDED',
            gray: { claro: grey[100], suave: grey[300], medio: grey[500], oscuro: grey[700],},
            dark: '#282828'
        },

        dark: {
            primary: '#372E48',
            secondary: '#282828',
            normalText: '#FFFFFF',
            divider: grey[300],
            gray: { claro: grey[100], suave: grey[300], medio: grey[500], oscuro: grey[700],},
            dark: '#282828'
        },

        colors: {
            gray: { claro: grey[100], suave: grey[300], medio: grey[500], oscuro: grey[700],},
            orange: { claro: orange[100], suave: orange[300], medio: orange[500], oscuro: orange[700],},
        },

        error:{
            main: red.A400
            
        }
    }
});
