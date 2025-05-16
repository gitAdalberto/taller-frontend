"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./styles/page.module.css";
import {
  EditButton,
  DeleteButton,
  CancelButton,
  ConfirmButton,
  GoBack,
  NewVehicle,
} from "@/components/Button";
import { YesNo } from "@/components/YesNo";
import { VehiclePanel } from "@/components/vehicle";

export default function ClientDetailPage() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [name, setName] = useState("");
  const [nit, setNit] = useState("");
  const [telephone, setTelephone] = useState("");
  const [direction, setDirection] = useState("");
  const navi = useRouter();

  const handleUpdate = async () => {
    if (name === "" || nit === "" || telephone === "" || direction === "") {
      console.log("no puede dejar campos vacios");
      return;
    }

    const updateData = {
      name: name,
      nit: nit,
      telephone: telephone,
      direction: direction,
    };

    const { error } = await supabase
      .from("client")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.log("Error al actualiar cliente", error);
    } else {
      console.log("editado exitoso");
      await fetchClient();
      setIsEditActive(false);
    }
  };

  const deleteClient = async () => {
    const { data, error } = await supabase.from("client").delete().eq("id", id);

    if (error) {
      console.log("error al eliminar cliente", error);
    } else {
      console.log("eliminado con exito", data);
      navi.push("/client");
    }
  };

  const fetchClient = async () => {
    const { data, error } = await supabase
      .from("client")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      setError(error);
    } else {
      setClient(data);
      setName(data.name);
      setNit(data.nit);
      setTelephone(data.telephone);
      setDirection(data.direction);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchClient();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.backContainer}>
        <GoBack
          title={"Regresar"}
          backgroundColor={"#00dc00"}
          action={() => navi.back()}
        />
      </div>
      <div className={styles.container}>
        {!isEditActive && !isDeleteActive && (
          <div className={styles.content}>
            <div className={styles.labels}>
              <p>NOMBRE:</p>
              <p>NIT:</p>
              <p>TELÉFONO:</p>
              <p>DIRECCIÓN:</p>
            </div>
            <div className={styles.info}>
              <p>{client.name}</p>
              <p>{client.nit}</p>
              <p>{client.telephone}</p>
              <p>{client.direction}</p>
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
            </div>
          </div>
        )}
        {isDeleteActive && (
          <YesNo
            title={"Eliminar Cliente"}
            message={"¿Está seguro de eliminar al cliente?"}
            yesAction={deleteClient}
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
      <VehiclePanel id={id}/>
    </div>
  );
}
