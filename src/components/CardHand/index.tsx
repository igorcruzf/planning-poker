import {useState} from 'react';
import {CardHandContainer} from "./styles";
import Card from "../Card";

interface CardHandProps {
    handleSelectCardValue: (value: string | null) => void;
}
const CardHand = ({handleSelectCardValue}: CardHandProps) => {
    const cards = ["PP", "P", "M", "G"];
    let currentColor: 'red' | 'black' = 'red';

    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

    const changeCurrentColor = () => {
        if (currentColor === "red") {
            currentColor = "black";
        } else {
            currentColor = "red";
        }
    };

    const handleCardClick = (value: string, index: number) => {
        if(index === selectedCardIndex) {
            setSelectedCard(null);
            setSelectedCardIndex(null);
            handleSelectCardValue(null);
        } else {
            setSelectedCard(value);
            setSelectedCardIndex(index);
            handleSelectCardValue(value);
        }

    };

    return (
        <CardHandContainer>
            {cards.map((value, index) => {
                changeCurrentColor();
                return (
                    <Card
                        key={index}
                        value={value}
                        color={currentColor}
                        onClick={() => handleCardClick(value, index)}
                        isSelected={selectedCard === value && selectedCardIndex === index}
                    />
                );
            })}
        </CardHandContainer>
    );
};

export default CardHand;
