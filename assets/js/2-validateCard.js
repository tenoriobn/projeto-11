export default function itsACard(campo) {
    const card = campo.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    campo.value = card;
    console.log(card);

    validateRepeatedNumbers(card);
    // console.log(validateRepeatedNumbers(card));

    validateCardNumber(campo);
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

function validateCardNumber(campo) {
    if(campo.name == "cardNumber" && campo.value.length >= 16) {
        let cardNumber = campo.value.replace(/\s/g, '');
        if (isNaN(cardNumber)) {
            console.log("O número do cartão deve conter apenas números");
            return false;
        }

        let cardNumberArray = cardNumber.split("").reverse().map(Number);
        let sum = 0;

        for(let i = 0; i < cardNumberArray.length; i++) {
            let cardNumberdigit = cardNumberArray[i];

            if(i % 2 !== 0) {
                cardNumberdigit *= 2;
                
                if (cardNumberdigit > 9) {
                    cardNumberdigit -= 9;
                }
            }

            sum += cardNumberdigit;
        }

        if (sum % 10 === 0) {
            console.log("número válido")
            return true;
        } else {
            console.log("Número inválido");
            return false;
        }
    }
}

function checkField(campo) {
    validateCardNumber(campo);
}