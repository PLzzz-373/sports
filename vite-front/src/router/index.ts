import { def } from "@vue/shared";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import appLayout from "@/layout/appLayout.vue";
import productRouter from "./modules/product";
import orderRouter from "./modules/order";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: appLayout,
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/home/index.vue"),
      },
      {
        path: "/settings",
        name: "settings",
        meta: {
          title: "设置",
        },
        component: () => import("../views/settings/index.vue"),
      },
      productRouter,
      orderRouter,
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
