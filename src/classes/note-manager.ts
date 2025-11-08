import { Note } from './note';
import type { INoteData } from './note'

export class NoteManager {
    private notes: Note[] = [];
    private readonly storageKey: string = "savedNotes";

    constructor() {
        this.loadNotes();
    }

    public addNote(title: string, content: string, tags: string[]) : void {
        const newNote = new Note(title, content, tags);
        this.notes.push(newNote);
        this.saveNotes();
    }

    // public updateNote()

    // public deleteNote()

    public loadNotes(): void {
        const storedData = localStorage.getItem(this.storageKey);

        if (storedData) {
            try {
                // Parse the JSON string back to an array of simple objects (INoteData)
                const parsedData: INoteData[] = JSON.parse(storedData);
                
                // Reconstruct Note instances using the factory constructor
                this.notes = parsedData.map(data => new Note(data)); 
            } catch (e) {
                console.error("Error loading or parsing notes from localStorage:", e);
                this.notes = []; // Fallback to an empty array on error
            }
        }
    }

    private saveNotes(): void {
        try {
            const dataToStore = this.notes.map(note => note.toData());
            localStorage.setItem(this.storageKey, JSON.stringify(dataToStore));
        } catch (e) {
            console.error("Error saving notes:", e);
        }
    }
}