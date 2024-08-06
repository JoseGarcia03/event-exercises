// validation form with boostrap
(() => {
    "use strict";

    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                const fromSelect = document.getElementById("from");
                const toSelect = document.getElementById("to");
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (fromSelect.value === "") {
                        fromSelect.classList.add("is-invalid");
                    } else {
                        fromSelect.classList.remove("is-invalid");
                    }

                    if (toSelect.value === "") {
                        toSelect.classList.add("is-invalid");
                    } else {
                        toSelect.classList.remove("is-invalid");
                    }
                } else {
                    fromSelect.classList.remove("is-invalid");
                    toSelect.classList.remove("is-invalid");
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();

const exchangeRates = {
    COP: {
        ARS: 0.025, // 1 COP a ARS
        USD: 0.00026, // 1 COP a USD
    },
    ARS: {
        COP: 40.0, // 1 ARS a COP
        USD: 0.01, // 1 ARS a USD
    },
    USD: {
        COP: 3875.0, // 1 USD a COP
        ARS: 100.0, // 1 USD a ARS
    },
};

const convertCurrency = (amount, from, to) => {
    if (exchangeRates[from] && exchangeRates[from][to]) {
        const rate = exchangeRates[from][to];

        return amount * rate;
    } else {
        return false;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const section = document.getElementById("show-result");

    const amount = document.getElementById("amount");
    const from = document.getElementById("from");
    const to = document.getElementById("to");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            const result = convertCurrency(amount.value, from.value, to.value);

            if (result) {
                section.innerHTML = `<h3 class="mt-5 mx-auto" style="width: fit-content;">${
                    amount.value
                } ${from.value} = ${result.toFixed(2)} ${to.value}</h3>`;
            } else {
                alert("Tasa de conversion no encontrada");
            }
        }
    });
});
