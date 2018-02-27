<template>
	<div class="highcharts"></div>
</template>

<script>
var Highcharts = require('highcharts')
export default {
  name: 'LineChart',
  props: ['options'],
  data () {
    return {
      target: undefined
    }
  },
  mounted () {
    setTimeout(() => {
      let options = {
        title: {
          text: 'Solar Employment Growth by Sector, 2010-2016'
        },
        subtitle: {
          text: 'Source: thesolarfoundation.com'
        },
        yAxis: {
          title: {
            text: 'Number of Employees'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      }
      options = Object.assign(options, this.options)
      this.target = Highcharts.chart(this.$el, options)
    }, 1000)
  },
  beforeDestroy () {
    if (this.target) {
      this.target.destroy()
    }
  }
}
</script>