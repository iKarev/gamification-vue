<template>
  <v-card>
    <v-toolbar color="indigo" dark>
      <v-toolbar-title class="layout row">
        <p class="m_0 layout row align-center">{{ targetTypeName[mainTarget.type || 0] }}</p>
        <v-spacer></v-spacer>
        <v-btn icon @click="backToParentTarget()" v-if="mainTarget.type > 0">
          <v-icon>undo</v-icon>
        </v-btn>
      </v-toolbar-title>
    </v-toolbar>
    <game-refresh v-if="!listDownloaded && mainTarget.type < 4" :margin="64"></game-refresh>
    <v-toolbar color="primary" dark>
      <h4>{{ mainTarget.name || 'Создайте глобальную цель' }}</h4>
    </v-toolbar>
    <v-container>
      <h4 v-if="!mainTarget._id && mainTarget.type === 0">Укажите вашу основную цель</h4>
      <v-layout row>
        <v-flex xs10>
          <game-targets-editing :target="mainTarget" v-if="mainTarget.edit === true"></game-targets-editing>
          <game-targets-row style="height: 74px;" class="list__tile" :target="mainTarget" v-if="mainTarget.edit !== true"></game-targets-row>
        </v-flex>
        <v-flex class="layout row" xs2 style="align-items: center;">
          <v-btn fab dark ripple small color="primary"
            @click="onEditTarget(true)" v-if="mainTarget.edit !== true"><v-icon dark>create</v-icon></v-btn>
          <v-btn fab dark ripple small color="primary"
            @click="onEditTarget(false)" v-if="mainTarget.edit === true"><icon name="times"></icon></v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-expansion-panel v-if="mainTarget.type < 4 && mainTarget._id">
      <v-expansion-panel-content class="blue-grey white--text" color="white">
        <div slot="header">
          <h4>Дочерние {{ childrenTypesNames[mainTarget.type || 0] }}</h4>
        </div>
        <game-targets-list class="white" @listShow="listDownloaded = $event" :parentTarget="mainTarget" :listDownloaded="listDownloaded"></game-targets-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-content class="blue-grey white--text" color="white">
        <div slot="header">
          <h4>Статистика</h4>
        </div>
        <game-targets-statistics class="white" :type="mainTarget.type"></game-targets-statistics>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-card>
</template>

<script>
import TargetsStatistics from './TargetsStatisticsComponent.vue'
import TargetsEditing from './TargetsEditingComponent.vue'
import TargetsRow from './TargetsRowComponent.vue'
import TargetsList from './TargetsListComponent.vue'
import Refresh from '../Main/RefreshComponent.vue'
export default {
  name: 'Targets',
  components: {
    'game-targets-statistics': TargetsStatistics,
    'game-targets-editing': TargetsEditing,
    'game-targets-row': TargetsRow,
    'game-targets-list': TargetsList,
    'game-refresh': Refresh
  },
  methods: {
    backToParentTarget () {
      this.listDownloaded = false
      if (this.mainTarget.parentTargetId) {
        this.$store.dispatch('getTargetFromServer', this.mainTarget.parentTargetId)
      } else {
        this.$router.push({path: `/targets`})
        this.$store.dispatch('getTargetsFromServer')
        this.$store.commit('setActiveTarget', {name: '', price: '', description: '', deadline: null})
      }
    },
    onEditTarget (type) {
      this.mainTarget.edit = type
      this.$store.commit('setActiveTarget', {...this.mainTarget})
    }
  },
  created () {
    if (this.$route.params.id) {
      this.$store.dispatch('getTargetFromServer', this.$route.params.id)
    } else {
      this.$store.dispatch('getTargetFromServer', 'main')
      this.listDownloaded = true
    }
  },
  data () {
    return {
      listDownloaded: false,
      targetTypeName: ['Глобальные цели', 'Генеральные цели', 'Долгосрочные цели', 'Краткосрочные цели', 'Ближайшие цели'],
      childrenTypesNames: ['генеральные цели', 'долгосрочные цели', 'краткосрочные цели', 'ближайшие цели']
    }
  },
  computed: {
    mainTarget () {
      return this.$store.getters.activeTarget
    }
  }
}
</script>
