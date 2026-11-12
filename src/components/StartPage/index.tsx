import {Input, Label, StartButton, StartPageContainer, Title} from "./styles";
import {type ChangeEvent, type FormEvent, useState} from "react";
import { useNavigate } from 'react-router';


const StartPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [room, setRoom] = useState("Yak")

    const trimmedName = name.trim()
    const trimmedRoom = room.trim()
    const canStart = trimmedName !== "" && trimmedRoom !== ""

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleChangeRoom(event: ChangeEvent<HTMLInputElement>) {
        setRoom(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (canStart) {
            navigate('/poker', {state: {name: trimmedName, room: trimmedRoom}})
        }
    }

    return <StartPageContainer onSubmit={handleSubmit}>
        <Title> YakPoker </Title>
        <Label htmlFor="name"> Insira seu nome </Label>
        <Input id="name" type={"text"} placeholder={""} value={name} onChange={handleChange} autoFocus/>
        <Label htmlFor="room"> Insira a sala </Label>
        <Input id="room" type={"text"} placeholder={"Yak"} value={room} onChange={handleChangeRoom}/>
        <StartButton type="submit" disabled={!canStart}> Entrar </StartButton>
    </StartPageContainer>
}

export default StartPage
