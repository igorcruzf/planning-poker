import {CardContainer, CornerText, Diamond, MirroredCornerText} from "./styles";
import {useSpring} from "@react-spring/web";
import {getCardColor} from "../CardHand/constants";

export interface CardProps {
    value: string;
    onClick?: () => void;
    isSelected: boolean;
}

const Card = ({ value, onClick, isSelected }: CardProps) => {
    const animationProps = useSpring({
        to: {
            y: isSelected ? -50 : 0,
            transform: isSelected ? 'scale(1.2)' : 'scale(1.0)',
        }
    });

    function getScaleSize(value: string) {
        switch (value) {
            case 'PP':
                return 0.7
            case 'P':
                return 0.9
            case 'M':
                return 1.1
            case 'G':
                return 1.5
            default:
                return 0
        }
    }

    return (
        <CardContainer style={animationProps} color={getCardColor(value)} onClick={onClick}>
            <CornerText>{value}</CornerText>
            <Diamond scale={getScaleSize(value)} color={getCardColor(value)}/>
            <MirroredCornerText>{value}</MirroredCornerText>
        </CardContainer>
    );
};

export default Card;
