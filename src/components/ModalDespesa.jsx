import React, { useState, useEffect } from 'react';
import styles from './ModalDespesa.module.css';
import { IoAddCircleOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useExpense } from '../hooks/useExpense';
import Loading from './Loading';

export default function ModalDespesa({ isOpen, onClose, data }) {
    const [status, setStatus] = useState("");
    const [oldStatus, setOldStatus] = useState("");
    const [selected, setSelected] = useState("data");
    const { updateExpense, deleteExpense, loading } = useExpense();

    useEffect(() => {
        if (isOpen) {
            setStatus(data?.status || "");
            setOldStatus(data?.status || "");
            setSelected("data");
        }
    }, [isOpen, data]);

    const handleSubmit = async () => {
        if (oldStatus === status) {
            onClose();
            return;
        }
        try {
            await updateExpense(data._id, { status });
        } catch (error) {
            console.log(error);
        } finally {
            onClose();
        }
    };

    const handleDelete = async () => {
        try {
            await deleteExpense(data._id);
        } catch (error) {
            console.error(error);
        } finally {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>
                {loading && <Loading/>}
                <div className={styles.header}>
                    <h2>{data?.nome || "Sem Nome"}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <IoAddCircleOutline />
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.nav}>
                        <span className={selected === "data" ? styles.active : ""} onClick={() => setSelected("data")}>
                            Dados
                        </span>
                        <span className={selected === "history" ? styles.active : ""} onClick={() => setSelected("history")}>
                            Histórico
                        </span>
                    </div>
                    <div className={styles.data}>
                        {selected === "data" && (
                            <>
                                <ul className={styles.ulData}>
                                    <li><span>Tipo:</span> {data?.tipo || "N/A"}</li>
                                    <li><span>Valor:</span> R${data?.valor || "0,00"}</li>
                                    {data?.tipo === "parcelado" && <li><span>Parcelas:</span>  {`${data?.parcelasPagas}/${data?.parcelasTotais}` || "N/A"}</li>}
                                    <li><span>Dia do pagamento:</span> {`${data?.dataPagamento}` || "N/A"}</li>
                                    <li>
                                        <span>Último pagamento:</span> {data?.historico?.length > 0
                                            ? new Date(
                                                [...data.historico].sort((a, b) => new Date(b.dataPagamento) - new Date(a.dataPagamento))[0].dataPagamento
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </li>
                                    <li>
                                        <span>Status:</span>
                                        {data?.status ? (
                                            <select value={status} onChange={(e) => setStatus(e.target.value)} name="status" id="status">
                                                <option value="pendente">Pendente</option>
                                                <option value="pago">Pago</option>
                                            </select>
                                        ) : (
                                            <span>N/A</span>
                                        )}
                                    </li>
                                </ul>
                                <div className={styles.btns}>
                                    <button disabled className={styles.editBtn}>
                                        <BiSolidEdit />Editar
                                    </button>
                                    <button onClick={handleDelete} className={styles.deleteBtn}>
                                        <MdDeleteOutline /> Excluir
                                    </button>
                                </div>
                                <div className={styles.saveBtn}>
                                    <button onClick={handleSubmit}>Salvar</button>
                                </div>
                            </>
                        )}
                    </div>
                    {selected === "history" && (
                        <ul className={styles.ulData}>
                            {data.historico
                                .sort((a, b) => new Date(b.dataPagamento) - new Date(a.dataPagamento))
                                .map((item) => (
                                    <li key={item._id}>
                                        <span>Pagamento:</span> {new Date(item.dataPagamento).toLocaleDateString("pt-BR")}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
}