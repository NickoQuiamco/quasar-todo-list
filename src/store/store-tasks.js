import Vue from "vue";
import { uid,Notify } from "quasar";
import { firebaseDB, firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message.js";

export default {
    namespaced: true,
    state: {
      tasks:{
        // 'ID1':{
        //   name: 'Go to shop',
        //   completed: false,
        //   due_date: "2021/06/14",
        //   due_time: "14:00"
        // },
        // 'ID2':{
        //   name: 'Get bananas',
        //   completed: false,
        //   due_date: "2021/06/10",
        //   due_time: "18:00"
        // },
        // 'ID3':{
        //   name: 'Get apples',
        //   completed: false,
        //   due_date: "2021/06/16",
        //   due_time: "20:00"
        // },
      },
      search: "",
      sort_type: "name",
      tasks_downloaded: false
    },

    mutations: {
      changeTaskStatus(state, payload){
        // console.log(payload);
        Object.assign(state.tasks[payload.id], payload.updates )
      },
      deleteTask(state, payload){
        // console.log(payload);
        Vue.delete(state.tasks, payload)
      },
      insertTask(state, payload){
        Vue.set(state.tasks, payload.id, payload.task);
      },
      setSearch(state, payload){
        state.search = payload
      },
      setSort(state, payload){
        state.sort_type = payload
      },
      setTaskDownloaded(state, payload){
        state.tasks_downloaded = payload
      },
      clearTasks(state){
        state.tasks = {}
      },
    },
    actions: {
      updateTask({ dispatch }, payload ){
        // commit('changeTaskStatus', payload);
        dispatch('firebaseUpdateTask', payload)
      },
      deleteTask({ dispatch }, payload ){
        // commit('deleteTask', payload)
        dispatch('firebaseDeleteTask', payload);
      },
      addTask({ dispatch }, payload){
        let task_id = uid();
        let task = {
          id: task_id,
          task: payload
        }
        // commit('insertTask', task);
        dispatch('firebaseAddTask', task);
      },
      firebaseAddTask({}, payload){
        const user_id = firebaseAuth.currentUser.uid;
        const task_ref = firebaseDB.ref('tasks/' + user_id + '/' + payload.id)
        task_ref.set(payload.task, error=>{
          if(error){
            showErrorMessage(error.message);
          }else{
            Notify.create('Task added!')
          }
        })
      },
      firebaseUpdateTask({}, payload){
        const user_id = firebaseAuth.currentUser.uid;
        const task_ref = firebaseDB.ref('tasks/' + user_id + '/' + payload.id)
        task_ref.update(payload.updates, error=>{
          if(error){
            showErrorMessage(error.message);
          }else{
            let keys = Object.keys(payload.updates)
            if(!(keys.includes('completed') && keys.length == 1) ){
              Notify.create('Task updated!')
            }
          }
        })
      },
      firebaseDeleteTask({}, task_id){
        const user_id = firebaseAuth.currentUser.uid;
        
        const task_ref = firebaseDB.ref('tasks/' + user_id + '/' + task_id)
        task_ref.remove(error=>{
          if(error){
            showErrorMessage(error.message);
          }else{
            Notify.create('Task deleted!')
          }
        })
      },
      setSearch( { commit }, payload ){
        commit('setSearch', payload);
      },
      setSort( { commit }, payload ){
        commit('setSort', payload);
      },
      firebaseReadData({commit}){
        // console.log('here firease');
        const user_id = firebaseAuth.currentUser.uid;
        let user_tasks = firebaseDB.ref('tasks/' + user_id)
        //initial check of data
        user_tasks.once('value', snapshot=>{
          commit('setTaskDownloaded', true);
        }, error => {
          showErrorMessage(error.message)
          this.$router.replace('/auth')
        });
        // child added firebase event
        user_tasks.on('child_added', snapshot =>{
          let task = snapshot.val();
          let payload = {
            id: snapshot.key,
            task: task
          }
          commit('insertTask', payload);
        })
        // child changed
        user_tasks.on('child_changed', snapshot =>{
          let task = snapshot.val();
          let payload = {
            id: snapshot.key,
            updates: task
          }
          commit('changeTaskStatus', payload);
        })
        // child removed
        user_tasks.on('child_removed', snapshot =>{
          let task_id = snapshot.key;
          commit('deleteTask', task_id);
        })
      }
    },
    getters: {
      taskSorted(state){
        let task_sorted = {}, 
        keys_ordered = Object.keys(state.tasks);
        
        keys_ordered.sort((a, b)=>{
          let a_task_prop = state.tasks[a][state.sort_type].toLowerCase(),
          b_task_prop = state.tasks[b][state.sort_type].toLowerCase()

          if(a_task_prop > b_task_prop) return 1
          else if(a_task_prop < b_task_prop) return -1
          else return 0
        });

        keys_ordered.forEach((key)=>{
          task_sorted[key] = state.tasks[key];
        })

        return task_sorted;
      },
      taskFiltered(state, getters){
        
        let task_sorted = getters.taskSorted, task_filtered = {};
        if(state.search){
          Object.keys(task_sorted).forEach( key =>{
            let task = task_sorted[key],task_name_lowercase = task.name.toLowerCase(),state_search_lowercase = state.search.toLowerCase();
            if(task_name_lowercase.includes(state_search_lowercase)){
              task_filtered[key] = task
            }
          });
          return task_filtered;
        }
        return task_sorted
      },
      getSearch(state){
        return state.search;
      },
      getSort(state){
        return state.sort_type;
      },
      getTasksDownloaded(state){
        return  state.tasks_downloaded;
      },
      tasksRaw(state){
        return state.tasks;
      },
      taskTodo(state, getters){
        let task_filtered = getters.taskFiltered;
        let tasks = {};
        Object.keys(task_filtered).forEach( key =>{
          let task = task_filtered[key];
          if(!task.completed){
            tasks[key] = task
          }
        });
        return tasks;
      },
      taskCompleted(state, getters){
        let task_filtered = getters.taskFiltered;
        let tasks = {};
        Object.keys(task_filtered).forEach( key =>{
          let task = task_filtered[key];
          if(task.completed){
            tasks[key] = task
          }
        });
        return tasks;
      }
   },
}