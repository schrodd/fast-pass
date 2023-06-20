import { useState, useEffect } from "react";
import { fetchHelper } from "../helpers/fetch";
import { useRouter } from "next/navigation";
import { Commerce } from "../interfaces/Commerce.interface";

export function useCommerces() {
  const { push } = useRouter();
  const [commerce, setCommerce] = useState<Partial<Commerce>>({});
  function getCommerce(): void {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      fetchHelper("GET", "/commerces/my-data", jwt)
        .then((res) => {
          if (!res.ok) throw new Error("HTTP Error: " + res.status);
          return res.json();
        })
        .then((data) => {
          const commerceData: Partial<Commerce> = {
            name: data.name,
            description: data.description,
            openHours: data.openHours,
            phoneNumber: data.phoneNumber,
            address: data.address,
            user: data.user,
            password: data.password,
            _id: data._id,
          };
          setCommerce(commerceData);
        })
        .catch(() => {
          localStorage.removeItem("auth");
          push("/admin/login");
        });
    } else {
      push("/admin/login");
    }
  }
  function updateCommerce(data: any, id: string | undefined) {
    const jwt = localStorage.getItem("auth");
    if (!jwt) {
      push("/admin/login");
      return;
    }
    fetchHelper("PUT", `/commerces/${id}`, jwt, data)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP Error: " + res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        localStorage.removeItem("auth");
        push("/admin/login");
      });
  }

  useEffect(() => {
    getCommerce();
  }, []);

  return {
    commerce,
    getCommerce,
    updateCommerce,
  };
}
