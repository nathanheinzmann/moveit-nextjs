import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';


export function ExperienceBar(){
    const { currentExperience, experienceToNextLevel, beginLevel } = useContext(ChallengesContext);

    const percentToNextLevel =  Math.round(((currentExperience - beginLevel)*100)/(experienceToNextLevel - beginLevel));

    return(
        <header className={styles.experienceBar}>
            <span>{beginLevel} xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%`}} />
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel }%` }}>{currentExperience}xp</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}