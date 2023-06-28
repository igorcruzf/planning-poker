import {Spinner, Wrapper} from "./styles";
import React from "react";
import {useSpring} from "@react-spring/web";

const Loading: React.FC = () => {
    const springProps1 = useSpring({
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
        loop: true,
        config: { duration: 1000 },
    });

    const springProps2 = useSpring({
        from: { transform: 'rotate(-180deg)' },
        to: { transform: 'rotate(-540deg)' },
        loop: true,
        config: { duration: 1000 },
    });

    return <Wrapper>
        <Spinner color={'red'} style={springProps1}/>
        <Spinner color={'red'} style={springProps2}/>
    </Wrapper>
};

export default Loading;