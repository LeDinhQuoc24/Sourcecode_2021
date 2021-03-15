<template>
    <div id="listCustomer"  align="center">
        <v-col
            cols="12"
            sm="8"
            md="50"
        >
            <v-card
                class="overflow-hidden"
                color="blue"
               dark
            >
                <v-toolbar
                    flat
                    color="blue"
                >
                    <v-icon>mdi-account</v-icon>
                    <v-toolbar-title class="font-weight-light ml-5" >
                        {{ $t("ListCustomer.title")}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-snackbar
                        v-model="checkCreate"
                        :timeout="2500"
                        :color="snackColorCreate"

                    >
                        {{ $t("CreateCustomer.successful")}}

                    </v-snackbar>

                    <v-snackbar
                        v-model="checkEdit"
                        :timeout="2500"
                        :color="snackColorEdit"

                    >
                        {{ $t("EditCustomer.successful")}}

                    </v-snackbar>

                    <v-snackbar
                        v-model="checkDelete"
                        :timeout="2500"
                        :color="snackColorDelete"

                    >
                        {{ $t("DeleteCustomer.successful")}}
                    </v-snackbar>

                    <v-spacer></v-spacer>

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
                                        <v-icon >
                                            mdi-account-multiple-plus
                                        </v-icon>
                                    </v-btn>
                                </template>

                                <v-card>
                                    <v-card-title class="headline blue lighten-2">
                                        {{ $t("CreateCustomer.title")}}
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container grid-list-md>
                                            <v-layout wrap>
                                                <v-flex xs12 sm6 md4>
                                                    <v-text-field
                                                        v-model="createCustomer.name"
                                                        :label="$t('Customer.name')" >
                                                    </v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm6 md4>
                                                    <v-text-field
                                                        v-model="createCustomer.email"
                                                        :label="$t('Customer.email')" >
                                                    </v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm6 md4>
                                                    <v-text-field
                                                        v-model="createCustomer.age"
                                                        :label="$t('Customer.age')" >
                                                    </v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm6 md4>
                                                    <v-text-field
                                                        v-model="createCustomer.street"
                                                        :label="$t('Customer.street')" >>
                                                    </v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm6 md4>
                                                    <v-text-field
                                                        v-model="createCustomer.city"
                                                        :label="$t('Customer.city')" >>
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="success"  @click="createNewCustomer">
                                            {{ $t("save")}}
                                        </v-btn>
                                        <v-btn color="red"  @click="dialogCreate = false">
                                            {{ $t("cancel")}}
                                        </v-btn>
                                    </v-card-actions>

                                </v-card>
                            </v-dialog>
                        </div>
                    </template>

                    <v-btn
                        color="white darken-3"
                        fab
                        small
                    >
                        <router-link :to="{ name: 'CreateCustomer' }" >
                            <v-icon >
                                mdi-account-multiple-plus
                            </v-icon>
                        </router-link>

                    </v-btn>

                </v-toolbar>

                <v-autocomplete
                    filled
                    rounded
                    dense
                    :search-input.sync="key"
                    background-color= "blue lighten-3"
                    color="success"
                    item-color="red"
                    hide-no-data
                    hide-selected
                    :placeholder="$t('search')"
                ></v-autocomplete>

                <v-data-table
                    style="background-color: #B3E5FC"
                    table table-hover table-striped table-bordered
                    :headers="headers"
                    :items="listCustomer"
                    class ="elevation-1"
                    :search="key"
                    :footer-props="{
                        showFirstLastPage: true,
                        firstIcon: 'mdi-arrow-collapse-left',
                        lastIcon: 'mdi-arrow-collapse-right',
                        prevIcon: 'mdi-minus',
                        nextIcon: 'mdi-plus'
                        }"
                >
                    <template v-slot:item.actions="{item}">
                        <router-link :to="{ name:'EditCustomer',params:{ id:item.id } }" >
                            <v-icon
                                small
                                class="mr-2"
                            >
                                mdi-pencil
                            </v-icon>
                        </router-link>
                        <v-icon
                            small
                            class="mr-2"
                            @click="deleteItem(item.id)"
                        >
                            mdi-delete
                        </v-icon>

                        <v-icon
                            small
                            class="mr-2"
                            color="orange darken-2"
                            @click="editCustomer(item)"
                        >
                            mdi-pencil
                        </v-icon>

                        <v-icon
                            small
                            class="mr-2"
                            color="orange darken-2"
                            @click="deleteCustomer(item)"
                        >
                            mdi-delete
                        </v-icon>

                    </template>

                    <template v-slot:item.age="{ item }">
                        <v-chip
                            :color="getAge(item.age)"
                            dark
                        >
                            {{ item.age }}
                        </v-chip>
                    </template>

                    <template v-slot:item.name="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.name"
                            large
                            persistent
                            @save="save(props.item)"
                            @cancel="cancel"
                            @open="open"
                        >
                            <div>{{ props.item.name }}</div>
                            <template v-slot:input>
                                <div class="mt-4 title">
                                    {{$t('update')}}
                                </div>
                                <v-text-field
                                    v-model="props.item.name"
                                    :rules="[max25chars]"
                                    single-line
                                    counter
                                    autofocus
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                </v-data-table>

                <v-snackbar
                    v-model="snack"
                    :timeout="3000"
                    :color="snackColor"
                >
                    {{ snackText }}

                    <template v-slot:action="{ attrs }">
                        <v-btn
                            v-bind="attrs"
                            text
                            @click="snack = false"
                        >
                            {{$t('close')}}
                        </v-btn>
                    </template>
                </v-snackbar>

            </v-card>

        </v-col>
        <v-dialog
            v-model="dialogEdit"
            width="1000"
        >
            <v-card>
                <v-card-title class="headline blue lighten-2">
                    {{ $t("EditCustomer.title")}}
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    v-model="editedCustomer.name"
                                    :label="$t('Customer.name')">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    v-model="editedCustomer.email"
                                    :label="$t('Customer.email')">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    v-model="editedCustomer.age"
                                    :label="$t('Customer.age')">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    v-model="editedCustomer.street"
                                    :label="$t('Customer.street')">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    v-model="editedCustomer.city"
                                    :label="$t('Customer.city')">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success"  @click="saveEditCustomer">{{ $t("save")}}</v-btn>
                    <v-btn color="red"  @click="dialogEdit = false">{{ $t("cancel")}}</v-btn>

                </v-card-actions>

            </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialogDelete"
            width="1000"
        >

            <v-card>
                <v-card-title class="headline blue lighten-2">
                    {{ $t("DeleteCustomer.title")}}
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    v-model="editedCustomer.name"
                                    :label="$t('Customer.name')"
                                    disabled>
                                </v-text-field>

                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    v-model="editedCustomer.email"
                                    :label="$t('Customer.email')"
                                    disabled>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    v-model="editedCustomer.age"
                                    :label="$t('Customer.age')"
                                    disabled>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    v-model="editedCustomer.street"
                                    :label="$t('Customer.street')"
                                    disabled>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    v-model="editedCustomer.city"
                                    :label="$t('Customer.city')"
                                    disabled>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success"  @click="saveDeleteCustomer">{{ $t("save")}}</v-btn>
                    <v-btn color="red"  @click="dialogDelete = false">{{ $t("cancel")}}</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialogDeleteFail"
            width="1000"
        >
            <v-card>
                <v-card-title class="headline red lighten-2">
                    Can't delete customer older than 50 years old
                </v-card-title>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>


