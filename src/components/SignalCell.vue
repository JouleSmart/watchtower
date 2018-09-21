<template>
  <td><span class="dot" :class="signalStatus"></span></td>
</template>

<script>
import moment from 'moment'

export default {
  name: 'SignalCell',
  props: ['site'],
  data () {
    return { }
  },
  methods: {
    getDataAgeInMinutes (timestamp) {
      let now = moment()
      let ts = moment(timestamp)
      let diff = now.diff(ts, 'minutes')
      return diff
    }
  },
  computed: {
    signalStatus () {
      let age = this.getDataAgeInMinutes(this.site.timestamp)
      console.log('age', age)
      if (age >= 30) {
        return 'red'
      } else if (age >= 10) {
        return 'yellow'
      } else {
        return 'green'
      }
    }
  }
}
</script>

<style>
.dot {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  line-height: 24px;
}
</style>
