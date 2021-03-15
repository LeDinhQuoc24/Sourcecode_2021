import ListCustomer from "./components/Customer/ListCustomer";
import CreateCustomer from "./components/Customer/CreateCustomer";
import EditCustomer from "./components/Customer/EditCustomer";
import NotFound from "./components/NotFound";
import VueRouter from "vue-router";

const router = new VueRouter({

})

const routes = [

    {
        path: '/:lang',
        component: {
            render (c) { return c('router-view') }
        },
        children : [
            {
                name: 'ListCustomer',
                path: '/',
                component: ListCustomer
            },
            {
                name: 'CreateCustomer',
                path: 'createCustomer',
                component: CreateCustomer
            },
            {
                name: 'EditCustomer',
                path: 'editCustomer/:id',
                component: EditCustomer
            },

            {
                name: 'NotFound',
                path: '/*',
                component: NotFound
            },
        ]
    }

];
export default new VueRouter({  routes: routes});
