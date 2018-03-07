<template>
  <v-form class="w_100" v-model="valid" @submit.prevent ref="doingForm">
    <v-layout row>
      <v-flex xs1 class="pr_8">
        <v-text-field label="Стоимость" type="number" v-model="doing.price"
          style="margin-right: 8px;" required :rules="[v => !!v || 'Укажите стоимость']"></v-text-field>
      </v-flex>
      <v-flex xs4 class="pr_8">
        <v-text-field label="Название" type="text" v-model="doing.name"
          style="margin-right: 8px;" required :rules="[v => !!v || 'Введите название']"></v-text-field>
      </v-flex>
      <v-flex xs1 class="pr_8 layout row justify-space-between">
        <v-select style="margin-right: 8px;"
          v-bind:items="types"
          v-model="doing.type"
          item-text="name"
          label="Тип"
          required :rules="[v => (v !== undefined && v !== null) || 'Определите тип']"></v-select>
      </v-flex>
      <v-flex xs5 class="pr_8">
        <v-text-field label="Описание" type="text" v-model="doing.description"></v-text-field>
      </v-flex>
      <v-flex xs1 class="row layout justify-end align-center">
        <v-btn fab ripple small color="success" :disabled="!valid"
          @click="onSaveDoing"><v-icon>done</v-icon></v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  props: ['doing', 'periodType'],
  name: 'DoingsEditing',
  data () {
    return {
      valid: false,
      types: [
        {name: 'Надо', value: 1},
        {name: 'Нельзя', value: 0}
      ]
    }
  },
  methods: {
    onSaveDoing () {
      this.doing.periodType = this.periodType
      if (this.$refs.doingForm.validate()) {
        if (this.doing._id) {
          this.$store.dispatch('updateDoing', {...this.doing})
          this.doing.edit = false
        } else {
          this.$store.dispatch('saveDoingToServer', {...this.doing})
          this.$refs.doingForm.reset()
        }
      }
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
