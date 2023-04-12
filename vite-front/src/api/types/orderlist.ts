export interface OrderPostData {
  订单编号: number;
  商品名称: string;
  收款: number;
  品牌: string;
  收货人: string;
  收货地址: string;
}

export interface Orderlist {
  page: number;
  limit: number;
}
export interface Order {
  订单编号: number;
  商品名称: string;
  收款: string;
  品牌: string;
  收货人: string;
  收货地址: string;
}
