import firebase from 'firebase/app'
import { firebaseConfig } from '../env'

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig)

export { firebase }
