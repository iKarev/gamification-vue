<template>
  <v-layout row>
    <v-flex xs12>
      <game-targets-chosen></game-targets-chosen>
    </v-flex>
  </v-layout>
</template>

<script>
import TargetsChosen from './TargetsChosenComponent.vue'
export default {
  name: 'Targets',
  components: {
    'game-targets-chosen': TargetsChosen
  },
  data () {
    return {
    }
  }
}
</script>
