import request from "@/utils/request";

export type Data = {
  user: string;
  password: string;
};
export const getLogin = (data: Data) => {
  return request({
    method: "post",
    url: "/login",
    data,
  });
};
