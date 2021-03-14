import { App } from "./app.js"
import { Model } from "./model"
const root = document.body

if (module.hot) {
  module.hot.accept()
}

m.mount(root, App(Model))
