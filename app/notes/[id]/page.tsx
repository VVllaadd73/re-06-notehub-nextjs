// app/notes/[id]/page.tsx

import { fetchNoteById } from '../../../lib/api';
import type { Note } from '../../../types/note';
import css from './NoteDetails.module.css';

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const note: Note = await fetchNoteById(id);

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>Note title: {note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>Note content: {note.content}</p>
        <p className={css.date}>Created date: {note.createdAt}</p>
      </div>
    </div>
  );
}

export default NoteDetails;
