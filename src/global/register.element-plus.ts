//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { App } from 'vue'

//引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'

export default function (app: App) {
  app.use(ElementPlus, {
    locale: zhCn
  })
}
