"use client";
import { Create, GoBack } from "@/components/Button";
import { useRouter } from "next/navigation";
import styles from "./new.module.css";
import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function page() {
  const navi = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [selectedClient, setSelectedClient] = useState(undefined);
  const [selectedVehicle, setSelectedVehicle] = useState(undefined);
  const [selectedMechanic, setSelectedMechanic] = useState(undefined);
  const [accesories, setAccesories] = useState("");
  const [failures, setFailures] = useState("");
  const [canCreate, setCanCreate] = useState(false);

  const handleSubmit = async () => {
    console.log('insertando');
    const { data, error } = await supabase
    .from('tbOrder')
    .insert([{
      client_id: selectedClient.id,
      vehicle_id: selectedVehicle.id,
      mechanic_id: selectedMechanic.id,
      failures: failures,
      accesories: accesories
    }]);

    if (error) {
      setError(error);
    } else {
      setLoading(true);
      navi.push("/order");
    }

  }

  const clientChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const clientObj = clients.find((c) => c.id === selectedId);
    setSelectedClient(clientObj);
  };

  const mechanicChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const mechanicObj = mechanics.find((c) => c.id === selectedId);
    setSelectedMechanic(mechanicObj);
  };

  const vehicleChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const vehicleObj = vehicles.find((c) => c.id === selectedId);
    setSelectedVehicle(vehicleObj);
  };

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("client")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      setError(error);
    } else {
      setClients(data);
      console.log("datos de clientes:", data);
    }
    setLoading(false);
  };

  const fetchMechanics = async () => {
    const { data, error } = await supabase
      .from("mechanic")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      setError(error);
    } else {
      setMechanics(data);
    }
  };

  const fetchVehiclesById = async () => {
    if (!selectedClient) {
      return;
    }

    const { data, error } = await supabase
      .from("vehicle")
      .select("*")
      .eq("client_id", selectedClient.id)
      .order("id", { ascending: true });

    if (error) {
      setError(error);
    } else {
      setVehicles(data);
      console.log("vehiculos:", data);
      console.log("largo de vehiculos: ", data.length);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchMechanics();
  }, []);

  useEffect(() => {
    selectedClient ? fetchVehiclesById() : console.log("no hago nada");
  }, [selectedClient]);

  if (selectedClient && selectedMechanic && selectedVehicle && accesories && failures) {
    console.log("se puede crear");
    if (!canCreate) setCanCreate(true);
  } else {
    console.log("no se puede crear");
    if (canCreate) setCanCreate(false);
  }

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
      <GoBack
        backgroundColor={"#09f"}
        title={"Regresar"}
        action={() => navi.back()}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
          <h1>Agregue una orden</h1>
          <div className={styles.listContainer}>
            <div className={styles.list}>
              <label>Seleccione un cliente</label>
              <select
                id="clientList"
                value={selectedClient?.id || ""}
                onChange={clientChange}
              >
                <option value="">Seleccione aquí</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <p>Nombre:{selectedClient?.name || "indefinido"}</p>
              <p>Nit:{selectedClient?.nit || "indefinido"}</p>
              <p>Dirección:{selectedClient?.direction || "indefinido"}</p>
              <p>Teléfono:{selectedClient?.telephone || "indefinido"}</p>
            </div>
            <div className={styles.list}>
              <label>Seleccione un mechanico</label>
              <select
                id="mechanicList"
                value={selectedMechanic?.id || ""}
                onChange={mechanicChange}
              >
                <option value="">Seleccione aquí</option>
                {mechanics.map((mechanic) => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.name}
                  </option>
                ))}
              </select>
              <p>Nombre:{selectedMechanic?.name || "indefinido"}</p>
              <p>Teléfono:{selectedMechanic?.telephone || "indefinido"}</p>
            </div>
            {selectedClient ? (
              <div className={styles.list}>
                <label>Seleccione un vehiculo</label>
                <select
                  id="vehicleList"
                  value={selectedVehicle?.id || ""}
                  onChange={vehicleChange}
                >
                  <option value="">Seleccione aquí</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.plate}
                    </option>
                  ))}
                </select>
                <p>Nombre:{selectedVehicle?.plate || "indefinido"}</p>
                <p>Nit:{selectedVehicle?.brand || "indefinido"}</p>
                <p>Dirección:{selectedVehicle?.model || "indefinido"}</p>
                <p>Teléfono:{selectedVehicle?.color || "indefinido"}</p>
              </div>
            ) : (
              <div
                className={styles.list}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Seleccione un cliente
              </div>
            )}
          </div>
          <div className={styles.bottomContainer}>
            <textarea
              placeholder="Accesorios"
              type="text"
              value={accesories}
              onChange={(e) => setAccesories(e.target.value)}
            />
            <textarea
              placeholder="Fallas"
              type="text"
              value={failures}
              onChange={(e) => setFailures(e.target.value)}
            />
          </div>
          <div className={styles.buttonContainer}>
          {
            canCreate ? 
            <Create
            title={'Crear'}
            backgroundColor={'#09f'}
            action={handleSubmit}
            />
            :
            <Create
            title={'Crear'}
            backgroundColor={'#00000030'}
            />
          }
          </div>
        </div>
      </div>
    </div>
  );
}
