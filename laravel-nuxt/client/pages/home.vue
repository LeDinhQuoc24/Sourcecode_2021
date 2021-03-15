<template>
  <card :title="$t('home')">
    {{ $t('you_are_logged_in') }}
    <br/>
    Token: {{ token }}
  </card>
</template>

<script>
export default {
  middleware: 'auth',

  head () {
    return { title: this.$t('home')}
  },
  data () {
    return {
      token: this.$store.getters['auth/token']
    }
  }
}
</script>
