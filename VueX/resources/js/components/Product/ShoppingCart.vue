<template>
    <div id="listProduct" class="modal fade" >
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Shopping Cart</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="background: #ebebeb">
                    <table class="table table-hover table-striped table-bordered">
                        <thead>
                        <tr class="bg-primary" style="color:white; text-align:center">
                            <th  class="col-20">Tên SP</th>
                            <th  class="col-20">Giá</th>
                            <th  class="col-20">Số lượng</th>
                            <th class="col-20">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td  class=" text-center lineHeight">{{ product.name }}</td>
                            <td class=" text-center lineHeight">{{ Number(product.price).toLocaleString() }} VND</td>
                            <td class=" text-center lineHeight">{{ product.quantity }}</td>
                            <td class=" text-center lineHeight">
                                <button class="btn btn-success"



                                >
                                    <i class="fa fa-plus"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>

                <div class="modal-footer">
                    <p>Total: {{ total | currency }}</p>
                    <button class="btn btn-outline-warning" :disabled="!products.length" @click="checkout(products)" >Check Out</button>
                    <button class="btn btn-outline-danger">Discard</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            checkoutStatus: state => state.cart.checkoutStatus
        }),
        ...mapGetters('cart', {
            products: 'cartProducts',
            total: 'cartTotalPrice'
        })
    },
    methods: {
        checkout (products) {
            this.$store.dispatch('cart/checkout', products)
        }
    }
}
</script>

<style scoped>

</style>
