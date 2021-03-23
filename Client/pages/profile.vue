<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Name:</strong>
          {{ loggedInUser.name }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ loggedInUser.email }}
        </p>

        <v-btn @click="tokenRefresh" color="primary">Refresh Token</v-btn>

        <div>
          {{ token }}
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  data() {
    return {
      token: this.$auth.strategy.token.get()
    }
  },
  methods: {
    tokenRefresh(){
      this.$auth.refreshTokens();
      this.token = this.$auth.strategy.token.get();
    }
  }

}
</script>