export default {
    name: "ListCustomer",
    computed:{

        headers(){
            return [
                { text: this.$t('Customer.name'), value: 'name', class:'blue darken-4' ,align: 'center' },
                { text: this.$t('Customer.age'), value: 'age', class:'blue darken-3' ,align: 'center' },
                { text: this.$t('Customer.email'), value: 'email', class:'blue darken-2' ,align: 'center' },
                { text: this.$t('Customer.street'), value: 'street', class:'blue darken-1' ,align: 'center' },
                { text: this.$t('Customer.city'), value: 'city', class:'blue lighten-1' ,align: 'center' },
                { text: this.$t('Customer.action'), value: 'actions', class:'blue lighten-2' ,align: 'center' },
            ]
        }
    },
    data(){
        return{
            listCustomer : [],
            key: "",
            max25chars: v => v.length <= 25 || this.$t('input_long'),
            snack: false,
            snackColor: '',
            snackText: '',
            checkCreate: false,
                snackColorCreate: 'success',
                checkEdit: false,
                snackColorEdit: 'orange',
                checkDelete: false,
                snackColorDelete: 'red',
                dialogCreate: false,
            dialogEdit: false,
            dialogDelete: false,
            dialogDeleteFail: false,
            createCustomer: {
                name: '',
                email: '',
                age: '',
                street: '',
                city: ''
            },
            editedIndex: -1,
            editedCustomer: {
                name: '',
                email: '',
                age: '',
                street: '',
                city: ''
            },

        }
    },
    created: function()
    {
        this.fetchItems();

    },
    methods: {
        fetchItems(){
            this.axios.get("http://127.0.0.1:8000/customers").then((response)=>{
                this.listCustomer = response.data;


            });
        },

        getAge (age) {
            if (age > 60) return 'red'
            else if (age > 50) return 'orange'
            else if (age > 40) return 'pink'
            else if (age > 30) return 'blue'
            else if (age > 20) return 'grey'
            else return 'green'
        },
        save (value) {
            this.snack = true
            this.snackColor = 'success'
            this.snackText = 'Data saved'

            this.axios.patch('http://127.0.0.1:8000/editCustomer/'+value.id,value).then((response)=>{
                this.checkEdit = true ;

            });
        },
        deleteItem(id) {
            let uri = `http://127.0.0.1:8000/deleteCustomer/${id}`;
            this.listCustomer.splice(id, 1);
            this.axios.delete(uri);
            this.fetchItems();
            this.checkDelete=true;
        },
        createNewCustomer(){

            console.log(this.createCustomer);
            this.axios.post("http://127.0.0.1:8000/customer",this.createCustomer).then((response)=>{
                this.closeDialogCreate();
                this.fetchItems();
                this.checkCreate = true;

            });

            this.checkCreate = true;

        },
        cancel () {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = this.$t('canceled')
        },
        open () {
            this.snack = true
            this.snackColor = 'info'
            this.snackText = this.$t('dialog_open')

        },
        closeDialogCreate () {
            this.dialogCreate = false;
            this.createCustomer = {
                name: '',
                email: '',
                age: '',
                street: '',
                city: ''
            }
        },
        editCustomer (customer) {
            this.editedIndex = this.listCustomer.indexOf(customer)
            this.editedCustomer = Object.assign({}, customer)
            this.dialogEdit = true
        },

        deleteCustomer (customer) {
            this.editedIndex = this.listCustomer.indexOf(customer)
            this.editedCustomer = Object.assign({}, customer)
            this.dialogDelete = true
        },
        saveEditCustomer(){
            this.axios.patch('http://127.0.0.1:8000/editCustomer/'+this.editedCustomer.id,this.editedCustomer).then((response)=>{
                this.dialogEdit = false;
                this.fetchItems();
                this.checkEdit = true;
            });
        },
        saveDeleteCustomer(){
            if (this.editedCustomer.age > 50) {
                this.dialogDelete = false;
                this.dialogDeleteFail = true;
            } else {
                let uri = `http://127.0.0.1:8000/deleteCustomer/${this.editedCustomer.id}`;
                this.listCustomer.splice(this.editedCustomer.id, 1);
                this.axios.delete(uri);
                this.fetchItems();
                this.dialogDelete = false;
                this.checkDelete = true;
            }
        }

    }

}
</script>

<style lang="css" scoped>
.v-data-table{
    direction: ltr;
}

>>>.v-data-table th {
    font-size: 18px !important;
    color: orange !important;

}
>>>.v-data-table tr:nth-child(even){
    background-color: #29b6f6 !important;
}
>>>.v-data-table tr:nth-child(odd){
    background-color: #80D8FF !important;
}

</style>
