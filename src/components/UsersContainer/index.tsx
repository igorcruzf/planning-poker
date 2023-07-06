import React, {useEffect, useRef, useState} from 'react';
import {FieldContainer, SelectedCardContainer, User, UserName, UsersContainer} from "./styles";
import SelectedCard from "../SelectedCard";
import {UserData} from "../Board";

interface UsersProps {
    flipCards: boolean;
    children: React.ReactNode;
    users: UserData[]
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}
const Users = ({ flipCards, children, users }: UsersProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const userRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [highlightedValue, setHighlightedValue] = useState<string | null>(null);

    const handleMouseEnter = (value: string) => {
        setHighlightedValue(value);
    };

    const handleMouseLeave = () => {
        setHighlightedValue(null);
    };
    const size = useWindowSize()

    useEffect(() => {
        const distributeUserContainers = () => {
            const container = containerRef.current;
            function distributeCards(step: number, containerWidth: number, containerHeight: number) {
                cardRefs.current.forEach((card, index) => {
                    if (card) {
                        const angle = step * index - Math.PI * 1.5;
                        const x = Math.round(
                            (-150 + (containerWidth / 2)) * Math.cos(angle)
                        );
                        const y = Math.round(
                            (-80 + (containerHeight / 2)) * Math.sin(angle)
                        );

                        const rotation = angle * (180 / Math.PI) - 90;

                        card.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

                    }
                });
            }

            function distributeUsers(step: number, containerWidth: number, containerHeight: number) {
                userRefs.current.forEach((user, index) => {
                    if (user) {
                        const angle = (step * index) - (Math.PI * 1.5);
                        const x = Math.round(containerWidth / 2 * Math.cos(angle));
                        const y = Math.round((50 + containerHeight / 2) * Math.sin(angle));

                        user.style.transform = `translate(${x}px, ${y}px)`;
                    }
                });
                return {containerWidth, containerHeight, step};
            }

            if (container) {
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                const step = (2 * Math.PI) / users.length;
                distributeUsers(step, containerWidth, containerHeight);
                distributeCards(step, containerWidth, containerHeight);
            }
        }

        distributeUserContainers()
    }, [users, size, highlightedValue]);

    const createFields = () => {
        const fields = [];

        for (let i = 0; i < users.length; i++) {
            const isHighlighted = !flipCards || highlightedValue === null || users[i].votedValue === highlightedValue;
            fields.push(
                <FieldContainer key={i}>
                    <SelectedCardContainer
                        onMouseEnter={() => handleMouseEnter(users[i].votedValue)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <SelectedCard
                            ref={(el: HTMLDivElement | null) => (cardRefs.current[i] = el)}
                            flipped={flipCards}
                            value={users[i].votedValue}
                            highlighted={isHighlighted}
                        />
                    </SelectedCardContainer>
                    <User ref={(el: HTMLDivElement | null) => (userRefs.current[i] = el)}>
                        <UserName>
                            {users[i].name}
                        </UserName>
                    </User>
                </FieldContainer>
            );
        }
        return fields;
    };

    return (
        <div>
            <UsersContainer ref={containerRef}>
                {createFields()}
                {children}
            </UsersContainer>
        </div>
    );
};

export default Users;
