<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-tabs @input="onTabChanged($event)">
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>
              <span>Друзья</span>
            </v-toolbar-title>
          </v-toolbar>
          <game-refresh v-if="!listDownloaded" :margin="64"></game-refresh>
          <v-tabs-bar dark color="primary">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tabs-item :href="'#users-' + tab.name" v-for="(tab, t) in tabs" :key="t">
              {{ tab.title }}
            </v-tabs-item>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content
              :id="'users-' + tab.name" v-for="(tab, t) in tabs" :key="t">
              <v-card flat>
                <game-users-list :users="users[tab.name]" :type="tab.type"
                  @onListDownloaded="listDownloaded = true"></game-users-list>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import UsersList from './UsersListComponent.vue'
import Refresh from '../Main/RefreshComponent.vue'
export default {
  name: 'UsersManagement',
  components: {
    'game-users-list': UsersList,
    'game-refresh': Refresh
  },
  created () {
    this.$store.dispatch('getUsersList')
  },
  data () {
    return {
      listDownloaded: false,
      tabs: [
        {title: 'Мои друзья', name: 'common', type: 1},
        {title: 'Найти друзей', name: 'all', type: 2},
        {title: 'Заявки в друзья', name: 'new', type: 3},
        {title: 'Исходящие заявки', name: 'request', type: 4}
      ]
    }
  },
  methods: {
    onTabChanged (e) {}
  },
  computed: {
    users () {
      this.listDownloaded = true
      return this.$store.getters.users
    }
  }
}
</script>
