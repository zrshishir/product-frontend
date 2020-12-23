<template>
    <v-container fluid>
         <v-layout align-center justify-center row>
            <div mt-60>
                <v-progress-circular
                :rotate="180"
                :size="100"
                :width="15"
                :value="value"
                color="pink"
              >
                {{ value }}
              </v-progress-circular>
            </div>
        </v-layout>
    </v-container>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'AuthHandler',
    data(){
      return{
          interval: {},
          value: 0,
      }
    },
    computed: mapGetters(['isLoggedIn']),
    methods: mapActions(['finalizeLogin']),
    beforeCreate(){

    },
    created(){
        this.finalizeLogin(window.location.hash);   
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    mounted() {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0);
        }
        this.value += 10;
      }, 1000);
    },
}
    

</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
