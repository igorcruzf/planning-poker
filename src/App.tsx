import './App.css'
import Board from "./components/Board";
import CardHand from "./components/CardHand";
import {useState} from "react";

function App() {

    const [selectedCardValue, setSelectedCardValue] = useState<string | null>("P")

    function handleSelectCardValue(selectedValue: string | null) {
        setSelectedCardValue(selectedValue)
    }

    return (
        <>
            <Board selectedUserCardValue={selectedCardValue}/>
            <CardHand handleSelectCardValue={handleSelectCardValue}/>
        </>
    )
}

export default App
