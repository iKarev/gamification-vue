<template>
  <div>
    <game-donut-chart v-if="name === 'donut'" :series="series" :options="options"></game-donut-chart>
    <game-line-chart v-else-if="name === 'line'" :options="options"></game-line-chart>
    <game-spider-chart v-else-if="name === 'spider'" :options="options"></game-spider-chart>
  </div>
</template>

<script>
import DonutChart from './DonutChartComponent.vue'
import SpiderChart from './SpiderChartComponent.vue'
import LineChart from './LineChartComponent.vue'
export default {
  name: 'Chart',
  components: {
    'game-donut-chart': DonutChart,
    'game-spider-chart': SpiderChart,
    'game-line-chart': LineChart
  },
  props: ['name', 'options', 'series']
}
</script>