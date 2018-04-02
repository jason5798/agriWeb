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
  middleware: 'auth',
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

</style>
