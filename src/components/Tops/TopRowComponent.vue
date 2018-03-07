<template>
  <v-list-tile-content>
    <v-layout row class="w_100">
      <v-flex xs1 class="layout align-center">
        {{ top.price }}
      </v-flex>
      <v-flex xs3 class="pl_8 nowrap layout align-center">
        <v-tooltip bottom open-delay="500">
          <span slot="activator">{{ top.name }}</span>
          <span>{{ top.name }}</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs3 class="pl_8 layout align-center">
        <div v-if="top.target" class="nowrap">
          <v-tooltip bottom open-delay="500">
            <span slot="activator">{{ top.target.name }}</span>
            <span>{{ top.target.name }}</span>
          </v-tooltip>
        </div>
      </v-flex>
      <v-flex xs4 class="pl_8 nowrap layout align-center">
        <v-tooltip bottom open-delay="500">
          <span slot="activator">{{ top.description }}</span>
          <span>{{ top.description }}</span>
        </v-tooltip>
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
