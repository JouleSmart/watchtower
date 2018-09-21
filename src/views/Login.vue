<template>
<v-container fluid fill-height class="login">
  <v-layout row wrap align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="email"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="password"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    login () {
      this.feedback = null
      if (this.email && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.$router.push({ name: 'Home' })
          })
          .catch(err => {
            console.log(err)
            this.feedback = err.message
          })
      } else {
        this.feedback = 'Please fill in both fields'
      }
    }
  }
}
</script>

<style>

</style>
