<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column" >
      <template v-if="this.task_downloaded">
        <div class="row q-mb-md">
          <search-task/>
          <sort-task/>
        </div>
        
        <p v-if="search_input && !Object.keys(task_completed).length && !Object.keys(task_list).length" >No search result...</p>
        <q-scroll-area
          :thumb-style="thumbStyle"
          class="q-scroll-area-tasks"
        >
          <no-task v-if="!Object.keys(task_list).length && !search_input && !getSettings.showTaskInOneList"  />
          <tasks-todo v-if="Object.keys(task_list).length" :task_list="task_list" />
          <tasks-completed class="q-pb-xl" v-show="Object.keys(task_completed).length" :task_completed="task_completed" />
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="toggleAddDialog"
            class="all-pointer-events"
            color="primary"
            size="20px"
            icon="add"
            round
          />
        </div>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner-ball
            color="primary"
            size="5em"
          />
        </span>
      </template>

    </div>
    <q-dialog v-model="show_add_task">
      <add-task @close-dialog="closeAddDialog()" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'PageIndex',
  components: {
    'no-task': require('components/tasks/noTask.vue').default,
    'add-task': require('components/tasks/modals/AddTask.vue').default,
    'tasks-todo': require('components/tasks/TasksTodo.vue').default,
    'tasks-completed': require('components/tasks/TasksCompleted.vue').default,
    'search-task': require('components/tools/Searchtask.vue').default,
    'sort-task': require('components/tools/SortTask.vue').default
  },
  data(){
    return{
      show_add_task: false,
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '8px',
        opacity: 0.75
      }
    }
  },
  computed:{
    ...mapGetters({
      task_list: "task/taskTodo",
      task_completed: "task/taskCompleted",
      search_input: "task/getSearch",
      getSettings: "settings/getSettings",
      task_downloaded: 'task/getTasksDownloaded'
    }),
  },
  methods:{
    closeAddDialog(){
      this.show_add_task = false;
    },
    toggleAddDialog(){
      this.show_add_task = true;
    }
  },
  mounted(){
    this.$root.$on('show-add-task',()=>{
      this.show_add_task = true;
    });
  }
}
</script>
