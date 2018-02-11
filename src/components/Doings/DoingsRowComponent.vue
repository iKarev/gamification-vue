<template>
  <v-list-tile-content class="w_100 pt_11">
    <v-layout row class="w_100">
      <v-flex xs1 class="pr_8">
        {{ doing.price }}
      </v-flex>
      <v-flex xs4 class="pr_8">
        {{ doing.name }}
      </v-flex>
      <v-flex xs1 class="pr_8">
        {{ doing.type === 1 ? 'Надо' : 'Нельзя' }}
      </v-flex>
      <v-flex xs5 class="pr_8">
        {{ doing.description }}
      </v-flex>
    </v-layout>
  </v-list-tile-content>
</template>


<script>
export default {
  props: ['doing'],
  name: 'doingsRow',
  created () {
  }
}
</script>
