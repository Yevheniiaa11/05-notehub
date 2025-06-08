export interface Note {
  id: string;
  title: string;
  comment: string;
  tag: string;
}

export interface NewNoteData {
  title: string;
  comment: string;
  tag: string;
}

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}
