<template>
  <div>
    <v-container>
      <p v-if="!doings.length">Вы не создали {{ doingPeriodNames[periodType - 1] }} дел? Пора это сделать!</p>
      <v-list class="pb_16">
        <v-list-tile style="height: 74px;" class="list-tile p_0"
          v-for="(doing, i) in doings" v-bind:key="i">
          <v-layout row>
            <v-flex xs10>
              <game-doings-editing :periodType="periodType" :doing="doing" v-if="doing.edit === true"></game-doings-editing>
              <game-doings-row :doing="doing" v-if="doing.edit !== true"></game-doings-row>
            </v-flex>
            <v-flex class="layout row" xs2 style="align-items: center;">
              <v-btn fab dark ripple small color="primary"
                @click="onEditDoing(doing, true)" v-if="doing.edit !== true"><v-icon dark>create</v-icon></v-btn>
              <v-btn fab dark ripple small color="primary"
                @click="onEditDoing(doing, false)" v-if="doing.edit === true"><icon name="times"></icon></v-btn>
              <v-btn fab dark ripple small color="error" @click="onDeleteDoing(doing._id)"><v-icon dark>remove</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </v-list-tile>
        <v-list-tile>
          <v-layout row>
            <v-flex xs10>
              <game-doings-editing :periodType="periodType" :doing="newDoing"></game-doings-editing>
            </v-flex>
            <v-flex xs2>
            </v-flex>
          </v-layout>
        </v-list-tile>
      </v-list>
      <v-layout>
        <v-flex xs10>
          <game-chart v-if="options.xAxis.categories && options.xAxis.categories.length"
            :name="'spider'" :options="options"></game-chart>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import Chart from '../Main/Highcharts/ChartComponent.vue'
import doingsEditing from './DoingsEditingComponent.vue'
import doingsRow from './DoingsRowComponent.vue'
export default {
  props: ['periodType'],
  name: 'DoingsList',
  data () {
    return {
      newDoing: {
        name: '',
        price: 1,
        description: '',
        type: 1
      },
      doingPeriods: ['лет', 'месяцев', 'недель', 'дней'],
      doingPeriodNames: ['ежегодных', 'ежемесячных', 'еженедельных', 'ежедневных']
    }
  },
  components: {
    'game-chart': Chart,
    'game-doings-editing': doingsEditing,
    'game-doings-row': doingsRow
  },
  methods: {
    onDeleteDoing (doingId) {
      this.$store.dispatch('deleteDoing', doingId)
    },
    onEditDoing (doing, type) {
      doing.edit = type
      this.$store.commit('changeDoing', doing._id, {edit: type})
    }
  },
  computed: {
    doings () {
      this.$emit('onListDownloaded')
      return this.$store.getters.doings
    },
    options () {
      const allPeriods = {
        name: `Всего ${this.doingPeriods[this.periodType - 1]}`,
        data: [],
        pointPlacement: 'on'
      }
      const successPeriods = {
        name: `Из них успешно`,
        data: [],
        pointPlacement: 'on'
      }
      const categories = []
      this.doings.forEach((doing) => {
        if (doing.implements) {
          allPeriods.data.push(doing.implements.length)
          successPeriods.data.push(doing.implements.filter((item) => item ? item.value : false).length)
          categories.push(doing.name)
        }
      })
      const options = {
        title: {
          text: `Статистика рутины ${this.doingPeriodNames[this.periodType - 1]} дел`,
          x: -80
        },
        xAxis: {
          categories,
          tickmarkPlacement: 'on',
          lineWidth: 0
        },
        series: [allPeriods, successPeriods]
      }
      return options
    }
  }
}
</script>
