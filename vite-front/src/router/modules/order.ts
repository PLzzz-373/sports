import { RouteRecordRaw, RouterView } from "vue-router";

const routes: RouteRecordRaw = {
  path: "order",
  component: RouterView,
  meta: {
    title: "订单管理",
  },
  children: [
    {
      path: "order_list",
      name: "order-list",
      component: () => import("@/views/order/list/index.vue"),
      meta: {
        title: "订单信息",
      },
    },
    {
      path: "order_customer",
      name: "order-customer",
      component: () => import("@/views/order/customer/index.vue"),
      meta: {
        title: "客户信息",
      },
    },
  ],
};

export default routes;
