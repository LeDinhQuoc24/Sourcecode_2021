<template>
    <div id="list-tasks">
        <div class="panel panel-default">
            <div class="panel-heading my-task">
                  <h3 class="panel-title">My Tasks<span class="task-length" v-if="tasks.length > 0">{{tasks.length}}</span></h3>
            </div>
            <div class="panel-body">
                <ul class="list-group"
                    name="custom-classes-transition"
                    enter-active-class="animated tada"
                    leave-active-class="animated bounceOutRight"
                    is="transition-group"
                >
                    <li class="list-group-item" v-for="(task, index) in tasks" v-bind:key="index">
                        <img src="http://lazi.vn/files/large/5a64450874df215" alt="" width="53">
                        <span v-if="!task.checkEdit ">{{task.body}} </span>
                        <input v-model="task.body" v-if="task.checkEdit">

                        <div class="btn-group">
                            <button
                                type="button"
                                @click="task.checkEdit=!task.checkEdit"
                                class="btn btn-default btn-sm"
                                href="#edit"
                                role="button"
                                data-toggle="modal"
                                v-if="!task.checkEdit">
                            <span class="glyphicon glyphicon-edit"></span> Edit
                            </button>
                            <button
                              type="button"
                              @click="task.checkEdit=!task.checkEdit"
                              class="btn btn-success btn-sm"
                              href="#save"
                              role="button"
                              data-toggle="modal"
                              v-if="task.checkEdit">
                            <span class="glyphicon glyphicon-edit"></span> Save
                            </button>
                            <button type="button" @click="complete(task)" class="btn btn-info btn-sm">
                            <span class="glyphicon glyphicon-ok-circle"></span> Complete
                            </button>
                            <button type="button" @click="remove(task)" class="btn btn-danger btn-sm">
                            <span class="glyphicon glyphicon-remove-circle"></span> Remove
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>    
    </div>
</template>
<script>
   
    export default{
        data(){
          return{
            checkEdit:false
          }
        },
        methods: {
            complete(task){
                task.checkEdit = false;
                this.$store.dispatch('completeTask', task)
            },
            remove(task){
                this.$store.dispatch('removeTask', task)
            }
        },
        computed: {
            tasks(){
                return this.$store.getters.tasks
            },
            newTask(){
              return this.$store.getters.newTask
            }
        }
    }
</script>
<style>
    .btn-group{
        float: right;
    }
</style>
