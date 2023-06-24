import styled, {css} from "styled-components";
import {animated} from "@react-spring/web";

const getCardColor = (color?: 'red' | 'black') => {
    switch (color) {
        case 'red':
            return css`
              color: #9f0202;
            `;
        case 'black':
            return css`
              color: #1a1a1a;
            `;
    }
};

export const CardContainer = styled(animated.div)<{color: 'red' | 'black'}>`
  height: 7rem;
  width: 4rem;
  background: white;
  border-radius: 1rem;
  ${props => getCardColor(props.color)}
  font-size: 2rem;
  text-align: center;
  vertical-align: middle;
  line-height: 7rem;
  top: 50%;
  left: 50%;
  border: 3px solid #000000;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    background: #e7e7e7;
    cursor: pointer;
  }
};
`