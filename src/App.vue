<style>
    @import './assets/css/page-styles-main.css';
    @import './assets/css/vue2-animate.min.css';
		#bg{
	position: fixed;
min-height: 100%;
min-width: 100%;
	background-image: url("./assets/android_background.jpg");                
background-size: 100% 100%;
                background-repeat: no-repeat;
	}
	#hh{
	position: absolute;
	top:50%; /**400px**/
	left:43%; /**438px**/
	width:100%;
	}
</style>
       
<template>
       <div>
           <vue-progress-bar></vue-progress-bar> 
           <div class="header">
    <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">	
    <router-link class="pure-menu-heading" to="/">CRYPTODEMO</router-link>
        <ul class="pure-menu-list">     
		     <li v-show="checkVis" class="pure-menu-item pure-form">
			 <input type="text" name="someThing" placeholder="Search" class="pure-input-rounded">
			 <a id="searchB" href="#" class="pure-button"><icon name="search"></icon></a>   
			 </li>
			<li class="pure-menu-item"><router-link to="signup" class="pure-menu-link">Register</router-link></li>
            <li class="pure-menu-item"><router-link to="signin" class="pure-menu-link">Login</router-link></li>
<li class="pure-menu-item"><router-link to="about" class="pure-menu-link">About</router-link></li>          
		  <li class="pure-menu-item"><router-link to="/" class="pure-menu-link">Home</router-link></li>            
			<li class="pure-menu-item" v-show="checkMain"><router-link to="settings" class="pure-menu-link"><icon name="wrench" scale="2"></icon></router-link></li>
        </ul>
    </div>
</div>   
	   
        <div class="content-wrapper" >   
            <transition name="zoom">
                <router-view ></router-view>  
            </transition>
            <div class="footer l-box" v-show="checkIsFoot">	
   	<div class="pure-g is-center">
 <div class="pure-u-1 pure-u-md-1-8">
 <router-link to="/" style="color:grey">&copy; Cryptodemo</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="signup" style="color:#1f8dd6;">Register</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="terms" style="color:#1f8dd6;">Terms</router-link>
 </div>

<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="cookies" style="color:#1f8dd6;">Cookies</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="copy" style="color:#1f8dd6;">Copyright</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="about" style="color:#1f8dd6;">About</router-link>
 </div>
 <div class="pure-u-1 pure-u-md-1-8">
 <a href="https://github.com/reezmankazzy/cryptodemo" title="github" style="color:#1f8dd6;"><icon name="github" scale="2"></icon></a>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <a href="https://twitter.com/gocryptodemo" style="color:#1f8dd6;"><icon name="twitter" scale="2"></icon></a>
 </div>    
	</div>     			
    </div>
        </div>   
       </div>
</template>

<script>

export default {
  name: 'app',
  data(){
      return {
          isHome: false,
		  isMain : ['/settings','/test'],
		  isFoot:['/','/p/','/profile','/about','/copy','/faq','/privacy','/terms']
      }
  },
  computed: {
  checkMain(){
  return  (this.isMain.indexOf(this.$route.path)>-1);   
  },
  checkVis(){
  if(this.$route.path.indexOf('/w/')>-1){
  return  true;   
  } else {return (this.isMain.indexOf(this.$route.path)>-1);}  
  },
  checkIsFoot(){
  return (this.isFoot.indexOf(this.$route.path)>-1);
  }
  },
  methods: {
      checkHome: function(){
          return (this.$router.name==='home');
      }
  }
 /** ,
  computed:{
  dynamicComponent() {  
 switch(this.$route.name){
 case 'home':
 return MainNav;
 case 'profile':
 return NavInfo;
 
 }
  }
  }***/  
}
</script>

<style>

</style>
