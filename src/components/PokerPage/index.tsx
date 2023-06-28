import Board, {UserData} from "../Board";
import CardHand from "../CardHand";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {useLocation, useNavigate} from "react-router-dom";


const PokerPage = () => {
    const [selectedCardValue, setSelectedCardValue] = useState<string>("")
    const [shouldChangeCard, setShouldChangeCard] = useState(true)
    const [user, setUser] = useState<UserData>({
        id: uuidv4(),
        name: "",
        votedValue: selectedCardValue,
        currentUser: true,
    });

    const location = useLocation()
    const navigate = useNavigate()

    useEffect( () => {
        if(!location.state) {
            navigate("/")
        }
        const { name } = location.state

        setUser((prevState) => {
            prevState.name = name
            return prevState
        })

    }, [location.state, navigate])




    function handleSelectCardValue(selectedValue: string) {
        setSelectedCardValue(selectedValue);
        setUser((prevUser) => ({
            ...prevUser,
            votedValue: selectedValue,
        }));
    }

    function handleShouldChangeCard(shouldChange: boolean) {
        setShouldChangeCard(shouldChange)
    }

    return <>
        <Board user={user} handleShouldChangeCard={handleShouldChangeCard}/>
        <CardHand handleSelectCardValue={handleSelectCardValue} shouldChangeCard={shouldChangeCard}/>
    </>
}

export default PokerPage