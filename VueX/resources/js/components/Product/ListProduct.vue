<template>
    <div>
        <div>
        <button class="btn btn-danger" data-toggle="modal" data-target="#listProduct" style="top:5px;right:0;position: absolute"><i class="fas fa-shopping-cart">
            Giỏ hàng
        </i>
        </button>
        </div>
        <table class="table table-hover table-striped table-bordered">
            <thead>
            <tr class="bg-primary" style="color:white; text-align:center">
                <th class="col-20 text-center">ID</th>
                <th  class="col-20">Tên SP</th>
                <th class="col-20">Hình SP</th>
                <th  class="col-20">Giá</th>
                <th  class="col-20">Số lượng</th>
                <th  class="col-20">Mô tả</th>
                <th class="col-20">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in listProduct" :key="product.id">
                <td scope="row" class=" text-center lineHeight">{{ product.id }}</td>
                <td scope="row" class=" text-center lineHeight">{{ product.name }}</td>
                <td class=" text-center lineHeight  " :style="{width: 55+'px',height: 55+'px'}">
                    <div >{{ product.img }}</div>
                </td>

                <td class=" text-center lineHeight">{{ Number(product.price).toLocaleString() }} VND</td>
                <td class=" text-center lineHeight">{{ product.quantity }}</td>
                <td class=" text-center lineHeight">{{ product.descreption }}</td>
                <td class=" text-center lineHeight">
                    <button class="btn btn-success"

                            :disabled="!product.quantity"
                            @click="addProductToCart(product)"
                    >
                        <i class="fa fa-plus"></i>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>

    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: mapState({
        listProduct: state => state.products.all

    }),
    methods: mapActions('cart', [
        'addProductToCart'
    ]),
    created () {
        this.$store.dispatch('products/getAllProducts')
    }
}
</script>

<style scoped>

</style>
