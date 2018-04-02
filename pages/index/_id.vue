<template>
  <div>
    #{{ data.type }}
    {{data.name }}}
     <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="purple darken-1"
      dark
    >
      <template slot="headerCell" slot-scope="props" >
        <v-tooltip bottom>
          <span slot="activator">
            <h1>{{ props.header.text }}</h1>
          </span>
          <span>
            <h1>{{ props.header.text }}</h1>
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.device_mac }}</td>
        <td class="text-xs-right">{{ props.item.device_name }}</td>
        <td class="text-xs-right">{{ props.item.device_active_time }}</td>
        <!--<td class="text-xs-right">{{ props.item.device_bind_time }}</td>-->
        <td class="text-xs-right">{{ props.item.statusDesc }}</td>
        <td class="text-xs-right">{{ props.item.LoRaAP }}</td>
        <!--<td class="text-xs-right">{{ props.item.fport }}</td>-->
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    console.log('params :' + JSON.stringify(params))
    return !isNaN(+params.id)
  },
  async asyncData ({ params, error, store, app }) {
    var mapList = store.state.mapList
    console.log('mapList :' + JSON.stringify(mapList))
    var data = null
    // var map = null
    if (mapList) {
      for (let i = 0; i < mapList.length; ++i) {
        if (mapList[i].deviceType === params.id) {
          data = {type: mapList[i]['deviceType'], name: mapList[i]['typeName']}
        }
      }
    }
    var mList = store.state.deviceList
    var myItem = []
    if (mapList) {
      for (let j = 0; j < mList.length; ++j) {
        console.log(j + '==>' + JSON.stringify(mList[j]))
        if (mList[j].fport === Number(params.id)) {
          myItem.splice(myItem.length, 0, mList[j])
        }
      }
    }

    return {
      data: data,
      items: myItem
    }
  },
  head () {
    return {
      title: this.name
    }
  },
  data () {
    return {
      search: '',
      pagination: {rowsPerPage: 10},
      selected: [],
      headers: [
        {
          text: '裝置識別碼',
          align: 'left',
          sortable: true,
          value: 'device_mac'
        },
        { text: '裝置名稱', align: 'left', value: 'device_name' },
        { text: '啟用日期', align: 'left', value: 'device_active_time' },
        // { text: '綁定日期', align: 'left', value: 'device_bind_time' },
        { text: '狀態', align: 'left', value: 'statusDesc' }, // LoRaAP
        { text: 'GW', align: 'left', value: 'LoRaAP' }
        // { text: '裝置類型', align: 'left', value: 'fport' }
      ]
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  }
}
</script>

<style scoped>
.player {
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
</style>
