<template>

    <div id="createCustomer"  align="center">
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
                        Back to List Customer
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
                        Create New Customer
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-snackbar
                        v-model="checkCreate"
                        :timeout="2500"
                        :color="snackColor"

                    >
                        Create New Customer Successfully
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
                            label="Name"
                            required
                        ></v-text-field>
                        <v-text-field
                            :disabled="!isEditing"
                            color="white"
                            v-model="customer.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                        <v-text-field
                            :disabled="!isEditing"
                            color="white"
                            v-model="customer.age"
                            :rules="ageRules"
                            label="Age"
                            required
                        ></v-text-field>
                        <v-text-field
                            :disabled="!isEditing"
                            color="white"
                            v-model="customer.street"
                            :rules="streetRules"
                            label="Street"
                            required
                        ></v-text-field>
                        <v-text-field
                            :disabled="!isEditing"
                            color="white"
                            v-model="customer.city"
                            :rules="cityRules"
                            label="City"
                            required
                        ></v-text-field>
                        <v-checkbox
                            :disabled="!isEditing"
                            v-model="checkbox"
                            :rules="[v => !!v || 'You must agree to continue!']"
                            label="Do you agree?"
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
                        @click= "addNewCustomer"
                        v-if="isEditing"
                    >
                        Save
                    </v-btn>
                </v-card-actions>

            </v-card>

        </v-col>
    </div>

</template>

<script>
export default {
    name: "CreateCustomer",
    data(){
        return{
            valid: true,
            checkCreate: false,
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
            checkbox: false,
        }
    },
    methods:{
        addNewCustomer:function(){

            if (
                !this.checkbox ||
                this.name === '' ||
                this.email === '' ||
                this.age === '' ||
                this.street === '' ||
                this.city === '' )
            {
                this.$refs.form.validate();

            }

            this.axios.post("http://127.0.0.1:8000/customer",this.customer).then((response)=>{
                this.$router.push({name: 'ListCustomer'})
            });
            this.checkCreate = true;
        },

        isResetForm:function (){
            if(this.isResetForm){
                this.$refs.form.reset();
            }
            this.isEditing= !this.isEditing;
        }
    }

}
</script>

<style scoped>

</style>
