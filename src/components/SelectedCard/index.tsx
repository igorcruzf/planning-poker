import React from "react";
import {BackCardComponent, SelectedCardContainer, FrontCardComponent} from "./styles";
import {useSpring} from "@react-spring/web";

interface SelectedCardProps {
    value: string;
    flipped: boolean;
}

const SelectedCard = React.forwardRef<HTMLDivElement, SelectedCardProps>(({value, flipped}: SelectedCardProps, ref) => {

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })

    return (
        <SelectedCardContainer ref={ref}>
            <BackCardComponent selected={value != ""} style={{
                opacity: opacity.to(o => 1 - o),
                transform
            }}/>
            <FrontCardComponent color={'black'} style={{
                opacity,
                transform,
                rotateY: '-180deg'
            }}>
                {value}
            </FrontCardComponent>
        </SelectedCardContainer>
    );
});

export default SelectedCard;