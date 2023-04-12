import request from "@/utils/request";
import type { AdminPostData } from "./types/admin";
import type { Adminlist } from "./types/admin";
export const getAdmins = (params: Adminlist) => {
  return request({
    method: "get",
    url: "/settings",
    params,
  });
};

export const getRoles = (id: number) => {
  return request({
    method: "get",
    url: `/settings/${id}/edit`,
  }).then((data) => {
    const obj: Record<string, any> = {};
    data.data.forEach((item: any) => {
      obj["username"] = item.username;
      obj["nickname"] = item.nickname;
      obj["ID"] = item.ID;
    });
    return obj as AdminPostData;
  });
};

export const createAdmin = (data: AdminPostData) => {
  return request({
    method: "POST",
    url: "/settings/admin",
    data,
  });
};

export const updateAdmin = (id: number, data: AdminPostData) => {
  return request({
    method: "PUT",
    url: `/settings/admin/${id}`,
    data,
  });
};

export const deleteAdmin = (id: number) => {
  return request({
    method: "DELETE",
    url: `/setting/admin/${id}`,
  });
};
