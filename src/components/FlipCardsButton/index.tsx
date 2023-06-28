import {Button} from "./styles";
import { useState, useEffect } from "react";


interface FlipCardsButtonProps {
    handleShouldChangeCard: (shouldReveal: boolean) => void;

    handleFlipAction: () => void;
    haveAllPlayersVoted: boolean;
    shouldRevealCards: boolean;
    isFlipped: boolean
}

export const FlipCardsButton = ({ shouldRevealCards, handleShouldChangeCard, handleFlipAction, haveAllPlayersVoted, isFlipped }: FlipCardsButtonProps) => {
    const [countdown, setCountdown] = useState<number | null>(null);
    const [buttonMessage, setButtonMessage] = useState('Aguardando todos votarem...')
    const [isRevealed, setIsRevealed] = useState(isFlipped)

    useEffect( () => {
        setIsRevealed(isFlipped)
    }, [isFlipped])

    useEffect(() => {
        let intervalId: NodeJS.Timer;

        if(countdown !== null) {
            if (countdown > 0) {
                intervalId = setInterval(() => {
                    setCountdown(prevCountdown => prevCountdown? prevCountdown - 1 : 0);
                }, 1000);
            } else if (countdown === 0) {
                handleFlipAction();
                setIsRevealed(true)
                setCountdown(null)
            }
        }

        if(haveAllPlayersVoted && !isRevealed) {
            setButtonMessage('Revelar cartas');
        } else if(!isRevealed){
            setButtonMessage('Aguardando todos votarem...');
        } else {
            setButtonMessage('Votar novamente')
        }

        if(countdown) {
            setButtonMessage(countdown.toString())
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [countdown, handleFlipAction, haveAllPlayersVoted, isRevealed]);

    useEffect( () => {
        if(shouldRevealCards && !isRevealed && !isFlipped) {
            setCountdown(3);
        } else if(isRevealed && !shouldRevealCards) {
            handleFlipAction();
            setIsRevealed(false);
        }
    }, [shouldRevealCards, isRevealed, handleFlipAction, isFlipped])
    function handleClick() {
        if(isRevealed) {
            handleShouldChangeCard(false)
        }
        else if (haveAllPlayersVoted) {
            handleShouldChangeCard(true)
        }
    }

    return (
        <Button onClick={handleClick} disabled={!haveAllPlayersVoted && !isRevealed}>
            {buttonMessage}
        </Button>
    );
};