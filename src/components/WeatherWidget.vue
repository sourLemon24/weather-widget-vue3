<template>
  <div class="widget-wrapper">
    <main-info
      :class="'main-info' + (isShowSettings ? ' blur' : '')"
      v-if="list.length"
      :weatherData="list[currentDataIndex]"
      :time="time"
    />
    <div 
      :class="'loading' + (isShowSettings ? ' blur' : '')"
      v-else
    > 
      <span v-if="loading">
        Loading...
      </span> 
      <br>
      <span v-if="!locationsListFromStorage.length || (!loading && !list.length)">
        Add location in settings
      </span>
    </div>    
    <button 
      class="setting-button"
      @click="toggleShowSettings"
    >
      <span class="material-icons settings-icon">{{ `${isShowSettings ? 'close' : 'settings'}` }}</span>
    </button>
    <settings
      class="settings-menu"
      v-if="isShowSettings"
      @getSearch="getWeatherBySearch"
      @removeLocation="removeLocationFromList"
      @moveItem="moveItemsInList"
      :list="list"
      :currentDataIndex="currentDataIndex"
      :loading="loading"
    />
    <nav-buttons
      :class="'nav-buttons' + (isShowSettings ? ' blur' : '')"
      :navChars="navChars"
      :currentDataIndex="currentDataIndex"
      @changeDataIndex="switchData($event)"
    />
  </div>
</template>

<script>
export default {
  components: { MainInfo, NavButtons },
  name: 'WeatherWidget',
}
</script>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Settings from './Settings.vue'
import MainInfo from './MainInfo.vue'
import api from '@/api'
import constants from '@/constants'
import NavButtons from './NavButtons.vue'

const locationsListFromStorage = ref(JSON.parse(localStorage.getItem(constants.localStorageKey)) || [])
const loading = ref(false)

const isShowSettings = ref(false)
const toggleShowSettings = () => {
  isShowSettings.value = !isShowSettings.value
}

const currentDataIndex = ref(0)
const switchData = (index) => {
  currentDataIndex.value = index
  updateTime()
}
const navChars = computed(() => list.value.map(i => i.name.slice(0, 3).toUpperCase()))

const lat = ref(null)
const lon = ref(null)
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(position => {
    lat.value = position.coords.latitude
    lon.value = position.coords.longitude
    getWeatherByCoords()
  })
}

const getWeatherBySearch = async (v) => {
  try {
    loading.value = true
    const resp = await api.getWeatherByLocationName(v)
    loading.value = false
    if (resp?.data) {
      if (list.value.map(i => i.name).includes(resp.data.name)) {
        alert('such location already in the list')
      } else {
        list.value.push(resp.data)
      }
      if (list.value.length > 5) {
        alert('maximum locations count: 5')
        list.value.length = 5
      }
    }
  } catch {
    alert('location not found')
    loading.value = false
  }
}

const updateWeather = async () => {
    let requests = locationsListFromStorage.value.map(i => api.getWeatherByLocationName(i))
    loading.value = true
    const responses = await Promise.all(requests)
    loading.value = false
    responses.forEach(resp => {
      const index = list.value.findIndex(i => i.name === resp.data.name)
      if (index > -1) {
        list.value.splice(index, 1)
      }
      list.value.push(resp.data)
    })
}

const time = ref('')
const updateTime = () => {
  if (list.value?.[currentDataIndex.value]) {
    let date = new Date()
    date.setHours(date.getUTCHours() + list.value?.[currentDataIndex.value]?.timezone / 3600)
    time.value = new Intl.DateTimeFormat('ru-RU',{hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(date)
  }
}

const timer = setInterval(() => {
  updateTime()
}, 1000)

const updTimer = setInterval(async () => {
  updateWeather()
}, 5 * 60 * 1000)

onMounted(async () => {
  if (!locationsListFromStorage.value?.length) {
    getLocation()
  } else {
    updateWeather()
  }
})

onBeforeUnmount(() => {
  clearInterval(updTimer)
  clearInterval(timer)
})

const list = ref([])
watch(
  list,
  (newV, oldV) => {
    localStorage.setItem(constants.localStorageKey, JSON.stringify(newV.map(i => i.name))) 
  },
  { deep: true }
)

const getWeatherByCoords = async () => {
  loading.value = true
  const resp = await api.getWeatherByCoords(lat.value, lon.value)
  loading.value = false
  if (resp?.data) {
    list.value.push(resp.data)
  }
}

const removeLocationFromList = (index) => {
  currentDataIndex.value = 0
  list.value.splice(index, 1)
}

const moveItemsInList = (fromIndex, toIndex) => {
  const newList = JSON.parse(JSON.stringify(list.value))
  const locationToMove = newList.splice(fromIndex, 1)
  newList.splice(toIndex, 0, ...locationToMove)
  list.value = newList
  currentDataIndex.value = 0
}
</script>

<style scoped>
.widget-wrapper {
  position: relative;
  border-radius: 10px;
  background-color: #82c7e7;
  width: 210px;
  height: 120px;
}
.loading {
  padding-top: 30px
}
.loading span {
  font-size: 0.7em;
}
.main-info {
  width: inherit;
  height: inherit;
  overflow: hidden;
}
.setting-button {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 2;
  border-width: 1px;
  border-radius: 5px;
  background-color: inherit;
  border: none;
  border-top-right-radius: 10px;
}
.setting-button:hover {
  background-color: #06b0ff57;
  cursor: pointer;
}
.settings-icon {
  font-size: 1.4em;
  color: #06b0ff99
}
.settings-menu {
  z-index: 1;
  position: absolute;
  top: 0px;
  left: 0px;
  width: inherit;
  height: inherit;
  background-color: #1befd310;
  border-radius: 10px;
}
.blur {
  filter: blur(4px)
}
.nav-buttons {
  width: 100%;
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: center;
}
</style>
