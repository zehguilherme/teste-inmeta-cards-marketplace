import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { type PluginOptions } from 'vue-toastification'

import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

import './style.css'

const app = createApp(App)

const vueToastificationOptions: PluginOptions = {
  // You can set your default options here
}

app.use(Toast, vueToastificationOptions)
app.use(createPinia())
app.use(router)

app.mount('#app')
