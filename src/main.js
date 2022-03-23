import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
console.log("main.js process", process.env);
import Winput from '@/components/w-input'
import Wselect from '@/components/w-select'
Vue.component('w-input',Winput)
Vue.component('w-select',Wselect)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
