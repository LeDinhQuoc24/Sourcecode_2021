<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Register</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :rules="emailRules"
                label="Email*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Confirm Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>

        <v-spacer></v-spacer>

        <v-btn
          color="blue darken-1"
          text
          @click="show = false"
        >
          Close
        </v-btn>
        <v-btn
          color="red lighten-1"
          text
          @click="registerUser"
        >
          Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RegisterComponent",
  props: {
    value: Boolean,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    async registerUser(registrationInfo){
      let user = await this.$store.dispatch('registerUser', registrationInfo);
      if(user.error){
        alert(user.error)
      } else {
        alert('Welcome to our app, ' + user.name);
      }
    }
  }
}
</script>

<style scoped>

</style>
