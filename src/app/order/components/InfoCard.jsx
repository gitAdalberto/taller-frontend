import RowDetails from "./RowDetails";
import styles from "./InfoCard.module.css";
export default function InfoCard({order}) {
    return(
        <div className={styles.infoContainer}>
        <h1>Detalles de la orden No:{order?.id}</h1>
        <p className={styles.title}>Datos del cliente:</p>
        <RowDetails
        title1={'Nombre:'}
        text1={order?.client.name}
        title2={'Nit:'}
        text2={order?.client.nit}
        />
        <RowDetails
        title1={'Telefono:'}
        text1={order?.client.telephone}
        title2={'Dirección:'}
        text2={order?.client.direction}
        />
        <p className={styles.title}>Datos del vehículo:</p>
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
        <RowDetails
        title1={'Placa:'}
        text1={order?.mechanic.name}
        title2={'Marca:'}
        text2={order?.mechanic.telephone}
        />
        <div className={styles.textAreaContainer}>
          <p>Accesorios</p>
          <textarea
          value={order?.accesories}
          readOnly
          />
          <p>Fallas</p>
          <textarea
          readOnly
          value={order?.failures}
          />
        </div>
      </div>
    )
};
