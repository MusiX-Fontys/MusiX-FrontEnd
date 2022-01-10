<template>
  <div>
    <NavigationBar v-show="isNotSignInOrSignUpPage"/>
    <router-view :class="{'other-page': isNotSignInOrSignUpPage,  'sign-in-or-up-page': !isNotSignInOrSignUpPage}" :key="this.$route.path"/>
    <Background />
  </div>
</template>

<script>
import Background from "./components/Background.vue"
import NavigationBar from './components/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    Background,
    NavigationBar
  },
  methods: {
    isNotSignInOrSignUpPage() {
      if(this.$route.name !== 'signin' && this.$route.name !== 'signup'){
        return true;
      }
      return false;
    }
  }
}
</script>

<style>
#app {
  font-family: Strait, sans-serif !important;
}

.sign-in-or-up-page{
  position: absolute;
}

.other-page {
  position: absolute;
  top: 75px;
}

:root{
  --primary-color: rgba(248, 38, 38, 1);
  --secondary-color: rgb(255, 255, 255, 1);
  --text-color: rgb(0, 0, 0, 1);
}
</style>
