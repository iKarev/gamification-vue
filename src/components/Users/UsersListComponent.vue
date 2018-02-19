<template>
  <div>
    <v-container>
      <p v-if="!users.length">
        <span v-if="type === 1">У вас нет друзей. Не думали завести парочку?</span>
        <span v-else-if="type === 2">В системе нет людей, которые не были бы вашими друзьями!</span>
        <span v-else-if="type === 3">Заявок на добавление в друзья нет. Проявите инициативу первым!</span>
        <span v-else-if="type === 4">У вас нет исходящих заявок, по которым не принято решение.</span>
      </p>
      <v-list class="pb_16">
        <v-list-tile style="height: 74px;" class="list-tile p_0"
          v-for="(user, i) in users" v-bind:key="i" @click="goToFriend(user)">
          <v-layout row>
            <v-flex xs3 class="pr_8">
              {{ user.email }}
            </v-flex>
            <v-flex xs3 class="pr_8">
              {{ user.name }}
            </v-flex>
            <v-flex xs4 class="pr_8">
            </v-flex>
            <v-flex class="layout row" xs2 style="align-items: center;">
              <v-btn v-if="type === 1" fab dark ripple small color="default" v-on:click.stop.prevent="onSendRequest(user, 'removeCommon')">
                <v-icon dark>close</v-icon>
              </v-btn>
              <v-btn v-else-if="type === 2" fab dark ripple small color="primary" v-on:click.stop.prevent="onSendRequest(user, 'request')">
                <v-icon dark>add</v-icon>
              </v-btn>
              <div v-else-if="type === 3">
                <v-btn fab dark ripple small color="success" v-on:click.stop.prevent="onSendRequest(user, 'accept')">
                  <v-icon dark>check</v-icon>
                </v-btn>
                <v-btn fab dark ripple small color="danger" v-on:click.stop.prevent="onSendRequest(user, 'removeNew')">
                  <v-icon dark>close</v-icon>
                </v-btn>
              </div>
              <v-btn v-else-if="type === 4" fab dark ripple small color="danger" v-on:click.stop.prevent="onSendRequest(user, 'removeRequest')">
                <v-icon dark>close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-list-tile>
      </v-list>
    </v-container>
  </div>
</template>


<script>
export default {
  props: ['type', 'users'],
  name: 'UsersList',
  data () {
    return {}
  },
  methods: {
    onSendRequest (user, type) {
      this.$store.dispatch('UsersFriendshipChanges', {user, type})
    },
    goToFriend (user) {
      if (this.type === 1) {
        this.$store.commit('setFriendView', user)
        this.$router.push({path: `/Calendar`})
      }
    }
  },
  computed: {}
}
</script>
