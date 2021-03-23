<template>
  <section class="section">
    <v-container>
      <v-card width="800"
              class="elevation-1 paddingForm my-border mt-8 mx-auto"
      >
        <v-card-title class="pb-0 justify-center">
          <h1>Register</h1>
        </v-card-title>
        <Notification :message="error" v-if="error"/>
        <v-card-text>
          <v-form method="post" @submit.prevent="register" class="px-5">
            <v-text-field
              type="text"
              class="input"
              label="Name"
              name="name"
              v-model="userForm.name"
              required
              prepend-icon="mdi-mail"
            />
            <v-text-field
              type="text"
              class="input"
              label="Email"
              name="email"
              v-model="userForm.email"
              required
              prepend-icon="mdi-mail"
            />
            <v-text-field
              type="text"
              class="input"
              label="Password"
              name="password"
              v-model="userForm.password"
              required
              prepend-icon="mdi-mail"
            />

            <div>
              <v-btn color="primary" style="margin-left: 300px" type="submit" class="button is-dark is-fullwidth">Register</v-btn>
            </div>
          </v-form>
          <div class="has-text-centered" style="margin-top: 20px;margin-left: 280px">
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import error from "@/layouts/error";

export default {
  auth: false,
  data() {
    return {
      userForm: {
        name: '',
        email: '',
        password: ''
      },
      error:false
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.post('register', this.userForm)
        await this.$auth.loginWith('laravelPassport', { data: this.userForm });
        this.error = "Success"
        this.$router.push('/profile');
      } catch (err) {
        this.error = "Error"
      }
    }
  }
}
</script>



<!--<template>-->
<!--  <div class="container">-->
<!--    <v-form @submit.prevent="register">-->
<!--      <v-form-group-->
<!--        id="input-group-1"-->
<!--        label="Email address:"-->
<!--        label-for="input-1"-->
<!--      >-->
<!--        <v-form-input-->
<!--          id="input-1"-->
<!--          v-model="form.email"-->
<!--          type="email"-->
<!--          required-->
<!--          placeholder="Enter email"-->
<!--        ></v-form-input>-->
<!--      </v-form-group>-->

<!--      <v-form-group id="input-group-2" label="Your Name:" label-for="input-2">-->
<!--        <v-form-input-->
<!--          id="input-2"-->
<!--          v-model="form.name"-->
<!--          required-->
<!--          placeholder="Enter name"-->
<!--        ></v-form-input>-->
<!--      </v-form-group>-->

<!--      <v-form-group id="input-group-3" label="Password:" label-for="input-3">-->
<!--        <v-form-input-->
<!--          id="input-3"-->
<!--          type="password"-->
<!--          v-model="form.password"-->
<!--          required-->
<!--          placeholder="Enter password"-->
<!--        ></v-form-input>-->
<!--      </v-form-group>-->

<!--      <v-button type="submit" variant="primary">Submit</v-button>-->
<!--    </v-form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      form: {-->
<!--        email: '',-->
<!--        name: '',-->
<!--      },-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    register() {-->
<!--      this.$axios.$post('register', this.form)-->
<!--        .then(({token, expiresIn}) => {-->
<!--          this.$store.dispatch('setToken', {token, expiresIn});-->
<!--          this.$router.push({name: 'secret'});-->
<!--        })-->
<!--        .catch(errors => {-->
<!--          console.dir(errors);-->
<!--        });-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
