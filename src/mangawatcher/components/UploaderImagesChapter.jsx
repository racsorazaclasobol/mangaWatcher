export const UploaderImagesChapter = ( ) => {
	
	return (

		<>
			<Grid item xs={ 6 } mb={ 3 } mt={ 5 }>
				<Typography variant="h6">
					Imagenes de agradecimiento
				</Typography>								
				<Divider />
			</Grid>

			<Grid item xs={ 3 } ml={ 3 } mt={ 5 } >
				<input
					type="file"
					multiple
					ref={ thanksInputRef }
					onChange={ onThanksInputChangue }
					style={{ display:'none' }}
				/>
				
				<Button
					variant="outlined"
					onClick={ () => thanksInputRef.current.click() }
				>
					<CloudUploadIcon sx={{ mr:2 }} />
					Subir Imagenes
				</Button>
			</Grid>

			<Grid item xs={ 10 } >		
				<Grid container spacing={ 2 }>							
					{/* {
						thanksTitlesList.map( thanksFile => (

							<CardImagePreview key={ thanksFile.name } image={ thanksFile.image } title={ thanksFile.name } type={ 'A' } />

						) )
					} */}
				</Grid>
			</Grid>
		</>
		
	)
}
