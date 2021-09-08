<template>
    <q-banner class="text-white text-center list-header" :class="background_color" dense inline-actions>
        <span class="text-bold text-subtitle1"> <slot></slot> </span>
        <!-- <template v-slot:action>
            <q-btn flat color="white" label="Turn ON Wifi" />
        </template> -->
    </q-banner>
</template>

<script>
export default {
    props:['background_color']

}
</script>

<style>

</style>