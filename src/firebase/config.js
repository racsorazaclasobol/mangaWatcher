import { initializeApp  }     from "firebase/app";
import { getAuth        }     from "firebase/auth";
import { getFirestore   }     from "firebase/firestore/lite";
import { getAnalytics   }     from "firebase/analytics";


const firebaseConfig = {
  apiKey:               "AIzaSyCMyR3jEPA0f55pjiWCvJ9eDTeW-YZrbQU",
  authDomain:           "mymanga-8ef0a.firebaseapp.com",
  projectId:            "mymanga-8ef0a",
  storageBucket:        "mymanga-8ef0a.appspot.com",
  messagingSenderId:    "1023154056014",
  appId:                "1:1023154056014:web:3748a1cc099e62ef7d0c1f",
  measurementId:        "G-HX1Q4CZD4H"
};

export const FirebaseApp        = initializeApp( firebaseConfig );
export const FirebaseAuth       = getAuth( FirebaseApp );
export const FirebaseDB         = getFirestore( FirebaseApp );
export const FirebaseAnalytics  = getAnalytics( FirebaseApp );