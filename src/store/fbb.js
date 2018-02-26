/**
*
* Kazzy Rantsimele kazzytheman345@gmail.com medium.com/@gentkazzy
*
**/

import firebase from "./firebase"
import db from "./db"
import util from "./utils"
import cookies from "cookies"
import store from "store2"


var fbb = {
	getUrlG: function(fileid){
	//https://www.googleapis.com/drive/v3/files/file_id?key=your_key&alt=media
return "https://drive.google.com/uc?export=view&id="+fileid;
	},
	setAppCookie: function(){
firebase.auth().currentUser.getToken().then(token => {
	cookies.set('token',token,{
	domain: window.location.hostname,
	expire: (1/24),
	path: '/',
	secure: true
})
})
	},
	unsetAppCookie: function(){
cookies.remove('token',{
	domain: window.location.hostname,
	path: '/'
})   
	},
	setStorage: function(file){
		var size = parseFloat(file.size/1024).toFixed(2);
		//compare to 5120 KB must be less or resumed download
		console.log(size+' KB');
	},
	setUpdateV: function(data){
		const dateTime = Date.now();
		db.collection('updates').add({
			video: data.video,
			dis: data.text,
			username: store('user'),
			added: (new Date()),
			date: (Math.floor(dateTime / 1000)) //timestamp unix
		}).then(function(docRef) {     
		this.$store.dispatch('acClear'); 
console.log("Document written with ID: ", docRef.id);
}).catch(function(error) {
console.error("Error adding document: ", error);
});   
	},
	setUpdateP: function(img,text){
const dateTime = Date.now();
db.collection('updates').add({
			img: data.img,
			dis: data.text,
			username: store('cu'),
			added: (new Date()),
			date: (Math.floor(dateTime / 1000)) //timestamp unix
		}).then(function(docRef){     
		
console.log("Document written with ID: ", docRef.id);
}).catch(function(error) {
console.error("Error adding document: ", error);
}); 
	},
		setUpdateV: function(vid,text){
const dateTime = Date.now();
db.collection('updates').add({
			video: vid,
			dis: text,
			username: store('cu'),
			added: (new Date()),
			date: (Math.floor(dateTime / 1000)) //timestamp unix
		}).then(function(docRef){     
		
console.log("Document written with ID: ", docRef.id);
}).catch(function(error) {
console.error("Error adding document: ", error);
});    
		},
	getUsername: function(email){
	var query =	db.collection('users').where('email','==',email);
	if(query.length>0){
console.log(query[0]);
 return query[0].username;
	} else {console.log(query); return query.username;}
	return null;
	}
}
 export default fbb