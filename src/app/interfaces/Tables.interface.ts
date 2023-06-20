export interface Table {
  _id: string;
  owner: string;
  safetyCode: string;
  tableNumber: number;
  status: string;
  hidden: boolean;
  products: unknown[];
  createdAt: string;
  updatedAt: string;
  // [x: string]: unknown
}
