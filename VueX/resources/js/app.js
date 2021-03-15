/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */



require('./bootstrap');
import Vue from 'vue';
window.Vue = require('vue').default;
import vuetify from '../plugins/vuetify';// path to vuetify export
import '@mdi/font/css/materialdesignicons.css';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
export const EventBus = new Vue();
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);
Vue.use(VueAxios,axios);
import ProductIndex from "./components/Product/ProductIndex"
import UserData from "./components/UserData";
import DashBoard from "./components/DashBoard";

import store from './store'

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('dash-board', require('./components/DashBoard.vue').default);
Vue.component('list-product',require('./components/Product/ListProduct.vue').default);
import { currency } from './currency'

Vue.filter('currency', currency)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */




const routes = [


    {
        name: 'DashBoard',
        path: '/user',
        component: UserData
    },
    {
        name: 'Product',
        path: '/product',
        component: ProductIndex
    },


];
const router = new VueRouter({routes: routes});
const app = new Vue({

    el: '#app',
    iconfont: 'mdi',
    router,
    vuetify,
    store
});
