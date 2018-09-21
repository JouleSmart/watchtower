<template>
  <div id="app">
    <v-app>
      <top-bar />
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
export default {
  components: {
    TopBar
  }
}
</script>


<style>
/* #app {
  padding-top: 60px;
} */
</style>
