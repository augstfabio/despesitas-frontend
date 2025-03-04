import React from 'react'
import styles from './CardDespesa.module.css'
import ModalDespesa from './ModalDespesa'
export default function CardDespesa({ data, openModal }) {
    return (
        <div onClick={()=>openModal(data)} className={`${styles.card} ${data.status === "pendente" && styles.pendente}`}>
            <span className={styles.value}>R${data.valor}</span>
            <p >{data.nome}</p>
            <span className={`${styles.status}`}>
                {data.status}
            </span>
        </div>
    )
}
