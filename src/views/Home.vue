<template>
  <v-container class="home">
    <v-data-table
      :headers="headers"
      :items="sites"
      hide-actions
      class="elevation-10"
      item-key="name"
    >
      <template slot="items" slot-scope="props">
        <tr @click="showChildData(props, $event)" :class="{ 'elevation-12': props.expanded }">
          <td>{{ props.item.name }}</td>
          <signal-cell :site="props.item" />
          <td><span class="dot" :class="statusCodes[props.item.status.zigbee]"></span></td>
          <td><span class="dot" :class="statusCodes[props.item.status.modbus]"></span></td>
          <td><span class="dot" :class="statusCodes[props.item.status.alarm]"></span></td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <nested-table :site="selectedSite"></nested-table>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import db from '@/firebase/init'
import NestedTable from '@/components/NestedTable'
import SignalCell from '@/components/SignalCell'

// TODO: use timestamps for 4G signal
// 10 min: yellow
// 30 min: red

export default {
  name: 'Home',
  components: {
    NestedTable,
    SignalCell
  },
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name', width: '40%' },
        { text: '4G Signal', value: 'signal', width: '15%', sortable: false },
        { text: 'ZigBee', value: 'zigbee', width: '15%', sortable: false },
        { text: 'Modbus', value: 'mobus', width: '15%', sortable: false },
        { text: 'Alarm', value: 'alarm', width: '15%', sortable: false }
      ],
      subData: [],
      statusCodes: {
        0: 'transparent',
        1: 'green',
        2: 'yellow',
        3: 'red'
      },
      sites: [],
      selectedSite: null
    }
  },
  firestore () {
    return {
      sites: db.collection('site-data')
    }
  },
  methods: {
    showChildData (props, ev) {
      props.expanded = !props.expanded
      this.selectedSite = props.item
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

.home {
  padding-top: 120px;
}
</style>
