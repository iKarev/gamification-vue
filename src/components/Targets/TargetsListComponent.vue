<template>
  <div>
    <v-container>
      <p v-if="!targets.length" class="m_0">Дочерних целей пока нет. Самое время создать одну или две!</p>
      <v-list class="pb_16">
        <v-list-tile style="height: 74px;" class="list-tile"
          v-for="(target, i) in targets" v-bind:key="i" @click="doSmthg">
          <v-layout row>
            <v-flex xs10>
              <game-targets-editing :target="target" v-if="target.edit === true"></game-targets-editing>
              <game-targets-row :target="target" v-if="target.edit !== true"
                @openTarget="onOpenTarget($event)"></game-targets-row>
            </v-flex>
            <v-flex class="layout row" xs2 style="align-items: center;">
              <v-btn fab ripple small color="primary"
                @click="onEditTarget(target, true)" v-if="target.edit !== true"><v-icon dark>create</v-icon></v-btn>
              <v-btn fab ripple small color="default"
                @click="onEditTarget(target, false)" v-if="target.edit === true"><icon name="times"></icon></v-btn>
              <v-btn fab ripple small color="error" @click="onDeleteTarget(target._id)"><v-icon dark>remove</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </v-list-tile>
        <v-list-tile>
          <v-layout row>
            <v-flex xs10>
              <game-targets-editing :parentTarget="parentTarget" :target="newTarget"></game-targets-editing>
            </v-flex>
            <v-flex xs2>
            </v-flex>
          </v-layout>
        </v-list-tile>
      </v-list>
    </v-container>
  </div>
</template>


<script>
import TargetsEditing from './TargetsEditingComponent.vue'
import TargetsRow from './TargetsRowComponent.vue'
export default {
  props: ['parentTarget', 'listDownloaded'],
  name: 'TargetsList',
  data () {
    return {
      newTarget: {
        name: '',
        deadline: '',
        description: '',
        edit: false
      }
    }
  },
  components: {
    'game-targets-editing': TargetsEditing,
    'game-targets-row': TargetsRow
  },
  created () {
    if (this.$store.getters.targets.length < 1) {
      this.$store.dispatch('getTargetsFromServer', this.getQuery(this.parentTarget))
    }
  },
  watch: {
    parentTarget (next, prev) {
      this.$store.dispatch('getTargetsFromServer', this.getQuery(next))
    }
  },
  methods: {
    getQuery (parentTarget) {
      const query = {}
      if (parentTarget._id) query.parentTargetId = parentTarget._id
      else query.type = 1
      return query
    },
    onDeleteTarget (targetId) {
      this.$store.dispatch('deleteTarget', targetId)
    },
    onOpenTarget (target) {
      this.$emit('listShow', false)
      this.$router.push({path: `/targets/${target._id}`})
      this.$store.dispatch('getTargetFromServer', target._id)
    },
    onEditTarget (target, type) {
      target.edit = type
      this.$store.commit('changeTarget', target._id, {edit: type})
    },
    doSmthg () {}
  },
  computed: {
    targets () {
      this.$emit('listShow', true)
      return this.$store.getters.targets
    }
  }
}
</script>
