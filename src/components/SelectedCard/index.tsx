import React from "react";
import {CardComponent} from "./styles";

interface SelectedCardProps {
    value: string | null;
}

const SelectedCard = React.forwardRef<HTMLDivElement, SelectedCardProps>(( {value}: SelectedCardProps, ref) => {
    return (
        <CardComponent ref={ref} selected={value != null}>
            {/*{value}*/}
        </CardComponent>
    );
});

export default SelectedCard;