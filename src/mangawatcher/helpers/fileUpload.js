export const fileUpload = async ( file ) => {

    if( !file ) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dmuswnvaf/upload';

    const formData = new FormData();

    formData.append('upload_preset', 'my-manga-onepiece');
    formData.append('file', file);

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        } );

        if ( !resp.ok ) throw new Error( 'No se ha podido subir el archivo' );

        const cloudResp = await resp.json();

        return cloudResp.secure_url;
        
    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }
    

}
