import { App, Component } from 'vue'
import * as components from './components'

function install(app: App): void {
  const componentsMap = components as Record<string, Component>

  for (const key in componentsMap) {
    app.component(key, componentsMap[key])
  }
}

import './assets/main.scss'

export default { install }

export * from './components'
export * from './constants'
export * from './utils'
