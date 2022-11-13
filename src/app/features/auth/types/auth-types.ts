export interface AuthResponceInterface {
  user: {
    username: string;
    password: string;
    _id: string;
    __v?: number;
  },
  jwt_token: string
}
export interface AuthRequestInterface {
  username: string;
  password: string;
}
