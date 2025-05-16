"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import styles from "./page.module.css";
import { Create, GoBack } from "@/components/Button";

export default function page() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navi = useRouter();

  const fetchMechanics = async () => {
    const { data, error } = await supabase
      .from("mechanic")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log("error: ", error);
      setError(error);
    } else {
      setMechanics(data);
      console.log("datos de mecanicos:", data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMechanics();
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
          title={"Añadir"}
          action={() => navi.push("/mechanic/new")}
        />
      </div>
      <ul className={styles.list}>
        {mechanics.map((mechanic) => (
          <li key={mechanic.id}>
            <Card {...mechanic} />
          </li>
        ))}
      </ul>
    </div>
  );
}
