import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchHelper } from "../helpers/fetch";
import { NewProduct } from "../interfaces/Products.interface";

export function useProducts() {
  const { push } = useRouter();
  const [products, setProducts] = useState([]);
  function getProducts() {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      fetchHelper("GET", "/products", jwt)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
          }
          return res.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch(() => {
          localStorage.removeItem("auth");
          push("/admin/login");
        });
    } else {
      push("/admin/login");
    }
  }

  function createProduct(body: NewProduct) {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      return fetchHelper("POST", "/products", jwt, body)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
          }
          return res.json();
        })
        .then(() => {
          getProducts();
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    } else {
      push("/admin/login");
      return false;
    }
  }

  function deleteProduct(tableNumber: number) {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      fetchHelper("DELETE", `/products/${tableNumber}`, jwt)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
          }
          return res.json();
        })
        .then(() => {
          getProducts();
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
    getProducts();
  }, []);

  return {
    products,
    getProducts,
    createProduct,
    deleteProduct,
  };
}
