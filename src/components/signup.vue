<template>
<div class="content">   
        <h2 class="content-head is-center" style="visibility:hidden;">Excepteur sint occaecat cupidatat.</h2>
 <div class="pure-g ">
    <div class="pure-u-1 pure-u-md-1-8"> 
   
	</div>
    <div class="pure-u-1 l-box pure-u-md-3-4">
	      <h2 class="content-subhead is-center">Signup</h2>
	      <form class="pure-form is-center" @submit.prevent="signup">
		<fieldset>
		<div class="pure-control-group">		
			<input id="email" class="pure-input-3-4" type="text" v-model="email" @input="$v.email.$touch()" placeholder="Email" required/>
			<input id="name" type="text" class="pure-input-3-4" v-model="username" @input="$v.username.$touch()" placeholder="Username" required/>			
			<input id="password" v-model="password" class="pure-input-3-4" type="password" @input="$v.password.$touch()" placeholder="Password" required/>
			<input id="rep_pass" v-model="passwordConfirm" class="pure-input-3-4" type="password" @input="$v.passwordConfirm.$touch()" placeholder="Repeat Password" required/>		    
		</div>    	
		</fieldset>
<legend>Credit Card Details</legend>
<fieldset>
<div class="pure-g pure-control-group is-center">
<div class="pure-u-1 pure-u-md-1">
<input type="text" class="pure-input-1 is-center" placeholder="Card Number">
</div>
<div class="pure-u-1 pure-u-md-1-2">
<select name="Month" class="pure-input-1 is-center">
<option value="january">January</option>
<option value="february">February</option>
<option value="march">March</option>
<option value="april">April</option>
<option value="may">May</option>
<option value="june">June</option>
<option value="july">July</option>
<option value="august">August</option>
<option value="october">October</option>
<option value="november">November</option>
<option value="december">December</option>
</select>
</div>
<div class="pure-u-1 pure-u-md-1-2">
<select name="Year" class="pure-input-1 is-center">
<option value="2016">2016</option>
<option value="2017">2017</option>
<option value="2018">2018</option>
<option value="2019">2019</option>
<option value="2020">2020</option>
<option value="2021">2021</option>
<option value="2022">2022</option>
<option value="2023">2023</option>
<option value="2024">2024</option>
</select>
</div>
<div class="pure-u-1 pure-u-md-1-2">
<input type="text" placeholder="CVV" class="pure-input-1 is-center">

</div>
<div class="pure-u-1 pure-u-md-1-2">
<span class="pure-input-1">3 or 4 digits usually found on the signature strip</span>
</div>
</div>	    
</fieldset>
<button  class="pure-button pure-button-primary" @click="doPay">Proceed</button>
<button  class="pure-button pure-button-success" @click="payPal">Paypal <icon name="paypal"></icon></button>
<label for="cd" class="pure-checkbox">
				<input id="cd" type="checkbox" @click="swAccept"  value="someVal" > I understood the Terms and Conditions
			</label>
        <button class="pure-button pure-input-3-4 pure-button-primary" :disabled="isDis">Submit</button>
	</form>  
	
	</div>
    <div class="pure-u-1 pure-u-md-1-8">    
   
	</div>
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
				passwordConfirm: '',
				username:'',
				accept:false,
				isDis: true
			}			
		},		
		methods: {
		doPay(){
	    this.$toasted.success('Success! Paid through Debit Card')   		
		},
		payPal(){
		this.$toasted.success('Success! Paid through PayPal')          				 
		},
		signup() {		
			if(this.accept){
				if (this.$v.$invalid) { this.$v.$touch(); return }   
		var pp = this.$Progress
        pp.start()
		try{
		this.isDis = true
		 this.$store.dispatch({
					type: 'signup',
					email: this.email,
					password: this.password,
					username: this.username
				})
							 							
				setTimeout(()=>{
                				this.email = ''
				this.password = ''
				this.passwordConfirm = ''  
				this.username = ''  				
pp.finish(); 				
				this.isDis = false    
this.$toasted.success('Success! Please wait..')          				
this.$store.dispatch('acSignError',0)
			this.$router.push('signin');
this.$v.$reset()
				},6000);  
		}  catch(error){
                    this.$toasted.error('Sowwy, something went wrong!')
					console.log(error);				
					pp.fail()
				this.$store.commit('AuthError')
		            this.isDis = false
  	                this.swAccept()        
			}    
			
			} else {
			   this.$toasted.info('Please accept terms!')
			}
	
			},
			signupTest(){   	
var pp = this.$Progress			
			 pp.start()
				if(this.accept){
					
console.log(this.email+' '+this.username+' '+this.password)
setTimeout(function(){pp.finish()},4000)
				} else {
				setTimeout(function(){ pp.fail() },4000)    
				console.log('Please accept!')
				}   
			},
			swDis(){
			this.isDis = !this.isDis
			},
			swAccept(){		
this.swDis()			
				return this.accept = !this.accept;
			}			
		},
		validations: {
                username: {
                    required,
                    minLength: minLength(3)
                },
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(8)
                },
                passwordConfirm: {
                    sameAs: sameAs('password')
                }    	 
			}
	}
</script>