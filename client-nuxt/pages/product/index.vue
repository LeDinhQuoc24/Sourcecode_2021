<template>
  <v-app>
    <div class="wrapper"></div>
    <div class="marginCom">

      <v-toolbar
        flat
        color="blue"
        rounded
      >
        <v-icon
          class="mr-2"
        >mdi-cart
        </v-icon>
        <v-toolbar-title>
          List Product
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-snackbar
          v-model="checkCreate"
          :timeout="2500"
          :color="snackColorCreate"
        >
          Create New Product Successfully
        </v-snackbar>

        <v-snackbar
          v-model="checkEdit"
          :timeout="2500"
          :color="snackColorEdit"

        >
          Edit Product Successfully
        </v-snackbar>

        <v-snackbar
          v-model="checkDelete"
          :timeout="2500"
          :color="snackColorDelete"

        >
          Delete Product Successfully
        </v-snackbar>

        <v-spacer></v-spacer>
        <template>
          <div class="text-center">
            <v-dialog
              v-model="dialogCart"
              width="1000"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="orange darken-3"
                  fab
                  small
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-basket
                  </v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline blue lighten-2">
                  Your cart
                </v-card-title>

                <v-card-text v-for="item in productCart">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md1>
                        <v-checkbox
                          @click="checkout(item)"
                          v-model="item.checkboxBuy"
                          color="red darken-3"

                          hide-details
                        >
                        </v-checkbox>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-text-field
                          v-model="item.name"
                          disabled
                          label='Name'>
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="item.price"
                          disabled
                          label='Price'>
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-text-field
                          v-model="item.count"
                          disabled
                          label='Quantity'>
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md1>
                        <v-btn class="btn " color="red" style="margin-top: 10px;margin-left: 10px"
                               @click="removeItem(item)">
                          Xóa
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-card>
                    <div class="">Tổng tiền :
                      <v-chip color="primary">{{ this.$store.state.product.checkout }} VND</v-chip>
                    </div>


                  </v-card>
                  <v-spacer></v-spacer>
                  <v-btn color="success" style="margin-right: 30px" @click="buyProduct()">
                    Buy
                  </v-btn>
                  <v-btn color="red" @click="dialogCart = false">
                    Cancel
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-dialog>
          </div>
        </template>
        <template>
          <div class="text-center">
            <v-dialog
              v-model="dialogCreate"
              width="1000"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="orange darken-3"
                  fab
                  small
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-cart-plus
                  </v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline blue lighten-2">
                  Create New Product
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="createProduct.name"
                          label='Name'>
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="createProduct.size"
                          label='Size'>
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="createProduct.price"
                          label='Price'>
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="createProduct.store"
                          label='Store'>>
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="createProduct.country"
                          label='Country'>>
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="saveCreateProduct">
                    Save
                  </v-btn>
                  <v-btn color="red" @click="dialogCreate = false">
                    Cancel
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-dialog>
          </div>
        </template>
      </v-toolbar>
      <v-autocomplete
        class="mt-5"
        filled
        rounded
        dense
        :search-input.sync="key"
        color="success"
        item-color="red"
        hide-no-data
        hide-selected
        placeholder="Input key search"
      ></v-autocomplete>
      <v-data-table
        table table-hover table-striped table-bordered
        :headers="headers"
        :items="products"
        class="elevation-1 paddingForm my-border"
        :search="key"
        :footer-props="{
                        showFirstLastPage: true,
                        firstIcon: 'mdi-arrow-collapse-left',
                        lastIcon: 'mdi-arrow-collapse-right',
                        prevIcon: 'mdi-minus',
                        nextIcon: 'mdi-plus'
                        }"
      >
        <template v-slot:item.image_url="{item}">
          <img :src=item.image_url style="width: 100px;height: 100px">

        </template>
        <template v-slot:item.buy="{item}">

          <v-icon
            small
            class="mr-2"
            color="orange darken-2"
            @click="incrementProduct(item)"
            :disabled="item.store<1"
          >
            mdi-plus-circle
          </v-icon>

          <v-icon
            small
            class="mr-2"
            color="orange darken-2"
            @click="decrementProduct(item)"
            :disabled="item.store>9"
          >
            mdi-do-not-disturb
          </v-icon>
        </template>
        <template v-slot:item.actions="{item}">

          <v-icon
            small
            class="mr-2"
            color="orange darken-2"
            @click="editProduct(item)"
          >
            mdi-pencil
          </v-icon>

          <v-icon
            small
            class="mr-2"
            color="orange darken-2"
            @click="deleteProduct(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <v-dialog
        v-model="dialogEdit"
        width="1000"
      >
        <v-card>
          <v-card-title class="headline blue lighten-2">
            Edit Product
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedProduct.name"
                    label='Name'>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedProduct.size"
                    label='Size'>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedProduct.price"
                    label='Price'>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedProduct.store"
                    label='Store'>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedProduct.country"
                    label='Country'>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="saveEditProduct">Save</v-btn>
            <v-btn color="red" @click="dialogEdit = false">Cancel</v-btn>

          </v-card-actions>

        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import products from "../../api/product.json"
