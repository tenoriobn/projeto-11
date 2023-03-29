// Variável que armazena o input do número do cartão de crédito
let cardNumberField = document.getElementById("card__number");

// A função "itsACard" será responsável por modularizar o código dessa folha para a outra
// Isso possibilita quebrar o código em arquivos com pequenas funcionalidades.
export default function itsACard(campo) {
    // será armazenado no `card` o valor digitado e depois formatado para grupo de 4 elementos separado por espaço.
    // Essa formatação só ocorrera se o campo tiver a name `cardNumber`, como especificado na condição if do `verificaCampo(campo)`
    // Em um primeiro momento é removido os espaços em branco com: `campo.value.replace(/\s/g, '')`
    // Depois é adicionado um espaço a cada 4 digitos: `replace(/(\d{4})/g, '$1 ')`
    // Por fim, é removido qualquer espaço em branco no começo ou no final com: `trim()`
    const card = campo.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    // Aqui será pego o valor formatado e armazenado em `card` e depois aplicado em `campo.value` para mostrar para quem digitar
    campo.value = card;
    console.log(card);

    validateRepeatedNumbers(card);
    // console.log(validateRepeatedNumbers(card));

    validateCardNumber(campo);
}

// Função responsável pela validação de números repetidos
// O parâmetro `Card` irá conter o número digitado no input do número do cartão de crédito
function validateRepeatedNumbers(card) {
    // Essa lista irá representar a sequência de números inválidos para cartão de crédito
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

    // O `inclludes` vai pegar o valor que foi digitado no input e armazenado no `card` e comparar com os valores  do `repeatedNumbers`
    // Caso seja encontrado o mesmo valor dentro do `repeatedNumbers`, será retornardo true
    // Isso torna possível inválidar esse tipo de repetição
    return (repeatedNumbers.includes(card));
}

// Função responsável por validar o número do cartão de crédito com o algoritmo de Luhn
// Será executada se o campo tiver a name `cardNumber`, como especificado na condição if do `verificaCampo(campo)`
function validateCardNumber(campo) {
    // Para ser executado o código dentro, funciona da mesma forma que a chamada da função
    // Se o campo tiver a name `cardNumber`, como especificado na condição if do `verificaCampo(campo)` e for maior ou igual a 16.
    if(campo.name == "cardNumber" && campo.value.length >= 16) {
        // Remove todos os espaços em branco no número do cartão de crédito digitado
        // Isso é feito para que os espaços não sejam contados na operação que será feita
        const cardNumber = campo.value.replace(/\s/g, '');

        // Essa condição só será executada caso seja digitado no campo algo que não é número (isNan 'Não é número')
        if (isNaN(cardNumber)) {
            // Se não for número, a condição será true dizendo que não é um número e executará o `console.log`
            campo.setCustomValidity('Esse número não é válido')
            // Além disso, retorna `false` para mostrar que a validação falhou
            return false;
        }

        // Nessa variável será pego o número do cartão digitado e depois destrinchado, formando um array de números.
        // Portanto, `cardNumber.split("")` vai separar número por número, assim, montando uma lista.
        // Em seguida, `reverse()` vai inverter o indice da lista, para que seja atribuido os números pares corretamente
           // Isso porque, o indice começa do 0, e assim, tornaria o segundo número que é par como impar porque seria indice 1.
           // Assim, em vez de indice 1, será 14, ficando par, pois o indice começara de trás para frente.
        // Por fim, `map(Number)` converte cada caractere para número, já que `split` converte para string.
        let cardNumberArray = cardNumber.split("").reverse().map(Number);

        // Essa variável será responsável por armazenar a soma dos digitos do número do cartão
        let sum = 0;

        // Esse loop vai percorrer cada 'indice/número' armazenado na variável `cardNumberArray` enquanto `i` for menor.
        for(let i = 0; i < cardNumberArray.length; i++) {

            // É armazendo na variável o digito do cartão correspondente ao índice acessado pelo loop.
            let cardNumberDigit = cardNumberArray[i];

            // Essa condição verifica se o índice do digito está em uma posição par.
            // Isso porque, os números impares são multiplicados na lógica de Luhn
            if(i % 2 !== 0) {
                // Os digitos que tem índice em posição impares são multiplicados por 2. OBS: O digito está dentro da variável
                cardNumberDigit *= 2;
                
                // Essa condição vai verificar se o digitado multiplicado por 2 ficou maior que 9.
                if (cardNumberDigit > 9) {
                    // Caso seja 'true' então o algoritmo de Luhn pede para subtrair esse resultado por -9.
                    cardNumberDigit -= 9;
                }
            }

            // Após as condições anteriores, o resultado será somado e armazenado na variável `sum`
            // Somado, pois a cada digito que o loop percorrer, ele irá somar com os já existentes na variável `sum`
            // Sendo assim, possível de verificar se o número do cartão é válido ou não
            sum += cardNumberDigit;
        }

        // Essa condição vai pegar a variável `sum`, com todos os digitos somados ao finalizar o loop
        // Sendo assim, o valor armazenado em `sum`, será divido por 10, se o resto for 0, a instrução da condição será executada
        // Ou seja, trata-se de um número válido
        if (sum % 10 === 0) {
            console.log("número válido")
            // Retorno indicando que o número é válido
            return true;

            // Caso contrário, se o resto da divisão for diferente de 0, trata-se de um número inválido
        } else {
            campo.setCustomValidity('Esse número não é válido')
            // Retorno indicando que o número é inválido
            return false;
        }
    }
}

// A função de validação do número do cartão é chamada.
// É passado como parâmetro a variável que armazena o input do campo de digitação do número
// Sendo assim, torna-se possível de pegar o valor digitado e passar pala função
validateCardNumber(cardNumberField);