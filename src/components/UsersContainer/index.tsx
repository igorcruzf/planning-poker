import React, {useEffect, useRef, useState} from 'react';
import {FieldContainer, User, UserName, UsersContainer} from "./styles";
import SelectedCard from "../SelectedCard";
import {UserData} from "../Board";

interface UsersProps {
    flipCards: boolean;
    children: React.ReactNode;
    users: UserData[]
}

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}
const Users = ({ flipCards, children, users }: UsersProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const userRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
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
    }, [users, size]);

    const createFields = () => {
        const fields = [];

        for (let i = 0; i < users.length; i++) {
            fields.push(
                <FieldContainer key={i}>
                    <SelectedCard ref={(el: HTMLDivElement | null) => (cardRefs.current[i] = el)} flipped={flipCards} value={users[i].votedValue}/>
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
