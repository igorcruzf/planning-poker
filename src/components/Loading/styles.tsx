import styled from 'styled-components';
import {Card} from "../Card/styles";

export const Spinner = styled(Card)`
  background: linear-gradient(45deg, #ff396e 12%, transparent 0, transparent 88%, #ff396e 0), 
    linear-gradient(135deg, transparent 37%, #f21a42 0, #f21a42 63%, transparent 0), 
    linear-gradient(45deg, transparent 37%, #ff3967 0, #ff3967 63%, transparent 0),
    #ff7484;
  background-size: 2rem 2rem;
  z-index: 1;
  position: absolute;
  border: 1px solid black;
`;

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;