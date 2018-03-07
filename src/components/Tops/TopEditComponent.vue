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
        <v-select style="margin-right: 8px;" :clearable="top.type !== 0 && top.type !== 3"
          v-bind:items="targets"
          v-model="top.target"
          item-text="name"
          label="Выберите цель"
          autocomplete>
          <template slot="item" slot-scope="data">
            <template v-if="periodType !== '4' || data.item.type === 3">
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <!-- <v-list-tile-sub-title v-text="'Краткосрочная цель'"></v-list-tile-sub-title> -->
              </v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content class="layout row align-center">
                <icon name="long-arrow-right" color="grey"></icon>
                <v-list-tile-title v-html="data.item.name" class="ml-2"></v-list-tile-title>
                <!-- <v-list-tile-sub-title v-text="'Ближайшая цель'"></v-list-tile-sub-title> -->
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
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
  props: ['top', 'index', 'targets'],
  name: 'TopEdit',
  data () {
    return {
      valid: false,
      targetShadow: null
    }
  },
  computed: {
    periodType () {
      return this.$route.params.periodType
    }
  },
  methods: {
    onSaveTop () {
      if (this.$refs.topForm.validate()) {
        this.top.periodType = this.periodType
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
