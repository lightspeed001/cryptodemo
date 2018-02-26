<template>
	<div>
		<div class="alert alert-error">
			{{ authError }}
		</div>		
		<signup />
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import signup from './signin-mu.vue'

	export default {
		components: {		
			signup
		},
		computed: mapState(['authError', 'authenticated']),
		watch: {
			authenticated() {
				this.$router.push('/protected')
			}
		}
	}
</script>

