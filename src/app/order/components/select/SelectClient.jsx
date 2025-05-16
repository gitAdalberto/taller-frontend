import { useEffect, useState } from 'react';
import styles from './list.module.css';
import { supabase } from '@/lib/supabase';
export default function SelectClient({ selectedClient, setSelectedClient }) {
    const [clients, setClients] = useState([]);
    const clientChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const clientObj = clients.find((c) => c.id === selectedId);
        setSelectedClient(clientObj);
    };
    const fetchClients = async () => {
        const { data, error } = await supabase
          .from("client")
          .select("*")
          .order("id", { ascending: true });
    
        if (error) {
          console.log('error', error);
        } else {
          setClients(data);
          console.log("datos de clientes:", data);
        }
        
      };
      useEffect(() => {
          fetchClients();
        }, []);
    return (
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
        </div>
    )
};
