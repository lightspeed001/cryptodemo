<style>

</style>   

<template>
      <div class="site-wrapper">

      <div class="site-wrapper-inner">
        <div class="cover-container">

    <header class="masthead clearfix">
<nav-info></nav-info>

          </header>
		  
          <main role="main" class="inner cover">
         <b-jumbotron>
             This is the about page
         </b-jumbotron>
          </main>

          <footer class="mastfoot">
		  
         <footer-info></footer-info>
		 
          </footer>  
        </div>
      </div>
    </div>
</template>

<script>
	
    import NavInfo from './NavInfo.vue'
    import FooterInfo from './FooterInfo.vue'

	export default {
		components: {		
            NavInfo,
           FooterInfo
		}
	}
</script>   