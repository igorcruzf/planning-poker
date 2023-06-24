import { useEffect, useRef, useState } from 'react';
import {FieldContainer, User, UsersContainer} from "./styles";
import SelectedCard from "../SelectedCard";

interface UsersProps {
    selectedUserCardValue: string | null;
}
const Users = ({selectedUserCardValue}: UsersProps) => {
    const [userCount, _setUserCount] = useState(2);
    const containerRef = useRef<HTMLDivElement>(null);
    const userRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const distributeUserContainers = () => {
            const container = containerRef.current;

            function distributeCards(step: number, containerWidth: number, containerHeight: number) {
                cardRefs.current.forEach((card, index) => {
                    if (card) {
                        const baseX = 480;
                        const baseY = 200;
                        const angle = step * index - Math.PI * 1.5;
                        const x = Math.round(
                            containerWidth / 2 + baseX * Math.cos(angle)
                        );
                        const y = Math.round(
                            containerHeight / 2 + baseY * Math.sin(angle)
                        );

                        const rotation = angle * (180 / Math.PI) - 90;

                        card.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

                    }
                });
            }

            function distributeUsers(step: number, containerWidth: number, containerHeight: number) {
                const baseX = 640;
                const baseY = 340;

                userRefs.current.forEach((user, index) => {
                    if (user) {
                        const angle = (step * index) - (Math.PI * 1.5);
                        const x = Math.round(containerWidth / 2 + baseX * Math.cos(angle));
                        const y = Math.round(containerHeight / 2 + baseY * Math.sin(angle));

                        user.style.transform = `translate(${x}px, ${y}px)`;
                    }
                });
                return {containerWidth, containerHeight, step};
            }

            if (container) {
                const containerWidth = container.clientWidth / 16;
                const containerHeight = container.clientHeight / 16;
                const step = (2 * Math.PI) / userCount;
                distributeUsers(step, containerWidth, containerHeight);
                distributeCards(step, containerWidth, containerHeight);
            }
        }

        distributeUserContainers()
    }, [userCount]);

    const createFields = () => {
        const fields = [];

        for (let i = 0; i < userCount; i++) {
            fields.push(
                <FieldContainer key={i}>
                    <SelectedCard ref={(el: HTMLDivElement | null) => (cardRefs.current[i] = el)} value={i===0? selectedUserCardValue : null}/>
                    <User ref={(el: HTMLDivElement | null) => (userRefs.current[i] = el)}>{i===0? "Igor" : i}</User>
                </FieldContainer>
            );
        }
        return fields;
    };

    return (
        <div>
            <UsersContainer ref={containerRef}>
                {createFields()}
            </UsersContainer>
        </div>
    );
};

export default Users;
