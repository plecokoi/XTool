let submitButton = document.querySelector("[data-submit-note]");
let inputTitle = document.querySelector("[data-input-title]");
let inputContent = document.querySelector("[data-input-content]");
let noteSec = document.querySelector("[data-notes-section]");
let viewButton = document.querySelector("[data-view]");
let editButton = document.querySelector("[data-edit]");
let deleteButton = document.querySelector("[data-delete]");
let notesPreview = document.querySelector("[data-notes-preview]");
let previewTitle = document.querySelector("[data-preview-title]");
let previewContent = document.querySelector("[data-preview-content]");
let previewButton = document.querySelector("[data-preview-exit-btn]");
let alertDiv = document.querySelector("[data-alert-msg]");
let modeButton = document.getElementById("modeButton");
let inputContainer = document.querySelectorAll(".input-form");
let scrollIcon = document.querySelector(".scrollIcon");
let sectionContainer = document.querySelector(".section-container");

function handlingScroll() {
    if (scrollIcon.textContent === "keyboard_double_arrow_down") {
        sectionContainer.scrollIntoView({ behavior: "smooth" });
    } else if (scrollIcon.textContent === "keyboard_double_arrow_up") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const sectionTop = sectionContainer.offsetTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop <= 50 && scrollIcon.textContent !== "keyboard_double_arrow_down") {
        scrollIcon.textContent = "keyboard_double_arrow_down";
    }

    if ((scrollTop >= sectionTop || scrollTop + clientHeight >= scrollHeight - 5) && scrollIcon.textContent !== "keyboard_double_arrow_up") {
        scrollIcon.textContent = "keyboard_double_arrow_up";
    }
});

class Notes {
    constructor(title, content) {
        this.note_title = title;
        this.note_content = content;
        this.id = Math.random();
    }
}

function getNote() {
    let notes;
    if (localStorage.getItem('notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    return notes;
}

function noteMsg(numNotes) {
    let msgElem = document.getElementById("section-msg");
    if (numNotes.length == 0) {
        msgElem.innerHTML = "No notes";
    } else {
        msgElem.innerHTML = "Your notes";
    }
}

function addNote(note) {
    let notes = getNote();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteMsg(getNote());

}

function deleteNotes(id) {
    let notes = getNote();
    notes.forEach((note, index) => {
        if (note.id === id) {
            notes.splice(index, 1);
        }
    });
    localStorage.setItem('notes', JSON.stringify(notes));
    noteMsg(getNote());

}

function appendNotes(note) {
    noteSec.innerHTML += `
        <div class="notes-container" id="${note.id}">
            <h2 class="note-name" id="${note.id + "-title"}">${note.note_title}</h2>
            <h5 class="note-text" id="${note.id + "-content"}">${note.note_content}</h5>
            <div class="notes-button">
                <button type="button" class="view-button" id="${note.id}" data-view>View Note</button>
                <button type="button" class="edit-button" id="${note.id}" data-edit>Edit Note</button>
                <button type="button" class="delete-button" id="${note.id}" data-delete>Delete Note</button>
            </div>
        </div>
    `;
}

function displayNote() {
    const notes = getNote();
    notes.forEach(note => {
        appendNotes(note);
    });
}

submitButton.addEventListener('click', (e) => {
    if (inputTitle.value == '' || inputContent.value == '') {
        clearInterval();
        alertDiv.classList.add('details-msg');
        alertDiv.innerHTML = "Please enter details";
        setTimeout(function () {
            alertDiv.classList.remove('details-msg');
            alertDiv.classList.add('alert-msg');
        }, 3000);

    } else {
        clearInterval();
        const newNote = new Notes(inputTitle.value, inputContent.value);
        appendNotes(newNote);
        addNote(newNote);
        inputTitle.value = '';
        inputContent.value = '';
        alertDiv.classList.add('success-msg');
        alertDiv.innerHTML = "Note added successfully";
        setTimeout(function () {
            alertDiv.classList.remove('success-msg');
            alertDiv.classList.add('alert-msg');
        }, 3000);
    }

});

noteSec.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-button')) {
        const currentId = e.target.getAttribute('id');
        const currentTitle = currentId + "-title";
        const currentContent = currentId + "-content";
        titleElement = document.getElementById(currentTitle);
        contentElement = document.getElementById(currentContent);
        previewTitle.innerHTML = titleElement.textContent;
        previewContent.innerHTML = contentElement.textContent;
        notesPreview.style.opacity = 1;
        notesPreview.style.pointerEvents = 'all';
    }

    if (e.target.classList.contains('delete-button')) {
        clearInterval();
        const currentId = e.target.getAttribute('id');
        const el = document.getElementById(currentId);
        el.remove();
        deleteNotes(Number(currentId));
        alertDiv.classList.add('delete-msg');
        alertDiv.innerHTML = "Note deleted";
        setTimeout(function () {
            alertDiv.classList.remove('delete-msg');
            alertDiv.classList.add('alert-msg');
        }, 3000);
    }

    if (e.target.classList.contains('edit-button')) {
        const currentId = e.target.getAttribute('id');
        const currentTitle = currentId + "-title";
        const currentContent = currentId + "-content";
        title = document.getElementById(currentTitle).innerHTML;
        text = document.getElementById(currentContent).innerHTML;
        inputTitle.value = title;
        inputContent.value = text;
        const el = document.getElementById(currentId);
        el.remove();
        deleteNotes(Number(currentId));
        window.scrollTo(0, 0);
    }
});

previewButton.addEventListener('click', (e) => {
    setTimeout(function () {
        previewTitle.innerHTML = "";
        previewContent.innerHTML = "";
    }, 200);
    notesPreview.style.opacity = 0;
    notesPreview.style.pointerEvents = 'none';
});

document.addEventListener('DOMContentLoaded', displayNote());
noteMsg(getNote());