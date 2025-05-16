"use client";
import { ConfirmButton, GoBack } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";
export default function page() {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const navi = useRouter();

  const Submit = async () => {
    if ( name === "" || telephone === "" ) {
        return;
    }

    const { data, error } = await supabase
    .from("mechanic")
    .insert([{
        name: name,
        telephone: telephone
    }]);

    if (error) {
        console.log("error:", error);
    } else {
        console.log("nuevo mecanico:",data);
        navi.push("/mechanic");
    }

  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Teléfono"
        />
        <div className={styles.buttons}>
          <GoBack
            title={"Regresar"}
            backgroundColor={"#09f"}
            action={() => navi.back()}
          />
          <ConfirmButton
          title={"Crear"}
          backgroundColor={"#00dc00"}
          action={Submit}
          />
        </div>
      </div>
    </div>
  );
}
