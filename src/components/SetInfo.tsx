import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/SetInfo.module.css';

export function SetInfo() {

    const { closeSetInfo } = useContext(ChallengesContext)
    const { time } = useContext(CountdownContext)

    return (
        <div className={styles.setInfoOverlay}>
            <div className={styles.setInfoContainer}>
                <button type="button" onClick={closeSetInfo} >
                    <img src="/icons/close.svg" alt="Fechar Info" />
                </button>
                <div>
                    <div className={styles.inputInfo}>
                        <strong>Nome</strong>
                        <input type="text" />
                    </div>

                    <div className={styles.inputInfo}>
                        <strong>Tempo de produtividade</strong>
                        <p>(Recomendado: 25 minutos)</p>
                        <div className={styles.inputMinSec}>
                            <input
                                onChange={(event) => {
                                    console.log(time);
                                }} type="text" name="message" placeholder="min" />
                            <input
                                onChange={(event) => {
                                    console.log(event.target.value)
                                }} type="text" placeholder="seg" />
                        </div>

                    </div>



                </div>

                <div>

                    <button type="button" onClick={closeSetInfo} >
                        <img src="/icons/close.svg" alt="Fechar Info" />
                    </button>

                </div>

            </div>
        </div>
    );
}