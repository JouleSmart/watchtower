import firebase from 'firebase/app'
import 'firebase/firestore'

var config = {
  apiKey: 'AIzaSyBz5p021xfJAaweTb4O_7MKU-sc4x6FdL0',
  authDomain: 'watchtower-618bc.firebaseapp.com',
  databaseURL: 'https://watchtower-618bc.firebaseio.com',
  projectId: 'watchtower-618bc',
  storageBucket: 'watchtower-618bc.appspot.com',
  messagingSenderId: '640884162432'
}

const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()