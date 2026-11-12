import {useCallback, useEffect, useState} from 'react';
import {CardHandContainer, CardIndexDiv} from "./styles";
import Card from "../Card";
import {cards} from "./constants";

interface CardHandProps {
    cardValue: string;
    handleSelectCardValue: (value: string) => void;
    shouldChangeCard: boolean;
    isLoading: boolean;
}

function getCardByShortcut(event: KeyboardEvent): string | undefined {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || !/^[1-9]$/.test(event.key)) {
        return undefined
    }
    return cards[Number(event.key) - 1]
}

const CardHand = ({cardValue, handleSelectCardValue, shouldChangeCard, isLoading}: CardHandProps) => {
    const [isSelectedByKeyboard, setIsSelectedByKeyboard] = useState(false)

    const toggleCard = useCallback((value: string, isKeyboardSelection: boolean) => {
        if (!shouldChangeCard) {
            return
        }
        const isDeselecting = value === cardValue
        handleSelectCardValue(isDeselecting ? "" : value)
        setIsSelectedByKeyboard(isKeyboardSelection && !isDeselecting)
    }, [shouldChangeCard, cardValue, handleSelectCardValue]);

    useEffect(() => {
        if (isLoading) {
            return
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            const value = getCardByShortcut(event)
            if (value) {
                toggleCard(value, true)
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isLoading, toggleCard]);

    if (isLoading) {
        return null
    }

    return <CardHandContainer>
        {cards.map((value, index) => (
            <div key={value}>
                <Card
                    value={value}
                    onClick={() => toggleCard(value, false)}
                    isSelected={!isSelectedByKeyboard && cardValue === value}
                />
                <CardIndexDiv>
                    {index + 1}
                </CardIndexDiv>
            </div>
        ))}
    </CardHandContainer>;
};

export default CardHand;
