<template>
  <q-card style="min-width: 350px">
    <modal-header>Edit Task</modal-header>

    <q-form @submit.prevent="SubmitTaskForm">
      <q-card-section class="q-pt-none">
        <!-- title -->
        <modal-task-name :name.sync="task_form.name" ></modal-task-name>
        <!-- date -->
        <modal-due-date :dueDate.sync="task_form.due_date" @clear="clearDueDate" />
        <!-- time -->
        <modal-due-time v-if="task_form.due_date" :dueDate="task_form.due_date" :dueTime.sync="task_form.due_time" />
      </q-card-section>
      <!-- <pre> {{ task_form }} </pre> -->
      <modal-buttons/>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from "src/mixin/mixin-add-edit-task.js";
export default {
  props:['task','id'],
  data(){
    return { 
      task_form: {
      }
    }
  },
  mixins:[mixinAddEditTask],
  methods: {
    ...mapActions("task", ['updateTask']),
    SubmitTaskForm(){
      this.updateTask({
        id:this.id,
        updates: this.task_form
      });
      this.$emit('close-dialog');
    }
  },
  created(){
    this.task_form = Object.assign({}, this.task);
  }
}
</script>