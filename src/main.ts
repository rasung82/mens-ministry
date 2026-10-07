import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './style.css'
import { applySeason } from './utils/season'

applySeason()

createApp(App).use(router).mount('#app')
