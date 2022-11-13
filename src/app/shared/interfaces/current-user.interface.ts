export interface CurrentUser {
  username: string;
  password: string;
  accessToken?: string;
  id: string;
}
export interface User {
  _id: string;
  username: string;
  password: string;
  __v: number;
}
