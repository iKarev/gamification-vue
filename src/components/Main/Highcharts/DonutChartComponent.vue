<template>
	<div class="highcharts"></div>
</template>

<script>
var Highcharts = require('highcharts')
require('highcharts/highcharts-3d')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
export default {
  name: 'DonutChart',
  props: ['options', 'series'],
  data () {
    return {
      donutOptions: {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        }
      }
    }
  },
  methods: {
    drawChart () {
      const options = Object.assign(this.donutOptions, this.options)
      options.series[0].data = this.series
      this.target = Highcharts.chart(this.$el, options)
    }
  },
  watch: {
    series (next, prev) {
      this.drawChart()
    }
  },
  beforeDestroy () {
    if (this.target) {
      this.target.destroy()
    }
  }
}
</script>