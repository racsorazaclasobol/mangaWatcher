import { Grid } from "@mui/material"
import { HeaderManagers } from "../../components"
import { useUIStore } from "../../hooks"

export const AdminEditChapter = () => {

    const { styleMode } = useUIStore();
    
    
    return (
        <Grid container direction='row' justifyContent='center' minHeight='100vh' pb={ 5 } sx={{ backgroundColor: `${ styleMode }.dark` }} >
            <Grid item xs={ 12 } md={ 10 } lg={ 9 } p={ 5 } sx={{ backgroundColor: `${ styleMode }.gray.claro` }} >
                <Grid container spacing={ 2 }>
                    
                    <HeaderManagers titulo="Editar Chapter" />
                    

                </Grid>
            </Grid>
        </Grid>
    )
}
