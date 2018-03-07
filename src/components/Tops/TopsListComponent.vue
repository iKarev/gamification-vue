<template>
  <div>
    <v-container v-if="!tops.length">
      <p class="m_0">Ни одного топа не запланировано. Думаю, пора это сделать!</p>
    </v-container>
    <v-list v-if="tops.length">
      <v-list-tile style="height: 74px;" class="list-tile"
        v-for="(top, i) in tops" v-bind:key="i" @click="doSmthg">
        <v-layout row>
          <div style="width: 50px; margin-top: 14px;">
            <icon color="rgb(156, 39, 176)" scale="2.7" v-if="top.type === 0" name="crosshairs"></icon>
            <icon color="rgb(255, 82, 82)" scale="2.3" v-else-if="top.type === 1" name="exclamation-circle"></icon>
            <icon color="rgb(255, 215, 45)" scale="2" v-else-if="top.type === 2" name="hourglass-half"></icon>
            <icon color="rgb(25, 118, 210)" scale="2" v-else-if="top.type === 3" name="eye"></icon>
            <icon color="rgb(76, 175, 80)" scale="2" v-else-if="top.type === 4" name="birthday-cake"></icon>
          </div>
          <v-flex xs9>
            <game-tops-editing :top="top" :targets="targets" :index="i" v-if="top.edit === true || !top._id">
            </game-tops-editing>
            <game-top-row :top="top" class="w_100" v-if="top.edit !== true && top._id"
              :class="{'red--text': top.done === false, 'green--text': top.done === true}">
            </game-top-row>
          </v-flex>
          <v-flex class="layout row" xs2 style="align-items: center;">
            <div v-if="top._id">
              <v-btn fab dark ripple small color="success"
                @click="onMarkTopDone(top, true)"><icon name="check"></icon></v-btn>
              <v-btn fab dark ripple small color="error"
                @click="onMarkTopDone(top, false)"><icon name="times"></icon></v-btn>
            </div>
            <v-btn fab ripple small color="primary" v-if="top.edit !== true && top._id"
              @click="onEditTop(top, true)"><v-icon dark>create</v-icon></v-btn>
            <v-btn fab ripple small color="normal" v-if="top.edit === true && top._id"
              @click="onEditTop(top, false)"><icon name="times"></icon></v-btn>
            <!-- <v-btn fab dark ripple small color="error"
              @click="onDeleteTop(top._id)"><v-icon dark>remove</v-icon></v-btn> -->
          </v-flex>
        </v-layout>
      </v-list-tile>
      <v-list-tile class="disp-n">
        <v-layout row>
          <v-flex xs10>
            <game-tops-editing :top="newTop"></game-tops-editing>
          </v-flex>
          <v-flex xs2>
          </v-flex>
        </v-layout>
      </v-list-tile>
    </v-list>
  </div>
</template>


<script>
import TopEdit from './TopEditComponent.vue'
import TopRow from './TopRowComponent.vue'
export default {
  name: 'TopsList',
  components: {
    'game-tops-editing': TopEdit,
    'game-top-row': TopRow
  },
  created () {
    const {date, periodType} = this.$route.params
    const query = { date, periodType }
    this.$store.dispatch('getTopsFromServer', query)
  },
  methods: {
    onDeleteTop (topId) {
      this.$store.dispatch('deleteTop', topId)
    },
    onEditTop (top, type) {
      top.edit = type
      this.$store.commit('changeTop', top._id, {edit: type})
    },
    onMarkTopDone (top, done) {
      top.done = done
      this.$store.dispatch('updateTop', top)
    },
    doSmthg () {}
  },
  computed: {
    tops () {
      return this.$store.getters.tops
    },
    targets () {
      if (this.$route.params.periodType === '4') {
        const targets = {}
        let storedTargets = this.$store.getters.targets.slice()
        let i = 0
        while (i < storedTargets.length) {
          const item = storedTargets[i]
          if (item.type === 3) {
            targets[item._id] = {...item}
            targets[item._id].children = []
            storedTargets.splice(i, 1)
          } else i++
        }
        storedTargets.forEach((item) => {
          if (targets[item.parentTargetId]) {
            targets[item.parentTargetId].children.push(item)
          }
        })
        storedTargets = []
        for (let i in targets) {
          const target = targets[i]
          storedTargets.push({ divider: true })
          if (target.children.length) {
            storedTargets.push(targets[i])
            target.children.forEach((item) => {
              storedTargets.push({...item})
            })
            delete target.children
          } else {
            storedTargets.push(target)
            delete target.children
          }
        }
        return storedTargets
      } else {
        return this.$store.getters.targets
      }
    }
  },
  data () {
    return {
      newTop: {
        name: '',
        price: '',
        target: null,
        description: ''
      }
    }
  }
}
</script>
