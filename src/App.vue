<template>
  <weather-widget/>
</template>

<script>
export default {
  components: { WeatherWidget },
  name: 'App',
}
</script>

<script setup>
import WeatherWidget from './components/WeatherWidget.vue'

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
