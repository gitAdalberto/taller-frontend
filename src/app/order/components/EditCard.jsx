import { useEffect, useState } from "react";
import styles from "./EditCard.module.css";
import RowDetails from "./RowDetails";
import SelectClient from "./select/SelectClient";
import SelectMechanic from "./select/SelectMechanic";
import SelectVehicle from "./select/SelectVehicle";
import { ConfirmButton } from "@/components/Button";
import { supabase } from "@/lib/supabase";
export default function EditCard({ order, setIsEditActive, fetch, setError, setLoading}) {
    const [selectedClient, setSelectedClient] = useState(undefined);
    const [selectedVehicle, setSelectedVehicle] = useState(undefined);
    const [selectedMechanic, setSelectedMechanic] = useState(undefined);
    const [accesories, setAccesories] = useState('');
    const [failures, setFailures] = useState('');
    const [canEdit, setCanEdit] = useState(false);

    const handleUpdate = async () => {
        if (!canEdit) {
            return;
        }

        const updateData = {
            client_id: selectedClient.id,
            vehicle_id: selectedVehicle.id,
            mechanic_id: selectedMechanic.id,
            failures: failures,
            accesories: accesories,
        };

        const { error } = await supabase
            .from('tbOrder')
            .update(updateData)
            .eq('id', order?.id);

        if (error) {
            console.log('error fatalaaaaaaaaaaaaa:'.error);
            setError(error);
        } else {
            setLoading(true);
            console.log('editado con exito')
            await fetch();
            setIsEditActive(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log('datos de la orden', order);
        setSelectedClient(order?.client);
        setSelectedMechanic(order?.mechanic);
        setSelectedVehicle(order?.vehicle);
        setFailures(order?.failures);
        setAccesories(order?.accesories);
    }, []);

    if (!selectedClient || !selectedVehicle || !selectedMechanic || !accesories || !failures) {
        if (canEdit) setCanEdit(false);
    } else {
        if (!canEdit) setCanEdit(true);
    }


    return (
        <div className={styles.infoContainer}>
            <h1>Edita la orden No:{order?.id}</h1>
            <p className={styles.title}>Datos del cliente:</p>
            <SelectClient
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
            />
            <RowDetails
                title1={'Nombre:'}
                text1={selectedClient?.name}
                title2={'Nit:'}
                text2={selectedClient?.nit}
            />
            <RowDetails
                title1={'Telefono:'}
                text1={selectedClient?.telephone}
                title2={'Dirección:'}
                text2={selectedClient?.direction}
            />
            <p className={styles.title}>Datos del vehículo:</p>
            <SelectVehicle
                selectedClient={selectedClient}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
            />
            <RowDetails
                title1={'Placa:'}
                text1={order?.vehicle.plate}
                title2={'Marca:'}
                text2={order?.vehicle.brand}
            />
            <RowDetails
                title1={'Model:'}
                text1={order?.vehicle.model}
                title2={'Color:'}
                text2={order?.vehicle.color}
            />
            <p className={styles.title}>Datos del mecánico:</p>
            <SelectMechanic
                selectedMechanic={selectedMechanic}
                setSelectedMechanic={setSelectedMechanic}
            />
            <RowDetails
                title1={'Placa:'}
                text1={selectedMechanic?.name}
                title2={'Marca:'}
                text2={selectedMechanic?.telephone}
            />
            <div className={styles.textAreaContainer}>
                <p>Accesorios</p>
                <textarea
                    type="text"
                    value={accesories}
                    placeholder="Accesorios"
                    onChange={(e) => setAccesories(e.target.value)}

                />
                <p>Fallas</p>
                <textarea
                    placeholder="Fallas"
                    type="text"
                    value={failures}
                    onChange={(e) => setFailures(e.target.value)}
                />
            </div>
            {
                canEdit ?
                    <ConfirmButton backgroundColor={"#09f"} title={"Actualizar"} action={handleUpdate}/>
                    :
                    <ConfirmButton backgroundColor={"#505050"} title={"Actualizar"} />
            }

        </div>
    )
};
