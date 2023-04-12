// Importanto arquivos com outras funcionalidades
import itsACard from "./2-validateCard.js";
import itsACvc from "./3-validateCvc.js";
import itsADate from "./4-validateDate.js";
// Pegando os campos com status de required (nome, número do cartão, cvc,) e armazenando na variável
const camposDoFormulario = document.querySelectorAll("[required]");

const cardMonth = document.querySelector('[name="cardMonth"]');
const cardYear = document.querySelector('[name="cardYear"]');
const form = document.querySelector("[data-form]");
const btnForm = document.getElementById("btn__form");

btnForm.addEventListener('click', () => {
    const campo = document.querySelectorAll(".form__control");
    const emptyInput = document.querySelector('.vazio');

    for(let i = 0; i < campo.length; i++) {
        if(campo[i].value === '') {
            console.log('Campo vazio: ' + campo[i].name)
            campo[i].style.borderColor = 'red';
        }
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cardRegistration = {
        "cardName": e.target.elements["cardName"].value,
        "cardNumber": e.target.elements["cardNumber"].value,
        "cardMonth": e.target.elements["cardMonth"].value,
        "cardYear": e.target.elements["cardYear"].value,
        "cardCvc": e.target.elements["cardCvc"].value
    }

    sessionStorage.setItem("cadastro", JSON.stringify(cardRegistration));

    window.location.href = './assets/pages/complete_registration.html';
})

// Pegando cada campo dentro da variável "Campos Do formulario" com o forEach
camposDoFormulario.forEach((campo) => {
    // Aplicando o evento blur em cada campo, já que o forEach pega todos os campos um de cada vez e armazena no parâmetro "campo"
    // Em seguida executa a função verificaCampo que vai executar o evento em cada campo
    campo.addEventListener("blur", () => verificaCampo(campo));
    // Esse evento tira o pop-up padrão que o navegador aplica sobre os campos
    campo.addEventListener("invalid", evento => evento.preventDefault());
})

// Aqui temos uma lista como strings que serão propriedades de possíveis erros respectivos ao seu nome.
const errorTypes = [
    // Erro retornado quando o campo está vázio
    'valueMissing',
    // Erro retornardo quando os caracteres digitados não são válidos no campo.
    'typeMismatch',
    // Erro retornardo quando o formato não é valido, por exemplo, espaço entre cada grupo com 4 caracteres
    'patternMismatch',
    // Erro retornardo quando o campo não possui o minimo de caracteres permitidos.
    'tooShort',
    // Retorna um erro customizado
    'customError'
]

// Aqui trata-se de um objeto que guarda as possíveis mensagens de erros
    //valueMissing, patternMismatch, são propriedades que guardam erros de acordo com seus nomes.
const messages = {
    cardName: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome com formato válido.",
        tooShort: "O campo de nome não tem caractéres suficientes."
    },
    cardNumber: {
        valueMissing: 'O campo do número não pode estar vazio.',
        patternMismatch: "Por favor, preencha um número válido.",
        customError: "O número digitado não é válido.",
        tooShort: "O campo de número não tem caractéres suficientes."
    },
    cardMonth: {
        valueMissing: 'O campo do mês não pode estar vazio.',
        patternMismatch: "Por favor, preencha um mês válido.",
        customError: "O mês digitado não é válido.",
        tooShort: "O campo de mês não tem caractéres suficientes."
    },
    cardYear: {
        valueMissing: 'O campo do ano não pode estar vazio.',
        patternMismatch: "Por favor, preencha um ano válido.",
        customError: "O ano digitado não é válido.",
        tooShort: "O campo de ano não tem caractéres suficientes."
    },
    cardCvc: {
        valueMissing: 'O campo do cvc não pode estar vazio.',
        patternMismatch: "Por favor, preencha um cvc válido.",
        customError: "O cvc digitado não existe.",
        tooShort: "O campo de cvc não tem caractéres suficientes."
    }
}

