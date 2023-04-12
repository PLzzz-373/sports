import { RouteRecordRaw, RouterView } from "vue-router";

const routes: RouteRecordRaw = {
  path: "product",
  component: RouterView,
  meta: {
    title: "商品管理",
  },
  children: [
    {
      path: "product_list",
      name: "product-list",
      component: () => import("@/views/product/list/index.vue"),
      meta: {
        title: "用品列表",
      },
    },
  ],
};

export default routes;
