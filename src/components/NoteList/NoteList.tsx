import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

type Props = {
  notes: Note[];
};
export const NoteList = ({ notes }: Props) => {
  console.log("Notes in NoteList:", notes);
  if (!notes || notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.comment}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};
