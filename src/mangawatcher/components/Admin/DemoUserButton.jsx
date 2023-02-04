export const DemoUserButton = () => {

    const alertDemoMessage = () => {

		alert('Cuenta Demo - No se permite guardar');

	}   

    return (
        <Button variant="contained" onClick={ alertDemoMessage }> Guardar </Button>
    )
}
