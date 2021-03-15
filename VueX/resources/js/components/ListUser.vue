<template>
    <div>
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#ModalLoginForm">
            New Customer
        </button>
        <search-customer/>
        <table class="table table-hover table-striped table-bordered">
            <thead>
            <tr class="bg-primary" style="color:white; text-align:center">
                <th @click="sortByName()" class="col-20 text-center">Name</th>
                <th @click="sortByAge()" class="col-20">Age</th>
                <th @click="sortByName()" class="col-20">Email</th>
                <th @click="sortByName()" class="col-20">Street</th>
                <th @click="sortByName()" class="col-20">City</th>
                <th class="col-20">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="key in listCustomer" :key="key.id">
                <td scope="row" class=" text-center lineHeight">{{ key.name }}</td>
                <td class=" text-center lineHeight  " :style="{width: 55+'px',height: 55+'px'}">
                    <div class="chinh" :style="{background:cheackColor(key.age)}">{{ key.age }}</div>
                </td>
                <td class=" text-center lineHeight">{{ key.email }}</td>
                <td class=" text-center lineHeight">{{ key.street }}</td>
                <td class=" text-center lineHeight">{{ key.city }}</td>
                <td class=" text-center lineHeight">
                    <button class="btn btn-danger" data-toggle="modal" data-target="#ModalDeleteForm"
                            v-on:click="getId(key.id)" style="border-radius: 50%;margin-right: 4px"
                    >
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="btn btn-primary"
                            data-toggle="modal" data-target="#ModalEditForm"
                            style="border-radius: 50%"
                            v-on:click="getData(key.id)"
                    >
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
        <pagination-app :cloneListCustomer="cloneListCustomer"/>
    </div>
</template>

<script>
import PaginationApp from "./PaginationApp";
import {EventBus} from "../app.js";
import SearchCustomer from "./SearchCustomer";

