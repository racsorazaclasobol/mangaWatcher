import { Grid, Typography } from "@mui/material";
import { useMangaStore, useUIStore } from "../hooks";

export const TitleMangas = () => {

	const { styleMode } = useUIStore();
    const { activeManga } = useMangaStore();

    const { capitulo, titulo: tituloCap, tituloManga } = activeManga;


    return (
        <Grid container justifyContent='center' pb={ 5 } className="animate__animated animate__fadeIn">

            <Grid item lg={ 8 } sm={ 10 } xs={ 12 } minHeight='50px' className="box-shadow" sx={{ borderTop: '1px solid', borderColor: `${ styleMode }.secondary` , borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px' }} bgcolor={ `${ styleMode }.primary` } alignItems='center' textAlign='center' >
                
				<Typography variant='h6' mt={ 1 } sx={{ color: `colors.gray.claro` }} >
                    { `${ tituloManga } ${ capitulo } Español - ${ tituloCap } `}			
				</Typography>

            </Grid>

        </Grid>
    )
}
