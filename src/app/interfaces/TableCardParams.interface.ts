import { Table } from "@/app/interfaces/Tables.interface"

export interface TableCardParams {
  data: Table
  actions: {
    [x: string]: (tableNumber: number) => void
  }
}