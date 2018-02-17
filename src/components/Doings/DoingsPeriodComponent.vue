<template>
  <div>
    <v-container v-if="!periodDoings.todo.length && !periodDoings.stop.length">
      <p class="m_0">Вы не создали {{ doingPeriodNames[periodType - 1] }} дел? 
        <router-link :to="'/DoingsManagement'">Пора это сделать!</router-link>
      </p>
    </v-container>
    <v-list class="pb_16" v-if="periodDoings.todo.length || periodDoings.stop.length">
      <v-subheader inset>Надо</v-subheader>
      <v-list-tile style="height: 74px;" class="list-tile"
        v-for="(doing, i) in periodDoings.todo" v-bind:key="i">
        <div class="layout row"
          :class="{'red--text': doing.value === false, 'green--text': doing.value === true}">
          <v-flex xs10>
            <game-doings-row :doing="doing"></game-doings-row>
          </v-flex>
          <v-flex xs2>
            <v-btn fab dark ripple small color="success"
              @click="onMarkPeriodDoing(doing, true)"><icon name="check"></icon></v-btn>
            <v-btn fab dark ripple small color="error"
              @click="onMarkPeriodDoing(doing, false)"><icon name="times"></icon></v-btn>
          </v-flex>
        </div>
      </v-list-tile>
      <v-subheader inset>Нельзя</v-subheader>
      <v-list-tile style="height: 74px;" class="list-tile"
        v-for="(doing, i) in periodDoings.stop" v-bind:key="i">
        <div class="layout row"
          :class="{'red--text': doing.value === false, 'green--text': doing.value === true}">
          <v-flex xs10>
            <game-doings-row :doing="doing"></game-doings-row>
          </v-flex>
          <v-flex xs2>
            <v-btn fab dark ripple small color="success"
              @click="onMarkPeriodDoing(doing, true)"><icon name="times"></icon></v-btn>
            <v-btn fab dark ripple small color="error"
              @click="onMarkPeriodDoing(doing, false)"><icon name="check"></icon></v-btn>
          </v-flex>
        </div>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import doingsRow from './DoingsRowComponent.vue'
export default {
  name: 'DoingsList',
  data () {
    return {
      doingPeriodNames: ['ежегодных', 'ежемесячных', 'еженедельных', 'ежедневных']
    }
  },
  components: {
    'game-doings-row': doingsRow
  },
  created () {
    this.$store.dispatch('getPeriodDoingsFromServer', {periodType: this.periodType, date: this.$route.params.date})
  },
  methods: {
    onMarkPeriodDoing (doing, value) {
      const data = {
        doingId: doing._id,
        date: this.$route.params.date,
        method: (doing.value === false || doing.value === true) ? 'patch' : 'put',
        value
      }
      doing.value = value
      this.$store.dispatch('markPeriodDoing', data)
    }
  },
  computed: {
    periodType () {
      return this.$route.params.periodType
    },
    periodDoings () {
      const doings = {todo: [], stop: []}
      for (let doing of this.$store.getters.doings) {
        doings[doing.type ? 'todo' : 'stop'].push(doing)
      }
      return doings
    }
  }
}
</script>
