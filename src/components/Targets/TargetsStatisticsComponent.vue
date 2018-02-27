<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex>
          <v-btn @click="onGetStatistics()">Получить статистику</v-btn>
        </v-flex>
      </v-layout>
      <game-chart :name="'donut'" :series="series" :options="options"></game-chart>
    </v-container>
  </div>
</template>

<script>
import Chart from '../Main/Highcharts/ChartComponent.vue'
export default {
  name: 'TargetsStatistics',
  props: ['type'],
  components: {
    'game-chart': Chart
  },
  methods: {
    onGetStatistics () {
      this.$store.dispatch('getTargetsStatistics', this.type)
    }
  },
  computed: {
    options () {
      return {
        title: {
          text: 'Соотношение количества топов к целям'
        },
        series: [{
          name: 'Топов связано с целью'
        }]
      }
    },
    series () {
      return this.$store.getters.statisticsTopsToTargets
    }
  }
}
</script>