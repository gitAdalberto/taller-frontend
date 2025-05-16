"use client";
import { Create, GoBack } from "@/components/Button";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import OrderCard from "./components/OrderCard";

export default function page() {
  const navi = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("tbOrder")
      .select(
        `
        id,
        created_at,
        client(name),
        vehicle(plate),
        mechanic(name)
        `
      )
      .order("created_at", { ascending: false });

    if (error) {
      setError(error);
    } else {
      setOrders(data);
      console.log(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80dvh",
        }}
      >
        <p>cargando...</p>
      </div>
    );

  if (error)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80dvh",
        }}
      >
        <p>error:{error.message}</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <GoBack
          backgroundColor={"#09f"}
          title={"Regresar"}
          action={() => navi.back()}
        />
        <Create
          backgroundColor={"#09f"}
          title={"Añadir orden"}
          action={() => navi.push("/order/new")}
        />
      </div>

      <ul className={styles.list}>
        {orders.map((order) => (
          <li key={order.id}>
            <OrderCard {...order} />
          </li>
        ))}
      </ul>
    </div>
  );
}
