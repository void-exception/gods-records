document.addEventListener("DOMContentLoaded", loadNotes);

function loadNotes() {
    fetch('/api/notes')
    .then(res => {
        if (res.status === 401) {
            window.location.href = '/login.html'; // Если сессия пуста, отправляем на логин
        }
        return res.json();
    })
    .then(notes => {
        const grid = document.getElementById('notesGrid');
        grid.innerHTML = '';
        notes.forEach(note => {
            grid.innerHTML += `
                <div class="note-card">
                    <span>${note.title}</span>
                    <input type="checkbox" class="checkbox">
                </div>
            `;
        });
    });
}

function addNote() {
    const title = prompt("Введите заголовок заметки:");
    if (!title) return;

    fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title })
    }).then(() => loadNotes());
}

function logout() {
    fetch('/api/auth/logout', { method: 'POST' })
    .then(() => window.location.href = '/login.html');
}
