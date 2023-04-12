import request from "@/utils/request";
import type { OrderPostData } from "./types/orderlist";
import type { Orderlist } from "./types/orderlist";
export const getOrderlist = (params: Orderlist) => {
  return request({
    method: "get",
    url: "/order",
    params,
  });
};
export const createOrderlist = (data: OrderPostData) => {
  return request({
    method: "POST",
    url: "/order/admin",
    data,
  });
};

export const updateOrderlist = (id: number, data: OrderPostData) => {
  return request({
    method: "PUT",
    url: `/order/admin/${id}`,
    data,
  });
};

export const deleteOrderlist = (id: number) => {
  return request({
    method: "DELETE",
    url: `/order/${id}`,
  });
};
export const getRoles = (id: number) => {
  return request({
    method: "get",
    url: `/order/${id}/edit`,
  }).then((data) => {
    const obj: Record<string, any> = {};
    data.data.forEach((item: any) => {
      obj["订单编号"] = item.订单编号;
      obj["商品名称"] = item.商品名称;
      obj["收款"] = item.收款;
      obj["品牌"] = item.品牌;
      obj["收货人"] = item.收货人;
      obj["收货地址"] = item.收货地址;
    });
    return obj as OrderPostData;
  });
};
