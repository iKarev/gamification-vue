<template>
  <v-app light id="app">
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">10000 часов</v-toolbar-title>
      <game-notifications></game-notifications>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">
        <span>{{ user.name || user.email }}</span>
      </v-toolbar-title>
      <v-btn v-if="user._id" icon @click="deleteActiveFriend()">
        <v-icon>home</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- <v-container row class="no-max-width"> -->
    <v-navigation-drawer v-model="drawer" absolute temporary light>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Application
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in links" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="item.linkTo">{{ item.title }}</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
    <!-- </v-container> -->
  </v-app>
</template>

<script>
import Notifications from './components/Main/NotificationsComponent.vue'
export default {
  name: 'app',
  components: {
    'game-notifications': Notifications
  },
  data () {
    return {
      drawer: null,
      links: [
        { title: 'Login', icon: 'face', linkTo: '/login' },
        { title: 'Friends', icon: 'contacts', linkTo: '/Users' },
        { title: 'Calendar', icon: 'event', linkTo: '/Calendar' },
        { title: 'Routine', icon: 'done', linkTo: '/DoingsManagement' },
        { title: 'Targets', icon: 'star', linkTo: '/targets' }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.activeFriend
    }
  },
  methods: {
    deleteActiveFriend () {
      this.$store.commit('deleteActiveFriend')
      this.$router.push({path: `/Calendar`})
    }
  }
}
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/main.styl'
</style>
