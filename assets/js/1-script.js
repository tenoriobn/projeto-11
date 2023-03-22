// Importanto arquivos com outras funcionalidades
import itsACard from "./2-validateCard.js";

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
    // Essa condição vai verificar se o campo tem o name "cardNumber" e se foi digitado mais de 16 caracteres
    // Caso seja true, irá chamar a função "itsACard".
    if(campo.name == "cardNumber" && campo.value.length >= 16) {
        // Essa é a função que possibilita a modularização dos códigos.
        // Dentro dela está sendo chamada outras funções, como, por exemplo, a verificação de números e repetidos e validações de número.
        itsACard(campo)
    }
}