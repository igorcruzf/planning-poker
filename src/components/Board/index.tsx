import {BoardContainer, ButtonContainer, WoodBoarder} from "./styles";
import UsersContainer from "../UsersContainer";
import {FlipCardsButton} from "../FlipCardsButton";
import {useCallback, useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import Loading from "../Loading";
import Confetti from 'react-confetti';
import {useCountdown} from "../../hooks/useCountdown";

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'wss://planning-poker-server-slaf.onrender.com'
const REVEAL_COUNTDOWN_SECONDS = 3

interface BoardProps {
    user: UserData;
    eraseUserVote: () => void;
    handleShouldChangeCard: (shouldChangeCard: boolean) => void;
    isLoading: boolean;
    handleChangeIsLoading: (isLoading: boolean) => void;
}

export interface UserData {
    id: string;
    name: string;
    votedValue: string;
    room: string;
}

function upsertUser(users: UserData[], user: UserData): UserData[] {
    const userIndex = users.findIndex((u) => u.id === user.id)
    if (userIndex === -1) {
        return [...users, user]
    }
    return users.map((u, index) => index === userIndex ? user : u)
}

function haveAllPlayersSameVotedValue(users: UserData[]): boolean {
    const votedValues = new Set(users.map((u) => u.votedValue))
    return votedValues.size === 1 && !votedValues.has("")
}

const Board = ({user, eraseUserVote, handleShouldChangeCard, isLoading, handleChangeIsLoading}: BoardProps) => {

    const [flipCards, setFlipCards] = useState(false)
    const [otherUsers, setOtherUsers] = useState<UserData[]>([])
    const [socket] = useState(() => io(SERVER_URL, {autoConnect: false}))
    const userRef = useRef(user)
    const isRevealRequestedRef = useRef(false)

    const flipAllCards = useCallback(() => setFlipCards(true), [])
    const {remaining: countdown, start: startCountdown, cancel: cancelCountdown} = useCountdown(flipAllCards)

    useEffect(() => {
        userRef.current = user
    }, [user]);

    const applyReveal = useCallback((shouldReveal: boolean) => {
        if (shouldReveal === isRevealRequestedRef.current) {
            return
        }
        isRevealRequestedRef.current = shouldReveal
        handleShouldChangeCard(!shouldReveal)
        if (shouldReveal) {
            startCountdown(REVEAL_COUNTDOWN_SECONDS)
        } else {
            cancelCountdown()
            setFlipCards(false)
            eraseUserVote()
        }
    }, [handleShouldChangeCard, eraseUserVote, startCountdown, cancelCountdown]);

    useEffect(() => {
        socket.connect()

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    useEffect(() => {
        const login = () => socket.emit('login', userRef.current)

        const onStart = (startUsers: UserData[]) => {
            setOtherUsers(startUsers.filter((u) => u.id !== userRef.current.id))
            handleChangeIsLoading(false)
        }

        const onStartReveal = () => {
            isRevealRequestedRef.current = true
            cancelCountdown()
            setFlipCards(true)
            handleShouldChangeCard(false)
        }

        const onLoginOrUpdate = (changedUser: UserData) => {
            if (changedUser.id !== userRef.current.id) {
                setOtherUsers((prevUsers) => upsertUser(prevUsers, changedUser))
            }
        }

        const onLogout = (userLoggedOut: UserData) => {
            if (userLoggedOut.id === userRef.current.id) {
                login()
                return
            }
            setOtherUsers((prevUsers) => prevUsers.filter((u) => u.id !== userLoggedOut.id))
        }

        socket.on('connect', login)
        socket.on('start', onStart)
        socket.on('startReveal', onStartReveal)
        socket.on('login', onLoginOrUpdate)
        socket.on('update', onLoginOrUpdate)
        socket.on('logout', onLogout)
        socket.on('reveal', applyReveal)

        return () => {
            socket.off('connect', login)
            socket.off('start', onStart)
            socket.off('startReveal', onStartReveal)
            socket.off('login', onLoginOrUpdate)
            socket.off('update', onLoginOrUpdate)
            socket.off('logout', onLogout)
            socket.off('reveal', applyReveal)
        };
    }, [socket, applyReveal, cancelCountdown, handleShouldChangeCard, handleChangeIsLoading]);

    useEffect(() => {
        if (socket.connected) {
            socket.emit('update', user);
        }
    }, [socket, user]);

    function emitRevealAction(shouldReveal: boolean) {
        applyReveal(shouldReveal)
        socket.emit('reveal', shouldReveal)
    }

    const users = [user, ...otherUsers]
    const haveAllPlayersVoted = users.every((u) => u.votedValue !== "")
    const shouldRunConfetti = flipCards && haveAllPlayersSameVotedValue(users)

    return  <div>
        { isLoading ? <Loading/> :
            <WoodBoarder>
                <UsersContainer flipCards={flipCards} users={users}>
                    <BoardContainer>
                        <ButtonContainer>
                            <FlipCardsButton
                                onRevealChange={emitRevealAction}
                                countdown={countdown}
                                haveAllPlayersVoted={haveAllPlayersVoted}
                                isFlipped={flipCards}
                            />
                        </ButtonContainer>
                    </BoardContainer>
                </UsersContainer>
                {shouldRunConfetti && <Confetti initialVelocityX={7} />}
            </WoodBoarder>
        }
    </div>
}

export default Board
