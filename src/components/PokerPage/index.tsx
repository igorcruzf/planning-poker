import Board, {type UserData} from "../Board";
import CardHand from "../CardHand";
import {useCallback, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {Navigate, useLocation} from "react-router";

interface PokerPageState {
    name: string;
    room: string;
}

function isValidPokerPageState(state: unknown): state is PokerPageState {
    if (typeof state !== "object" || state === null) {
        return false
    }
    const {name, room} = state as Record<string, unknown>
    return typeof name === "string" && name.trim() !== "" && typeof room === "string" && room.trim() !== ""
}

const PokerPage = () => {
    const {state} = useLocation()

    if (!isValidPokerPageState(state)) {
        return <Navigate to="/" replace/>
    }

    return <PokerRoom name={state.name} room={state.room}/>
}

const PokerRoom = ({name, room}: PokerPageState) => {
    const [user, setUser] = useState<UserData>(() => ({
        id: uuidv4(),
        name,
        votedValue: "",
        room,
    }))
    const [canChangeCard, setCanChangeCard] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const handleSelectCardValue = useCallback((votedValue: string) => {
        setUser((prevUser) => ({...prevUser, votedValue}))
    }, [])

    const eraseUserVote = useCallback(() => handleSelectCardValue(""), [handleSelectCardValue])

    return <>
        <Board
            user={user}
            eraseUserVote={eraseUserVote}
            handleShouldChangeCard={setCanChangeCard}
            isLoading={isLoading}
            handleChangeIsLoading={setIsLoading}
        />
        <CardHand
            cardValue={user.votedValue}
            handleSelectCardValue={handleSelectCardValue}
            shouldChangeCard={canChangeCard}
            isLoading={isLoading}
        />
    </>
}

export default PokerPage
