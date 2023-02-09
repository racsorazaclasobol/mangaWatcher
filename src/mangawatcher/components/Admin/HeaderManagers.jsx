import { IconButton, Grid, Typography, Divider } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";

import { useAuthStrore } from "../../hooks";


export const HeaderManagers = ({ titulo = '' }) => {

    const { user, startLogout } = useAuthStrore();

    const onLogout = () => {
		startLogout();
	}

    return (
        <>
        
            <Grid item xs={ 10 }  >
                <Typography variant="h4">
                    { titulo }
                </Typography>
            </Grid>

            <Grid item xs={ 2 } display='flex' >
                <Typography variant="overline" mt={ 1.3 }>
                    { user.name }
                </Typography>
                <IconButton color="error" onClick={ onLogout } >
                    <LogoutOutlined sx={{ fontSize:'30px' }}/> 
                </IconButton>
            </Grid>

            <Grid item xs={ 12 } mb={ 2 }>
                <Divider />
            </Grid>
            
        </>

    )
}
