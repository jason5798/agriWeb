<template>
  <v-layout row wrap>

    <v-flex md3>

        <div class="BG-Average">
          <v-btn
              @click.native="onClickAll"
              :color="btnColor"
              class="white--text"
              large
              block
          >
            <h2>全部區域</h2>
            <v-icon dark right>cached</v-icon>
          </v-btn>

          <ul class="submenu">
            <li  class="submenu-item" v-bind:class="{ active: item.isActive }" v-for="(item, index) in items">
              <sub-item :params="item" :tag="index" @click-item="onClick"></sub-item>
            </li>
          </ul>
        </div>


    </v-flex>
    <v-flex md9>
      <div class="BG-Average-Copy">
        <div v-if="isShowMap" id="map">
          <agri-map :center="center" :markers="markerList" :icons="iconList" @show-view="isShowView" @toggle-info="showChartInfo"></agri-map>
        </div>
      </div>
    </v-flex>
    <v-flex md3>
      <div v-if="isOverView" id="over_view" >
        <chart-info :params="toggleData" @click-close="clickClose"></chart-info>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import SubItem from '~/components/submenu/SubItem'
  import AgriMap from '~/components/map/AgriMap'
  import ChartInfo from '~/components/charts/ChartInfo'

  var icons = []
  var icon1 = {url: '/img/ico_manhole_small.png'}
  for (var i = 0; i < 5; i++) {
    icons.push(icon1)
  }
  var itemLight = 't1'

  function getItem (name, selected, length) {
    var obj = {}
    obj.title = name
    obj.isActive = selected
    obj.total = length
    obj.active = length
    return obj
  }

  export default {
    layout: 'post',
    // middleware: ['auth'],
    fetch ({redirect, store}) {
      if (!store.state.authUser) {
        redirect('/login')
      }
    },
    components: {
      SubItem,
      AgriMap,
      ChartInfo
    },
    data () {
      return {
        items: [],
        marks: [],
        markerList: [],
        iconList: icons,
        all: [],
        btnColor: itemLight,
        center: {
          lat: 22.978395,
          lng: 120.550663
        },
        isShowMap: false,
        isOverView: false,
        isOverLoading: false,
        toggleData: {
          mac: '',
          information: {
            temperature: '',
            humidity: '',
            ph: '',
            con: ''
          }
        }
      }
    },
    mounted () {
      this.setMark()
    },
    methods: {
      setMark () {
        this.marks = []
        var zones = this.zoneList
        // console.log('this.zoneList : ' + JSON.stringify(zones))
        for (let i = 0; i < zones.length; i++) {
          // console.log('i : ' + i + ', zone : ' + JSON.stringify(zones[i]))
          if (i === 0) {
            this.items.push(getItem(zones[i].name, true, zones[i].deviceList.length))
          } else {
            this.items.push(getItem(zones[i].name, false, zones[i].deviceList.length))
          }
          // console.log('------------------------------------------------------------')
          // console.log('$$$ this.items : ' + JSON.stringify(this.items))
          this.marks[i] = []
          if (zones[0].deviceList && zones[0].deviceList.length > 0) {
            console.log('zones[' + i + '].deviceList : ' + JSON.stringify(zones[i].deviceList))
            for (let j = 0; j < zones[i].deviceList.length; j++) {
              let device = this.getmMarkDeviceByName(zones[i].deviceList[j])
              console.log('this.marks[' + i + '] push ' + zones[0].deviceList[j] + ' \n' + JSON.stringify(device))
              this.marks[i].push(device)
            }
          }
        }
        if (this.marks.length > 0) {
          this.markerList = this.marks[0]
        }
        console.log('init this.markerList : ' + JSON.stringify(this.markerList))
        console.log('init this.marks : ' + this.marks.length)
        console.log('init this.items : ' + JSON.stringify(this.items))
        this.isShowMap = true
      },
      getmMarkDeviceByName (name) {
        let returnDevice = null
        var binds = this.bindList
        // console.log('getmMarkDeviceByName bindList : ' + JSON.stringify(binds))
        if (binds && binds.length > 0) {
          binds.forEach(function (device) {
            // console.log('name : ' + name + ', device :' + JSON.stringify(device))
            if (Object.is(name, device.name)) {
              returnDevice = device
            }
          })
        }
        return returnDevice
      },
      onClick (index) {
        this.btnColor = itemLight
        console.log('submemu item click : ' + index + ' , type : ' + typeof index)
        for (var i = 0; i < this.items.length; i++) {
          if (i === index) {
            this.items[i].isActive = true
          } else {
            this.items[i].isActive = false
          }
        }
        this.markerList = this.marks[index]
      },
      onClickAll () {
        console.log(' click All ')
        this.btnColor = 'light-blue darken-2'
        var all = []
        all = all.concat(...this.marks)
        console.log('all : ' + this.all.length)
        this.markerList = all
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].isActive = false
        }
      },
      isShowView (val) {
        console.log('Parent show-view : ' + val)
        this.isOverView = val
      },
      showChartInfo (data) {
        this.isOverView = true
        console.log('parent toggle-info -----------------------')
        if (data) {
          console.log('parent toggle-info : ' + JSON.stringify(data))
          this.toggleData = data // set propo for charts info
          // this.$store.dispatch('setSelectMac', data.mac)
        }
      },
      clickClose () {
        console.log('parent click-close')
        this.isOverView = false
      }
    },
    async asyncData ({ app, params, store, isServer, error }) {
      try {
        console.log('??????????????????????????????')
        // console.log(isServer)
        // console.log(store)
        // console.log(params)
        const [ list, mapList ] = await Promise.all([
          app.$axios.get(`todos/bindlist`).then(res => res.data),
          app.$axios.get(`todos/zone?create=asc`).then(res => res.data)
        ])

        return {
          bindList: list,
          zoneList: mapList
        }
      } catch (err) {
        error(err)
      }
    }
  }
</script>

<style lang="css">
  form-inline.btn {
    color: #20a8d8;
    text-decoration: none;
    background-color: #0088d2;
  }
  .btn-menu .btn-setting {
    color: #fff;
    background-color: #39b2d5;
    border-color: #39b2d5;
    width: 45px;
    height: 45px;
    border-radius: 5px;
  }
  .btn-all {
    color: #fff;
    background-color: #0088d2;
    border-color: #0088d2;
    height: 45px;
    weight: 185;
    padding: 0;
    border-radius: 5px;
  }
  .btn-refresh {
    width: 19px;
    height: 19px;
    position: absolute;
    left: 136px;
    top: 13px;
  }
  .btn-icon {
    width: 15px;
    height: 20px;
  }
  .submenu {
    padding: 0px;
  }
  .submenu .submenu-item {
    width: auto;
    height: 136px;
    background-color: rgba(0, 136, 210, 0.5);
    list-style: none;
    border-radius: 6px;
    margin-bottom: 9px;
    position: relative;
    cursor: pointer;
    padding: 0px;
  }
  .submenu .active {
    background-color: #0088d2;
  }
  #map {
    height: 637px;
    width: 100%;
  }
  #over_view{
    position: relative;
    height: auto;
    width: auto;
    top: -660px;
    border-radius: 4px;
    background-color: #ffffff;
    border-radius: 6px;
    padding: 10px 10px;
  }

  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>
