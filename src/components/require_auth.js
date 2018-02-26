import Vue from 'vue'
import fbscript from '../store/fb'

export default (to, from, next) => {	
	if(fbscript.isSignedIn()){
		console.log('To next page you go!!')	
		next()   
	} else {
		console.log('To Sign in you go!!')
		next('/signin')   
	}	
}
