"use client";
import {
  CancelButton,
  ConfirmButton,
  DeleteButton,
  EditButton,
  GoBack,
} from "@/components/Button";
import { useParams, useRouter } from "next/navigation";
import styles from "./info.module.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import InfoCard from "../../components/InfoCard";
import { YesNo } from "@/components/YesNo";
import EditCard from "../../components/EditCard";
export default function page() {
  const navi = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState([]);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);

  const handleDelete = async () => {
    const { error } = await supabase.from("tbOrder").delete().eq("id", id);

    if (error) {
      setError(error);
    } else {
      setLoading(true);
      navi.push("/order");
    }
  };

  const fetchOrder = async () => {
    const { data, error } = await supabase
      .from("tbOrder")
      .select(
        `
        id,
        created_at,
        client(id,name,nit,direction,telephone),
        vehicle(id,plate,brand,model,color),
        mechanic(id,name,telephone),
        failures,
        accesories
        `
      )
      .eq("id", id)
      .single();

    if (error) {
      setError(error);
    } else {
      setOrder(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchOrder();
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
    <div style={{ margin: "1rem" }}>
      <div className={styles.top}>
        <GoBack
          backgroundColor={"#00dc00"}
          title={"Regresar"}
          action={() => navi.back()}
        />
        {!isEditActive && !isDeleteActive && (
          <EditButton
            backgroundColor={"#09f"}
            action={() => setIsEditActive(true)}
          />
        )}
        {!isEditActive && !isDeleteActive && (
          <DeleteButton
            backgroundColor={"#ff0000"}
            action={() => setIsDeleteActive(true)}
          />
        )}
        {isEditActive && !isDeleteActive && (
          <CancelButton
            backgroundColor={"#ff0000"}
            action={() => setIsEditActive(false)}
            title={"Cancelar"}
          />
        )}
      </div>
      {!isEditActive && !isDeleteActive && <InfoCard order={order} />}
      {isEditActive && !isDeleteActive && <EditCard
      order={order}
      fetch={fetchOrder}
      setIsEditActive={setIsEditActive}
      setError={setError}
      setLoading={setLoading}
      />}      {isDeleteActive && (
        <div className={styles.container}>
          <YesNo
            title={"Eliminar orden"}
            message={"¿Está seguro de eliminar la orden?"}
            yesAction={handleDelete}
            cancelAction={() => setIsDeleteActive(false)}
          />
        </div>
      )}
    </div>
  );
}
