import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { SetInfo } from '../components/SetInfo';


 
interface Challenge{
    type: 'body'|'eye';
    description: string;
    amount: number;
}

interface ChallangesContextData{
    level: number;
    levelUp: ()=> void;
    currentExperience: number;
    challengesCompleted: number;
    startNewChallenge: ()=> void;
    activeChallenge: Challenge;
    resetChallenge: ()=> void;
    completeChallenge: ()=> void;
    experienceToNextLevel: number;
    beginLevel: number;
    closeLevelUpModal: ()=> void;
    closeSetInfo: ()=> void;
    openSetInfo: ()=> void;
}

interface ChallengesProviderProps {
    children: ReactNode;
        level: number;
        currentExperience: number;
        challengesCompleted: number;
        beginLevel: number;
}



export const ChallengesContext = createContext({} as ChallangesContextData);

export function ChallengesProvider({ children, ...rest } : ChallengesProviderProps){
    
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level+1)*4, 2)
    const [beginLevel, setBeginLevel] = useState(rest.beginLevel ?? 0);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [isSetInfoOpen, setIsSetInfoOpen] = useState(false);

    
    useEffect(()=>{
        Notification.requestPermission();
    }, [])

    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
        Cookies.set('beginLevel', String(beginLevel));
    }, [level, currentExperience, challengesCompleted, beginLevel]);

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function closeSetInfo(){
        setIsSetInfoOpen(false);
    }

    function openSetInfo(){
        setIsSetInfoOpen(true);
    }

    function levelUp(){
        setBeginLevel(experienceToNextLevel);
        setLevel(level +1);
        setIsLevelUpModalOpen(true);
    }  

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉',
                {body: `Valendo ${challenge.amount}xp`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){ return; }
        
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            //finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    return(
        <ChallengesContext.Provider value={{
            level,
            levelUp,
            currentExperience,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            beginLevel,
            closeLevelUpModal,
            closeSetInfo,
            openSetInfo,
            }}>
            {children}

            {isLevelUpModalOpen && < LevelUpModal />}
            {isSetInfoOpen && < SetInfo />}

        </ChallengesContext.Provider>
    );
}