document.addEventListener("DOMContentLoaded", function() {
    const cardRegistration = JSON.parse(sessionStorage.getItem("cadastro"));

    document.getElementById("card__name").textContent = cardRegistration.cardName;
    document.getElementById("front__card__number").textContent = cardRegistration.cardNumber;
    document.getElementById("card__date").textContent = `${cardRegistration.cardMonth}/${cardRegistration.cardYear}`;
    document.getElementById("card__cvc").textContent = cardRegistration.cardCvc;
});