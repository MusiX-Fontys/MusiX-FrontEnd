<template>
  <div>
    <router-view class="page"/>
    <Background />
  </div>
</template>

<script>
import Background from "./components/Background.vue"

export default {
  name: 'App',
  components: {
    Background
  }
}
</script>

<style>
#app {
  font-family: Strait !important;
}

.page {
  position: absolute;
}

:root{
  --primary-color: rgba(248, 38, 38, 1);
  --secondary-color: rgb(255, 255, 255, 1);
  --text-color: rgb(0, 0, 0, 0.85);
}
</style>
