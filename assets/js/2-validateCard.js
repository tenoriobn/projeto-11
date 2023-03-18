export default function itsACard(campo) {
    const card = campo.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    campo.value = card;
    console.log(card);

    validateRepeatedNumbers(card);
    console.log(validateRepeatedNumbers(card));
}

function validateRepeatedNumbers(card) {
    const repeatedNumbers = [
        '0000 0000 0000 0000',
        '1111 1111 1111 1111',
        '2222 2222 2222 2222',
        '3333 3333 3333 3333',
        '4444 4444 4444 4444',
        '5555 5555 5555 5555',
        '6666 6666 6666 6666',
        '7777 7777 7777 7777',
        '8888 8888 8888 8888',
        '9999 9999 9999 9999'
    ]

    return (repeatedNumbers.includes(card));
}