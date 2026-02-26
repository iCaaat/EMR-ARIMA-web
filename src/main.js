// css
import './assets/css/global.css'
import './assets/css/common-page.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// element-plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createPinia} from "pinia";
// pinia
const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})

// 将 Element Plus 图标组件注册为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
