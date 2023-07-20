"use client";
import TableCard from "./components/TableCard";
import AddIcon from "@mui/icons-material/Add";
import { useTables } from "@/app/hooks/useTables";
import { Table } from "@/app/interfaces/Tables.interface";
import { useCommerces } from "@/app/hooks/useCommerces";
import ChildrenDuplicator from "./components/ChildrenDuplicator";
import { useWebsockets } from "@/app/hooks/useWebsockets";
import { Socket } from "socket.io-client";

export default function Page() {
  const { commerce } = useCommerces();
  const { tables, getTables, createTable, deleteTable, updateSafetyCode } =
    useTables();
  useWebsockets((socket: Socket) => {
    if (socket) {
      socket.on("connect", () => {
        console.log("WS connected successfully");
      });
      socket.on("data-update", () => {
        getTables();
        console.log("WS: Data has been updated");
      });
    }
  }, commerce._id);

  return (
    <>
      <div className="w-full mb-5 text-white flex divide-x-2 divide-solid divide-white [&>*]:px-2">
        <p>
          <b>Mesas activas:</b> {tables.length}
        </p>
        <button onClick={getTables} className="underline">
          Actualizar
        </button>
      </div>
      <div className="w-full flex flex-row gap-3 flex-wrap justify-start items-center">
        {Object.keys(commerce).length <= 0 && (
          <ChildrenDuplicator amount={5}>
            <div
              className={`container w-[48%] md:w-[19%] h-32 bg-slate-100 px-6 py-3 text-slate-800 rounded-2xl shadow flex flex-col justify-center items-center relative overflow-hidden animate-pulse`}
            />
          </ChildrenDuplicator>
        )}
        {tables &&
          tables.map((e: Table, i: number) => (
            <TableCard
              data={e}
              key={i}
              actions={{ deleteTable, updateSafetyCode }}
            />
          ))}
        <button
          onClick={createTable}
          className="bg-slate-100 text-slate-900 p-3 rounded-2xl shadow flex justify-center items-center"
        >
          <AddIcon />
        </button>
      </div>
    </>
  );
}
