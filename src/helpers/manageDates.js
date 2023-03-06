import moment from 'moment'

export const sumarDias = (fechaEntrada, diasSumar) => {

    if( !fechaEntrada ) return;
    
    const fechaSumada = moment( fechaEntrada ).add( diasSumar, 'day' );

    return new Date( fechaSumada ); 
}

export const parsearFecha = ( fechaEntrada, formatoFecha ) => {

    if( !fechaEntrada || !formatoFecha ) return;
    
    const fechaSalida = moment( fechaEntrada ).format( formatoFecha );

    return fechaSalida;
    
}

export const compararDosFechas = ( fechaEntrada1, tipoComparacion, fechaEntrada2 ) => {
    
    if( !fechaEntrada1 || !fechaEntrada2 || !tipoComparacion ) return false;

    switch ( tipoComparacion ) {
        case 'isAfter':
            return moment( fechaEntrada1 ).isAfter( fechaEntrada2 );

        case 'isBefore':
            return moment( fechaEntrada1 ).isBefore( fechaEntrada2 );
            
        case 'isBetween':
            return moment( fechaEntrada1 ).isBetween( fechaEntrada2 );
        
        case 'isSame':
            return moment( fechaEntrada1 ).isSame( fechaEntrada2 );           
        
        case 'isSameOrAfter':
            return moment( fechaEntrada1 ).isSameOrAfter( fechaEntrada2 );           
    
        default:
            return false;
    }

}