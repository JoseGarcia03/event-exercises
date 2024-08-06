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

let notes = [];
let id = 1;

const addNote = (title, text) => {
    id++;
    notes.push({ id, title, text });
};

const checkedNote = (id) => {
    const note = notes.find((note) => note.id === id);

    if (note) {
        note.checked = !note.checked;
        showNotes();
    }
};

const clearForm = () => {
    document.getElementById("title").value = "";
    document.getElementById("text").value = "";
};

const deleteNote = (id) => {
    notes = notes.filter((note) => note.id !== id);
    showNotes();
};

const filterByText = (notes, text) => {
    if (!text) return notes;

    return notes.filter(
        (note) =>
            note.title.toLowerCase().includes(text.toLowerCase()) ||
            note.text.toLowerCase().includes(text.toLowerCase())
    );
};

const filterByChecked = (notes) => {
    return notes.filter((note) => note?.checked);
};

const applyFilter = () => {
    let results = notes;

    const text = document.getElementById("search").value;
    const isChecked = document.getElementById("isChecked").checked;

    if (text) {
        results = filterByText(results, text);
    }

    if (isChecked) {
        results = filterByChecked(results);
    }

    showNotes(results);
};

const showNotes = (Allnotes = notes) => {
    const section = document.getElementById("show-notes");
    section.innerHTML = "";

    if (Allnotes.length === 0) {
        section.innerHTML = "<p>No hay notas para mostrar</p>";
        return;
    }

    Allnotes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.className = "card note-card p-4 mb-4";
        noteElement.style = "width: 300px;";

        noteElement.innerHTML = `
            <h3 class="card-title">${note.title}</h3>
            <p class="card-text">${note.text}</p>
            <div class="button-group">
                <button class="btn btn-danger" onclick="deleteNote(${
                    note.id
                })">Eliminar</button>
                <input type="checkbox" onclick="checkedNote(${note.id})" ${
            note.checked ? "checked" : ""
        }> Realizada
            </div>
        `;
        section.appendChild(noteElement);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    showNotes();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const text = document.getElementById("text").value;

        if (title && text) {
            addNote(title, text);
            showNotes();
            clearForm();
        }
    });
});
