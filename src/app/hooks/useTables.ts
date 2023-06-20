import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchHelper } from "../helpers/fetch";
import { Table } from "../interfaces/Tables.interface";

export function useTables() {
  const { push } = useRouter();
  const [tables, setTables] = useState([]);
  function getTables() {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      fetchHelper("GET", "/tables", jwt)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
          }
          return res.json();
        })
        .then((data) => {
          const sortedTables = data.sort((a: Table, b: Table) =>
            a.tableNumber > b.tableNumber ? 1 : -1
          );
          setTables(sortedTables);
        })
        .catch(() => {
          localStorage.removeItem("auth");
          push("/admin/login");
        });
    } else {
      push("/admin/login");
    }
  }

  function createTable() {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      fetchHelper("POST", "/tables", jwt)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
          }
          return res.json();
        })
        .then(() => {
          getTables();
        })
        .catch(() => {
          localStorage.removeItem("auth");
          push("/admin/login");
        });
    } else {
      push("/admin/login");
    }
  }

  function deleteTable(tableNumber: number) {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      fetchHelper("DELETE", `/tables/${tableNumber}`, jwt)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
          }
          return res.json();
        })
        .then(() => {
          getTables();
        })
        .catch(() => {
          localStorage.removeItem("auth");
          push("/admin/login");
        });
    } else {
      push("/admin/login");
    }
  }

  function updateSafetyCode(tableNumber: number) {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      fetchHelper("PATCH", `/tables/change-safety-number/${tableNumber}`, jwt)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
          }
          return res.json();
        })
        .then(() => {
          getTables();
        })
        .catch(() => {
          localStorage.removeItem("auth");
          push("/admin/login");
        });
    } else {
      push("/admin/login");
    }
  }

  useEffect(() => {
    getTables();
  }, []);

  return {
    tables,
    getTables,
    createTable,
    deleteTable,
    updateSafetyCode,
  };
}
