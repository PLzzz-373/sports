export interface Admin {
  id: number;
  nickname: string;
  username: string;
}
export interface AdminPostData {
  ID: number;
  username: string;
  passwd: string;
  nickname: string;
  position: string;
  token: string;
}

export interface Adminlist {
  page: number;
  limit: number;
}
