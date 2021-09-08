<template>
  <q-page padding>
    <q-card class="auth-tab">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <register-login-tab :mode="tab" ></register-login-tab>
        </q-tab-panel>

        <q-tab-panel name="register">
          <register-login-tab :mode="tab"></register-login-tab>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>

  </q-page>
</template>

<script>
export default {
  components:{
    'register-login-tab': require('components/auth/RegisterLogin.vue').default,
    // 'login-tab': require('components/auth/Login.vue').default
  },
  data(){
    return{
      tab: 'login'
    }
  }
}
</script>
