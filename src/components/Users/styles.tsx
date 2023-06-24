import styled from "styled-components";


export const UsersContainer = styled.div`
  position: relative;
  display: flex;
  width: inherit;
  height: inherit;
  z-index: 2;
`;

export const FieldContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const User = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 4rem;
  color: #c5c5c5;
  border-radius: 50%;
  border: 1px solid #380707;
  background-color: #670000;
`;