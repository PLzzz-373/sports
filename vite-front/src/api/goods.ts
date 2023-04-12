import request from "@/utils/request";
import type { goodsPostData } from "./types/goods";
import type { goodslist } from "./types/goods";
import type { goodsBuyData } from "./types/goods";
export const getGoods = (params: goodslist) => {
  return request({
    method: "get",
    url: "/goods",
    params,
  });
};

export const getRoles = (id: number) => {
  return request({
    method: "get",
    url: `/goods/${id}/edit`,
  }).then((data) => {
    const obj: Record<string, any> = {};
    data.data.forEach((item: any) => {
      obj["供应商编号"] = item.供应商编号;
      obj["品牌"] = item.品牌;
      obj["公司地址"] = item.公司地址;
      obj["公司电话"] = item.公司电话;
      obj["公司联系人"] = item.公司联系人;
      obj["商品编号"] = item.商品编号;
      obj["商品名称"] = item.商品名称;
      obj["出厂年份"] = item.出厂年份;
      obj["价格"] = item.价格;
    });
    return obj as goodsPostData;
  });
};

export const getBuylist = (id: number) => {
  return request({
    method: "get",
    url: `/goods/${id}/edit`,
  }).then((data) => {
    const obj: Record<string, any> = {};
    data.data.forEach((item: any) => {
      obj["商品编号"] = item.商品编号;
      obj["订单编号"] = Date.now();
      obj["商品名称"] = item.商品名称;
      obj["收款"] = item.价格;
      obj["品牌"] = item.品牌;
      obj["收货人"] = item.收货人;
      obj["收货地址"] = item.收货地址;
      obj["价格"] = item.价格;
      obj["电话号码"] = item.电话号码;
    });
    return obj as goodsBuyData;
  });
};
export const createGoods = (data: goodsPostData) => {
  return request({
    method: "POST",
    url: "/goods/admin",
    data,
  });
};

export const updateGoods = (id: number, data: goodsPostData) => {
  return request({
    method: "PUT",
    url: `/goods/admin/${id}`,
    data,
  });
};

export const deleteGoods = (id: number) => {
  return request({
    method: "DELETE",
    url: `/goods/admin/${id}`,
  });
};
