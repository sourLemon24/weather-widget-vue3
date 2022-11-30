<template>
  <div class="nav-buttons-wrapper">
    <span
      v-for="(navChar, index) in navChars"
      @click="emit('changeDataIndex', index)"
      :key="index"
      :class="'nav-char ' + (currentDataIndex === index ? 'active' : '')"
    > {{ navChar }} </span>
  </div>
</template>

<script>
export default {
  name: 'navButtons',
}
</script>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  navChars: {
    type: Array,
    default: () => [],
  },
  currentDataIndex: {
    type: Number,
    default: 0,
  }
})
const emit = defineEmits([
  'changeDataIndex'
])
</script>

<style scoped>
.nav-buttons-wrapper {
  display: relative;
}
.nav-char {
  cursor: pointer;
  font-size: 0.6em;
  padding-left: 3px;
}
.active {
  font-weight: bold;
}
</style>