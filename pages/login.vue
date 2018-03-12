<template>
  <v-layout row wrap>
    <v-dialog v-model="dialog" persistent hide-overlay max-width="400px">

      <v-form v-model="valid" ref="form" lazy-validation>
        <br>
        <h1>登入</h1>
        <br>
        <hr>
        <br>
        <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
            :counter="10"
            required
        ></v-text-field>
        <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required
        ></v-text-field>

        <br>

        <v-btn
            @click="submit"
            :disabled="valid"
        >
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    layout: 'full',
    data: () => ({
      dialog: true,
      name: '',
      email: ''
    })
  }
</script>
