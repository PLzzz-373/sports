import request from "@/utils/request";
import type { CustomerPostData } from "./types/customer";
import type { Customerlist } from "./types/customer";
export const getCustomer = (params: Customerlist) => {
  return request({
    method: "get",
    url: "/customer",
    params,
  });
};

export const getRoles = (id: number) => {
  return request({
    method: "get",
    url: `/customer/${id}/edit`,
  }).then((data) => {
    const obj: Record<string, any> = {};
    data.data.forEach((item: any) => {
      obj["客户编号"] = item.客户编号;
      obj["客户姓名"] = item.客户姓名;
      obj["性别"] = item.性别;
      obj["电话号码"] = item.电话号码;
      obj["总消费"] = item.总消费;
      obj["星级"] = item.星级;
    });
    return obj as CustomerPostData;
  });
};

export const createCustomer = (data: CustomerPostData) => {
  return request({
    method: "POST",
    url: "/customer/admin",
    data,
  });
};

export const updateCustomer = (id: number, data: CustomerPostData) => {
  return request({
    method: "PUT",
    url: `/customer/admin/${id}`,
    data,
  });
};

export const deleteCustomer = (id: number) => {
  return request({
    method: "DELETE",
    url: `/customer/admin/${id}`,
  });
};
