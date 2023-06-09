import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchHelper } from "../helpers/fetch";

interface table {
  _id: string;
  owner: string;
  safetyCode: string;
  tableNumber: string;
  status: string;
  hidden: boolean;
  products: unknown[];
  createdAt: string;
  updatedAt: string;
}

export default function () {
  const { push } = useRouter();
  const [tables, setTables] = useState([]);
  function getTables() {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      fetchHelper("GET", "/tables", undefined, jwt)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
          }
          return res.json();
        })
        .then((data) => {
          const sortedTables = data.sort((a: table, b: table) =>
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
      fetchHelper("POST", "/tables", undefined, jwt)
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
      fetchHelper("DELETE", `/tables/${tableNumber}`, undefined, jwt)
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
      fetchHelper(
        "PATCH",
        `/tables/change-safety-number/${tableNumber}`,
        undefined,
        jwt
      )
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
