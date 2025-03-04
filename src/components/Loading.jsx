import styles from "./Loading.module.css";

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.spinner}></div>
                <p>Carregando...</p>
            </div>

        </div>
    );
};

export default Loading;