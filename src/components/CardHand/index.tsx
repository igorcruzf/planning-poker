import {useEffect, useState} from 'react';
import {CardHandContainer, CardIndexDiv} from "./styles";
import Card from "../Card";

interface CardHandProps {
    handleSelectCardValue: (value: string) => void;
    shouldChangeCard: boolean
}
const CardHand = ({handleSelectCardValue, shouldChangeCard}: CardHandProps) => {
    const cards = ["PP", "P", "M", "G"];
    let currentColor: 'red' | 'black' = 'red';

    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const [isSelectedByKeyBoard, setIsSelectedByKeyBoard] = useState(false)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const keyIndex = Number(event.key) - 1;
            if (shouldChangeCard && Number.isInteger(keyIndex) && keyIndex >= 0 && keyIndex < cards.length) {
                const value = cards[keyIndex];
                if (keyIndex === selectedCardIndex) {
                    setSelectedCard(null);
                    setSelectedCardIndex(null);
                    handleSelectCardValue('');
                    setIsSelectedByKeyBoard(false)
                } else {
                    setSelectedCard(value);
                    setSelectedCardIndex(keyIndex);
                    handleSelectCardValue(value);
                    setIsSelectedByKeyBoard(true)
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [shouldChangeCard, cards, selectedCardIndex, handleSelectCardValue]);

    const changeCurrentColor = () => {
        if (currentColor === "red") {
            currentColor = "black";
        } else {
            currentColor = "red";
        }
    };

    const handleCardClick = (value: string, index: number) => {
        setIsSelectedByKeyBoard(false)
        if(shouldChangeCard) {
            if(index === selectedCardIndex) {
                setSelectedCard(null);
                setSelectedCardIndex(null);
                handleSelectCardValue("");
            } else {
                setSelectedCard(value);
                setSelectedCardIndex(index);
                handleSelectCardValue(value);
            }
        }
    };

    return (
        <CardHandContainer>
            {cards.map((value, index) => {
                changeCurrentColor();
                return (
                    <div key={index}>
                        <Card
                            value={value}
                            color={currentColor}
                            onClick={() => handleCardClick(value, index)}
                            isSelected={!isSelectedByKeyBoard && selectedCard === value && selectedCardIndex === index}
                        />
                        <CardIndexDiv>
                            {index+1}
                        </CardIndexDiv>
                    </div>

                );
            })}
        </CardHandContainer>
    );
};

export default CardHand;
