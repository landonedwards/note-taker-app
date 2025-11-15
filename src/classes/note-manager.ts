import { Note } from './note';
import type { INoteData } from './note';

export class NoteManager {
    private notes: Note[] = [];
    private readonly storageKey: string = "savedNotes";

    constructor() {
        this.loadNotes();
    }

    public getAllNotes() : Note[] {
        return this.notes;
    }

    public addNote(title: string, content: string, tags: string[]) : void {
        const newNote = new Note(title, content, tags);
        this.notes.push(newNote);
        this.saveNotes();
    }

    public updateNote(id: string, title: string, content: string, tags: string[]) : void {
        const note = this.notes.find(note => note.id == id);
        if (!note) return;

        note.editNote(title, content, tags);
        this.saveNotes();
    }

    public deleteNote(id: string) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
    }

    public loadNotes(): void {
        const storedData = localStorage.getItem(this.storageKey);

        if (storedData) {
            try {
                // parse the JSON string back to an array of simple objects (INoteData)
                const parsedData: INoteData[] = JSON.parse(storedData);
                
                // reconstruct Note instances using the factory constructor
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