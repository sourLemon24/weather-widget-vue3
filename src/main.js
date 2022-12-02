import { defineAsyncComponent } from 'vue'
import { defineCustomElement } from './defineCustomElementWithStyles'
import App from './App.vue'

customElements.define(
  'weather-widget',
  defineCustomElement(App, {
    globalComponents: {
      WeatherWidget: defineAsyncComponent(() => import('@/components/WeatherWidget.vue')),
    },
  })
)