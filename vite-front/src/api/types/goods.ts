import { SrvRecord } from "dns";

export interface goods {
  商品编号: number;
  商品名称: string;
  出厂年份: number;
  价格: number;
  供应商编号: number;
  公司名称: string;
  公司地址: string;
  公司电话: string;
  公司联系人: string;
}
export interface goodsPostData {
  商品编号: number;
  商品名称: string;
  出厂年份: number;
  价格: number;
  供应商编号: number;
  品牌: string;
  公司地址: string;
  公司电话: string;
  公司联系人: string;
}

export interface goodsBuyData {
  商品编号: number;
  订单编号: number;
  商品名称: string;
  收款: number;
  价格: number;
  品牌: string;
  收货人: string;
  收货地址: string;
  电话号码: string;
}
export interface goodslist {
  page: number;
  limit: number;
}
