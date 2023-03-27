// Importanto arquivos com outras funcionalidades
import itsACard from "./2-validateCard.js";
import itsACvc from "./3-validateCvc.js";
import itsADate from "./4-validateDate.js";

// Pegando os campos com status de required (nome, número do cartão, cvc,) e armazenando na variável
const camposDoFormulario = document.querySelectorAll("[required]");

// Pegando cada campo dentro da variável "Campos Do formulario" com o forEach
camposDoFormulario.forEach((campo) => {
    // Aplicando o evento blur em cada campo, já que o forEach pega todos os campos um de cada vez e armazena no parâmetro "campo"
    // Em seguida executa a função verificaCampo que vai executar o evento em cada campo
    campo.addEventListener("blur", () => verificaCampo(campo));
})

// Essa função vai ser chamada se eu clicar no campo e depois clicar fora, de acordo com o evento "blur".
// O parâmetro "campo" carrega os inputs, então dentro da função torna-se possível acessar coisas como "name" e "value".
function verificaCampo(campo) {
    if(campo.name == "cardName") {
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
        frontCardNumber.innerHTML = campo.value;
    }

    if(campo.name == "cardMonth" || campo.name == "cardYear") {
        itsADate(campo);
    }

    // Semelhante a condição de cima, essa condição vai verificar se o campo digitado corresponde ao `cardCvc`
    // Caso seja 'true', ela irá chamar a função `itsACvc`.
    if(campo.name == "cardCvc") {
        // Dentro dessa função está sendo chamado outras funções, como, por exemplo, a verificação de números digitados no cvc.
        itsACvc (campo);

        // Pegando os caracteres do cvc do cartão na imagem
        const frontCardCvc = document.getElementById('card__cvc');
        // Pegando os caracteres inseridos no input do cvc do cartão e substituindo pelos caracteres na imagem do cartão
        frontCardCvc.innerHTML = campo.value;
    }
}