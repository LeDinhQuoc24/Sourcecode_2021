<template>
    <div id="app">
    <ListProduct/>
    <shopping-cart/>
    </div>
</template>

<script>
import ListProduct from "./ListProduct";
import ShoppingCart from "./ShoppingCart";
export default {
    name: "ProductIndex",
    components:{
        ListProduct,
        ShoppingCart,
    }
}
</script>

<style scoped>

</style>
