<template>
    <v-app >
        <v-toolbar fixed app dark color="primary">

            <v-btn color="info" flat v-on:click="translate('/')">
                <h1><img class="submenu-icon m-r8" src="~/static/img/btn_home_n.png"/></h1>
            </v-btn>
            <v-btn flat v-on:click="translate('/')">
                <h1>裝置</h1>
            </v-btn>
            <v-btn flat v-on:click="translate('/inspire')">
                <h1>查詢</h1>
            </v-btn>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-content>
            <v-container fill-height fluid grid-list-xl>
                <nuxt />
            </v-container>
        </v-content>

        <v-footer :fixed="fixed" app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        fixed: false,
        allHeight: true,
        title: 'Vuetify.js'
      }
    },
    methods: {
      translate (url) {
        window.location = url
      }
    }
  }
</script>