export default {
    name: "ListUser",
    data() {
        return {
            listCustomer: [],
            cloneListCustomer: [],
            headers: [
                {text: 'Name', value: 'name', class: 'blue darken-4', align: 'center'},
                {text: 'Age', value: 'age', class: 'blue darken-3', align: 'center'},
                {text: 'Email', value: 'email', class: 'blue darken-2', align: 'center'},
                {text: 'Street', value: 'street', class: 'blue darken-1', align: 'center'},
                {text: 'City', value: 'city', class: 'blue lighten-1', align: 'center'},
                {text: 'Action', value: 'actions', class: 'blue lighten-1', align: 'center'},
            ],
            key: "",
            search: "Enter key search",
            max25chars: v => v.length <= 25 || 'Input too long!',
            snack: false,
            snackColor: '',
            snackText: '',
            checkEdit: false,
            snackColorEdit: 'success',
            checkDelete: false,
            snackColorDelete: 'red',
            dialog: false,
            createCustomer: {
                name: '',
                email: '',
                age: '',
                street: '',
                city: ''
            },
            user: {
                name: null,
                age: null,
                email: null,
                street: null,
                city: null,
                id: null
            },
            idUser: null,
        }
    },
    components: {
        SearchCustomer,
        PaginationApp
    },
    created: function () {
        this.fetchItems();
        EventBus.$on("paginations", ({listCustomer}) => {
            this.listCustomer = listCustomer;


        });
        EventBus.$on("EAddUser", ({name, age, email, street, city}) => {
            this.user.name = name;
            this.user.age = age;
            this.user.email = email;
            this.user.street = street;
            this.user.city = city;
            this.createNewCustomer();
        });
        EventBus.$on("EEditUser", ({name, age, email, street, city}) => {
            this.user.name = name;
            this.user.age = age;
            this.user.email = email;
            this.user.street = street;
            this.user.city = city;

            this.save();
        });
        EventBus.$on("EDeleteUser", ({id}) => {
            this.idUser = id;

            this.removeUser();
        });
        EventBus.$on("SearchKey", ({key}) => {
            this.key = key;

            this.SearchKeyUser();
        });
    },

    destroyed() {
        EventBus.$off("paginations");
        EventBus.$off("EAddUser");
        EventBus.$off("EEditUser");
        EventBus.$off("EDeleteUser");
        EventBus.$off("SearchKey");
    },
    watch: {
        key: function () {
            this.listCustomer = null;
            this.SearchKeyUser();
        }
    },
    methods: {
        fetchItems() {
            this.axios.get("http://127.0.0.1:8000/customers").then((response) => {
                this.listCustomer = response.data;
                this.cloneListCustomer = response.data;

            });
        },
        itemRowBackground: function (item) {
            return item.id % 2 === 0 ? 'light-blue lighten-2' : 'light-blue lighten-1';
        },

        save() {
            this.axios.patch('http://127.0.0.1:8000/editCustomer/' + this.idUser, this.user).then((response) => {
                this.fetchItems();

            });
        },
        deleteItem(id) {
            let uri = `http://127.0.0.1:8000/deleteCustomer/${id}`;
            this.listCustomer.splice(id, 1);
            this.axios.delete(uri);
            this.fetchItems();
            this.checkDelete = true;
        },
        createNewCustomer() {
            this.axios.post("http://127.0.0.1:8000/customer", this.user).then((response) => {

                this.fetchItems();

            });
        },
        cancel() {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'Canceled'
        },
        open() {
            this.snack = true
            this.snackColor = 'info'
            this.snackText = 'Dialog opened'
        },
        close() {
            console.log('Dialog closed')
        },
        sortByName: function () {
            if (this.nameReverse === true) {
                this.nameReverse = false;
                this.listCustomer.sort(function (a, b) {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                this.nameReverse = true;
                this.listCustomer.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
            }
        },
        sortByAge: function () {
            if (this.nameReverse === true) {
                this.nameReverse = false;
                this.listCustomer.sort(function (a, b) {
                    if (a.age < b.age) {
                        return 1;
                    }
                    if (a.age > b.age) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                this.nameReverse = true;
                this.listCustomer.sort(function (a, b) {
                    if (a.age < b.age) {
                        return -1;
                    }
                    if (a.age > b.age) {
                        return 1;
                    }
                    return 0;
                });
            }
        },
        getData: function (pId) {
            this.listCustomer.forEach((element) => {
                if (element.id === pId) {
                    console.log("hello" + pId);
                    this.idUser = element.id;
                    this.user.name = element.name;
                    this.user.age = element.age;
                    this.user.email = element.email;
                    this.user.street = element.street;
                    this.user.city = element.city;
                    EventBus.$emit("EGetEditUser", {
                        name: this.user.name,
                        age: this.user.age,
                        email: this.user.email,
                        street: this.user.street,
                        city: this.user.city
                    });
                    //return;
                }
            });
        },
        getId: function (userId) {
            this.idUser = userId;

            EventBus.$emit("EGetDeleteUser", {
                id: this.idUser,
            });
        },
        removeUser: function () {
            let uri = `http://127.0.0.1:8000/deleteCustomer/${this.idUser}`;
            this.listCustomer.splice(this.idUser, 1);
            this.axios.delete(uri);
            this.fetchItems();

        },
        SearchKeyUser: function () {
            let regex = new RegExp(this.key, "gi");

            if (this.key === "") {
                this.fetchItems();
            } else {
                let searchArr = [];
                this.cloneListCustomer.forEach((element) => {
                    if (element.name.match(regex)) {
                        searchArr.push(element);
                    }
                });

                this.listCustomer = searchArr;

            }
        },
        cheackColor(age) {
            if (age < 20) {
                return 'red';
            } else if (age < 30 && age > 20) {
                return 'green';
            } else if (age < 40 && age > 30) {
                return 'orange';
            } else if (age < 60 && age > 40) {
                return '#B388FF';
            } else if (age < 200 && age >= 60) {
                return '#FFE0B2';
            }
        }
    }
}
</script>

<style scoped>
th {
    font-size: 18px !important;
    color: white !important;
    font-weight: bold;
    background: #00BCD4;
}

tr:nth-child(even) {
    background-color: #29b6f6 !important;
}

tr:nth-child(odd) {
    background-color: #80D8FF !important;
}


.mau {
    background-color: rgba(255, 255, 255, 0.3);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(20px);
}

.lineHeight {
    line-height: 40px;
}

.chinh {
    width: 40px;
    height: 40px;
    margin: auto;
    border-radius: 40%;
    color: white;
    line-height: 40px;
}
</style>
