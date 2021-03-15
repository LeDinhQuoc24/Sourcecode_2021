<template>
    <div id="ModalLoginForm" class="modal fade" >
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="background: #ebebeb">


                    <form role="form" method="POST" action="">
                        <input type="hidden" name="_token" value="">
                        <div class="row">
                        <div class="form-group col-4">
                            <label class="control-label">Username</label>
                            <div>
                                <input type="text" class="form-control input-lg" v-model="user.name" value="">
                            </div>
                        </div>
                        <div class="form-group col-4">
                            <label class="control-label">Age</label>
                            <div>
                                <input type="email" class="form-control input-lg" v-model="user.age" value="">
                            </div>
                        </div>
                        <div class="form-group col-4">
                            <label class="control-label">E-Mail Address</label>
                            <div>
                                <input type="email" class="form-control input-lg" v-model="user.email" value="">
                            </div>
                        </div>
                            </div>

                        <div class="row">
                        <div class="form-group col-6">
                            <label class="control-label">Street</label>
                            <div>
                                <input type="email" class="form-control input-lg" v-model="user.street" value="">
                            </div>
                        </div>
                        <div class="form-group  col-6">
                            <label class="control-label">City</label>
                            <div>
                                <input type="email" class="form-control input-lg" v-model="user.city" value="">
                            </div>
                        </div>

                        </div>
                        <div class="form-group">
                            <div class="modal-footer">
                                <button type="button" v-on:click="EAddUser" class="btn btn-success" data-dismiss="modal">
                                    Save
                                </button>
                                <button type="button" class="btn btn-danger ml-5" data-dismiss="modal">
                                    Cancel
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

</template>

<script>
import {EventBus} from "../app.js";

export default {
    name: "CreateCustomer",
    data() {
        return {
            user: {
                name: null,
                age: null,
                email: null,
                street: null,
                city: null,
                password: null
            }
        }
    },
    methods: {
        EAddUser() {
            EventBus.$emit("EAddUser", {
                name: this.user.name,
                age: this.user.age,
                email: this.user.email,
                street: this.user.street,
                city: this.user.city,

            });
        },
    }
}
</script>

<style scoped>
 img {width:100%;}
 .modal-header{
     background-color: #64B5F6;
 }

</style>
