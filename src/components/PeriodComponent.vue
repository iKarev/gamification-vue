<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-tabs>
          <v-toolbar color="indigo" dark>
            <v-btn icon :to="'/Calendar'">
              <v-icon>event</v-icon>
            </v-btn>
            <v-toolbar-title>
              <span>Результаты за </span>
              <span v-date-text="{date: $route.params.date, periodType: $route.params.periodType}"></span>
            </v-toolbar-title>
          </v-toolbar>
          <v-tabs-bar dark color="primary">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tabs-item :href="'#tab-tops'"> Топы </v-tabs-item>
            <v-tabs-item :href="'#tab-doings'"> Рутина </v-tabs-item>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content :id="'tab-tops'">
              <v-card flat class="container">
                <game-tops :date="this.$route.params.date"></game-tops>
              </v-card>
            </v-tabs-content>
            <v-tabs-content :id="'tab-doings'">
              <v-card flat class="container">
                <game-doings-period :date="this.$route.params.date"></game-doings-period>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Tops from './Tops/TopsComponent.vue'
import DoingsPeriod from './Doings/DoingsPeriodComponent.vue'
export default {
  name: 'Period',
  created () {
    // if (this.$store.getters.targets.length < 1) {
    this.$store.dispatch('getTargetsFromServer', {type: this.$route.params.periodType})
    // }
  },
  watch: {
    '$route.params.type' (next, prev) {
      // this.$store.dispatch('getTargetsFromServer', this.getQuery(next))
    }
  },
  components: {
    'game-tops': Tops,
    'game-doings-period': DoingsPeriod
  },
  data () {
    return {
    }
  }
}
</script>
