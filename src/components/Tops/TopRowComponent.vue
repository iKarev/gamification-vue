<template>
  <v-list-tile-content>
    <v-layout row class="w_100">
      <v-flex xs1>
        {{ top.price }}
      </v-flex>
      <v-flex xs3 class="pl_8">
        {{ top.name }}
      </v-flex>
      <v-flex xs3 class="pl_8">
        <span v-if="top.target">{{ top.target.name }}</span>
      </v-flex>
      <v-flex xs4 class="pl_8">
        {{ top.description }}
      </v-flex>
      <v-flex xs1>
      </v-flex>
    </v-layout>
  </v-list-tile-content>
</template>

<script>
export default {
  props: ['top'],
  name: 'TopRow'
}
</script>
