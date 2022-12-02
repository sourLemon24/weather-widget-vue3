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
        <img src="@/assets/unfold_more_black_24dp.svg"
            class="move-icon"
            :title="index === 0 ? 'drag and drop this icon for changes list order' : ''"
          />
          <span class="item-text">{{ `${item.name}, ${item.sys.country}` }}</span>
        </div>
        <button
          class="delete-button"
          @click="removeLocation(index)"
        >
          <img src="@/assets/delete_black_24dp.svg" class="material-icons delete-icon"/>
        </button>
      </div>
    </div>
    <div class="search-wrapper"> 
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
        <img src="@/assets/search_black_24dp.svg" class="search-icon"/>
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

<style scoped>
.settings {
  position: absolute;
}
.label {
  font-size: 0.8em;
}
.item-wrapper {
  margin-left: 5px;
  display: flex;
  align-items: center;
}
.item-label {
  font-size: 0.8em;
  display: flex;
  align-items: center;
}
.move-icon {
  margin-right: 2px;
  height: 12px;
  cursor: pointer;
}
.item-text {
  max-width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.delete-button {
  background: transparent;
  border: none;
  margin-left: 2px;
  padding: 0px;
}
.delete-icon {
  height: 12px;
  cursor: pointer;
}
.search-wrapper {
  position: absolute;
  display: flex;
  padding-left: 5px;
  bottom: 3px;
}
.search-input {
  background: #ffffff77;
  border: 1px solid;
  border-radius: 5px;
  width: 165px;
}
.search-button {
  display: flex;
  align-items: center;
  margin-left: 3px;
  background: #ffffff77;
  border: none;
  border-radius: 5px;
}
.search-icon {
  height: 12px;
}
.search-button:hover {
  background: #06b0ff99;
  cursor: pointer;
}
.search-button:disabled{
  cursor: not-allowed;
  background: #ffffff99;
}
.search-input:disabled {
  cursor: not-allowed;
}

</style>