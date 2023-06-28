import {NameInput, NameLabel, StartButton, StartPageContainer, Title} from "./styles";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';


const StartPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleStartClick(){
        if(name.length !== 0)
        navigate('poker', {state: {name}})
    }

    return <StartPageContainer>
        <Title> YakPoker </Title>
        <NameLabel> Insira seu nome </NameLabel>
        <NameInput type={"text"} placeholder={""} value={name} onChange={handleChange}/>
        <StartButton onClick={handleStartClick}> Entrar </StartButton>
    </StartPageContainer>
}

export default StartPage