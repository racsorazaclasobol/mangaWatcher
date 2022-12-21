import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';

export const loadAllMangas = async ( uid = '' ) => {

    const collectionRef = collection( FirebaseDB, `mangas/onepiece/capitulos` );

    const docs = await getDocs( collectionRef );

    const caps = [];

    docs.forEach( doc => {
        caps.push({ id: doc.id, ...doc.data() })
    } )
    
    const capReturn = caps.filter( cap => cap.id === uid );

    return capReturn;
}