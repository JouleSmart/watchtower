<template>
  <v-data-table
    hide-headers
    hide-actions
    :headers-length="5"
    :items="selectedSite.devices"
    item-key="name"
    class="sub-table"
  >
    <template slot="items" slot-scope="props">
      <tr>
        <td width="40%" class="indent">{{ props.item.name }}</td>
        <td width="15%"><span class="dot" :class="statusCodes[props.item.status.signal]"></span></td>
        <td width="15%"><span class="dot" :class="statusCodes[props.item.status.zigbee]"></span></td>
        <td width="15%"><span class="dot" :class="statusCodes[props.item.status.modbus]"></span></td>
        <td width="15%" v-if="props.item.alarms && props.item.alarms.alertText !== ''">
          <span
            @click.stop="$set(dialogAlarm, props.item.name, true)"
            :class="isZero(props.item.status.alarm)"
            class="alarm-anchor"></span>
          <v-dialog v-model="dialogAlarm[props.item.name]" max-width="700" :key="props.item.name">
            <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ props.item.alarms.alertText }}</div>
                  <span class="grey--text">{{ props.item.alarms.timestamp | dateFormat }}</span>
                </div>
              </v-card-title>

              <v-list two-line>
                <template v-for="(status, index) in props.item.alarms.statusText">
                  <v-list-tile :key="index">
                    <v-list-tile-avatar>
                      <v-icon class="alarm-icon red--text">report_problem</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ status }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider v-if="index + 1 < props.item.alarms.statusText.length" :key="`divider-${index}`"></v-divider>
                </template>
              </v-list>
              <v-card-actions>
                <v-btn color="primary" @click.stop="$set(dialogAlarm, props.item.name, false)">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </td>
        <td width="15%" v-if="!props.item.alarms || props.item.alarms.alertText == ''">
          <span :class="isZero(props.item.status.alarm)"></span>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'NestedTable',
  props: ['site'],
  data () {
    return {
      statusCodes: {
        0: 'transparent',
        1: 'green',
        2: 'yellow',
        3: 'red'
      },
      selectedSite: null,
      dialogAlarm: {}
    }
  },
  firestore () {
    return {
      selectedSite: db.collection('site-data').doc(this.site.node_id)
    }
  },
  methods: {
    isZero (value) {
      return value !== 0 ? `dot ${this.statusCodes[value]} white--text font-weight-bold` : 'hidden'
    },
    hasAlarms (device) {
      return device.hasOwnProperty('alarms')
    }
  },
  filters: {
    dateFormat (value) {
      if (!value) return ''
      value = moment.unix(value).format("dddd, MMMM Do YYYY, h:mm:ss a")
      return value
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

.hidden {
  display: none;
}

.sub-table tbody {
  background-color: #ECEFF1;
}

.indent {
  padding-left: 40px !important;
}

.alarm-anchor {
  cursor: pointer;
}

.alarm-icon {
  padding-right: 10px;
}
</style>
