<template>
  <v-layout row wrap >

      <v-flex xl3 lg3 md3>
          
          <div class="BG-Average">
            <v-card dark>
              <v-card-title>
                <h2><nuxt-link to="/">裝置類別</nuxt-link></h2>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                  <!--<v-btn icon slot="activator" dark>
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile v-for="(user, i) in users" :key="user.id" @click="">
                      <v-list-tile-title>{{ user.name }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>-->
                  
                </v-menu>
              </v-card-title>
              <v-card-text>
                  <ul class="players">
                    <li v-for="map in mapList" :key="map.deviceType">
                      <nuxt-link :to="'/'+map.deviceType">{{ map.typeName }}</nuxt-link>
                    </li>
                  </ul>
              </v-card-text>
            </v-card>
          </div>
      </v-flex>
      <v-flex xl9 lg9 md9>
        <div class="BG-Average-Copy">
          
          <nuxt-child :key="$route.params.id"/>

        </div>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  layout: 'post',
  async asyncData ({ env, app, error, store }) {
    try {
      console.log('??????????????????????????????')
      // console.log(isServer)
      // console.log(store)
      // console.log(params)
      var url = 'http://localhost:8000/map/v1/'
      var token = store.state.authUser.authToken
      var json = {params: {token: token}}
      const [ list ] = await Promise.all([
        app.$axios.get(url, json).then(res => res.data)
      ])
      // console.log('list ' + JSON.stringify(list.data))
      store.dispatch('set_map', list.data)
      return {
        mapList: list.data,
        users: env.users
      }
    } catch (err) {
      error(err)
    }
  }
}
</script>

<style scoped>
.page-enter-active, .page-leave-active {
  transition: opacity .4s, transform .4s;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  opacity: 1;
}
.page-enter, .page-leave-active {
  opacity: 0.5;
  transform: rotateY(100deg);
}
.container {
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  box-sizing: border-box;
}
.left {
  width: 50%;
  position: absolute;
  top: 0;
  left: 0;
}
.right {
  width: 50%;
  position: absolute;
  top: 0;
  right: 0;
}
.players {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.players li a {
  display: block;
  border: 1px #ddd solid;
  padding: 10px;
  text-align: left;
  color: #FFFFFF;
  text-decoration: none;
}
.players li a:hover {
  color: orange;
}
</style>
