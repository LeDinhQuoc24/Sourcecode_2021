<template>
    <div id="editCustomer"  align="center">
        <v-col
            cols="12"
            sm="8"
            md="50"

        >
            <div class="text-left">
                <router-link :to="{ name: 'ListCustomer' }">
                    <v-btn
                        depressed
                        color="primary"
                    >
                        {{$t('back')}}
                    </v-btn>
                </router-link>

            </div>
            <v-card
                class="overflow-hidden"
                color="blue lighten-1"
                dark
            >
                <v-toolbar
                    flat
                    color="blue"
                >
                    <v-icon>mdi-account</v-icon>
                    <v-toolbar-title class="font-weight-light ml-5" >
                        {{$t('EditCustomer.title')}}
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-snackbar
                        v-model="checkEdit"
                        :timeout="2500"
                        :color="snackColor"

                    >
                        {{$t('EditCustomer.successful')}}
                    </v-snackbar>

                    <v-spacer></v-spacer>

                    <v-btn
                        color="blue darken-3"
                        fab
                        small
                        @click="isResetForm"
                    >
                        <v-icon v-if="isEditing">
                            mdi-close
                        </v-icon>
                        <v-icon v-else>
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                </v-toolbar>

                <v-form
                    ref="form"
                    v-model="valid"
                >
                    <div style="margin-left: 3%">
                        <v-text-field
                            :disabled="!isEditing"
                            color="white"
                            v-model="customer.name"
                            :counter="25"
                            :rules="nameRules"
                            :label="$t('Customer.name')"
                            required
                        ></v-text-field>
                        <v-text-field
                            :disabled="!isEditing"
                            color="white"
                            v-model="customer.email"
                            :rules="emailRules"
                            :label="$t('Customer.email')"
                            required
                        ></v-text-field>
                        <v-text-field
                            :disabled="!isEditing"
                            color="white"
                            v-model="customer.age"
                            :rules="ageRules"
                            :label="$t('Customer.age')"
                            required
                        ></v-text-field>
                        <v-text-field
                            :disabled="!isEditing"
                            color="white"
                            v-model="customer.street"
                            :rules="streetRules"
                            :label="$t('Customer.street')"
                            required
                        ></v-text-field>
                        <v-text-field
                            :disabled="!isEditing"
                            color="white"
                            v-model="customer.city"
                            :rules="cityRules"
                            :label="$t('Customer.city')"
                            required
                        ></v-text-field>
                        <v-checkbox
                            :disabled="!isEditing"
                            v-model="checkbox"
                            :rules="[v => !!v || $t('Validate.agree_to_continue')]"
                            :label="$t('Validate.agree')"
                            required
                        ></v-checkbox>
                    </div>
                </v-form>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="!valid"
                        color="success"
                        @click= "editNewCustomer"
                        v-if="isEditing"
                    >
                        {{$t('save')}}
                    </v-btn>
                </v-card-actions>

            </v-card>

        </v-col>
    </div>
</template>

<script>
export default {
    name: "EditCustomer.vue",
    data(){
        return{
            valid: true,
            checkEdit: false,
            snackColor: 'success',
            customer:{},
            isEditing:false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 25) || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            age: '',
            ageRules: [
                v => !!v || 'Age is required',
            ],
            street: '',
            streetRules: [
                v => !!v || 'Street is required',
            ],
            city: '',
            cityRules: [
                v => !!v || 'City is required',
            ],
            checkbox: true,
        }
    },
    created: function(){
        this.getItem();
    },
    methods:{
        getItem()
        {

            let uri = `http://127.0.0.1:8000/editCustomer/${this.$route.params.id}`;
            this.axios.get(uri).then((response) => {
                this.customer = response.data;
            });

        },
        editNewCustomer:function(){
            this.axios.patch('http://127.0.0.1:8000/editCustomer/'+this.$route.params.id,this.customer).then((response)=>{
                this.isEditing = false;
                this.checkEdit = true;

            });

        },
        isResetForm:function (){
            this.isEditing= !this.isEditing;
        }
    }
}
</script>

<style scoped>

</style>
