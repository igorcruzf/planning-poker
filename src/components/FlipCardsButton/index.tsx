import {Button} from "./styles";

interface FlipCardsButtonProps {
    onRevealChange: (shouldReveal: boolean) => void;
    countdown: number | null;
    haveAllPlayersVoted: boolean;
    isFlipped: boolean;
}

function getButtonMessage(countdown: number | null, isFlipped: boolean, haveAllPlayersVoted: boolean): string {
    if (countdown !== null) {
        return countdown.toString()
    }
    if (isFlipped) {
        return 'Votar novamente'
    }
    return haveAllPlayersVoted ? 'Revelar cartas' : 'Aguardando todos votarem...'
}

export const FlipCardsButton = ({onRevealChange, countdown, haveAllPlayersVoted, isFlipped}: FlipCardsButtonProps) => {
    const isDisabled = countdown !== null || (!isFlipped && !haveAllPlayersVoted)

    function handleClick() {
        if (isFlipped) {
            onRevealChange(false)
        } else if (haveAllPlayersVoted) {
            onRevealChange(true)
        }
    }

    return (
        <Button onClick={handleClick} disabled={isDisabled}>
            {getButtonMessage(countdown, isFlipped, haveAllPlayersVoted)}
        </Button>
    );
};
