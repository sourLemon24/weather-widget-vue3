<template>
  <div
    v-if="Object.keys(weatherData).length"
    class="main-info-wrapper"
  >
    <div class="location">
      {{ `${weatherData.name}, ${weatherData.sys.country}` }}
    </div>
    <div class="time">
      {{ time }}
    </div>
    <div class="temp">
      {{ `${weatherData.main.temp.toFixed(1)}°С` }}
    </div>
    <div class="feels-like">
      {{ `feels like: ${weatherData.main.feels_like.toFixed(1)}°С` }}
    </div>
    <img
      class="icon"
      :src="`https://openweathermap.org/img/wn/${ weatherData.weather[0].icon }@2x.png`" 
    />
    <div class="indicators">
      {{ `${weatherData.weather[0].description}, humidity: ${weatherData.main.humidity}%, pressure: ${weatherData.main.pressure}hPa` }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainInfo',
}
</script>

<script setup>
import { defineProps } from 'vue'

defineProps({
  weatherData: {
    type: Object,
    default: () => ({})
  },
  time: {
    type: String,
    default: ''
  }
})

</script>
<style scoped>
.main-info-wrapper {
  position: relative;
  padding-top: 5px
}
.location, .temp, .feels-like, .time {
  text-align: left;
  padding-left: 5px;
}
.location {
  position: relative;
  z-index: 3;
  font-weight: bold;
  max-width: 180px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.temp {
  margin-top: 3px;
}
.feels-like {
  margin-top: 1px;
  font-size: 0.8em;
}
.time {
  font-size: 0.6em;
}
.icon {
  position: absolute;
  right: 30px;
  top: 0px;
  width: 70px;
}

.indicators {
  max-height: 32px;
  position: absolute;
  bottom: 18px;
  padding-top: 3px;
  font-size: 0.8em;
  overflow: auto;
  background-color: #ffffff99;
  scrollbar-color: #25386199 #ffffff99;
  scrollbar-width: 1px;
  text-align: center;
}
.indicators::-webkit-scrollbar {
    width: 1px;
    height: 1px;
    background-color: #ffffff99;
}
.indicators::-webkit-scrollbar-thumb {
    background-color: #25386199;
}
.indicators::-webkit-scrollbar-thumb:hover {
    background-color: #25386199;
}
</style>