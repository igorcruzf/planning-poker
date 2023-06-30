import Board, {UserData} from "../Board";
import CardHand from "../CardHand";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {useLocation, useNavigate} from "react-router-dom";


const PokerPage = () => {
    const [selectedCardValue, setSelectedCardValue] = useState<string>("")
    const [shouldChangeCard, setShouldChangeCard] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<UserData>({
        id: uuidv4(),
        name: "",
        votedValue: selectedCardValue,
        room: "",
    });
    const [updateUser, setUpdateUser] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect( () => {
        if(!location.state) {
            navigate("/")
        }
        const { name, room } = location.state

        setUser((prevState) => {
            prevState.name = name
            prevState.room = room
            return prevState
        })
        setUpdateUser(true)
    }, [location.state, navigate])

    useEffect( () => {
        setSelectedCardValue(user.votedValue)
    }, [user])

    function handleSelectCardValue(selectedValue: string) {
        setUser((prevUser) => ({
            ...prevUser,
            votedValue: selectedValue,
        }));
    }

    function handleShouldChangeCard(shouldChange: boolean) {
        setShouldChangeCard(shouldChange)
    }

    function handleChangeIsLoading(isLoading: boolean) {
        setIsLoading(isLoading)
    }

    function eraseUserVote() {
        handleSelectCardValue("")
    }


    return <> {
        !updateUser? <></> : <>
            <Board user={user} eraseUserVote={eraseUserVote} handleShouldChangeCard={handleShouldChangeCard} isLoading={isLoading} handleChangeIsLoading={handleChangeIsLoading} />
            <CardHand cardValue={selectedCardValue} handleSelectCardValue={handleSelectCardValue} shouldChangeCard={shouldChangeCard} isLoading={isLoading}/>
        </>
    } </>
}

export default PokerPage