<template>
  <v-layout class="align-center flex justify-center refresh" :style="{height: height}">
    <div>
      <icon name="refresh" spin scale="3" color="#1976D2"></icon>
    </div>
  </v-layout>
</template>

<script>
export default {
  props: ['margin'],
  name: 'Refresh',
  computed: {
    height () {
      return this.margin ? `calc(100% - ${this.margin}px)` : '100%'
    }
  }
}
</script>

