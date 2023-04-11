export default function itsADate(campo, validarData = true) {
    formatDate(campo);
    
    if (validarData) {
        validaData(campo);
    }
}

function formatDate(campo) {
    if(campo.name == "cardYear" && campo.value.length === 4) {
        const formattedDate = campo.value.slice(2);
        campo.value = formattedDate;
    }
    
    if(campo.name == "cardYear" && (campo.value.length < 2 || campo.value.length === 3 || campo.value.length > 4 || isNaN(campo.value))) {
        // console.log('Ano inválido!')
        campo.setCustomValidity('Ano inválido!');
        return false;
    }

    if(campo.name == "cardMonth" && (campo.value.length == "" || campo.value.length > 2 || isNaN(campo.value) || campo.value < 1 || campo.value > 12)) {
        campo.setCustomValidity('Mês inválido');
        return false;
    }
}

function validaData() {
    const cardMonth = Number(document.getElementById('exp__month').value);
    const cardYear = Number(document.getElementById('exp__year').value);
    console.log(cardMonth, cardYear)

    const today = new Date();
    const currentMonth = Number(today.getMonth() + 1); // adicionamos 1 porque o método getMonth() retorna um valor de 0 a 11 para os meses
    const currentYear = Number(today.getFullYear().toString().slice(-2)); // pegamos o ano atual como uma string e depois os últimos 2 caracteres com slice()
    console.log(currentMonth, currentYear);

    let expiredDate = document.querySelector('.expirado');

    if(cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
        console.log('Deu ruim')
        const cardYearSet = document.querySelector('[name="cardYear"]');
        cardYearSet.setCustomValidity('Data expirada')
    }
}


// Falta validar se a data do cartão expirou ou não
/* 
    // Solução
    !É importante remover o evento de blur dos campos de data (isso porque ao desfocar do 'mm' para ir para o 'yy' ele envia, antes do 'yy' ser digitado)    
    !Uma solução é aplicar o evento blur, somente quando os campos 'mm' e 'yy' estiverem sido preenchidos e formatados para mm/yy
        !Sendo que se um dos dois campos estiverem incompletos, não será ativado o evento de 'blur'

    // Validação
    1º Unir os dois campos para formar mm/yy
    2º Conferir o tipo de dado da data atual e dos campos formatados em uma única data
    3º Comparar as datas para obter o resultado de vencimento true ou false.
*/