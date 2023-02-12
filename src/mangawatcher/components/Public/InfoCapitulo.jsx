import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";

import { useUIStore } from "../../hooks";
import { darkTheme } from "../../../theme/darkTheme";

export const InfoCapitulo = ({ pagina }) => {

    const { styleMode } = useUIStore();
    const [titulo, setTitulo] = useState('')
    const [colorTitulo, setColorTitulo] = useState('')

	useEffect(() => {
		const { palette } = darkTheme;

		const colorTitulo = ( styleMode === 'dark' ) ? palette.colors.gray.claro : palette.colors.gray.oscuro;
		setColorTitulo( colorTitulo );
	
	}, [styleMode])

    useEffect(() => {
        if( !pagina ) return;

        switch (pagina.tipo) {
			case 'A':
				setTitulo('Agradecimientos');
				break;
			case 'P':
				setTitulo('Portada');
				break;
			case 'C':
				setTitulo(`Página: ${ pagina.pagina }`);
				break;
			case 'E':
				setTitulo('Extras');
				break;
			case 'F':
				setTitulo('Fin');
				break;
		
			default:
				setTitulo('');
				break;
		}    

    }, [pagina])

    return (
        <>
        
            <Grid container sx={{ marginTop:'20px', marginBottom:'-15px' }}  justifyContent='center'>
                <Typography variant='overline'  style={{ color: colorTitulo }} > { titulo } </Typography>
            </Grid>
            
            <hr className="hr hr-blurry" style={{ color: colorTitulo, marginBottom: '20px' }}/> 

        </>
    )
}
