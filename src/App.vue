<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  methods:{
    ...mapActions({
      getSettings: "settings/getSettings",
      handleAuth: "auth/handleAuthStateChange"
    })
  },
  mounted(){
    this.getSettings();
    this.handleAuth();

  }
}
</script>
