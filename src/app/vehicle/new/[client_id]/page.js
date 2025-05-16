"use client";
import { GoBack } from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function page() {
  const { client_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const navi = useRouter();

  const Submit = async (e) => {
    e.preventDefault();
    if (plate === "" || brand === "" || model === "" || color === "") {
      return;
    }

    const { data, error } = await supabase.from("vehicle").insert([
      {
        plate: plate,
        brand: brand,
        model: model,
        color: color,
        client_id: client_id,
      },
    ]);

    if (error) {
      setError(error);
    } else {
      setLoading(true);
      navi.push(`/client/${client_id}`);
    }
  };

  const fetchVehiclesByClientId = async () => {
    const { data, error } = await supabase
      .from("vehicle")
      .select("*")
      .eq("client_id", client_id);

    if (error) {
      console.log("error:", error);
      setError(error);
    } else {
      console.log("data:", data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (client_id) fetchVehiclesByClientId();
  }, [client_id]);
  
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
    <div>
      <div className={styles.topContainer}>
        <GoBack
          title={"Regresar"}
          backgroundColor={"#00dc00"}
          action={() => navi.push(`/client/${client_id}`)}
        />
      </div>
      <div className={styles.container}>
        <form className={styles.content} onSubmit={Submit}>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="Placa"
          />
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Marca"
          />
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Modelo"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
          />
          <div className={styles.buttons}>
            <button className={styles.button} type="submit">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
