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
        <v-btn
        @click="refreshToken"
        color="primary"
        >
          Click me
        </v-btn>
      </div>
    </div>

    <p> {{token}}</p>


<!--    <br><br>-->
<!--    <p v-model="token"> </p>-->
  </section>

</template>

<script>
import { mapGetters } from 'vuex'


export default {
  middleware: 'auth',
  computed: {
    // ...mapGetters(['authenticate/loggedInUser']),
    // ...mapGetters(['authenticate/loggedInUser','authenticate/isAuthenticated']),
    ...mapGetters(['loggedInUser','isAuthenticated','tokenRefresh']),

  },
  data() {
    return {
      token:this.$auth.strategy.token.get(),

    }
  },
  methods:{
    refreshToken(){
      // setInterval(()=>  {this.$auth.refreshTokens()},3000)
      this.$auth.refreshTokens();
      this.token = this.$auth.strategy.token.get();
    }
  },
  // watch:{
  //   token:function (){
  //       this.token=this.$auth.strategy.token.get()
  //
  //     }
  //   },
  beforeDestroy() {
    clearInterval();
  }


}
</script>
