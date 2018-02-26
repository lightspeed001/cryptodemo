/**
*
* Kazzy Rantsimele kazzytheman345@gmail.com medium.com/@gentkazzy
*
**/

import firebase from "./firebase"
import db from "./db"
import dbb from "./dbb"
import utils from "./utils"
import store from "store2"
import ut from "./scripts/utils.json"

//snapshot.size === 0 //there are no documents
//var batch = db.batch();

var fb = {
	isSignedIn: function(){
		console.log('Auth Trigger Here!')
		console.log(firebase.auth().currentUser)   
		return (firebase.auth().currentUser!==null);	
	},
postUser: function(email, password,username){
var pw = utils.encode(password,ut.secret)
console.log(pw.toString())
db.collection("users").doc(email).set({
'username': username,
'email': email,
'password': pw.toString(),
date: (new Date()),
created: utils.getUnix(Date.now()),
dols: utils.getUnix(Date.now()),
avatar: ut.avatar,
following: {
	cryptoadmin: true,
	kazzytheman: true
},
follNum: 2,
postNum: 0
}); 
	},
signUp: function(email, password){
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		throw new Error(error);
    });     
	},
	si_Email: function(email, password){
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    console.log('sign in error!')
   throw new Error(error);
    });
	},	
updateDOLS: function(){
//get() might not work try excluding and see the result then :)
db.collection('users').doc(store('ce')).get().then(snapshot => {
console.log('snapshot: ',snapshot);
const dateTime = Date.now();   
db.doc(snapshot).update({
dols: (Math.floor(dateTime / 1000))
}); 
});
},
getUsername: function(email){
 db.collection('users').doc(store('ce')).get().then(snapshot => {	
	console.log('The snapshot id: ', snapshot.id)
	store('cu', snapshot.data().username);	 
 })
},
addImgG: function(data){
	db.collection('gallery').doc(store('ce')).collection('images').add({
		url: data,
		date: utils.getUnix(Date.now()),
		created: new Date()
	}).then(docRef => {
	console.log('pid',docRef.id) 
	});   
},
setAvatar: function(downUrl){
	db.collection('users').doc(store('ce')).update({
		avatar: downUrl
	});
},
getUsersV: function(){	
	var dateTime = Date.now();
	return db.collection('gallery_v').where('dols','<',(Math.floor(dateTime / 1000))).get();	
},
getUsers: function(username){		
	return db.collection('users').where("username","==",username).get();
},
getEmail: function(username){
	return db.collection('users').where("username","==",username).get();
},
getEmails: function(email){	
return db.collection('users').where("email","==",email).get();
}

}
export default fb