import { IReceipt } from "./componenets/OrderSuccess/Reciept";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "admin" | "customer";
}

export interface Order extends IReceipt {
  isSent: boolean;
}
