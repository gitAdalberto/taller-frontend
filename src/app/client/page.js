"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import ClientCard from "./components/ClientCard/ClientCard";
import styles from "./styles/clientpage.module.css";
import { Create, GoBack } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Page() {
  const [clients, setClients] = useState([]);
  const navi = useRouter();
  useEffect(() => {
    const fetchClient = async () => {
      const { data, error } = await supabase
        .from("client")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        console.log("error:", error.message);
      } else {
        console.log("data:", data);
        setClients(data);
      }
    };
    fetchClient();
  }, []);

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
          title={"Añadir"}
          action={() => navi.push("/client/new")}
        />
      </div>

      <ul className={styles.list}>
        {clients.map((client) => (
          <li key={client.id}>
            <ClientCard {...client} />
          </li>
        ))}
      </ul>
    </div>
  );
}
