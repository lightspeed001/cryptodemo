<template>
<div class="content">   
        <h2 class="content-head is-center" style="visibility:hidden;">Excepteur sint occaecat cupidatat.</h2>
 <div class="pure-g ">
    <div class="pure-u-1 pure-u-md-1-8"> 
   
	</div>
    <div class="pure-u-1 l-box pure-u-md-3-4">
	      <h2 class="content-subhead is-center">Login</h2>
	      <form class="pure-form is-center" @submit.prevent="signin">
		<fieldset>
		<div class="pure-control-group">		
			<input id="email" class="pure-input-3-4" type="text" v-model="email" @input="$v.email.$touch()" placeholder="email" required/>
			<input id="password" v-model="password" class="pure-input-3-4" type="password" @input="$v.password.$touch()" placeholder="password" required/>
		</div>      
		</fieldset>		
        <button :class="buttClass" :disabled="isDis">Submit</button>
	</form>  
	
	</div>
    <div class="pure-u-1 pure-u-md-1-8"></div>
</div> 
</div>   
</template>

<script>
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'
    
	export default {
		data() {   
			return {
				email: '',
				password: '',
				buttClass: ['pure-button pure-input-3-4 pure-button-primary'],
				isDis: false
			}
		},
		methods: {
		
		signin() {   
		var pp = this.$Progress		
	if (this.$v.$invalid){ this.$v.$touch(); return }   
		pp.start()   	
		try {
		this.$store.dispatch({
					type: 'signin',
					email: this.email,
					password: this.password
				})
				
				setTimeout(() => {
				this.$store.dispatch('acGetUser')
				this.$toasted.success('Success! Please wait..') 
				this.isDis = false
				this.email = ''
				this.password = ''
				this.$router.push('profile')
				},4000)
				console.log('Current User Is: ' + this.$store.state.user.currentUser)	
		} catch(error){
		console.log(error);
		this.$store.dispatch('loginError')
		this.$toasted.error('Sowwy, something went wrong..');
		this.isDis=false;
		pp.fail()
		}   
			}		
		},
		validations: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(8)
                }    	 
			}		
	}
</script>