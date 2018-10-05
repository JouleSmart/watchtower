<template>
  <div v-if="alarms">
    <v-dialog
      v-model="show"
      width="500"
    >
      <v-card>
        <v-card-title>{{ alarms.alertText }}</v-card-title>
        <v-list two-line>
          <template v-for="(status, index) in alarms.statusText">
            <v-list-tile :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{ status }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < alarms.statusText.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AlarmDialog',
  data () {
    return {

    }
  },
  computed: {
    show: {
      get () {
        return this.$store.state.dialogVisible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    alarms () {
      return this.$store.state.dialogAlarm
    }
  }
}
</script>

<style>

</style>
