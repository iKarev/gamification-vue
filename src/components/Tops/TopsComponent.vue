<template>
  <game-tops-list></game-tops-list>
</template>

<script>
import List from './TopsListComponent.vue'
export default {
  name: 'Tops',
  components: {
    'game-tops-list': List
  }
}
</script>
