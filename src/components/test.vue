<template>
<div class="content">   
        <h2 class="content-head is-center" style="visibility:hidden;">Excepteur sint occaecat cupidatat.</h2>
 <div class="pure-g ">
    <div class="pure-u-1 pure-u-md-1-8"> 
   
	</div>
    <div class="pure-u-1 l-box pure-u-md-3-4">
	      <h2 class="content-subhead is-center">Signup</h2>
	      <form class="pure-form is-center" >
		<fieldset>
		<div class="pure-control-group">		
			<input id="email" class="pure-input-3-4" type="text" v-model="email" placeholder="Email" required/>
			
			<!--
<input id="name" type="text" class="pure-input-3-4" v-model="username" @input="$v.username.$touch()" placeholder="Username" required/>			
			<input id="password" v-model="password" class="pure-input-3-4" type="password" @input="$v.password.$touch()" placeholder="Password" required/>
			<input id="rep_pass" v-model="passwordConfirm" class="pure-input-3-4" type="password" @input="$v.passwordConfirm.$touch()" placeholder="Repeat Password" required/>		   
			-->
			
		</div>    
		</fieldset>
		
       
	</form>  
	 <button class="pure-button pure-input-3-4 pure-button-primary" :disabled="isDis" @click="getUsername">Get User</button>
		<!-- Note Array format of the data, how to use it? --->
		    <button class="pure-button pure-input-3-4 pure-button-primary" :disabled="isDis" @click="getUsers">Get Users</button>
			<button class="pure-button pure-input-3-4 pure-button-primary" :disabled="isDis" @click="swUpdate">Update</button>
	<div>
	{{ msg1 }}
	</div>
	<div>
	{{ msg2 }}
	</div>
	<div>
	{{ msg3 }}
	</div>
	<div v-show="showUpdate">
	      <form class="pure-form is-center" >
		<fieldset>
		<div class="pure-control-group">		
			<textarea  class="pure-input-3-4" type="text" v-model="update" placeholder="Email" ></textarea>			
		</div>    
		</fieldset>
		    <button class="pure-button pure-input-3-4 pure-button-primary" :disabled="isDis" @click="postUpdate">Post Update</button>
	</form>      
	</div>
	</div>
    <div class="pure-u-1 pure-u-md-1-8">    
   
	</div>
</div> 
</div>
</template>

<script>
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'

var	strr = function(n){
return Array(n+1).join((Math.random().toString(36)+'000000000000000000').slice(2,18)).slice(0,n);
}

	export default {
		data() {
			return {
				email: '',
				password: '',
				passwordConfirm: '',
				username:'',
				accept:false,
				isDis:false,
				msg1: '',
				msg2: '',
				msg3: '',
				showUpdate: false
			};  	 		
		},		
		methods: {

			getUsername(){  
try{
//this.$store.dispatch('acUserN',this.email)
var nn = this.$store.dispatch('acUserN',this.email)		
nn.then((snapshot) => {
//this.$store.dispatch('acAddUserN',snapshot.username===null?'bossmankazzy':snapshot.username)
//console.log(username);
console.log('snapshot: ',snapshot);
this.msg1 = snapshot;
	}).catch(error => console.log(error))	
} catch(error){
console.log(error);
}
			},
			getUsers(){			
			var dd = this.$store.dispatch('acUsersG',0)
	dd.then(docRef => {
		this.msg3 =  docRef;
	}).catch(error => console.log(error));  
			},
			swUpdate(){
			this.showUpdate = !this.showUpdate;
			},
			postUpdate(){
			
			}
			
		} 
	}
</script>