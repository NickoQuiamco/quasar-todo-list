<template>
    <transition
        appear
        mode="out-in"
        enter-active-class="animated slow zoomIn"
        leave-active-class="animated slow zoomOut absolute-top"
    >
      <q-banner class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="check" color="primary" />
        </template>
          No task to do today! 
        <template v-slot:action>
          <q-btn flat color="primary" label="Add task" no-caps @click="ShowAddTask()" />
        </template>
      </q-banner>
    </transition>
</template>

<script>
export default {
  methods:{
    ShowAddTask(){
      this.$root.$emit("show-add-task");
    }
  }
}
</script>

<style>

</style>