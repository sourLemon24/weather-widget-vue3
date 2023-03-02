<template>
  <div class="settings">
    <span class="label">settings</span>
    <div
      class="location-items"  
      v-for="(item, index) in props.list" 
      :key="item.name"
      :draggable="true"
      @dragstart="pickupItem($event, index)"
      @drop.prevent="moveItem($event, index)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="location-item">
        <div class="location-item__label">
          <span 
            class="material-icons location-item__move-icon"
            :title="index === 0 ? 'drag and drop this icon for changes list order' : ''"
          >
            unfold_more
          </span>
          <span class="location-item__text">{{ `${item.name}, ${item.sys.country}` }}</span>
        </div>
        <button
          class="location-item__delete-button"
          @click="removeLocation(index)"
        >
          <span class="material-icons location-item__delete-icon">delete</span>
        </button>
      </div>
    </div>
    <div class="search"> 
      <input
        @keyup.enter="getSearch"
        v-model="location"
        type="text"
        class="search-input"
        :placeholder="loading ? 'loading...' : 'add location'"
        :disabled="loading"
      >
      <button 
        class="search-button"
        @click="getSearch"
        :disabled="loading"
      >
        <span class="material-icons search-icon">search</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherWidgetSettings',
}
</script>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    require: true,
    default: () => []
  },
  currentDataIndex: {
    type: Number,
    default: 0,
  },
  loading: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits([
  'getSearch',
  'removeLocation',
  'moveItem',
])

const location = ref('')
const getSearch = () => {
  emit('getSearch', location.value)
  location.value = ''
}
const removeLocation = (index) => {
  emit('removeLocation', index)
}
const pickupItem = (event, index) => {
  event.dataTransfer.effectAllowed = "move"
  event.dataTransfer.dropAllowed = "move"
  event.dataTransfer.setData('from-index', index)
}
const moveItem = (event, toIndex) => {
  const fromIndex = event.dataTransfer.getData('from-index')
  emit('moveItem', fromIndex, toIndex)
}
</script>

<style lang="sass" scoped>
.settings 
  position: absolute

.label 
  font-size: 0.8em
  display: block
  text-align: center

.location-item
  margin-left: 5px
  display: flex
  align-items: center
  &__label 
    font-size: 0.8em
    display: flex
    align-items: center
  &__text 
    max-width: 150px
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
  &__move-icon 
    margin-right: 2px
    font-size: 1em
    cursor: pointer
  &__delete
    &-button 
      background: transparent
      border: none
      margin-left: 2px
      padding: 0px
    &-icon 
      font-size: 0.8em
      cursor: pointer

.search
  position: absolute
  display: flex
  padding-left: 5px
  bottom: 3px
  &-input 
    padding-left: 5px
    background: #ffffff77
    border: 1px solid
    border-radius: 5px
    width: 165px
    &:disabled
      cursor: not-allowed
  &-button 
    display: flex
    align-items: center
    margin-left: 3px
    background: #ffffff77
    border: none
    border-radius: 5px
    &:hover 
      background: #06b0ff99
      cursor: pointer
    &:disabled
      cursor: not-allowed
      background: #ffffff99
  &-icon 
    font-size: 1em 

</style>