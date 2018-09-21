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
        <td width="15%"><span :class="isZero(props.item.status.alarm)"></span></td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import db from '@/firebase/init'

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
      selectedSite: null
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
</style>
