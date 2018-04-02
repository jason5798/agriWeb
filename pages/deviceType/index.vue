<template>
  <div>
    <h1>#全部裝置</h1>
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
            <h3>{{ props.header.text }}</h3>
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
        <td class="text-xs-right">{{ props.item.fport }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head: {
    title: 'Please select an user'
  },
  async asyncData ({ env, app, error, store }) {
    try {
      console.log('??????????????????????????????')
      // console.log(isServer)
      // console.log(store)
      // console.log(params)
      var url = 'http://localhost:8000/device/v1/sensor/3'
      var token = store.state.authUser.authToken
      var json = {params: {token: token}}
      const [ list ] = await Promise.all([
        app.$axios.get(url, json).then(res => res.data)
      ])
      // console.log('%%%%%%% list ' + JSON.stringify(list.mList))
      store.dispatch('set_devicelist', list.mList)
      var mList = list.mList
      return {
        deviceList: list.mList,
        items: mList
      }
    } catch (err) {
      error(err)
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
        { text: 'GW', align: 'left', value: 'LoRaAP' },
        { text: '裝置類型', align: 'left', value: 'fport' }
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
h2 {
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
</style>
