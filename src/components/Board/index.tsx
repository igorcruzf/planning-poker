import {BoardContainer, ButtonContainer, WoodBoarder} from "./styles";
import UsersContainer from "../UsersContainer";
import {FlipCardsButton} from "../FlipCardsButton";
import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import Loading from "../Loading";

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

const Board = ({user, eraseUserVote, handleShouldChangeCard, isLoading, handleChangeIsLoading}: BoardProps) => {

    const [flipCards, setFlipCards] = useState(false)
    const [users, setUsers] = useState<UserData[]>([user])
    const [socket, setSocket] = useState<Socket>()
    const [isLogged, setIsLogged] = useState(false)
    const [shouldEmitUpdate, setShouldEmitUpdate] = useState(false);
    const [shouldRevealCards, setShouldRevealCards] = useState(false)

    useEffect( () => {
        const newSocket = io('wss://planning-poker-server-slaf.onrender.com')
        setSocket(newSocket)

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect( () => {
        if(!isLogged && socket) {
            setIsLogged(true)
            socket.emit('login', user)
        }
    }, [isLogged, socket, user]);

    useEffect( () => {
        socket?.on('startReveal', () => {
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
            handleChangeIsLoading(false)
        });

        return () => {
            socket?.off('start');
        };
    }, [handleChangeIsLoading, socket])

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
                if(!shouldReveal){
                    eraseUserVote()
                }
            }
        })

        return () => {
            socket?.off('reveal')
        }
    }, [handleShouldChangeCard, eraseUserVote, shouldRevealCards, socket])

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
        if(!shouldReveal){
            eraseUserVote()
        }
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