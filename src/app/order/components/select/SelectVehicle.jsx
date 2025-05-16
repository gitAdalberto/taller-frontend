import { useEffect, useState } from 'react';
import styles from './list.module.css';
import { supabase } from '@/lib/supabase';
export default function SelectVehicle({ selectedClient, selectedVehicle, setSelectedVehicle }) {
    const [vehicles, setVehicles] = useState([])
    const fetchVehiclesById = async () => {
        if (!selectedClient) {
            return;
        }

        const { data, error } = await supabase
            .from("vehicle")
            .select("*")
            .eq("client_id", selectedClient?.id)
            .order("id", { ascending: true });

        if (error) {
            console.log('error', error);
        } else {
            setVehicles(data);
            console.log("vehiculos:", data);
            console.log("largo de vehiculos: ", data.length);
        }
    };
    const vehicleChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const vehicleObj = vehicles.find((c) => c.id === selectedId);
        setSelectedVehicle(vehicleObj);
    };
    useEffect(() => {
        const waitForData = async () => {
            selectedClient ? await fetchVehiclesById() : console.log("no hago nada");
        }
        waitForData();
    }, [selectedClient]);
    return (
        <div>
            {
                selectedClient ? (
                    <div className={styles.list} >
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
                )
            }
        </div>
    )
};
