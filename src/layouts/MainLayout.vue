<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="!logged_in" to="/auth" class="absolute-right" icon-right="account_circle" label="login" flat />
        <q-btn v-else @click="logoutUser" class="absolute-right" icon-right="account_circle" label="logout" flat />
        <q-toolbar-title class="absolute-center">
          My to do list
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-footer v-show="$q.screen.lt.md" > 
      <q-tabs>
        <q-route-tab v-for="nav in essentialLinks" :key="nav.title" :icon="nav.icon" :to="nav.link"  />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="225"
      content-class="bg-primary"
      :breakpoint="1100"
    >
      <q-list dark>
        <q-item-label
          header
          class="text-grey-4"
        >
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition
          appear
          mode="out-in"
          enter-active-class="animated slower bounceInRight"
          leave-active-class="animated slower bounceOutRight"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'To do List',
    // caption: 'quasar.dev',
    icon: 'list',
    link: '/'
  },
  {
    title: 'Settings',
    // caption: 'github.com/quasarframework',
    icon: 'settings',
    link: '/settings'
  },
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed:{
    ...mapGetters({
      logged_in: 'auth/getLoggedInStatus'
    }),
  },
  methods:{
    ...mapActions({
      logoutUser: 'auth/logoutUser'
    }),
  }
}
</script>
<style lang="scss">
.drawer{
  .q-router-link--exact-active{
    color: red!important;
  }
}
</style>