<template>
    <div class="row q-pa-sm">
        <q-input :value="name" v-select-all @input="$emit('update:name', $event)" :rules="[val => !!val || 'Field is required']" class="col" label="Task name" autofocus outlined >
        <template v-slot:append>
            <q-icon v-if="name" @click="$emit('update:name', '')" name="close" class="cursor-pointer" />
        </template>
        </q-input>
    </div>  
</template>

<script>
import { selectAll } from 'src/directives/select-all.js'
export default {
    props:['name'],
    directives:{
        selectAll
    },
}
</script>