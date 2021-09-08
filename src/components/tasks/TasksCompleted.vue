<template>
  <transition
    appear
    mode="in-out"
    enter-active-class="animated slow zoomIn"
    leave-active-class="animated slow zoomOut"
  >
    <div :class="{'q-mt-lg': !getSettings.showTaskInOneList}">
      <list-header v-if="!getSettings.showTaskInOneList" background_color="bg-green-4">Completed</list-header>
      <q-list separator bordered>
        <transition-group
          mode="in-out"
          tag="div"
          enter-active-class="animated slow fadeInDown"
          leave-active-class="animated slow fadeOutUp"
        >
          <task-list v-for="(task, key) in task_completed" :key="'key'+key" :id="key" :task="task" ></task-list>
        </transition-group>
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import taskList from './TaskList.vue';
export default {
    props:['task_completed'],
    computed:{
      ...mapGetters('settings',['getSettings'])
    },
    components:{
        taskList,
        'list-header': require("components/shared/listHeader.vue").default,
    }
}
</script>