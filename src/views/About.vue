<template>
  <v-container>
    <v-layout v-if="getAuthResponse" row wrap justify-center>
        <v-alert
          :value="getAuthResponse"
          type="success"
        >
        {{getAuthResponse}}
        </v-alert>
    </v-layout>

    <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-medium mb-4">Product CRUD, Simple Project</h1>
        <h4 class="subheading">This is a simple crud operation for product</h4>
      </v-col>
    </v-row>
  </v-parallax>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'App',
    data: () => ({
    }),

    computed:{
    ...mapGetters(['isLoggedIn', 'getAuthResponse'])
    }, 
  }
</script>