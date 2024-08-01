// validation form with boostrap
(() => {
    "use strict";

    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();

const calculateIMC = (weight, height) =>
    (weight / (height * height)).toFixed(2);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            const result = document.getElementById("show-result");
            const weight = document.getElementById("weight").value;
            const height = document.getElementById("height").value;

            // Convetimos la altura en metros
            const heigthM = height / 100;

            // Calculamos el IMC
            const imc = calculateIMC(weight, heigthM);

            result.innerHTML = `
            <h3 class="mt-5 mx-auto" style="width: fit-content;">Resultado:</h3>
            <span class="border border-primary rounded d-block w-50 mx-auto text-center" style="max-width: 396px;">${imc}</span>
            `;
        }
    });
});
