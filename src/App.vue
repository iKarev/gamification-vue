<template>
  <v-app light id="app">
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container row class="no-max-width">
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
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      drawer: null,
      links: [
        { title: 'Login', icon: 'face', linkTo: '/login' },
        { title: 'Calendar', icon: 'event', linkTo: '/Calendar' },
        { title: 'Routine', icon: 'done', linkTo: '/DoingsManagement' },
        { title: 'Targets', icon: 'star', linkTo: '/targets' }
      ]
    }
  }
}
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/main.styl'
</style>
