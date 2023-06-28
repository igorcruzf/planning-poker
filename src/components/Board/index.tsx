import {BoardContainer, ButtonContainer, WoodBoarder} from "./styles";
import UsersContainer from "../UsersContainer";
import {FlipCardsButton} from "../FlipCardsButton";
import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import Loading from "../Loading";

interface BoardProps {
    user: UserData;
    handleShouldChangeCard: (shouldChangeCard: boolean) => void;
}

export interface UserData {
    id: string;
    name: string;
    votedValue: string;
    currentUser: boolean;
}

const Board = ({user, handleShouldChangeCard}: BoardProps) => {

    const [flipCards, setFlipCards] = useState(false)
    const [users, setUsers] = useState<UserData[]>([user])
    const [socket, setSocket] = useState<Socket>()
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [shouldEmitUpdate, setShouldEmitUpdate] = useState(false);
    const [shouldRevealCards, setShouldRevealCards] = useState(false)

    useEffect( () => {
        const newSocket = io('wss://planning-poker-server-slaf.onrender.com')
        setSocket(newSocket)
    }, []);

    useEffect( () => {
        if(!isLogged && socket) {
            setIsLogged(true)
            socket.emit('login', user)
        }
    }, [isLogged, socket, user]);

    useEffect( () => {
        socket?.on('startReveal', () => {
            console.log("ue")
            setFlipCards(true)
            setShouldRevealCards(true)
            handleShouldChangeCard(false)
        })

        return () => {
            socket?.off('startReveal');
        };
    })

    useEffect( () => {
        socket?.on(`start`, (startUsers) => {
            setUsers((prevUsers) => {
                const newUsers = [];
                for(let i = 0; i < startUsers.length; i++) {
                    const user = prevUsers.find((prevUser) => prevUser.id === startUsers[i].id)
                    if(user === undefined) {
                        newUsers.push(startUsers[i])
                    }
                }
                return [...prevUsers, ...newUsers]
            });
            setIsLoading(false)
        });

        return () => {
            socket?.off('start');
        };
    }, [socket])

    useEffect( () => {
        socket?.on('login', (newUser) => {
            if (newUser.id !== user.id) {
                setUsers((prevUsers) => {
                    return prevUsers.filter((prevUser) => prevUser.id === newUser.id).length !== 0 ?
                        prevUsers : [...prevUsers, newUser]
                });
            }
        });

        socket?.on(`logout`, (userLoggedOut) => {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userLoggedOut.id));
        });

        socket?.on(`update`, (updatedUser) => {
            if (updatedUser.id !== user.id) {
                console.log("u2e")
                console.log(JSON.stringify(updatedUser))
                setUsers((prevUsers) => {
                    const userIndex = prevUsers.findIndex((u) => u.id === updatedUser.id);
                    const updatedUsers = [...prevUsers];
                    updatedUsers[userIndex] = updatedUser;

                    return updatedUsers;
                });
            }
        });

        return () => {
            socket?.off('login');
            socket?.off('logout');
            socket?.off('update');
        };
    }, [socket, user.id])

    useEffect( () => {
        socket?.on('reveal', (shouldReveal) => {
            if(shouldReveal != shouldRevealCards) {
                handleShouldChangeCard(!shouldReveal)
                setShouldRevealCards(shouldReveal)
            }
        })

        return () => {
            socket?.off('reveal')
        }
    }, [handleShouldChangeCard, shouldRevealCards, socket])

    useEffect(() => {
        if (shouldEmitUpdate) {
            socket?.emit('update', user);
            setShouldEmitUpdate(false);
        }
    }, [socket, user, shouldEmitUpdate, flipCards]);

    useEffect(() => {
        setUsers((prevUsers) => {
            const userIndex = prevUsers.findIndex((u) => u.id === user.id);
            const updatedUsers = [...prevUsers];
            updatedUsers[userIndex] = user;

            return updatedUsers;
        });
        setShouldEmitUpdate(true);
    }, [user]);

    function handleFlipCardsAction() {
        setFlipCards(!flipCards)
    }

    function haveAllPlayersVoted(): boolean {
        return users.every(user => user.votedValue !== "");
    }

    function emitRevealAction(shouldReveal: boolean) {
        handleShouldChangeCard(!shouldReveal)
        setShouldRevealCards(shouldReveal)
        socket?.emit('reveal', shouldReveal)
    }

    return  <div>
        { isLoading ? <Loading/> :
            <WoodBoarder>
                <UsersContainer flipCards={flipCards} users={users}>
                    <BoardContainer>
                        <ButtonContainer>
                            <FlipCardsButton
                                handleShouldChangeCard={emitRevealAction}
                                handleFlipAction={handleFlipCardsAction}
                                haveAllPlayersVoted={haveAllPlayersVoted()}
                                shouldRevealCards={shouldRevealCards}
                                isFlipped={flipCards}
                            />
                        </ButtonContainer>
                    </BoardContainer>
                </UsersContainer>
            </WoodBoarder>

        }
    </div>
}

export default Board