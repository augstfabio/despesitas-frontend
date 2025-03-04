import React, { useEffect, useState } from 'react';
import styles from './NovaDespesa.module.css';
import { GrAddCircle } from "react-icons/gr";
import { useExpense } from '../hooks/useExpense';

export default function NovaDespesa({ isOpen, onClose, reload }) {
    const {createExpense, loading} = useExpense()
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("fixa");
    const [parcelas, setParcelas] = useState("");
    const [parcelasPagas, setParcelasPagas] = useState("");
    const [data, setData] = useState("");
    const [mostrarParcelas, setMostrarParcelas] = useState(false);

    useEffect(() => {
        if (tipo === "parcelado") {
            setMostrarParcelas(true)
        } else {
            setMostrarParcelas(false)
        }
    }, [tipo])

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createExpense({
                nome,
                valor: parseFloat(valor),
                dataPagamento: data,
                status: "pendente",
                tipo,
                parcelasTotais: tipo === "parcelado" ? parseInt(parcelas) : 0,
                parcelasPagas: tipo === "parcelado" ? parseInt(parcelasPagas) : 0,
            });
            
            onClose();
            reload(); 
        } catch (error) {
            console.error("Erro ao criar despesa:", error);
        }
    };
    

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.btnContainer}>
                    <button className={styles.fechar} onClick={onClose}><GrAddCircle /></button>
                </div>
                <form onSubmit={handleSubmit} className={styles.formulario}>
                    <h1>Nova despesa</h1>
                    <div className={styles.campo}>
                        <label htmlFor="nome">Nome</label>
                        <input required type="text" id="nome" placeholder="Ex: Conta de luz" className={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className={styles.campo}>
                        <label htmlFor="valor">Valor</label>
                        <input required type="text" id="valor" placeholder="Ex: 120" className={styles.input} value={valor} onChange={(e) => setValor(e.target.value)} />
                    </div>
                    <div className={styles.campo}>
                        <label htmlFor="tipo">Tipo</label>
                        <select required id="tipo" className={styles.input} value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value="parcelado">Parcelado</option>
                            <option value="fixa">Fixo</option>
                            <option value="unico">Único</option>
                        </select>
                    </div>
                    {mostrarParcelas && <>
                        <div className={styles.campo}>
                            <label htmlFor="parcelas">Parcelas totais</label>
                            <input required type="text" id="parcelas" placeholder="Ex: 20" className={styles.input} value={parcelas} onChange={(e) => setParcelas(e.target.value)} />
                        </div>
                        <div className={styles.campo}>
                            <label htmlFor="parcelas-pagas">Parcelas pagas</label>
                            <input required type="text" id="parcelas-pagas" placeholder="Ex: 10" className={styles.input} value={parcelasPagas} onChange={(e) => setParcelasPagas(e.target.value)} />
                        </div>
                    </>}
                    <div className={styles.campo}>
                        <label htmlFor="data">Data de pagamento</label>
                        <input required type="text" id="data" className={styles.input} placeholder='Ex: Todo dia 1' value={data} onChange={(e) => setData(e.target.value)} />
                    </div>
                    <button disabled={loading} type="submit" className={styles.botaoCriar}>{loading ? "Carregando..." :"Criar"}</button>
                </form>
            </div>
        </div>
    );
}
