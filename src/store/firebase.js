/**
*
* Kazzy Rantsimele kazzytheman345@gmail.com medium.com/@gentkazzy
*
**/

import fb from "firebase"
//const msg = firebase.messaging();

var config = {
    apiKey: "AIzaSyDQfNrVzZZDfdD72tHokTPXZLwiec0BsVc",
    authDomain: "fir-7fd3c.firebaseapp.com",
    databaseURL: "https://fir-7fd3c.firebaseio.com",
    projectId: "fir-7fd3c",
    storageBucket: "fir-7fd3c.appspot.com",
    messagingSenderId: "943050628977"
  };
var firebase = fb.initializeApp(config);
console.log('fb initialized!!')
export default firebase