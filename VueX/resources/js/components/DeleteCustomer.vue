<template>
    <div id="ModalDeleteForm" class="modal fade">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="confirmDelete">Confirm Delete</h5>
                </div>
                <div class="modal-body">Bạn có muốn xóa hàng {{ this.id }} này không ?</div>
                <div class="modal-footer">
                    <button
                        @click="EDeleteUser"
                        class="nhutsearch white--text   btn btn-info"
                        data-dismiss="modal"
                        color="blue"
                    >Delete
                    </button
                    >
                    <button
                        class="cus-btn-gradient btn-cancel white--text btn btn-danger"
                        color="red"
                        data-dismiss="modal"
                    >Cancel
                    </button
                    >
                </div>
            </div>
        </div>
    </div><!-- /.modal -->
</template>

<script>
import {EventBus} from "../app.js";

export default {
    name: "DeleteCustomer",
    data() {
        return {
            id: null,
        };
    },
    props: {},

    created() {
        EventBus.$on("EGetDeleteUser", ({id}) => {
            this.id = id;
            console.log(this.id);
        });
    },
    methods: {
        EDeleteUser() {
            EventBus.$emit("EDeleteUser", {

                id: this.id,
            });
        },
    },
}
</script>

<style scoped>

</style>
