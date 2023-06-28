import styled, {css} from "styled-components";
import {animated} from "@react-spring/web";
import {CardContainer} from "../Card/styles";

const getBackground = (selected: boolean) => {
    if (selected) {
        return css`
          background: linear-gradient(45deg, #ff396e 12%, transparent 0, transparent 88%, #ff396e 0),
          linear-gradient(135deg, transparent 37%, #f21a42 0, #f21a42 63%, transparent 0),
          linear-gradient(45deg, transparent 37%, #ff3967 0, #ff3967 63%, transparent 0),
          #ff7484
        `;
    } else {
        return css`
          background: #a2a2a2;
        `;
    }
};

const getFrontBackground = (selected: boolean) => {
    if (selected) {
        return css`
          background: #a2a2a2 !important;
        `;
    }
};

export const SelectedCardContainer = styled.div`
  position: absolute;
  height: 7rem;
  width: 4rem;
`;

export const BackCardComponent = styled(animated.div)<{selected: boolean}>`
  position: absolute;
  height: inherit;
  width: inherit;
  ${props => getBackground(props.selected)};
  border: 1px solid #ffffff;
  background-size: 2rem 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 1rem;
`;

export const FrontCardComponent = styled(CardContainer)<{selected: boolean}>`
  position: absolute;
  height: inherit;
  ${props => getFrontBackground(props.selected)};
  width: inherit;
  border: 2px;
`;