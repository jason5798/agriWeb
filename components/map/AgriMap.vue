<template>
  <div class="animated fadeIn">
      <gmap-map ref="example"
                :center="center"
                :zoom="18"
                style="width: 100%; height: 630px"
      >
        <gmap-info-window :options="infoOptions"
                          :position="infoWindowPos"
                          :opened="infoWinOpen"
                          @closeclick="closeInfo"
        >
          {{infoContent}}
        </gmap-info-window>

        <gmap-marker
          :key = "i"
          v-for = "(m,i) in markers"
          :position.sync = "m.position"
          :clickable = "true"
          :icon.sync =" iconArr[i]"
          @click= "toggleInfoChart(m,i)"
          @mouseover = "mouseOver(m,i) "
          @mouseout = "mouseOut"
        >
        </gmap-marker>
      </gmap-map>
  </div>
</template>

<script>
  export default {
    name: 'agri-map',
    props: {
      markers: Array,
      icons: Array
    },
    watch: {
      markers (val) {
        if (val && val.length > 0) {
          this.iconArr = this.getIconList(val.length)
          // console.log('watch :  val: ' + JSON.stringify(val))
          console.log('watch :  val[0]: ' + JSON.stringify(val[0]))
          console.log('watch :  val[0].position : ' + JSON.stringify(val[0].position))
          this.center = val[0].position
        }
        this.isOverMap = false
      },
      isOverMap (val) {
        console.log('child show-view : ' + val)
        this.$emit('show-view', val)
      }
    },
    data () {
      return {
        center: {
          lat: 22.9764891,
          lng: 120.5493562
        },
        infoContent: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        currentMidx: null,
        // optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        isOverMap: false,
        iconArr: this.icons,
        icon1: {url: '/img/ico_manhole_small.png'},
        icon2: {url: '/img/ico_manhole_warning_small.png'}
      }
    },
    methods: {
      mouseOver (marker, idx) {
        this.infoWindowPos = marker.position
        this.infoContent = marker.name + ' : ' + marker.macAddr
        // check if its the same marker that was selected if yes toggle
        if (this.currentMidx === idx) {
          this.infoWinOpen = !this.infoWinOpen
        } else {
          // if different marker set infowindow to open and reset current marker index
          this.infoWinOpen = true
        }
      },
      mouseOut () {
        this.infoWinOpen = false
      },
      toggleInfoChart (marker, idx) {
        // Keep last index
        this.infoWinOpen = false
        var oldIndex = this.currentMidx
        console.log('toggleInfoChart marker : ' + JSON.stringify(marker))
        // Verify is same maker or not
        if (this.currentMidx === idx) { // Same maker to change
          this.isOverMap = !this.isOverMap
          if (this.isOverMap) {
            this.iconArr[idx] = this.icon2
          } else {
            this.iconArr[idx] = this.icon1
          }
        } else {
          // if different marker set infowindow to open and reset current marker index
          this.iconArr[oldIndex] = this.icon1
          this.iconArr[idx] = this.icon2
          this.isOverMap = true
          this.currentMidx = idx
        }

        // console.log('toggleInfoChart after : currentMidx : ' + this.currentMidx + ' ,  idx :' + idx)
        console.log('toggleInfo : marker : ' + JSON.stringify(marker))
        var device = {name: marker.name, mac: marker.macAddr, information: {temperature: 24.8, humidity: 58, ph: 9, con: 700}}
        this.$emit('toggle-info', device)
        this.infoWinOpen = true
      },
      closeInfo () {
        this.infoWinOpen = false
        this.isOverMap = false
      },
      getIconList (length) {
        var arr = []
        var icon1 = {url: '/img/ico_manhole_small.png'}
        for (let i = 0; i < length; i++) {
          arr.push(icon1)
        }
        return arr
      }
    }
  }
</script>

<style>
  #wrapper { position: relative; }
  #over_map {
    position: relative;
    top: -630px;
    z-index: 99;
    height: 400px;
    width:  400px;
    background-color: gray;
    border-radius: 6px;
    opacity:0.4;
  }
</style>
