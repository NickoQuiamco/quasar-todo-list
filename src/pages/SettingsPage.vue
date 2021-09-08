<template>
  <q-page padding>
    <q-list class="q-mb-md" bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hours Format</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="show12Hoursformat" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="showTaskInOneList" />
        </q-item-section>
      </q-item>

    </q-list>

    <q-list bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item
        to="/help"
        v-ripple
        tag="label"
      >
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item @click="visitOurWebsite()" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Visit our website.</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item @click="emailUs()" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Email Us.</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { openURL } from 'quasar'
export default {
  name: 'PageIndex',
  data(){
    return{
      // show12Hoursformat: false,
    }
  },
  computed:{
    ...mapGetters('settings',['getSettings']),
    show12Hoursformat:{
      get(){
        return this.getSettings.show12Hoursformat;
      },
      set(value){
        this.toggle12HoursFormat(value);
      }
    },
    showTaskInOneList:{
      get(){
        return this.getSettings.showTaskInOneList;
      },
      set(value){
        this.toggleTaskInOneList(value)
      }
    }
  },
  methods:{
    ...mapActions('settings', ['toggle12HoursFormat','toggleTaskInOneList']),
    visitOurWebsite(){
      openURL('http://www.github.com/NickoQuiamco');
    },
    emailUs(){
      window.location.href = "mailto:quiamconicko@gmail.com?subject=Todo Application Feedback"
    }
  }
}
</script>
