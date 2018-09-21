import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'

import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from '@/views/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of use
    let user = firebase.auth().currentUser
    if (user) {
      // user signed in, proceed to route
      next()
    } else {
      // no user, redirect to login
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
