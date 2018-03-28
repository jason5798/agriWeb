<template>

    <v-container fluid>

        <img src="~/static/img/logo_company.png" width="150" height="48"/>

        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-layout align-center justify-center>
                    <span><img src="~/static/img/logo_office_automation.png" /></span>
                </v-layout>
                <v-layout row align-center justify-center>
                    <v-btn  dark class="blue darken-4"><h1>農業物聯網</h1></v-btn>
                </v-layout>
                <v-layout row align-center justify-center>
                    <br>
                </v-layout>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>登入</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>

                        </v-tooltip>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="person" name="login" label="帳號" type="text"　v-model="login"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="密碼" id="password" type="password"　v-model="pwd"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-alert outline
                                 color="error"
                                 icon="warning"
                                 dismissible
                                 transition="scale-transition"
                                 v-model="alert">
                            {{message}}
                        </v-alert>


                        <v-spacer></v-spacer>
                        <v-btn large color="primary" @click="toLogin">登入</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
  export default {
    layout: 'full',
    data: () => ({
      dialog: true,
      login: '',
      pwd: '',
      msg: '',
      alert: false,
      message: null
    }),
    methods: {
      async toLogin () {
        this.msg = this.login + ':' + this.pwd
        var url = 'http://localhost:8000/user/v1/login/gemtek'
        var json = {
          acc: this.login,
          pwd: this.pwd,
          type: 0
        }
        const res = await this.$axios.$post(url, json)
        console.log('userInfo : ' + JSON.stringify(res.userInfo))
        if (res.responseCode === '000') {
          this.$store.dispatch('login', res.userInfo)
          var authUser = this.$store.getters.authUser
          console.log('$ test : ' + JSON.stringify(res))
          console.log('$ authUser: ' + JSON.stringify(authUser))
          this.$router.replace('/')
        } else if (res.responseCode) {
          this.alert = true
          if (res.responseMsg) {
            this.message = res.responseMsg
          } else {
            this.message = '網路異常'
          }
        }
        /* this.$store.dispatch('login', {'login': this.login, 'pwd': this.pwd})
          .then(data => {
            this.$router.replace('/')
            // console.log(data)
          })
          .catch(err => {
            console.log(err)
          }) */
      }
    }
  }
</script>
