import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    time: Number;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;

}

export const CountdownContext = createContext({} as CountdownContextData)

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children, ...props }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function setMinutes(min: any) {
        const timer = min * 60
        setTime(timer);
    }

    function resetCountdown() {
        setIsActive(false);
        clearTimeout(countdownTimeout);
        setHasFinished(false);
        setTime(25 * 60);
    }


    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);


    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            time,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    );  
}