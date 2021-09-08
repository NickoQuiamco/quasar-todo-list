<template>
    <transition
        appear
        mode="out-in"
        enter-active-class="animated slow zoomIn"
        leave-active-class="animated slow zoomOut absolute-top"
    >
    <div>
        <list-header v-if="!getSettings.showTaskInOneList" background_color="bg-orange-4">Todo</list-header>
        <q-list separator bordered>
            <transition-group
            tag="div"
            enter-active-class="animated slow fadeInUp"
            leave-active-class="animated slow fadeOutDown"
            >
                <task-list v-for="(task, key) in task_list" :key="'key'+key" :id="key" :task="task" ></task-list>
            </transition-group>
        </q-list>
    </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import taskList from './TaskList.vue';
import listHeader from '../shared/listHeader.vue'
export default {
    props:['task_list'],
    computed:{
      ...mapGetters('settings',['getSettings'])
    },
    components:{
        taskList,
        listHeader
    }
}
</script>