import {mapState} from 'vuex'

export default {
  name: "index",
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
  }
  ,
  computed: {
    headers() {
      return [
        {text: 'Name', value: 'name', align: 'center'},
        {text: 'Size', value: 'size', align: 'center'},
        {text: 'Price', value: 'price', align: 'center'},
        {text: 'Store', value: 'store', align: 'center'},
        {text: 'Country', value: 'country', align: 'center'},
        {text: 'Image', value: 'image_url', align: 'center'},
        {text: 'Buy', value: 'buy', align: 'center'},
        {text: 'Action', value: 'actions', align: 'center'},
      ]
    },
    ...mapState({
      productCart: state => state.product.products
    })

  },
  head() {
    return {

      title: 'list-Product',
      htmlAttrs: {
        lang: 'vi'
      },
    }
  },
  created: function () {
    this.fetchItems();
  },
  data() {
    return {
      key: "",
      checkbox: false,
      products: [],
      dialogEdit: false,
      dialogCreate: false,
      dialogCart: false,
      editedIndex: -1,
      createProduct: {
        name: '',
        size: '',
        price: '',
        store: '',
        country: '',
        image_url: ''
      },
      editedProduct: {
        name: '',
        size: '',
        price: '',
        store: '',
        country: '',
      },
      allPay: 0,
      checkCreate: false,
      snackColorCreate: 'success',
      checkEdit: false,
      snackColorEdit: 'orange',
      checkDelete: false,
      snackColorDelete: 'red',

    }
  },
  methods: {
    fetchItems() {
      if (this.products.length === 0) {
        this.products = products;

      }

    },
    editProduct(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedProduct = Object.assign({}, item)
      this.dialogEdit = true;
    },
    deleteProduct(id) {
      this.products.splice(id, 1);
      this.fetchItems();
      this.checkDelete = true;
    },
    saveEditProduct() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedProduct)
      } else {
        this.products.push(this.editedProduct)
      }
      this.fetchItems();
      this.dialogEdit = false;
      this.checkEdit = true;
    },
    saveCreateProduct() {
      this.createProduct.image_url = 'http://www.thebeerstore.ca/sites/default/files/styles/brand_hero/public/sbs/brand/0137%20H.png?itok=vlz26ov4'
      this.products.push(this.createProduct)
      this.createProduct = {
        name: '',
        size: '',
        price: '',
        style: '',
        country: '',
        image_url: ''
      }
      this.fetchItems();
      this.dialogCreate = false;
      this.checkCreate = true;
    },
    removeItem(product) {
      console.log("id là :" + product);

      this.$store.commit('product/removeItemCart', product)
    },
    incrementProduct(product) {
      this.$store.commit('product/increment', product);
    },
    decrementProduct(product) {
      this.$store.commit('product/decrement', product);
    },
    checkout(product) {
      this.$store.commit('product/checkout', product);
    },
    buyProduct() {
      alert("thanh toán giỏ hàng thành công ");
    }
  }
  // async fetch() {
  //   this.products = await fetch(
  //     'https://api.nuxtjs.dev/beers'
  //   ).then(res => res.json())
  // },
}
</script>

<style scoped>
>>> .v-data-table th {
  font-size: 18px !important;
  color: orange !important;

}

.paddingForm {
  text-align: center
}

.my-border {
  border: 1px black;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  text-align: center;
  line-height: 1;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(20px);

}

.wrapper {
  background-image: url("../../assets/daiphong.jpg");

  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.marginCom {
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  position: absolute;
  width: 100%;
}
</style>
