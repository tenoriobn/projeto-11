export default function itsADate(campo) {
    formatDate(campo);
}

function formatDate(campo) {
    if(campo.name == "cardYear" && campo.value.length === 4) {
        const formattedDate = campo.value.slice(2);
        campo.value = formattedDate;
    }
    
    if(campo.name == "cardYear" && (campo.value.length < 2 || campo.value.length === 3 || campo.value.length > 4 || isNaN(campo.value))) {
        console.log('Ano inválido!')
        return false;
    }

    if(campo.name == "cardMonth" && (campo.value.length == "" || campo.value.length > 2 || isNaN(campo.value) || campo.value < 1 || campo.value > 12)) {
        console.log('Mês inválido!')
        return false;
    }

    if(campo.name == "cardMonth" && (campo.value < 10)) {
        campo.value = '0' + campo.value;
    }
}

// Falta validar se a data do cartão expirou ou não