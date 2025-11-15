import "./style.css";
import { NoteManager } from './classes/note-manager.ts';

const manager = new NoteManager();

const titleInput = document.getElementById("title") as HTMLInputElement;
const contentInput = document.getElementById("content") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveNote") as HTMLButtonElement;

const tagCheckboxes = Array.from(document.querySelectorAll(".tags input[type='checkbox']")) as HTMLInputElement[];

saveButton.addEventListener("click", () => {
    const titleContent = titleInput.value.trim();
    const mainContent = contentInput.value.trim();
    // grabs only tags that have been checked and adds all of the values to an array
    const tags = tagCheckboxes.filter(cb => cb.checked).map(cb => cb.value);

    if (!titleContent || !mainContent) {
        alert("Please enter a title and content!");
        return;
    }

    manager.addNote(titleContent, mainContent, tags);

    titleInput.value = "";
    contentInput.value = "";
    tagCheckboxes.forEach(cb => cb.checked = false);

    alert("Note saved! Hurrah!")
});