import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { globalRegister } from './global'

//引入mockjs
import './mock'
// 导入主题css变量
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(globalRegister)
app.mount('#app')
