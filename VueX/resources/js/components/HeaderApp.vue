<template>
    <div id="header" >
        <div></div>
        <img src="img/hinhvue.png" class="picture">

      <button class="btn btn-danger myText">  <router-link to="/user">User</router-link></button>
        <button class="btn btn-dark myText">   <router-link to="/product">Product</router-link></button>
    </div>

</template>

<script>
export default {
name: "HeaderApp"
}
</script>

<style scoped>
    #header{

        display: flex;
        background-color: green;
        opacity: 0.6;
        width: 100%;
        height: 60px;
    }


</style>
