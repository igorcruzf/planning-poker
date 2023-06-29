import {Input, Label, StartButton, StartPageContainer, Title} from "./styles";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';


const StartPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [room, setRoom] = useState("Yak")

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleChangeRoom(event: React.ChangeEvent<HTMLInputElement>) {
        setRoom(event.target.value);
    }

    function handleStartClick(){
        if(name.length !== 0)
        navigate('poker', {state: {name, room}})
    }

    return <StartPageContainer>
        <Title> YakPoker </Title>
        <Label> Insira seu nome </Label>
        <Input type={"text"} placeholder={""} value={name} onChange={handleChange}/>
        <Label> Insira a sala </Label>
        <Input type={"text"} placeholder={"Yak"} value={room} onChange={handleChangeRoom}/>
        <StartButton onClick={handleStartClick}> Entrar </StartButton>
    </StartPageContainer>
}

export default StartPage