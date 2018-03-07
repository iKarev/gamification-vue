<template>
  <v-list-tile-content class="w_100 pt_11">
    <v-layout row class="w_100" @click="onOpenTarget(target)">
      <v-flex xs3 class="pr_8 nowrap">
        <v-tooltip bottom open-delay="500">
          <span slot="activator">{{ target.name }}</span>
          <span>{{ target.name }}</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs3 class="pr_8 layout">
        <span v-date-text="{date: target.deadline, periodType: '4'}"></span>
      </v-flex>
      <v-flex xs5 class="pr_8 nowrap">
        <v-tooltip bottom>
          <span slot="activator">{{ target.description }}</span>
          <span>{{ target.description }}</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-list-tile-content>
</template>


<script>
export default {
  props: ['target'],
  name: 'TargetsRow',
  created () {
  },
  methods: {
    onOpenTarget (target) {
      this.$emit('openTarget', target)
    }
  }
}
</script>
