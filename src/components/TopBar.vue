<template>
  <v-toolbar fixed app :clipped-left="clipped">
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        flat
        v-if="user"
        @click="logout"
      >Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'TopBar',
  data () {
    return {
      drawer: true,
      clipped: false,
      fixed: false,
      miniVariant: false,
      rightDrawer: false,
      title: 'JouleSmart Watchtower',
      user: null
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style>

</style>
