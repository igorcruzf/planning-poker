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

const getBackgroundCardColor = (color?: 'red' | 'black') => {
    switch (color) {
        case 'red':
            return css`
              background: #9f0202;
            `;
        case 'black':
            return css`
              background: #1a1a1a;
            `;
    }
};


export const Card = styled(animated.div)<{color: 'red' | 'black'}>`
  height: 7rem;
  width: 4rem;
  background: white;
  border-radius: 1rem;
  ${props => getCardColor(props.color)}
  font-size: 1.5rem;
  text-align: center;
  vertical-align: middle;
  line-height: 7rem;
  border: 3px solid #000000;
`;

export const CardContainer = styled(Card)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 3;

  &:hover {
    background: #e7e7e7;
    cursor: pointer;
  }
`

export const CornerText = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  transform: translateX(-20%) translateY(-30%);
`;

export const MirroredCornerText = styled(CornerText)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  transform: translateX(20%) translateY(30%) rotate(180deg);
`;

export const Diamond = styled.div<{scale: number, color: 'red' | 'black'}>`
  width: ${({scale}) => scale * 20}px;
  height: ${({scale}) => scale * 20}px;
  ${props => getBackgroundCardColor(props.color)}
  transform: rotate(45deg);
`;