<template>
    <div id="footer">

        <div id="copyright">Lampart - Team Internship - 2021
        <img :src="uriHinh" alt="logo Lampart" style="width: 50px">
        </div>

    </div>
</template>

<script>
export default {
name: "FooterApp",
    data(){
    return {
        uriHinh:"img/logo-lampart.png",
    }
    }
}
</script>

<style scoped>
#footer {

position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: green;
    opacity: 0.6;
    color: white;
    text-align: center;
}
</style>
