"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { FaArrowRight, FaPlus, FaUser, FaUserPlus } from "react-icons/fa";
import { ClientButton, EmptyButton } from "@/components/Button";
import { useRouter } from "next/navigation";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { LuScrollText } from "react-icons/lu";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import OrderCard from "./order/components/OrderCard";
export default function Page() {
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
      .order("created_at", { ascending: false })
      .limit(3);

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
    <div className={styles.main}>
      <h1>¡Bienvenido al Taller!</h1>
      <div className={styles.container}>
        <div className={styles.button}>
          <EmptyButton
            backgroundColor={"#09f"}
            action={() => navi.push("/client/new")}
          >
            <FaUserPlus size={30} color="#fff" />
            <p>Agregar un nuevo cliente</p>
          </EmptyButton>
          <EmptyButton
            backgroundColor={"#09f"}
            action={() => navi.push("/client")}
          >
            <FaUser size={30} color="#fff" />                        
            <p>Ir a clientes</p>
          </EmptyButton>
          <EmptyButton
            backgroundColor={"#09f"}
            action={() => navi.push("/mechanic/new")}
          >
            <FaScrewdriverWrench size={30} color="#fff" />
            <FaPlus size={10} color="#fff" />
            <p>Agregar un nuevo mecánico</p>
          </EmptyButton>
          <EmptyButton
            backgroundColor={"#09f"}
            action={() => navi.push("/mechanic")}
          >
            <FaScrewdriverWrench size={30} color="#fff" />            
            <p>Ir a mecánicos</p>
          </EmptyButton>
          <EmptyButton
            backgroundColor={"#09f"}
            action={() => navi.push("/order/new")}
          >
            <LuScrollText size={30} color="#fff" />
            <FaPlus size={10} color="#fff" />
            <p>Agregar una nueva orden</p>
          </EmptyButton>
          <EmptyButton
            backgroundColor={"#09f"}
            action={() => navi.push("/order")}
          >
            <LuScrollText size={30} color="#fff" />
            <p>Ir a ordenes</p>
          </EmptyButton>
        </div>
        <div className={styles.sub}><h1>Ultimas 3 ordenes</h1></div>
        <ul className={styles.list}>
          {orders.map((order) => (
            <li key={order.id}>
              <OrderCard {...order} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