// Essa função vai ser chamada se eu clicar no campo e depois clicar fora, de acordo com o evento "blur".
// O parâmetro "campo" carrega os inputs, então dentro da função torna-se possível acessar coisas como "name" e "value".
function verificaCampo(campo) {
    // Vai guardar a mensagem de erro.
    let message = "";
    // Vai ocultar a mensagem de erro, ao corrigir a informação de maneira válida
    campo.setCustomValidity('');
    
    // Essa condição vai verificar se o campo tem o name "cardName" e se foi digitado mais de 12 caracteres
    if(campo.name == "cardName" && campo.value.length >= 12 && campo.value !== "") {
        // Pegando os caracteres do nome do cartão na imagem
        const frontCardName = document.getElementById('card__name');
        // Pegando os caracteres inseridos no input do nome do cartão e substituindo pelos caracteres na imagem do cartão
        frontCardName.innerHTML = campo.value;
    }

    // Essa condição vai verificar se o campo tem o name "cardNumber" e se foi digitado mais de 16 caracteres
    // Caso seja true, irá chamar a função "itsACard".
    if(campo.name == "cardNumber" && campo.value.length >= 16) {
        // Essa é a função que possibilita a modularização dos códigos.
        // Dentro dela está sendo chamada outras funções, como, por exemplo, a verificação de números e repetidos e validações de número.
        itsACard(campo);

        // Pegando os caracteres do número do cartão na imagem
        const frontCardNumber = document.getElementById("front__card__number");
        // Pegando os caracteres inseridos no input do número do cartão e substituindo pelos caracteres na imagem do cartão
        if(campo.value.length >= 16 && campo.value.length <= 24){
            frontCardNumber.innerHTML = campo.value;
        }
    }

    // Aqui está analisando se o mês digitado pelo usuáro está correto
    if(campo.name == "cardMonth" && campo.value.length == 2 && campo.value !== "") {
        // Aqui vai chamar a função `itsADate`, e vai executar somente `formatDate(campo)` dentro dela
        itsADate(campo, false);
    }

    // Aqui está analisando se o ano digitado pelo usuáro está correto
    if(campo.name == "cardYear" && campo.value !== "") {
        // Aqui vai chamar a função `itsADate`, e vai executar somente `formatDate(campo)` dentro dela
        itsADate(campo, false);
    }

    // Se os valores dos campos forem diferente de vazio então essa condição é true
        // Isso serve para que a data seja comparada somente quando for digitado mês e ano
    if(cardMonth.value !== "" && cardYear.value !== "") {
        // Se os inputs possuirem o nome de `cardMonth` e `cardYear`, então é true
        if(campo.name == "cardMonth" || campo.name == "cardYear") {
            // Aqui vai chamar a função `itsADate`, e vai executar as duas funções dentro dela
            itsADate(campo, true);

            // Pegando os caracteres da data do cartão na imagem
            const frontCardDate = document.getElementById('card__date');

            // Pegando os caracteres inseridos no input de mês e ano e substituindo pelos caracteres na imagem do cartão
            if (cardMonth.value < 10) {
                // Se for um número de 9 para baixo, irá acrescentar um 0 a frente.
                frontCardDate.innerHTML = '0' + cardMonth.value + '/' + cardYear.value;
            } else {
                // Caso contrário, vai adicionar normalmente
                frontCardDate.innerHTML = cardMonth.value + '/' + cardYear.value;
            }
        }
    }

    // Semelhante a condição de cima, essa condição vai verificar se o campo digitado corresponde ao `cardCvc`
        // Caso seja 'true', ela irá chamar a função `itsACvc`.
    if(campo.name == "cardCvc" && campo.value !== "") {
        // Dentro dessa função está sendo chamado outras funções, como, por exemplo, a verificação de números digitados no cvc.
        itsACvc (campo);

        // Pegando os caracteres do cvc do cartão na imagem
        const frontCardCvc = document.getElementById('card__cvc');
        // Pegando os caracteres inseridos no input do cvc do cartão e substituindo pelos caracteres na imagem do cartão
        if(campo.value.length >= 3 && campo.value.length < 5) {
            frontCardCvc.innerHTML = campo.value;
        }
    }

    // errorTypes está sendo varrido e capturado pelo método forEach
        //erro vai guardar as propriedades que é referente a cada erro.
    errorTypes.forEach(erro => {
        //Essa condição irá conferir se o campo contém algum erro equivalente aos do validity
            // o `[erro]` representa as propriedades dentro de errorTypes que foi passado como parâmetro no forEach
        if(campo.validity[erro]) {
            // A variável message irá armazenar o tipo de erro guardando em messages de acordo com o nome do campo.
                // messages possui os objetos que são os campos e o `[campo.name]` é o nome do campo
                // erro é referente a mensagem de erro de acordo com o campo.
            message = messages[campo.name][erro];
            console.log(message)
        }
    })

    //Aqui está sendo pego o 'span' que irá guardar e exibir a mensagem de erro em baixo do input e armazenando na variável
        // 'parentNode' faz com que a mensagem seja exibida abaixo do input selecionado
    let errorMessage = campo.parentNode.querySelector('.error-message');
    const borderColorInError = campo.parentNode.querySelector('.form__control');

    // Essa variável guarda a situação do campo, se ele está correto true, caso contrário false
    const inputValidator = campo.checkValidity();

    // Sendo assim, se a variável estiver guardando `false` significa que o campo guarda informação inválida
    if(!inputValidator) {
        // Aqui o erro especifico do campo será exibido logo abaixo do input como string
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        borderColorInError.style.borderColor = 'red';

    } else {
        // Caso contrário, nada acontece
        errorMessage.textContent = "";
        borderColorInError.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}




    /*
    Atualização**
        1º Fazer com que as bordas do input fiquem vermelhas caso o input esteja preenchido de maneira errada.**

        2º Fazer com que os inputs fiquem vermelhos se o usuário tentar clicar no botão 'confirm' se algum campo
        ou todos estiverem em branco. **


        3º Pegar os dados dos inputs e colocar na imagem do cartão frente e verso na página `complete_registration.html`**
        4º Fazer com que ao colocar uma data expirada aparece uma mensagem igual quando o campo está errado**
            - Além disso, só deve ser possível de confirmar, se for uma data válida que não expirou, pois está enviando data expirada.**

        5º Achar um meio (talvez as condições sejam úteis) para que só seja possível clicar no botão 'confirm' e ir para a próxima
        etapa se todos os campos estiverem corretamente preenchidos.**

        6º Corrigir erro das mensagens customizadas nos inputs de mês e ano**

        7º Uma ideia seria botar o evento que executa a função dos inputs de data dentro da função  verifica campo**
            - Pois assim, é possível que ai clicar no Month já seja cálculado na hora se o valor é correto**
            - Depois, ao clicar no ano é avaliado se o valor é correto**
            - Dai depois executa a união dos valores e a comparação deles.**
        
    */