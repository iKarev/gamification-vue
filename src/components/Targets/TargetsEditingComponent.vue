<template>
  <v-form class="w_100" v-model="valid" @submit.prevent ref="targetForm">
    <v-layout row>
      <v-flex xs3 class="pr_8">
        <v-text-field label="Название" type="text" v-model="target.name"
          style="margin-right: 8px;" required :rules="[v => !!v || 'Введите название']"></v-text-field>
      </v-flex>
      <v-flex xs3 class="pr_8 layout row justify-space-between">
        <v-flex xs10>
          <v-text-field label="Название" type="text" v-model="target.deadline" class="disp-n"
            style="margin-right: 8px;" required :rules="[v => !!v || 'Укажите крайний срок']"></v-text-field>
          <datepicker style="top: 18px;" ref="programaticOpen" placeholder="Крайний срок"
            v-model="target.deadline" @selected="onDateSelected($event)" :format="'dd.MM.yyyy'"></datepicker>
        </v-flex>
        <v-flex xs2 style="min-width: 36px; margin: 0 auto;" class="justify-end layout row">
          <v-btn class="mt_16" @click="openPicker" flat icon color="indigo"><icon name="calendar"></icon></v-btn>
        </v-flex>
      </v-flex>
      <v-flex xs5 class="pr_8">
        <v-text-field label="Описание" type="text" v-model="target.description"></v-text-field>
      </v-flex>
      <v-flex xs1 class="row layout justify-end align-center">
        <v-btn fab ripple small color="success" :disabled="!valid || target.deadline.valid"
          @click="onSaveTarget"><v-icon>done</v-icon></v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  props: ['target', 'parentTarget'],
  name: 'TargetsEditing',
  components: {
    Datepicker
  },
  data () {
    return {
      valid: false
    }
  },
  methods: {
    onSaveTarget () {
      if (this.$refs.targetForm.validate()) {
        if (this.target._id) {
          this.$store.dispatch('updateTarget', {...this.target})
          this.target.edit = false
        } else {
          if (this.parentTarget) {
            this.target.type = this.parentTarget.type ? this.parentTarget.type + 1 : 1
            this.target.parentTargetId = this.parentTarget ? this.parentTarget._id : null
          }
          this.$store.dispatch('saveTargetToServer', {...this.target})
          this.$refs.targetForm.reset()
          this.target.deadline = ''
        }
      }
    },
    openPicker () {
      this.$refs.programaticOpen.showCalendar()
    },
    onDateSelected (deadline) {
      const nd = new Date()
      if (deadline < new Date(nd.getFullYear(), nd.getMonth(), nd.getDate())) {}
    }
  }
}
</script>

<style lang="scss">
.vdp-datepicker {
  & div:nth-child(1) {
    &:after{ content: ''; background-color: rgba(0,0,0,.42); top: 30px; height: 1px; width: 100%; z-index: 0; position: absolute; left: 0; }
  }
  & input { color: rgba(0,0,0,.87); border-bottom: 1px solid rgba(0, 0, 0, 0.87); box-shadow: none; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; height: 30px; margin: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; border-style: none; }
}
</style>
