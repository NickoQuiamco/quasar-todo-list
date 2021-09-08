<template>
  <div class="col q-py-sm">
    <q-input v-model="search_input" @keyup.esc="searchClear()" label="Search" v-select-all dense outlined>
      <template v-slot:append>
        <q-icon v-if="search_input !== ''" name="close" @click="searchClear()" class="cursor-pointer" />
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { selectAll } from 'src/directives/select-all';
export default {
  directives:{
    selectAll
  },
  computed:{
    ...mapGetters('task',['getSearch']),
    search_input:{
      get(){
        return this.getSearch
      },
      set(value){
        this.setSearch(value)
      }
    }
  },
  methods:{
    ...mapActions('task',['setSearch']),
    searchClear(){
      this.search_input = '';
    }
  }
}
</script>

<style>

</style>