<template>
    <div class="col sorting q-ml-sm q-py-sm">
      <q-select
        v-model="sort_by"
        :options="options"
        map-options
        emit-value
        label="Sort"
        dense
        outlined
      />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return{
            // sort_by: null,
            options: [
                {
                    label: 'Name',
                    value: 'name'
                },
                {
                    label: 'Date',
                    value: 'due_date'
                },
                {
                    label: 'Time',
                    value: 'due_time'
                },
            ]
        }
    },
    computed:{
        ...mapGetters('task', ['getSort']),
        sort_by:{
            get(){
                return this.getSort
            },
            set(value){
                this.setSort(value);
            }
        }
    },
    methods:{
        ...mapActions('task', ['setSort'])
    }
}
</script>

<style scoped>
    .sorting{
        flex: 0 0 112px;
    }
</style>