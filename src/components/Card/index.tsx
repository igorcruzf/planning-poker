import {CardContainer, CornerText, Diamond, MirroredCornerText} from "./styles";
import {useSpring} from "@react-spring/web";
import {getCardColor} from "../CardHand/constants";

export interface CardProps {
    value: string;
    onClick?: () => void;
    isSelected: boolean;
}

const diamondScaleByValue: Record<string, number> = {
    PP: 0.7,
    P: 0.9,
    M: 1.1,
    G: 1.5,
}

const Card = ({ value, onClick, isSelected }: CardProps) => {
    const animationProps = useSpring({
        to: {
            y: isSelected ? -50 : 0,
            transform: isSelected ? 'scale(1.2)' : 'scale(1.0)',
        }
    });
    const color = getCardColor(value)

    return (
        <CardContainer style={animationProps} $color={color} onClick={onClick}>
            <CornerText>{value}</CornerText>
            <Diamond $scale={diamondScaleByValue[value] ?? 0} $color={color}/>
            <MirroredCornerText>{value}</MirroredCornerText>
        </CardContainer>
    );
};

export default Card;
