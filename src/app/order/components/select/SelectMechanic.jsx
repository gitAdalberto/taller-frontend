import { useEffect, useState } from 'react';
import styles from './list.module.css';
import { supabase } from '@/lib/supabase';
export default function SelectMechanic({ selectedMechanic, setSelectedMechanic }) {
    const [mechanics, setMechanics] = useState([]);

    useEffect(() => {
        fetchMechanics();
    }, []);
    const fetchMechanics = async () => {
        const { data, error } = await supabase
            .from("mechanic")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            console.log("error", error)
        } else {
            setMechanics(data);
        }
    };

    const mechanicChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const mechanicObj = mechanics.find((c) => c.id === selectedId);
        setSelectedMechanic(mechanicObj);
    };

    return (
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
        </div>
    )
};
