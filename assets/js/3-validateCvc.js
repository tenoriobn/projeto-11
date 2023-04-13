// Essa função irá modularizar o código de validação do campo cvc
// A lógica é que o Cvc contém no min. 3 e no max. 4 caracteres e aceita apenas números
export default function itsACvc (campo) {
    // Se o campo selecionado tiver o 'name' `cardCvc`, irá executar o código
    if(campo.name == "cardCvc") {
        // Aqui é armazenado os caracteres digitados no campo Cvc depois de formatados
        // replace(/\s/g, '') vai remover os espaços em branco caso houver
        const cardCvc = campo.value.replace(/\s/g, '');

        // Essa condição será executada caso seja digitado no campo caracteres que não sejam números (isNan 'Não é número')
        if (isNaN(cardCvc)) {
            // Se não for número, a condição será true dizendo que não é um número e executará o `console.log`
            campo.setCustomValidity('The cvc must only contain numbers');
            // Além disso, retorna `false` para mostrar que a validação falhou
            return false;

            // Além disso, se for digitado menos que 3 e mais que 4 caracteres númericos, essa condição será executada.
        } else if (cardCvc.length < 3 || cardCvc.length > 4) {
            // Caso seja `true` sera executado o `console.log`
            campo.setCustomValidity('The cvc number must contain a minimum of 3 characters and a maximum of 4 characters');
            // Além disso, retorna `false` para mostrar que a validação falhou
            return false;
        }
    }
}