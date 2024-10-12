import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { message } from 'main-modules.js';
console.log('a -->', message)

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
