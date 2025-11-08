export interface INoteData {
    id: string;
    title: string;
    content: string;
    tags: string[];
    dateCreated: Date;
    dateModified: Date;
}

export class Note implements INoteData {
    private _id: string;
    private _title: string;
    private _content: string;
    private _tags: string[];
    private _dateCreated: Date;
    private _dateModified: Date;

    constructor(dataOrTitle: INoteData | string, content?: string, tags?: string[]) {
        if (typeof dataOrTitle == "string" && content !== undefined && tags !== undefined) {
            this._id = Date.now().toString();
            this._title = dataOrTitle;
            this._content = content;
            this._tags = tags;
            this._dateCreated = new Date();
            this._dateModified = new Date();
        } else if (typeof dataOrTitle == "object") {
            const data = dataOrTitle as INoteData;
            this._id = data.id;
            this._title = data.title;
            this._content = data.content;
            this._tags = data.tags;

            this._dateCreated = new Date(data.dateCreated);
            this._dateModified = new Date(data.dateModified);
        } else {
            throw new Error("Invalid arguments provided to Note constructor.");
        }
    }

    public get id() : string {
        return this._id;
    }

    public get title() {
        return this._title;
    }

    public get content() {
        return this._content;
    }

    public get tags() {
        return this._tags;
    }

    public get dateCreated() : Date {
        return this._dateCreated;
    }

    public get dateModified(): Date {
        return this._dateModified;
    }

    public editNote(title: string, content: string, tags: string[]) {
        this._title = title;
        this._content = content;
        this._tags = tags;
        this._dateModified = new Date();
    }

    public toData(): INoteData {
        return {
            id: this._id,
            title: this._title,
            content: this._content,
            tags: this._tags,
            // dates are saved as Date objects here, but JSON.stringify 
            // will automatically convert them to strings ("2025-11-07T...")
            dateCreated: this._dateCreated, 
            dateModified: this._dateModified
        }
    }
}