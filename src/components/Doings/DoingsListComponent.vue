<template>
  <div>
    <v-container v-if="!doings.length">
      <p class="m_0">Вы не создали {{ doingPeriodNames[periodType - 1] }} дел? Пора это сделать!</p>
    </v-container>
    <v-list class="pb_16">
      <v-list-tile style="height: 74px;" class="list-tile"
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
  </div>
</template>


<script>
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
      doingPeriodNames: ['ежегодных', 'ежемесячных', 'еженедельных', 'ежедневных']
    }
  },
  components: {
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
    }
  }
}
</script>
