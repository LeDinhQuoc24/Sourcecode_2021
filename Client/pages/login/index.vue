<template>
  <v-container>

    <v-card width="800"
            class="elevation-1 paddingForm my-border mt-8 mx-auto"
    >
      <v-card-title class="pb-0 justify-center">
        <h1 class="login">Login  </h1>
        <h1 class="login1"> Laravel Passport</h1>
      </v-card-title>
      <v-card-text>
        <v-form method="post" @submit.prevent="userLogin" class="px-5">

          <v-text-field
            type="text"
            label="Email"
            name="email"
            v-model="userForm.username"
            required
            prepend-icon="mdi-mail"
          />
          <v-text-field
            type="text"
            name="password"
            label="Password"
            required
            prepend-icon="mdi-lock"
            v-model="userForm.password"
          />
          <div class="mt-3">
            <span
              v-if="error"
              class="inline-flex items-center font-semibold text-sm text-red-600"
            >
              <svg
                aria-hidden="true"
                class="fill-current mr-2"
                height="12"
                width="12"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              {{ error }}
            </span>
          </div>

          <div>
            <v-btn color="primary" type="submit" style="margin-left: 300px"  class="button is-dark is-fullwidth">Login</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-col md="4" class="text-center" style="margin-left:550px;margin-top: 50px">
      <v-card title="Social Login" bg-variant="dark">
        <div v-for="s in strategies" :key="s.key" class="mb-2">
          <v-btn
            block
            :style="{ background: s.color }"
            class="login-button"
            @click="$auth.loginWith(s.key)"
          >
            Login with {{ s.name }}
          </v-btn>
        </div>
      </v-card>
    </v-col>


  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        username: '',
        password: '',
      },
      error: false
    }
  },
  computed: {
    strategies: () => [
      { key: 'auth0', name: 'Auth0', color: '#ec5425' },
      { key: 'google', name: 'Google', color: '#4284f4' },
      { key: 'facebook', name: 'Facebook', color: '#3c65c4' },
      { key: 'github', name: 'GitHub', color: '#f8145a' }
    ]
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('laravelPassport', { data: this.userForm });

      } catch (err) {
        this.error = 'Incorrect email or password.'
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
.login {
  font-family: 'Dancing Script', cursive;
  margin-right: 5%;
}
.login1 {
  font-family: '123', cursive;
}
</style>
