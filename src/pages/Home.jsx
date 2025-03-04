import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import NovaDespesa from '../components/NovaDespesa';
import svg from '../assets/phone.svg'
import CardDespesa from '../components/CardDespesa';
import ModalDespesa from '../components/ModalDespesa';
import { useExpense } from '../hooks/useExpense';
import Loading from '../components/Loading';



const Home = () => {
    const [expenseModal, setExpenseModal] = useState(false)
    const [despesaSelecionada, setDespesaSelecionada] = useState(null);
    const [expenses, setExpenses] = useState([])
    const [showNewExpense, setShowNewExpense] = useState(false)
    const [reload, setReload] = useState(false)
    const { getExpenses, error, loading } = useExpense()
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await getExpenses();
                setExpenses(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchExpenses()

    }, [reload, expenseModal])
    const handleExpenseModal = (despesa) => {
        setDespesaSelecionada(despesa);
        setExpenseModal(true);
    }
    return (
        <div className={styles.expense}>
            {!loading && <NovaDespesa reload={() => setReload(!reload)} onClose={() => setShowNewExpense(false)} isOpen={showNewExpense} />}
            {!loading &&  <ModalDespesa data={despesaSelecionada} onClose={() => setExpenseModal(false)} isOpen={expenseModal} /> }
           
            <div className={styles.container}>
                <div className={styles.containerFluxo}>
                    <div className={styles.fluxoGastos}>
                        <h1 className={styles.titulo}>Fluxo de gastos</h1>
                        <div className={styles.itens}>
                            <div className={styles.item}>
                                <span className={styles.itemText}>Pago</span>
                                <span>R$ 250,99</span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.itemText}>Pendente</span>
                                <span>R$ 10,00</span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.itemText}>Total</span>
                                <span>R$ 260,99</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.svgContainer}>
                    <img src={svg} alt="svg" />
                </div>
            </div>
            <div className={styles.minhasDespesas}>
                <h1 className={styles.titulo}>Minhas despesas</h1>
                <div className={styles.expenseBtns}>
                    <button onClick={() => setShowNewExpense(true)} className={styles.newExpense}>Nova despesa</button>
                </div>
                <div className={styles.expenseContainer}>
                    {loading && <Loading />}
                    {(expenses && !loading) && expenses.map((expense) => (
                        <CardDespesa openModal={handleExpenseModal} key={expense._id} data={expense} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Home;