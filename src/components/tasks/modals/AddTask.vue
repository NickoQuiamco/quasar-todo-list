<template>
  <q-card style="min-width: 350px">
    <modal-header>Add Task</modal-header>

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
import mixinAddEditTask from 'src/mixin/mixin-add-edit-task.js';
export default {
  data(){
    return { 
      task_form: {
        name: '',
        due_date: "",
        due_time: "",
        completed: false
      }
    }
  },
  mixins:[mixinAddEditTask],
  methods: {
    ...mapActions("task", ['addTask']),
    SubmitTaskForm(){
      this.addTask(this.task_form);
      this.$emit('close-dialog');
    }
  }

}
</script>

<style>

</style>