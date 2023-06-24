import {BoardContainer, WoodBoarder} from "./styles";
import Users from "../Users";

interface BoardProps {
    selectedUserCardValue: string | null;
}

const Board = ({selectedUserCardValue}: BoardProps) => {
    return <WoodBoarder>
        <BoardContainer>
            <Users selectedUserCardValue={selectedUserCardValue}/>
        </BoardContainer>
    </WoodBoarder>
}

export default Board