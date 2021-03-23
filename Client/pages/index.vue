<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Nuxt Auth-next</h1>
      <h1 class="title">Laravel Passport</h1>
      <div>
        User status:
        <v-spacer></v-spacer>
        <v-badge>{{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</v-badge>
      </div>
    </div>
  </section>
</template>

<script>


export default {
  auth: false

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
v-btn {
  font-family: 'Dancing Script', cursive;
}
</style>
