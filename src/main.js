/**
*
* Kazzy Rantsimele kazzytheman345@gmail.com medium.com/@gentkazzy
*
**/

import Vue from 'vue'
import Router from 'vue-router'   

const About = () => import('./components/about.vue')
const Terms = () => import('./components/terms.vue')
const Cookies = () => import('./components/cookies.vue')
const CopyR = () => import('./components/copy.vue')
import RequireAuth from './components/require_auth';
const Login = () => import('./components/login.vue')   
const Signup = () => import('./components/signup.vue')   
const Home = () => import('./components/home.vue')   
const NotFound = () => import('./components/404.vue')   
const SignIn = () => import('./components/signin.vue')   
import Test from './components/test.vue';    
import Avatar from './components/avatar.vue';   
import Vuex from 'vuex';
Vue.use(Vuex);

import "./assets/css/pure-min.css"
import "./assets/css/grids-responsive-min.css"
import "./assets/css/pure-extras.css"

import "vue-awesome/icons/home"
import "vue-awesome/icons/search"
import "vue-awesome/icons/plus"
import "vue-awesome/icons/plus-circle"
import "vue-awesome/icons/wrench"
import "vue-awesome/icons/paypal"
import "vue-awesome/icons/twitter"
import "vue-awesome/icons/github"
import Icon from "vue-awesome/components/Icon.vue"
Vue.component('icon',Icon);

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: '#ADE027',
    failedColor: '#F43D41',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
})  

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, { Chartkick })

import VModal from 'vue-js-modal'
Vue.use(VModal);

import Toasted from 'vue-toasted'
Vue.use(Toasted, {
    theme: 'bubble',
    position: 'top-right',
    duration: 2300
})   

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/reset',
            name: 'reset',
            component: Test,
            beforeEnter: RequireAuth
        },
		{
            path: '/password',
            name: 'password',
            component: Test,
            beforeEnter: RequireAuth
        },
        {
            path: '/profile',
            name: 'profile',
            component: About,
            beforeEnter: RequireAuth
        },
       { path: '/', component:Home, 
	   children: [
	   {path:'404', from: '*', component:NotFound}
	   ]
	   },
        { path: '/about', name: 'about', component: About },
        { path: '/terms', name: 'terms', component: Terms },
        { path: '/cookies', name: 'cookies', component: Cookies },        
        { path: '/copy', name: 'copy', component: CopyR },
        { path: '/login', name: 'login', component: SignIn },
		{ path: '/signup', name: 'signup', component: Signup },
		{ path: '/signin', name: 'signin', component: SignIn },
		{ path: '/test', name: 'test', component: Test },
        { path: '/demo', component: Test },        
        { path: '/upload', component: Avatar }
    ]       
})     

import App from './App.vue'   
import store from './store'
var vStore = new Vuex.Store(store);

new Vue({
  el: '#app',
  store: vStore,
	router,   
  render: h => h(App)
})
