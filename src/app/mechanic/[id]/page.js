"use client";

import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import {
  CancelButton,
  ConfirmButton,
  DeleteButton,
  EditButton,
  GoBack,
} from "@/components/Button";
import { YesNo } from "@/components/YesNo";

export default function page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [mechanic, setMechanic] = useState(null);
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const navi = useRouter();

  const fetchMechanic = async () => {
    const { data, error } = await supabase
      .from("mechanic")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      setError(error);
    } else {
      setMechanic(data);
      setName(data.name);
      setTelephone(data.telephone);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    if (name === "" || telephone === "") {
      return;
    }

    const updateData = {
      name: name,
      telephone: telephone,
    };

    const { error } = await supabase
      .from("mechanic")
      .update(updateData)
      .eq("id", id);

    if (error) {
      setError(error);
    } else {
      setLoading(true);
      await fetchMechanic();
      setIsEditActive(false);
      setLoading(false);
    }
  };

  const deleteMechanic = async () => {
    const { error } = await supabase.from("mechanic").delete().eq("id", id);

    if (error) {
      setError(error);
    } else {
      navi.push("/mechanic");
    }
  };

  useEffect(() => {
    if (id) fetchMechanic();
  }, [id]);

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
      <GoBack
        title={"Regresar"}
        backgroundColor={"#00dc00"}
        action={() => navi.back()}
      />
      <div className={styles.content}>
        {!isDeleteActive && !isEditActive && (
          <div className={styles.mechanicInfo}>
            <div className={styles.labels}>
              <p>NOMBRE:</p>
              <p>TELÉFONO:</p>
            </div>
            <div className={styles.info}>
              <p>{mechanic.name}</p>
              <p>{mechanic.telephone}</p>
            </div>
          </div>
        )}

        {isEditActive && (
          <div>
            <div className={styles.updateContainer}>
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
            </div>
          </div>
        )}
        {isDeleteActive && (
          <YesNo
            title={"Eliminar Mecánico"}
            message={"¿Está seguro de eliminar al mecánico?"}
            yesAction={deleteMechanic}
            cancelAction={() => setIsDeleteActive(false)}
          />
        )}
        {isEditActive && (
          <div className={styles.buttonContainer}>
            <CancelButton
              backgroundColor={"#ff0000"}
              action={() => setIsEditActive(false)}
            />
            <ConfirmButton backgroundColor={"#00dc00"} action={handleUpdate} />
          </div>
        )}
        {!isEditActive && !isDeleteActive && (
          <div className={styles.buttonContainer}>
            <EditButton
              backgroundColor={"#09f"}
              action={() => setIsEditActive(true)}
            />
            <DeleteButton
              backgroundColor={"#ff0000"}
              action={() => setIsDeleteActive(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
