<template>
  <form action="">
    <div class="row q-mb-md">
      <q-banner dense class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Login your account.
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input v-model="form_data.email" type="email" class="col-12" label="Email" outlined dense round />
    </div>
    <div class="row q-mb-md">
      <q-input v-model="form_data.password" type="password" class="col-12" label="Password" outlined dense round />
    </div>
    <div class="row">
      <q-space/>
      <q-btn color="primary" label="Login" />
    </div>
  </form>
</template>

<script>
export default {
  data(){
    return{
      form_data:{
        email:"",
        password:""
      }
    }
  }
}
</script>