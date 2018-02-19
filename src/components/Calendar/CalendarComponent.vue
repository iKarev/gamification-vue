<template>
  <v-container class="m_0 w_100">
    <div class="h_100">
      <v-layout column class="relative h_100"  @wheel="changeMonth($event)">
        <game-refresh style="top: 0px;" v-if="monthChanges"></game-refresh>
        <div v-if="month && month.info">
          <game-calendar-period class="calendar-element relative p_8 of-h" style="height: 40px; border-left: #e0e0e0 1px solid;"
            :monthChanges="monthChanges" :period="month.info"></game-calendar-period>
        </div>
        <v-layout row class="relative h_100 calendar-row">
          <v-flex xs12 md2 class="h_100">
            <v-layout column class="h_100">
              <game-calendar-period class="calendar-element relative p_8 of-h" :style="{height: dayHeight}"
                v-for="(week, i) in month.weeks" v-bind:key="i" :monthChanges="monthChanges"
                :period="week" :index="i" ></game-calendar-period>
            </v-layout>
          </v-flex>
          <v-flex xs12 md10 class="h_100">
            <v-layout row wrap class="h_100">
              <game-calendar-period class="calendar-day calendar-element relative p_8 of-h" :style="{height: dayHeight}"
                v-for="(day, i) in month.days" v-bind:key="i" :monthChanges="monthChanges"
                :period="day" :index="i" ></game-calendar-period>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
// v-if="monthChanges"
import CalendarPeriod from './CalendarPeriodComponent.vue'
import Refresh from '../Main/RefreshComponent.vue'
export default {
  name: 'Calendar',
  components: {
    'game-calendar-period': CalendarPeriod,
    'game-refresh': Refresh
  },
  data () {
    return {
      monthChanges: true
    }
  },
  created () {
    this.$store.dispatch('getCalendarMonth', {year: new Date().getFullYear(), month: new Date().getMonth() + 1})
  },
  methods: {
    changeMonth (e) {
      if (this.monthChanges) return
      this.monthChanges = true
      const getMonth = (num) => {
        this.$store.dispatch('getCalendarMonth', {year: this.month.year, month: this.month.month + num})
      }
      if (e.deltaY < 0) {
        getMonth(-1)
      } else {
        getMonth(1)
      }
    }
  },
  computed: {
    dayHeight () {
      return this.month.days.length > 35 ? '16.666%' : '20%'
    },
    month () {
      this.monthChanges = false
      return this.$store.getters.month
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
