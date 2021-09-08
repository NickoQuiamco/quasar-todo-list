<template>
  <q-form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner dense class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        <span>
          {{ mode | titleCase }} to access your Todo List anywhere.
        </span>
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        v-model="form_data.email"
        :rules="[ val => isValidEmail(val) || 'Please enter valid Email address.']"
        class="col-12"
        label="Email"
        type="email"
        lazy-rules
        dense
        outlined
        round
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        v-model="form_data.password"
        :rules="[ val => val.length >= 6 || 'Please enter atleast 6 characters.']"
        class="col-12"
        label="Password"
        type="password"
        lazy-rules
        dense
        outlined
        round
      />
    </div>
    <div class="row">
      <q-space/>
      <q-btn type="submit" color="primary" :label="mode" />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props:['mode'],
  data(){
    return{
      form_data:{
        email:"",
        password:""
      }
    }
  },
  methods:{
    ...mapActions({
      registerUser:"auth/registerUser",
      loginUser:"auth/loginUser"
    }),
    submitForm(){
      if(this.mode == 'register'){
        this.registerUser(this.form_data);
        // this.$router.push('/');
      }else{
        this.loginUser(this.form_data);
        // this.$router.push('/')

      }
    },
    isValidEmail(value){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    }
  },
  filters:{
    titleCase(value){
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>