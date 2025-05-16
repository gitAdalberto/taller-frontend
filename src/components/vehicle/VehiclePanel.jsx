'use client';
import { useRouter } from 'next/navigation';
import styles from './VehiclePanel.module.css';
import { NewVehicle } from '../Button';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { VehicleCard } from '.';

export default function VehiclePanel({ id }) {
    const navi = useRouter();
    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = async () => {
        const { data, error } = await supabase
            .from('vehicle')
            .select('*')
            .eq('client_id', Number(id))
            .order('id', { ascending: true });

        if (error) {
            console.log('error:', error);
        } else {
            console.log('data:',data);
            setVehicles(data);
        }
    }

    useEffect(() => {
        console.log('valor de id:',id);
    if (id) {
        fetchVehicles();
    }
}, [id]);


    return (
        <div className={styles.container}>
            <NewVehicle
                backgroundColor={"#09f"}
                title={"Agregar Vehiculo"}
                action={() => navi.push(`/vehicle/new/${id}`)}
            />
            <ul className={styles.list}>
                {vehicles.map((vehicle)=>(
                <li key={vehicle.id}>
                    <VehicleCard {...vehicle}/>
                </li>
            ))}
            </ul>
        </div>
    );
};
