import { Grid } from "@mui/material";
import { useMangaStore } from "../hooks";   
import { ButtonScrollUp, ImageMangaPages, TitleMangas } from "./";

export const ScrollVisualizador = () => {

    const { activeManga } = useMangaStore();
	const { paginas } = activeManga;

    return (
        <>

            <TitleMangas />

                <Grid container justifyContent="center" className="animate__animated animate__fadeIn" sx={{ maxHeight: 'calc(100vh - 100px)', overflow: 'scroll', overflowX:'hidden'  }} >

                    <Grid item lg={ 8 } sm={ 10 } xs={ 12 }  >
                        {
                            paginas.map( pagina => 
                                (
                                    <ImageMangaPages key={ pagina.url } pagina={ pagina } />
                                ) 
                            )

                        }
                    </Grid>
                    
                </Grid>

        </>
    )
}
