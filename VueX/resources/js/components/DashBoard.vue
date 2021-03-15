<template>
    <div id="app">
    <header-app/>
  <router-view></router-view>
    <footer-app/>
    </div>
</template>

<script>
import HeaderApp from "./HeaderApp";
import FooterApp from "./FooterApp";


export default {
name: "Dashboard",
    components:{

    HeaderApp,FooterApp
    }
}
</script>

<style scoped>

</style>
