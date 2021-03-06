import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level, openSetInfo } = useContext(ChallengesContext)

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/nathanheinzmann.png" alt="Nathan Heinzmann"/>
            <div>
                <strong>Nathan Heinzmann </strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
            <div >
                <button type="button" className={styles.buttonSetInfo}
                onClick={openSetInfo}> Alterar Informações </button>
            </div>
        </div>
    );
}