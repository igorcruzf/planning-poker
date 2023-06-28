export const cards = ["PP", "P", "M", "G"];

export const getCardColor = (value: string) => {
    if(cards.indexOf(value) % 2 == 0){
        return 'black'
    }
    return 'red'
}