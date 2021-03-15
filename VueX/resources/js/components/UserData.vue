<template>
  <div id="app">
      <list-user style="width: 80%;margin:auto"/>
      <create-customer/>
      <edit-customer/>
      <delete-customer/>
  </div>

</template>

<script>
import CreateCustomer from "./CreateCustomer";
import EditCustomer from "./EditCustomer";
import ListUser from "./ListUser";
import DeleteCustomer from "./DeleteCustomer";

export default {
    name: "UserData",
    components: {
        CreateCustomer,
        EditCustomer,
        ListUser,
        DeleteCustomer,
    }
}
</script>

<style scoped>

</style>
