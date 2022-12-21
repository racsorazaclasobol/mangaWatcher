import { Grid } from "@mui/material"
import { useUIStore } from "../hooks"

export const ButtonInvisible = ( {lastPage} ) => {

    const { counter, incrementCounter, decrementCounter } = useUIStore();

    const onPrevPage = () => {
		if( counter <= 0 ) return;

		decrementCounter();
	}

	const onNextPage = () => {
		if( counter === lastPage ) return;

		incrementCounter();
	}

  return (
    <Grid container  direction='row' sx={{position: 'absolute', width:'100%', height:'100%' }}>
        <Grid item xs={ 6 } onClick={ onPrevPage } > </Grid>
        <Grid item xs={ 6 } onClick={ onNextPage } > </Grid>
    </Grid>
  )
}
