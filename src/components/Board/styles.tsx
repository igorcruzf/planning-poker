import styled from "styled-components";


export const WoodBoarder = styled.div `
  margin-top: 2rem;
  border: 3px solid #332211;
  background-color: #553311;
  border-radius: 33rem;
  padding: 2rem;
`
export const BoardContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35rem;
  width: 70rem;
  background: #35654D;
  border-radius: 33rem;
  border: 3px solid #664433;

  @media (max-height: 768px), (max-width: 1260px) {
    height: 25rem;
    width: 50rem;
  }
`

export const ButtonContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15rem;
  width: 30rem;
  border-radius: 33rem;
  border: 3px solid #cecece;

  @media (max-height: 768px), (max-width: 1260px) {
    height: 7rem;
    width: 15rem;
  }
`