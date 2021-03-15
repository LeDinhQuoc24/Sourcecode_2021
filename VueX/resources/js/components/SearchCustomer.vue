<template>
    <input type="text"v-model="key" class="mySearch" >
</template>

<script>
import {EventBus} from "../app.js";

export default {
    name: "SearchCustomer",
    data() {
        return {
            key: null,
        }
    },
    watch: {
        key: function () {
            this.ESearchProduct();
        }
    },
    methods: {
        ESearchProduct() {
            EventBus.$emit("SearchKey", {
                key: this.key

            });
            console.log("Search");
        },
    }
}
</script>

<style scoped>
.mySearch{
    width: 85%;
    height:45px;
    border:1px solid #ebebeb;
    border-radius: 15px;
    margin: 5px;
    background-color : #90CAF9;


}
</style>
