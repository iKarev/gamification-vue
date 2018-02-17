<template>
  <v-form v-model="valid" @submit.prevent ref="topForm">
    <v-layout row>
      <v-flex xs12 md1>
        <v-text-field label="Цена" type="text" maxlength="1" v-model="top.price"
          style="margin-right: 8px;" required :rules="[v => !!v || 'Укажите цену']"></v-text-field>
      </v-flex>
      <v-flex xs12 md3 class="pl_8">
        <v-text-field label="Название" type="text" v-model="top.name"
          style="margin-right: 8px;" required :rules="[v => !!v || 'Введите название']"></v-text-field>
      </v-flex>
      <v-flex xs12 md3 class="pl_8">
        <v-select style="margin-right: 8px;"
          v-bind:items="targets"
          v-model="top.target"
          item-text="name"
          label="Выберите цель"
          autocomplete></v-select>
      </v-flex>
      <v-flex xs8 md4 class="pl_8">
        <v-text-field label="Описание" type="text" v-model="top.description"></v-text-field>
      </v-flex>
      <v-flex xs4 md1 class="row layout justify-end align-center">
        <v-btn fab ripple small color="success" :disabled="!valid"
          @click="onSaveTop"><v-icon>done</v-icon></v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  props: ['top', 'index'],
  name: 'TopEdit',
  data () {
    return {
      valid: false,
      targetShadow: null
    }
  },
  computed: {
    targets () {
      return this.$store.getters.targets
    }
  },
  methods: {
    onSaveTop () {
      if (this.$refs.topForm.validate()) {
        this.top.periodType = this.$route.params.periodType
        this.top.date = this.$route.params.date
        if (this.top._id) {
          this.top.edit = false
          this.$store.dispatch('updateTop', {...this.top})
        } else {
          this.top.index = this.index
          this.$store.dispatch('saveTopToServer', {...this.top})
          this.top.edit = false
          // this.$refs.topForm.reset()
        }
      }
    }
  }
}
</script>
