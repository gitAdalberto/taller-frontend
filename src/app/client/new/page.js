"use client";

import { useState } from "react";
import styles from "./styles/newPage.module.css";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { GoBack } from "@/components/Button";

export default function page() {
  const [name, setName] = useState("");
  const [nit, setNit] = useState("");
  const [telephone, setTelephone] = useState("");
  const [direction, setDirection] = useState("");
  const navi = useRouter();

  const Submit = async (e) => {
    e.preventDefault();
    console.log("hola mundo");
    console.log("validando");

    if (name === "" || nit === "" || telephone === "" || direction === "") {
      console.log("no puede dejar campos vacios");
      return;
    }

    const { data, error } = await supabase.from("client").insert([
      {
        name: name,
        nit: nit,
        direction: direction,
        telephone: telephone,
      },
    ]);

    if (error) {
      console.log("ha ocurrido un error al agregar un nuevo cliente", error);
    } else {
      console.log("nuevo cliente añadido", data);
      navi.push("/client");
    }
    console.log("fin del metodo");
  };

  return (
    <div>
      <div className={styles.topContainer}>
        <GoBack
          title={"Regresar"}
          backgroundColor={"#09f"}
          action={() => navi.back()}
        />
      </div>

      <div className={styles.container}>
        <form className={styles.content} onSubmit={Submit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
          />
          <input
            type="text"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
            placeholder="NIT"
          />
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="Teléfono"
          />
          <input
            type="text"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            placeholder="Dirección"
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
