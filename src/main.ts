import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueKeepScrollPosition from 'vue-keep-scroll-position'
Vue.use(VueKeepScrollPosition)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
