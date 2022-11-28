<template>
  <div class="widget-wrapper">    
    <div class="buttons">
      <button 
        class="setting-button"
        @click="toggleShowSettings">
          <span class="material-icons settings-icon">{{ `${isShowSettings ? 'close' : 'settings'}` }}</span>
      </button>    
      <button
        v-if="!isShowSettings"
        class="right-button"
        :disabled="list.length === 1"
        @click="switchData()">
          <span class="material-icons settings-icon">keyboard_arrow_right</span>
      </button>
    </div>
    <main-info
      :class="'main-info' + (isShowSettings ? ' blur' : '')"
      v-if="list.length"
      :weatherData="list[currentDataIndex]"
      :time="time"
    />
    <div 
      :class="'loading' + (isShowSettings ? ' blur' : '')"
      v-else
    > Загрузка... </div>
    <div class="additional-info"></div>    
    <weather-widget-settings
      class="settings-menu"
      v-if="isShowSettings"
      @getSearch="getWeatherBySearch"
      @removeLocation="removeLocationFromList"
      @moveItem="moveItemsInList"
      :list="list"
    />
  </div>
</template>

<script>
export default {
  components: { MainInfo },
  name: 'WeatherWidget',
}
</script>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import WeatherWidgetSettings from './WeatherWidgetSettings.vue'
import MainInfo from './MainInfo.vue'
import axios from 'axios'

const apiKey = 'c8db109bab94f6320274de2ebafa76fb'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

const isShowSettings = ref(false)
const toggleShowSettings = () => {
  isShowSettings.value = !isShowSettings.value
}

const currentDataIndex = ref(0)
const switchData = () => {
  if (currentDataIndex.value >= list.value.length - 1) {
    currentDataIndex.value = 0
  } else {
    currentDataIndex.value++
  }
  updateTime()
}

const updateTime = () => {
  if (list.value?.[currentDataIndex.value]) {
  let date = new Date()
  date.setHours(date.getUTCHours() + list.value?.[currentDataIndex.value]?.timezone / 3600)
  time.value = new Intl.DateTimeFormat('ru-RU',{hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(date)
  }
}

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
    const resp = await axios(`${ apiUrl }?q=${ v }&appid=${ apiKey }&units=metric`)
    if (resp?.data) {
      if (list.value.length > 2) {
        list.value.length = 2
      }
      list.value.push(resp.data)
    }
  } catch {
    alert('Город не найден')
  }
}

const fetchWeather = (v) => axios(`${ apiUrl }?q=${ v }&appid=${ apiKey }&units=metric`)
const updateWeather = async () => {
    const storageOrder = JSON.parse(localStorage.getItem('weatherList'))
    let requests = storageOrder.map(i => fetchWeather(i))
    const responses = await Promise.all(requests)
    responses.forEach(resp => {
      const index = list.value.findIndex(i => i.name === resp.data.name)
      if (index > -1) {
        list.value.splice(index, 1)
      }
      list.value.push(resp.data)
    })
}

const time = ref('')
const timer = setInterval(() => {
  updateTime()
}, 1000)

const updTimer = setInterval(async () => {
  updateWeather()
}, 5 * 60 * 1000)

onMounted(async () => {
  if (!JSON.parse(localStorage.getItem('weatherList'))?.length) {
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
    localStorage.setItem('weatherList', JSON.stringify(newV.map(i => i.name))) 
  },
  { deep: true }
)

const getWeatherByCoords = async () => {
  const resp = await axios(`${ apiUrl }?lat=${ lat.value }&lon=${ lon.value }&appid=${ apiKey }&units=metric`)
  if (resp?.data) {
    list.value.push(resp.data)
  }
}

const removeLocationFromList = (index) => {
  list.value.splice(index, 1)
}
const moveItemsInList = (fromIndex, toIndex) => {
  const newList = JSON.parse(JSON.stringify(list.value))
  const locationToMove = newList.splice(fromIndex, 1)
  newList.splice(toIndex, 0, ...locationToMove)
  list.value = newList
}
</script>

<style scoped>
.widget-wrapper {
  position: relative;
  border-radius: 10px;
  background-color: #82c7e7;
  width: 210px;
  height: 108px;
}
.buttons {
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0px;
  top: 0px;
}
.setting-button, .right-button {
  position: relative;
  z-index: 1;
  border-width: 1px;
  border-radius: 5px;
  background-color: inherit;
  border: none;
  border-top-right-radius: 10px;
}
.right-button {
  border-top-right-radius: 5px;
}
.right-button:disabled {
  cursor: not-allowed;
}
.setting-button:hover, .right-button:hover {
  background-color: #06b0ff57;
  cursor: pointer;
}
.settings-icon {
  font-size: 1.4em;
  color: #06b0ff99
}
.settings-menu {
  position: absolute;
  top: 0px;
  left: 0px;
  width: inherit;
  height: inherit;
  background-color: #1befd310;
  border-radius: 10px;
}
.loading {
  padding-top: 40px
}
.main-info {
  width: inherit;
  height: inherit;
  overflow: hidden;
}
.blur {
  filter: blur(4px)
}
</style>
