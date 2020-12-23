<template>
    <v-container v-if="!isLoggedIn">
        <v-layout text-xs-center text-md-center>
            <v-flex xs1 sm1 md2 lg3></v-flex>
            <v-flex xs10 sm1 md8 lg6>
                <v-layout row wrap justify-center>
                    <h5 class="display-2 font-weight-bold mb-3">
                        Login
                    </h5>
                </v-layout>
                <v-layout v-if="getAuthSigninResponse" row wrap justify-center>
                    <v-alert
                      :value="getAuthSigninResponse"
                      type="warning"
                    >
                    {{getAuthSigninResponse}}
                    </v-alert>
                </v-layout>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >

                    <v-text-field
                      v-model="allLogData.email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>

                    <v-text-field
                    v-model="allLogData.password"
                    type="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                    ></v-text-field>

                    <v-btn
                    :disabled="!valid"
                    v-if="allLogData.email && allLogData.password"
                    color="success"
                    @click="login(allLogData)"
                    >
                    Submit
                    </v-btn>

                    <v-btn
                    color="error"
                    @click="reset"
                    >
                    Reset Form
                    </v-btn>

                    <v-btn
                    color="warning"
                    @click="resetValidation"
                    >
                    Reset Validation
                    </v-btn>
                </v-form>
            </v-flex>
            <v-flex xs1 sm1 md2 lg3></v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
  export default {
    data: () => ({
      valid: true,
      allLogData:{
        email: '',
        password: '',
      },
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
            v => !!v || 'password is required',
            v => (v && v.length > 5) || 'minimum 6 characters',
      ],
      
    }),

    computed:{
      ...mapGetters(['isLoggedIn', 'getAuthSigninResponse', 'error', 'errorMsg'])
    },

    methods: {
      ...mapActions(['login']),
      validate () {
        if (this.password != this.confirm_password) {
          return this.show1 = true
        }else{
          this.show1 = false
        }

        if(this.$refs.form.validate()){
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
        this.$store.dispatch('setErrorZero')
      },
      resetValidation () {
        this.$refs.form.resetValidation()
        this.$store.dispatch('setErrorZero')
      }
    }
  }
</script>