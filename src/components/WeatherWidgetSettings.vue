<template>
  <div class="settings">
    <span class="label">settings</span>
    <div  
      v-for="(item, index) in props.list" 
      :key="item.name"
      :draggable="true"
      @dragstart="pickupItem($event, index)"
      @drop.prevent="moveItem($event, index)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="item-wrapper">
        <div class="item-label">
          <span class="material-icons move-icon">unfold_more</span>
          <span class="item-text">{{ `${item.name}, ${item.sys.country}` }}</span>
        </div>
        <button
          class="delete-button"
          @click="removeLocation(index)"
        >
            <span class="material-icons delete-icon">delete</span>
        </button>
      </div>
    </div>
    <div class="search-wrapper"> 
      <input
        @keyup.enter="getSearch"
        v-model="location"
        type="text"
        class="search-input"
        placeholder="Добавьте место"
      >
      <button 
        class="search-button"
        @click="getSearch"
      >
        <span class="material-icons search-icon">search</span>
        <span class="material-icons add-icon">add</span>
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

<style scoped>
.label {
  font-size: 0.8em;
}
.settings {
  position: absolute;
}
.item-wrapper {
  margin-left: 5px;
  display: flex;
  align-items: center;
}
.delete-button {
  background: transparent;
  border: none;
  margin-left: 2px;
  padding: 0px;
}
.delete-icon {
  font-size: 0.8em;
  cursor: pointer;
}
.search-icon, .add-icon {
  font-size: 1em;
  cursor: pointer;
}
.move-icon {
  margin-right: 2px;
  font-size: 1em;
  cursor: pointer;
}
.item-label {
  font-size: 0.8em;
  display: flex;
  align-items: center;
}
.item-text {
  max-width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.search-wrapper {
  position: absolute;
  padding-left: 5px;
  bottom: 3px;
}
.search-button {
  margin-left: 2px;
  background: #ffffff77;
  border: none;
  border-radius: 5px;
}
.search-input {
  background: #ffffff77;
  border: 1px solid;
  border-radius: 5px;
  width: 155px;
}

</style>