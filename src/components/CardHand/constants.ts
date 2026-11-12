export const cards = ["PP", "P", "M", "G"];

export type CardColor = 'red' | 'black';

export const getCardColor = (value: string): CardColor => {
    if(cards.indexOf(value) % 2 === 0){
        return 'black'
    }
    return 'red'
}
