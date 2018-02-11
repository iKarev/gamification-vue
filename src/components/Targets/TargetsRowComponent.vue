<template>
  <v-list-tile-content class="w_100 pt_11">
    <v-layout row class="w_100" @click="onOpenTarget(target)">
      <v-flex xs3 class="pr_8">
        {{ target.name }}
      </v-flex>
      <v-flex xs3 class="pr_8" v-date-text="{date: target.deadline, type: '4'}">
        {{ target.deadline }}
      </v-flex>
      <v-flex xs5 class="pr_8">
        {{ target.description }}
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
