import { NoteManager } from "./classes/note-manager.ts";

const manager = new NoteManager();
const notesList = document.getElementById("notesList") as HTMLDivElement;

// modal elements
const editModal = document.getElementById("editModal") as HTMLElement;
const editTitle = document.getElementById("editTitle") as HTMLInputElement;
const editContent = document.getElementById("editContent") as HTMLTextAreaElement;
const saveEditBtn = document.getElementById("saveEditBtn") as HTMLButtonElement;
const cancelEditBtn = document.getElementById("cancelEditBtn") as HTMLButtonElement;

const tagCheckBoxes = Array.from(document.querySelectorAll(".tagEdit input[type='checkbox']")) as HTMLInputElement[];

let activeNoteId: string | null = null;

function renderNotes() {
    notesList.innerHTML = "";

    manager.getAllNotes()
    .sort((a, b) => b.dateModified.getTime() - a.dateModified.getTime())
    .forEach(note => {
        const div = document.createElement("div");
        div.classList.add("noteCard");
        div.dataset.id = note.id;

        div.innerHTML = `
            <div class="noteHeader">
              <h3>${note.title}</h3>
              <button class="deleteBtn">X</button>
            </div>
            <p>${note.content}</p>
            <br>
            <small>Tags: ${note.tags.join(", ")}</small>
            <small>Created: ${note.dateCreated.toLocaleString()}</small><br>
            `;

        div.addEventListener("click", () => openModal(note.id));
        notesList.appendChild(div);
    });
}

function openModal(id: string) {
    const note = manager.getAllNotes().find(n => n.id == id);
    if (!note) return;

    activeNoteId = id;

    editTitle.value = note.title;
    editContent.value = note.content;

    tagCheckBoxes.forEach(cb => {
        cb.checked = note.tags.includes(cb.value);
    });

    editModal.classList.add("show");
}

notesList.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("deleteBtn")) {
        const card = target.closest(".noteCard") as HTMLElement;
        const id = card.dataset.id!;
        manager.deleteNote(id);
        card.remove();
    }
});

saveEditBtn.addEventListener("click", () => {
    if (!activeNoteId) return;

    // return an array of all checkbox values that were checked
    const updatedTags = tagCheckBoxes
    .filter(cb => cb.checked)
    .map(cb => cb.value);

    manager.updateNote(activeNoteId, editTitle.value, editContent.value, updatedTags);

    editModal.classList.remove("show");
    activeNoteId = null;
    renderNotes();
});

cancelEditBtn.addEventListener("click", () => {
    editModal.classList.remove("show");
    activeNoteId = null;
})

editModal.addEventListener("click", (event) => {
    if (event.target === editModal) {
        editModal.classList.remove("show");
        activeNoteId = null;
    }
})

renderNotes();