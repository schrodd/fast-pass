import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchHelper } from "../helpers/fetch";

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
          setTables(data);
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

  return {
    tables,
    getTables,
    createTable,
  };
}
