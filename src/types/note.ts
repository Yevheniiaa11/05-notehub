export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}
