import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./styles/index.scss";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css"; //引入element-plus样式
import { Vue } from "vue-demi";
import { nextTick } from "process";
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(ElementPlus);
app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const whitelist = ["/login"];
router.beforeEach((to, from, next) => {
  if (whitelist.includes(to.path) || localStorage.getItem("token")) {
    next();
  } else {
    next("/login");
  }
});
app.mount("#app");
