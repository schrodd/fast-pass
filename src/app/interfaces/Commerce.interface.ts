import { Table } from "./Tables.interface";

export interface Commerce {
  _id: string;
  name: string;
  description: string;
  openHours: string;
  phoneNumber: string;
  address: string;
  tables: Table[];
  user: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
