class Note {
    constructor(content = '') {
        this.content = content;
        this.element = this.createNoteElement();
    }

    createNoteElement() {
        const div = document.createElement('div');
        div.className = 'note';

        const textarea = document.createElement('textarea');
        textarea.value = this.content;
        textarea.className = 'noteArea';
        textarea.addEventListener('input', (e) => {
            this.content = e.target.value;
            saveNotes();
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = MESSAGES.removeNoteButton;
        removeButton.className = 'btn remove-btn';
        removeButton.addEventListener('click', () => {
            this.remove();
        });

        div.appendChild(textarea);
        div.appendChild(removeButton);
        return div;
    }

    remove() {
        const index = notes.indexOf(this);
        if (index !== -1) {
            notes.splice(index, 1);
            saveNotes();
        }
        this.element.remove();
    }
}

const notes = [];
const notesContainer = document.getElementById('noteContainer');
const addNoteButton = document.getElementById('addNote');
const lastSaved = document.getElementById('lastSaved');
const storedLabel = document.getElementById('label');

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach((noteContent) => {
        const note = new Note(noteContent);
        notes.push(note);
        notesContainer.appendChild(note.element);
    });
}

function saveNotes() {
    const notesData = notes.map((note) => note.content);
    localStorage.setItem('notes', JSON.stringify(notesData));
    lastSaved.textContent = new Date().toLocaleTimeString();
}

addNoteButton.addEventListener('click', () => {
    const note = new Note();
    notes.push(note);
    notesContainer.appendChild(note.element);
    saveNotes();
});

window.addEventListener('load', () => {
    document.getElementById('title').textContent = MESSAGES.writerTitle;
    storedLabel.textContent = MESSAGES.storedAt;
    addNoteButton.textContent = MESSAGES.addNoteButton;
    document.querySelector('.back-btn').textContent = MESSAGES.backButton;

    loadNotes();
    setInterval(saveNotes, 2000);
});

// Used Chat-GPT to help with Lab 1