"use client"
import TableCard from "./components/TableCard";
import AddIcon from '@mui/icons-material/Add';
import { useTables } from '@/app/hooks/useTables';
import { Table } from "@/app/interfaces/Tables.interface";

export default function Page(){
  const {tables, getTables, createTable, deleteTable, updateSafetyCode} = useTables()
  return (
    <>
      <div className="w-full mb-5 text-white flex divide-x-2 divide-solid divide-white [&>*]:px-2">
        <p><b>Mesas activas:</b> {tables.length}</p>
        <button onClick={getTables} className='underline'>Actualizar</button>
      </div>
      <div className="w-full flex flex-row gap-3 flex-wrap justify-start items-center">
        {tables && tables.map((e: Table, i: number) => <TableCard data={e} key={i} actions={{deleteTable, updateSafetyCode}}/>)}
        <button onClick={createTable} className='bg-slate-100 text-slate-900 p-3 rounded-2xl shadow flex justify-center items-center'><AddIcon/></button>
      </div>
    </>
  )
}