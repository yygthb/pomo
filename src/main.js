import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './config/i18n'
import './assets/styles/main.scss'

const app = createApp(App)

app.use(i18n)
app.mount('#app')
