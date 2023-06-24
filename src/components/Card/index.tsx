import {CardContainer} from "./styles";
import {useSpring} from "@react-spring/web";

export interface CardProps {
    value: string;
    color: 'red' | 'black';
    onClick: () => void;
    isSelected: boolean;
}

const Card = ({ value, color, onClick, isSelected}: CardProps) => {
    const animationProps = useSpring({
        to: {
            opacity: isSelected ? 1 : 0.8,
            y: isSelected ? -50 : 0,
            transform: isSelected ? 'scale(1.2)' : 'scale(1.0)',
        }
    });

    return (
        <CardContainer style={animationProps} color={color} onClick={onClick}>
            {value}
        </CardContainer>
    );
};

export default Card;
