<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-tabs @input="onTabChanged($event)">
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>
              <span>Настройка рутины</span>
            </v-toolbar-title>
          </v-toolbar>
          <game-refresh v-if="!listDownloaded" :margin="64"></game-refresh>
          <v-tabs-bar dark color="primary">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tabs-item :href="'#tab-period-' + period.periodType" v-for="(period, p) in periods" :key="p">
              {{ period.name }}
            </v-tabs-item>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content :id="'tab-period-' + period.periodType" v-for="(period, p) in periods" :key="p">
              <v-card flat>
                <game-doings-list @onListDownloaded="listDownloaded = true" :periodType="period.periodType"></game-doings-list>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import DoingList from './DoingsListComponent.vue'
import Refresh from '../Main/RefreshComponent.vue'
export default {
  name: 'DoingManagement',
  components: {
    'game-doings-list': DoingList,
    'game-refresh': Refresh
  },
  data () {
    return {
      listDownloaded: false,
      periods: [
        {periodType: 1, name: 'Год'},
        {periodType: 2, name: 'Месяц'},
        {periodType: 3, name: 'Неделя'},
        {periodType: 4, name: 'День'}
      ]
    }
  },
  methods: {
    onTabChanged (e) {
      this.listDownloaded = false
      this.$store.dispatch('getDoingsFromServer', {periodType: e.slice(11)})
    }
  }
}
</script>
