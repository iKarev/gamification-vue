<template>
	<div class="highcharts"></div>
</template>

<script>
const Highcharts = require('highcharts')
require('highcharts/highcharts-more')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
export default {
  name: 'SpiderChart',
  props: ['options'],
  data () {
    return {
      target: undefined
    }
  },
  methods: {
    drawChart () {
      let options = {
        chart: {
          polar: true,
          type: 'line'
        },
        pane: {
          size: '80%'
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        },
        tooltip: {
          shared: true
          // pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          y: 70,
          layout: 'vertical'
        }
      }
      options = Object.assign(options, this.options)
      this.target = Highcharts.chart(this.$el, options)
    }
  },
  mounted () {
    this.drawChart()
  },
  watch: {
    options (next, prev) {
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