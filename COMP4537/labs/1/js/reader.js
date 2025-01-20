function loadNotes() {
    const notesContainer = document.getElementById('notesContainer');
    const lastUpdated = document.getElementById('lastUpdated');

    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    
    notesContainer.innerHTML = '';

    savedNotes.forEach(content => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        const textarea = document.createElement('textarea');
        textarea.value = content;
        textarea.disabled = true;
        textarea.className = 'noteArea';

        noteDiv.appendChild(textarea);
        notesContainer.appendChild(noteDiv);
    });

    lastUpdated.textContent = new Date().toLocaleTimeString();
}

window.addEventListener('load', () => {
    document.getElementById('title').textContent = MESSAGES.readerTitle;
    document.getElementById('label').textContent = MESSAGES.updatedAt;
    document.querySelector('.back-btn').textContent = MESSAGES.backButton;

    loadNotes();
    setInterval(loadNotes, 2000);
});
