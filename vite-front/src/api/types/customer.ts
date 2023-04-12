export interface Customer {
  客户编号: number;
  客户姓名: string;
  性别: string;
  电话号码: string;
  总消费: number;
  星级: string;
}
export interface CustomerPostData {
  客户编号: number;
  客户姓名: string;
  性别: string;
  电话号码: string;
  总消费: number;
  星级: string;
}

export interface Customerlist {
  page: number;
  limit: number;
}
