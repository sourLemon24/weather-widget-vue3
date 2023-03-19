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


const linkNode = document.createElement('link');
linkNode.rel = 'stylesheet';
linkNode.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
document.head.appendChild(linkNode);


const siteWidth = 400 * 1.25;
const scale = screen.width /siteWidth
const meta = document.createElement('meta')
meta.name = 'viewport'
meta.content = `width=1280, initial-scale=1`
document.head.prepend(meta)
document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'')


</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
</style>
