<template>
  <h1>Admin Page</h1>
</template>

<script>
export default {
  name: "index",
  auth: 'admin',
  head() {
    return {

      title: 'admin-page',
      htmlAttrs: {
        lang: 'vi'
      },
    }
  },
}
</script>

<style scoped>

</style>
