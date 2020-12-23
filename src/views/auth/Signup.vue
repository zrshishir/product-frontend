<template>
    <v-container v-if="! isLoggedIn">
        <v-layout text-xs-center text-md-center>
            <v-flex xs1 sm1 md2 lg3></v-flex>
            <v-flex xs10 sm1 md8 lg6>
                <v-layout row wrap justify-center>
                    <h5 class="display-2 font-weight-bold mb-3 text-center">
                        Registration
                    </h5>
                </v-layout>
                <v-layout v-if="getAuthResponse" row wrap justify-center>
                    <v-alert
                      :value="getAuthResponse"
                      type="warning"
                    >
                    {{getAuthResponse}}
                    </v-alert>
                </v-layout>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                      <v-text-field
                        v-model="allFormData.name"
                        :rules="nameRules"
                        label="Name"
                        required
                      ></v-text-field>

                    <v-text-field
                    v-model="allFormData.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="allFormData.password"
                    type="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="allFormData.password_confirmation"
                    type="password"
                    :rules="confirmPasswordRules"
                    label="Password"
                    required
                    ></v-text-field>
                    <p v-if="show1" class="error">the password you have given do not match</p>

                    <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                    ></v-checkbox>

                    <v-btn
                    :disabled="!valid"
                    color="success"
                    @click="register(allFormData)"
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
      allFormData: {
        name: '',
        email: '',
        password: null,
        password_confirmation: null
      },
      
      show1: false,
      nameRules: [
        v => !!v || 'Name is required'
      ],
      emailRules: [
        v => /.+.@.+/.test(v) || 'E-mail must be valid',
      ],

      
      passwordRules: [
            v => !!v || 'password is required',
            v => (v && v.length > 5) || 'minimum 6 characters',
      ],
      
      password_confirmation: null,
      confirmPasswordRules:[
          v => !!v || 'password is required',
          v => (v && v.length > 5) || 'minimum 6 characters',
      ],
      checkbox: false,
    }),

    computed:{
      ...mapGetters(['isLoggedIn', 'getAuthResponse']), 
    },

    methods: {
      validate () {
        if (this.allFormData.password != this.allFormData.password_confirmation) {
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
      },

      ...mapActions(['register']),
    }
  }
</script>