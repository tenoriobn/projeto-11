import itsACard from "./2-validateCard.js";

const camposDoFormulario = document.querySelectorAll("[required]");

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
})

function verificaCampo(campo) {
    if(campo.name == "cardNumber" && campo.value.length >= 16) {
        itsACard(campo)
    }
}