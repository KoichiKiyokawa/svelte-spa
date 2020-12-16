import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import { firebaseConfig } from '../env'

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig)

const functions = firebase.app().functions('asia-northeast1')

export { firebase, functions }
