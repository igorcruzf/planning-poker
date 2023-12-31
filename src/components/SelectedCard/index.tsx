import React from "react";
import {BackCardComponent, SelectedCardContainer, FrontCardComponent} from "./styles";
import {useSpring} from "@react-spring/web";
import Card from "../Card";
import {getCardColor} from "../CardHand/constants";

interface SelectedCardProps {
    value: string;
    flipped: boolean;
    highlighted: boolean;
}

const SelectedCard = React.forwardRef<HTMLDivElement, SelectedCardProps>(({value, flipped, highlighted}: SelectedCardProps, ref) => {

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })

    return (
        <SelectedCardContainer highlighted={highlighted.toString()} ref={ref}>
            <BackCardComponent selected={value != ""} style={{
                opacity: opacity.to(o => 1 - o),
                transform
            }}/>
            <FrontCardComponent color={getCardColor(value)} selected={value != ""} style={{
                opacity: opacity,
                transform,
                rotateY: '-180deg'
            }}>
                <Card value={value} isSelected={false}/>
            </FrontCardComponent>
        </SelectedCardContainer>
    );
});

export default SelectedCard;