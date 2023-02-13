import { IconButton, Grid, Typography, Divider } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";

import { useAuthStrore, useUIStore } from "../../hooks";


export const HeaderManagers = ({ titulo = '' }) => {

    const { user, startLogout } = useAuthStrore();
    const { navigate } = useUIStore();

    const onLogout = () => {
		startLogout();

        navigate( '/admin', { replace: true } );
	}

    return (
        <>
        
            <Grid container>
                <Grid item xs={ 10 }  >
                    <Typography variant="h4" >
                        { titulo }
                    </Typography>
                </Grid>

                <Grid item xs={ 2 } display='flex' >
                    <Typography variant="overline" mt={ 1.3 } >
                        { user.name }
                    </Typography>
                    <IconButton color="error" onClick={ onLogout } >
                        <LogoutOutlined sx={{ fontSize:'30px' }}/> 
                    </IconButton>
                </Grid>
            </Grid>

            <Grid item xs={ 12 } mb={ 2 }>
                <Divider />
            </Grid>
            
        </>

    )
}
