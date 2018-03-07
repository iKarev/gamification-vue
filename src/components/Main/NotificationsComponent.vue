<template>
  <v-layout class="align-center flex">
    <v-menu max-height="500" min-width="500" bottom offset-y>
      <v-btn icon slot="activator">
        <icon scale="1.7" name="crosshairs"></icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="(target, i) in closestTargets" :key="i" @click="showNotifications()">
          <v-list-tile-title class="layout justify-space-between">
            <span>{{ target.name }}</span>
            <span v-date-text="{date: target.deadline, periodType: '4'}"></span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>
export default {
  name: 'Notifications',
  created () {
    this.$store.dispatch('getNotifications')
  },
  computed: {
    closestTargets () {
      console.log(this.$store.getters.notifications.closestTargets)
      return this.$store.getters.notifications.closestTargets
    }
  }
}
</script>

