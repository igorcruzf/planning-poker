import styled, {css} from "styled-components";

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

export const CardComponent = styled.div<{selected: boolean}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  width: 4rem;
  ${props => getBackground(props.selected)};
  border: 1px solid #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;