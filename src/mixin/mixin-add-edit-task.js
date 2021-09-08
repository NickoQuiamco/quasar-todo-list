export default {
    methods:{
        clearDueDate(){
        this.task_form.due_date = '';
        this.task_time.due_time = '';
        }
    },
    components: {
        'modal-header': require('components/tasks/modals/shared/modalHeader.vue').default,
        'modal-task-name': require('components/tasks/modals/shared/modalTaskName.vue').default,
        'modal-due-date': require('components/tasks/modals/shared/modalDueDate.vue').default,
        'modal-due-time': require('components/tasks/modals/shared/modalDueTime.vue').default,
        'modal-buttons': require('components/tasks/modals/shared/modalButtons.vue').default,
    },
};