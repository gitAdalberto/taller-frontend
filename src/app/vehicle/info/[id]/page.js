"use client";
import {
  CancelButton,
  ConfirmButton,
  DeleteButton,
  EditButton,
  GoBack,
} from "@/components/Button";
import { useParams, useRouter } from "next/navigation";
import styles from "./vehicleinfo.module.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { YesNo } from "@/components/YesNo";

export default function page() {
  const navi = useRouter();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [client_id, setClient_id] = useState();

  const fetchVehicle = async () => {
    const { data, error } = await supabase
      .from("vehicle")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      setError(error);
    } else {
      setVehicle(data);
      setPlate(data.plate);
      setBrand(data.brand);
      setModel(data.model);
      setColor(data.color);
      setClient_id(data.client_id);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("vehicle").delete().eq("id", id);

    if (error) {
      setError(error);
    } else {
      navi.push(`/client/${client_id}`);
    }
  };

  const handleUpdate = async () => {
    if (plate === "" || brand === "" || model === "" || color === "") {
      return;
    }

    const updateData = {
        plate: plate,
        brand: brand,
        model: model,
        color: color,
        client_id: client_id,
    }

    const { error } = await supabase
      .from('vehicle')
      .update(updateData)
      .eq('id', id);

    if (error) {
      setError(error);
    } else {
      setLoading(true);
      await fetchVehicle();
      setIsEditActive(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchVehicle();
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
        backgroundColor={"#00dc00"}
        title={"Regresar"}
        action={() => navi.push(`/client/${client_id}`)}
      />
      <div className={styles.content}>
        {!isDeleteActive && !isEditActive && (
          <div className={styles.vehicleInfo}>
            <div className={styles.labels}>
              <p>Placa:</p>
              <p>Marca:</p>
              <p>Modelo:</p>
              <p>Color:</p>
            </div>
            <div className={styles.info}>
              <p>{vehicle.plate}</p>
              <p>{vehicle.brand}</p>
              <p>{vehicle.model}</p>
              <p>{vehicle.color}</p>
            </div>
          </div>
        )}

        {isEditActive && (
          <div>
            <div className={styles.updateContainer}>
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
            </div>
          </div>
        )}
        {isDeleteActive && (
          <YesNo
            title={"Eliminar vehiculo"}
            message={"¿Está seguro de eliminar el vehiculo?"}
            yesAction={handleDelete}
            cancelAction={() => setIsDeleteActive(false)}
          />
        )}
        {isEditActive && (
          <div className={styles.buttonContainer}>
            <CancelButton
              backgroundColor={"#ff0000"}
              action={() => setIsEditActive(false)}
            />
            <ConfirmButton backgroundColor={"#00dc00"} action={handleUpdate}/>
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
