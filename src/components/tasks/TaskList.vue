<template>
    <q-item
      v-ripple
       v-touch-hold:1000.mouse="showEditTaskModal"
      :class="task.completed? 'bg-green-1' : 'bg-orange-1' "
      @click="toggleTask(id, !task.completed)"
      clickable
    >
        <q-item-section side top>
            <q-checkbox class="no-pointer-events" :value="task.completed" />
        </q-item-section>

        <q-item-section>
            <q-item-label :class="{'text-strike' : task.completed }" v-html="$options.filters.searchHighlighting(task.name,getSearch)" ></q-item-label>
        </q-item-section>
        <q-item-section side v-if="task.due_date && task.due_time" >
            <div class="row">
                <div class="column justify-center">
                    <q-icon name="event" size="18px" class="q-mr-xs"/>
                </div>
                
                <div class="column">
                    <q-item-label class="row justify-end" caption> 
                    {{ task.due_date | dateFormat}} 
                    </q-item-label>

                    <q-item-label class="row justify-end" caption> 
                    <small>{{ task_due_time }}</small> 
                    </q-item-label>
                </div>

            </div>
        </q-item-section>
        <q-item-section side>
            <div class="row">
                <q-btn
                    @click.stop="showEditTaskModal()"
                    color="primary"
                    icon="edit"
                    flat
                    outline
                    round
                    dense
                />
                <q-btn 
                    v-if="task.completed"
                    @click.stop="toggleDelete(id)"
                    color="red"
                    icon="delete"
                    flat
                    outline
                    round
                    dense
                />
            </div>
        </q-item-section>
        <q-dialog v-model="showEditTask">
            <edit-task :task="task" :id="id" @close-dialog="closeAddDialog()" />
        </q-dialog>
    </q-item>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { date } from 'quasar';

const { formatDate } = date;
export default {
    props:['task','id'],
    components:{
        'edit-task': require('components/tasks/modals/EditTask.vue').default,
    },
    data(){
        return{
            showEditTask: false,
        }
    },
    computed:{
        ...mapGetters('task',['getSearch']),
        ...mapGetters('settings',['getSettings']),
        task_due_time(){
            // console.log(this.getSettings.show12Hoursformat);
            if(this.getSettings.show12Hoursformat){
                return formatDate(this.task.due_date + " " + this.task.due_time , 'hh:mm A');
            }
            return this.task.due_time
        }
    },
    filters:{
        dateFormat(value){
            return formatDate(value, 'ddd, MMM DD YYYY');
        },
        searchHighlighting(value, search){
            if(search){
                let searchRegExp = new RegExp(search, 'ig');//make the string case insensitive
                return value.replace(searchRegExp,(match)=>{
                    return "<span class='bg-yellow-6'>" + match + "</span>";
                });
            }
            return value
        },
    },
    methods: {
        ...mapActions('task',['updateTask', 'deleteTask']),
        toggleTask(id, completedStatus){
            this.updateTask({id: id, updates: {completed: completedStatus}});
            // this.$store.dispatch('task/updateTask',{ id: id, updates: { completed: completedStatus } });
        },
        showEditTaskModal(){
            this.showEditTask = true;
        },
        toggleDelete(id){
            this.$q.dialog({
                title: 'Are you sure?',
                message: 'Are you sure you wanted to delete this task?',
                cancel: true,
                // persistent: true
            }).onOk(() => {
                this.deleteTask(id);
            })

        },
        closeAddDialog(){
            this.showEditTask = false;
        }
    }

}
</script>
